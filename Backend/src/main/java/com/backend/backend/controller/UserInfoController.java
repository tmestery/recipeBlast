package com.backend.backend.controller;

import com.backend.backend.model.FoodItemScoreService;
import com.backend.backend.model.TotalScanRepository;
import com.backend.backend.model.TotalScanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/info")
public class UserInfoController {

    private FoodItemScoreService foodScoreService;
    private TotalScanService totalScanService;

    @Autowired
    public UserInfoController(FoodItemScoreService foodScoreService, TotalScanService totalScanService) {
        this.foodScoreService = foodScoreService;
        this.totalScanService = totalScanService;
    }

    // GET http://localhost:8080/info/score/average/{username}
    @GetMapping("/score/average/{username}")
    public Double getUserAverageScore(@PathVariable String username) {
        return foodScoreService.getWebUserAverageScore(username);
    }

    // GET http://localhost:8080/info/total/scan/{username}
    @GetMapping("/total/scan/{username}")
    public int getUserTotalScans(@PathVariable String username) {
        return totalScanService.getWebUserTotalScans(username);
    }
}