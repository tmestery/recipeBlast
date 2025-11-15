package com.backend.backend.controller;

import com.backend.backend.model.FoodItemScoreService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/info")
public class AverageUserFoodItemScoreController {

    private FoodItemScoreService foodScoreService;

    // GET http://localhost:8080/info/score/average/{username}
    @GetMapping("/score/average/{username}")
    public Double getUserAverageScore(@PathVariable String username) {
        return foodScoreService.getWebUserAverageScore(username);
    }

}