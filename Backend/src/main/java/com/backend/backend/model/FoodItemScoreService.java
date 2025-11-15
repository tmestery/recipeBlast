package com.backend.backend.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodItemScoreService {

    @Autowired
    private FoodItemScoreRepository foodItemScoreRepo;

    public double getWebUserAverageScore(String username) {
        return foodItemScoreRepo.getWebUserAverageScore(username);
    }

    public long getUserTotalWarnings(String username) {
        return foodItemScoreRepo.getTotalWarnings(username);
    }
}