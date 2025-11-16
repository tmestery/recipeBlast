package com.backend.backend.service;

import com.backend.backend.model.FoodItem;
import com.backend.backend.model.FoodItemRepository;
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
        String prompt = "You are a nutrition analysis model. You are given a product name and its ingredients list. " +
                "Evaluate the product's health quality.\n\n" +
                "Output ONLY the following JSON:\n" +
                "{\n" +
                "  \"product_name\": \"" + productName + "\",\n" +
                "  \"score\": <number>,\n" +
                "  \"analysis\": \"<short explanation>\",\n" +
                "  \"ingredients_of_concern\": [\"ingredient1\", \"ingredient2\"],\n" +
                "  \"recommended_alternative\": {\n" +
                "     \"name\": \"<similar healthier product>\",\n" +
                "     \"brand\": \"<brand name>\",\n" +
                "     \"reason\": \"<why it is healthier>\"\n" +
                "  }\n" +
                "}\n\n" +
                "Ingredients List: " + ingredientsList;

        Map<String, Object> requestBody = Map.of(
                "model", "llama3",
                "stream", false,
                "prompt", prompt
        );

        try {
            // Step 1: call Ollama
            String responseString = restTemplate.postForObject(OLLAMA_URL, requestBody, String.class);

            // Step 2: parse top-level response
            Map<String, Object> topLevel = objectMapper.readValue(responseString, Map.class);
            String aiText = (String) topLevel.get("response");

            // Step 3: extract JSON block from response string
            int start = aiText.indexOf('{');
            int end = aiText.lastIndexOf('}');
            if (start == -1 || end == -1 || end <= start) {
                throw new RuntimeException("No valid JSON found in AI response");
            }
            String jsonBlock = aiText.substring(start, end + 1);

            // Step 4: parse the JSON block
            Map<String, Object> aiResult = objectMapper.readValue(jsonBlock, Map.class);

            // Step 5: save/update FoodItem in DB
            FoodItem foodItem = foodItemRepository.findByItemName(productName)
                    .orElse(new FoodItem());
            foodItem.setItemName(productName);
            foodItem.setRawIngredientList(ingredientsList);
            foodItem.setHealthScore(((Number) aiResult.getOrDefault("score", 0)).intValue());
            foodItem.setNutritionBreakdown((String) aiResult.getOrDefault("analysis", "N/A"));

            List<?> concernList = (List<?>) aiResult.getOrDefault("ingredients_of_concern", List.of());
            List<String> ingredientsOfConcern = concernList.stream()
                    .map(Object::toString)
                    .toList();
            foodItem.setGeneratedWarnings(String.join(", ", ingredientsOfConcern));

            Map<String, Object> alt = (Map<String, Object>) aiResult.get("recommended_alternative");
            if (alt != null) {
                String recText = String.format("Try %s by %s — %s",
                        alt.getOrDefault("name", "another product"),
                        alt.getOrDefault("brand", "unknown brand"),
                        alt.getOrDefault("reason", ""));
                foodItem.setRecommendations(recText);
            }

            foodItemRepository.save(foodItem);

            // Step 6: return cleaned JSON to frontend
            return Map.of(
                    "product_name", productName,
                    "score", foodItem.getHealthScore(),
                    "analysis", foodItem.getNutritionBreakdown(),
                    "ingredients_of_concern", ingredientsOfConcern,
                    "recommended_alternative", alt != null ? alt : Map.of()
            );

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of(
                    "product_name", productName,
                    "score", 0,
                    "analysis", "Error parsing LLM response",
                    "ingredients_of_concern", List.of(),
                    "recommended_alternative", Map.of()
            );
        }
    }

}
