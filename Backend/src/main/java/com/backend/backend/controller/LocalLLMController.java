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

    // Example Request for analyzing:
    //    {
    //        "productName": "Frosted Strawberry Pop-Tarts",
    //        "ingredientsList": "Nutrition Facts\\nServing Size 2 pastries (88g)\\nCalories 200\\nTotal Fat 5g\\nSaturated Fat 2g\\nTrans Fat 0g\\nCholesterol 0mg\\nSodium 180mg\\nTotal Carbohydrate 36g\\nDietary Fiber 1g\\nTotal Sugars 16g\\nIncl. Added Sugars 9g\\nProtein 2g\\nVitamin D 0mcg\\nCalcium 0mg\\nIron 2mg\\nPotassium 55mg\\n* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice."
    //    }

    // POST http://localhost:8080/llm/analyze
    @PostMapping("/analyze")
    public Map<String, Object> analyzeProduct(@RequestBody Map<String, String> payload) {
        String productName = payload.get("productName");
        String ingredientsList = payload.get("ingredientsList");
        System.out.println("Ollama request initiated!");
        Map<String, Object> ai = aiService.analyzeIngredientsWithRecommendation(productName, ingredientsList);
//      return aiService.analyzeIngredientsWithRecommendation(productName, ingredientsList);
        return ai;
    }

    // GET http://localhost:8080/llm/health/tip
    @GetMapping("/health/tip")
    public String healthTipGeneration() {
        System.out.println("Generating health tip!");
        System.out.println("Tip Generated: " +  aiHealthService.generateHealthTip());
        return aiHealthService.generateHealthTip();
    }
}