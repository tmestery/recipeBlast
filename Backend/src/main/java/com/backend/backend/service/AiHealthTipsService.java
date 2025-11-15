package com.backend.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class AiHealthTipsService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String OLLAMA_URL = "http://localhost:11434/api/generate";
    public static final List<String> backup_tips_list = List.of(
            "Swap sugary drinks for water or herbal tea to stay hydrated and reduce empty calories.",
            "Choose whole-grain bread instead of white bread for extra fiber and sustained energy.",
            "Add a handful of nuts to your snacks to boost healthy fats and protein.",
            "Eat a colorful variety of fruits and vegetables to maximize vitamins and antioxidants.",
            "Limit processed snacks and opt for fresh or minimally processed alternatives.",
            "Try to include at least one high-fiber food with every meal to support digestion.",
            "Use herbs and spices instead of salt to enhance flavor without increasing sodium.",
            "Replace half your refined grains with whole grains to improve heart health.",
            "Keep healthy snacks visible and convenient to avoid reaching for junk food.",
            "Take a short walk after meals to help digestion and maintain energy levels."
    );

    // Basically it generates a health tip that will display in UI to help
    // and remind users to live a healthy lifestyle
    public String generateHealthTip() {
        // Building the prompt:
        String prompt = "Generate a single, short, practical daily health tip that provides immediate value. " +
                "Focus on nutrition, ingredient awareness, or healthier food choices. Make it actionable, clear, " +
                "and easy to apply in everyday life, while staying friendly and motivational.";

        Map<String, Object> requestBody = Map.of(
                "model", "llama3",
                "stream", false,
                "prompt", prompt
        );

        String responseString = restTemplate.postForObject(OLLAMA_URL, requestBody, String.class);

        try {
            // Parse Ollama JSON that's received
            Map<String, Object> aiResult = objectMapper.readValue(responseString, Map.class);

            return (String) aiResult.get("completion");
        } catch (Exception e) {
            e.printStackTrace();
            // If it fails, resort to returning a pre-made list of tips
            Random randomGen = new Random();
            int randomSpot = randomGen.nextInt(backup_tips_list.size());
            return backup_tips_list.get(randomSpot);
        }
    }
}