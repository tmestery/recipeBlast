package com.backend.backend.service;

import com.backend.backend.model.FoodItem;
import com.backend.backend.model.FoodItemRepository;
import com.backend.backend.utils.OCRParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class AiAnalysisService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String OLLAMA_URL = "http://localhost:11434/api/generate";

    private final FoodItemRepository foodItemRepository;

    public AiAnalysisService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    public Map<String, Object> analyzeIngredientsWithRecommendation(String productName, String ingredientsList) {
        OCRParser ocrParse = new OCRParser();
        ingredientsList = ocrParse.extractParsedText(ingredientsList);
        System.out.println(ingredientsList);

        // 1. Updated prompt
        String prompt = "You are a nutrition analysis model. You are given a product name and its ingredients list. " +
                "Evaluate the product's health quality.\n\n" +
                "Always provide 3-4 ingredients of concern, even if fewer are clearly problematic.\n" +
                "For each ingredient of concern, provide a score (0-50) and a short reason why it is concerning.\n" +
                "Provide 4 recommended healthier alternatives, each with a score (0-100) and a short reason.\n\n" +
                "Output ONLY valid JSON with this structure:\n" +
                "{\n" +
                "  \"product_name\": \"" + productName + "\",\n" +
                "  \"score\": <overall score>,\n" +
                "  \"analysis\": \"<short explanation>\",\n" +
                "  \"ingredients_of_concern\": [\n" +
                "    {\"name\": \"<ingredient>\", \"reason\": \"<reason>\", \"score\": <number>}\n" +
                "  ],\n" +
                "  \"recommended_alternatives\": [\n" +
                "    {\"name\": \"<product>\", \"reason\": \"<why healthier>\", \"score\": <number>},\n" +
                "    {}, {}, {}\n" +
                "  ]\n" +
                "}\n\n" +
                "Ingredients List: " + ingredientsList;

        Map<String, Object> requestBody = Map.of(
                "model", "llama3",
                "stream", false,
                "prompt", prompt
        );

        try {
            // 2. Call Ollama
            String responseString = restTemplate.postForObject(OLLAMA_URL, requestBody, String.class);

            // 3. Parse top-level response
            Map<String, Object> topLevel = objectMapper.readValue(responseString, Map.class);
            String aiText = (String) topLevel.get("response");

            // 4. Extract JSON block
            int start = aiText.indexOf('{');
            int end = aiText.lastIndexOf('}');
            if (start == -1 || end == -1 || end <= start) {
                throw new RuntimeException("No valid JSON found in AI response");
            }
            String jsonBlock = aiText.substring(start, end + 1);

            // 5. Parse JSON block
            Map<String, Object> aiResult = objectMapper.readValue(jsonBlock, Map.class);

            // 6. Save/update FoodItem in DB (same as before)
            FoodItem foodItem = foodItemRepository.findByItemName(productName)
                    .orElse(new FoodItem());
            foodItem.setItemName(productName);
            foodItem.setRawIngredientList(ingredientsList);
            foodItem.setHealthScore(((Number) aiResult.getOrDefault("score", 0)).intValue());
            foodItem.setNutritionBreakdown((String) aiResult.getOrDefault("analysis", "N/A"));

            // Parse ingredients_of_concern (now objects)
            List<Map<String, Object>> concernList = (List<Map<String, Object>>) aiResult.getOrDefault("ingredients_of_concern", List.of());
            List<String> warnings = concernList.stream()
                    .map(c -> String.format("%s (score %s): %s",
                            c.get("name"),
                            c.get("score"),
                            c.get("reason")))
                    .toList();
            foodItem.setGeneratedWarnings(String.join(", ", warnings));

            // Parse recommended_alternatives (array of 4)
            List<Map<String, Object>> alternatives = (List<Map<String, Object>>) aiResult.getOrDefault("recommended_alternatives", List.of());
            if (!alternatives.isEmpty()) {
                String recText = alternatives.stream()
                        .map(a -> String.format("%s by %s (score %s): %s",
                                a.get("name"),
                                a.get("brand"),
                                a.get("score"),
                                a.get("reason")))
                        .reduce((a, b) -> a + " | " + b)
                        .orElse("");
                foodItem.setRecommendations(recText);
            }

            foodItemRepository.save(foodItem);

            // 7. Return clean JSON
            return Map.of(
                    "product_name", productName,
                    "score", foodItem.getHealthScore(),
                    "analysis", foodItem.getNutritionBreakdown(),
                    "ingredients_of_concern", concernList,
                    "recommended_alternatives", alternatives
            );

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                    "product_name", productName,
                    "score", 0,
                    "analysis", "Error parsing LLM response",
                    "ingredients_of_concern", List.of(),
                    "recommended_alternatives", List.of()
            );
        }
    }
}