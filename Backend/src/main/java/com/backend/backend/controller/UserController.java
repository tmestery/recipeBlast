package com.backend.backend.controller;

import com.backend.backend.model.UserRepository;
import com.backend.backend.model.WebUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // POST http://localhost:8080/login
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity login(@RequestBody WebUser user) {
        Optional<WebUser> dbUser = userRepository.findByUsername(user.getUsername());
        if (dbUser.isPresent() && passwordEncoder.matches(user.getPassword(), dbUser.get().getPassword())) {
            String getUser = dbUser.get().getUsername();
            System.out.println("User Login Complete!");
            return new ResponseEntity<>(getUser, HttpStatus.ACCEPTED);
        } else {
            String failBody = "Failed!";
            System.out.println("User Login Failed!");
            return new ResponseEntity<>(failBody, HttpStatus.BAD_REQUEST);
        }
    }
}