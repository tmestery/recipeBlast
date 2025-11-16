package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String itemName;
    @Column(columnDefinition = "TEXT")
    private String rawIngredientList;

    @Column(columnDefinition = "TEXT")
    private String nutritionBreakdown;

    private int healthScore;
    private double costEstimate;
    private String generatedWarnings;

    @Column(columnDefinition = "TEXT")
    private String recommendations;

    @ManyToOne
    @JoinColumn(name = "web_user")  // this should match your DB column
    private WebUser user;

    public WebUser getUser() { return user; }

    public void setUser(WebUser user) { this.user = user; }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getRawIngredientList() {
        return rawIngredientList;
    }

    public void setRawIngredientList(String rawIngredientList) {
        this.rawIngredientList = rawIngredientList;
    }

    public String getNutritionBreakdown() {
        return nutritionBreakdown;
    }

    public void setNutritionBreakdown(String nutritionBreakdown) {
        this.nutritionBreakdown = nutritionBreakdown;
    }

    public int getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(int healthScore) {
        this.healthScore = healthScore;
    }

    public double getCostEstimate() {
        return costEstimate;
    }

    public void setCostEstimate(double costEstimate) {
        this.costEstimate = costEstimate;
    }

    public String getGeneratedWarnings() {
        return generatedWarnings;
    }

    public void setGeneratedWarnings(String generatedWarnings) {
        this.generatedWarnings = generatedWarnings;
    }

    public String getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }
}