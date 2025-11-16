package com.backend.backend.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    Optional<FoodItem> findByItemName(String itemName);

    @Query("SELECT f FROM FoodItem f JOIN FoodItemScore s ON f.itemName = s.itemName WHERE s.user.username = :username")
    List<FoodItem> findAllByUsername(@Param("username") String username);
}