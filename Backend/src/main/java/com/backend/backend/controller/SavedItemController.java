package com.backend.backend.controller;

import com.backend.backend.model.SavedItem;
import com.backend.backend.model.SavedItemRepository;
import com.backend.backend.model.UserRepository;
import com.backend.backend.model.WebUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saved")
public class SavedItemController {

    @Autowired
    private SavedItemRepository savedItemRepo;

    @Autowired
    private UserRepository userRepo;

    // POST http://localhost:8080/saved/{username}
    @GetMapping("/{username}")
    public List<SavedItem> getSavedItems(@PathVariable String username) {
        WebUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        System.out.println("Food Item Saved!");
        return savedItemRepo.findAllByUser(user);
    }
}