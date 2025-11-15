package com.backend.backend.controller;

import com.backend.backend.service.AiAnalysisService;
import com.backend.backend.service.AiHealthTipsService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/llm")
public class LocalLLMController {

    private final AiAnalysisService aiService;
    private final AiHealthTipsService aiHealthService;

    public LocalLLMController(AiAnalysisService aiService, AiHealthTipsService aiHealthService) {
        this.aiService = aiService;
        this.aiHealthService = aiHealthService;
    }

    // POST http://localhost:8080/llm/analyze
    @PostMapping("/analyze")
    public Map<String, Object> analyzeProduct(@RequestBody Map<String, String> payload) {
        String productName = payload.get("productName");
        String ingredientsList = payload.get("ingredientsList");
        System.out.println("Ollama request complete!");
        return aiService.analyzeIngredientsWithRecommendation(productName, ingredientsList);
    }

    // GET http://localhost:8080/llm/health/tip
    @GetMapping("/health/tip")
    public String healthTipGeneration() {
        System.out.println("Generating health tip!");
        System.out.println("Tip Generated: " +  aiHealthService.generateHealthTip());
        return aiHealthService.generateHealthTip();
    }
}