package com.backend.backend.controller;

import com.backend.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/info")
public class UserInfoController {

    private FoodItemScoreService foodScoreService;
    private TotalScanService totalScanService;
    private FoodItemRepository foodItemRepository;
    private UserRepository userRepository;

    @Autowired
    public UserInfoController(FoodItemScoreService foodScoreService, TotalScanService totalScanService) {
        this.foodScoreService = foodScoreService;
        this.totalScanService = totalScanService;
    }

    // GET http://localhost:8080/info/score/average/{username}
    @GetMapping("/score/average/{username}")
    public Double getUserAverageScore(@PathVariable String username) {
        System.out.println("Getting average score for user!");
        return foodScoreService.getWebUserAverageScore(username);
    }

    // GET http://localhost:8080/info/total/scan/{username}
    @GetMapping("/total/scan/{username}")
    public int getUserTotalScans(@PathVariable String username) {
        System.out.println("Getting total scans for user!");
        return totalScanService.getWebUserTotalScans(username);
    }

    // GET http://localhost:8080/info/total/warning/{username}
    @GetMapping("/total/warning/{username}")
    public long getUserTotalWarnings(@PathVariable String username) {
        System.out.println("Getting total warnings for user!");
        return foodScoreService.getUserTotalWarnings(username);
    }

    // GET http://localhost:8080/info/total/warning/item/{itemName}
    @GetMapping("/total/warning/item/{itemName}")
    public int getTotalWarningsForItem(@PathVariable String itemName) {
        System.out.println("Getting total warnings for a specific item!");
        return foodScoreService.getTotalWarningsForItem(itemName);
    }

    // GET GET http://localhost:8080/info/food/items/{username}
    @GetMapping("/food/items/{username}")
    public List<FoodItem> getFoodItemsByUser(@PathVariable String username) {
        WebUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return foodItemRepository.findByUser(user);
    }
}