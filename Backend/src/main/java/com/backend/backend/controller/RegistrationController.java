package com.backend.backend.controller;

import com.backend.backend.model.UserRepository;
import com.backend.backend.model.WebUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // POST http://localhost:8080/req/signup
    @PostMapping(value = "/req/signup", consumes = "application/json")
    public WebUser createUser(@RequestBody WebUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("User Signup Complete!");
        return userRepository.save(user);
    }
}