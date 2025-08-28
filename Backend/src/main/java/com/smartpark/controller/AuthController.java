package com.smartpark.controller;

import com.smartpark.model.AuthResponse;
import com.smartpark.model.LoginRequest;
import com.smartpark.model.User;
import com.smartpark.service.AuthService;
import com.smartpark.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        
        if (token != null) {
            return ResponseEntity.ok(new AuthResponse(token, "Login successful", true));
        } else {
            return ResponseEntity.status(401)
                    .body(new AuthResponse(null, "Invalid credentials", false));
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody LoginRequest signupRequest) {
        if (userService.findByEmail(signupRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, "Email already exists", false));
        }
        
        User newUser = userService.createUser(signupRequest.getEmail(), signupRequest.getPassword());
        
        // Validate that the user was created successfully
        if (newUser == null || newUser.getId() == null) {
            return ResponseEntity.status(500)
                    .body(new AuthResponse(null, "Failed to create user", false));
        }
        
        String token = authService.authenticate(signupRequest.getEmail(), signupRequest.getPassword());
        
        return ResponseEntity.ok(new AuthResponse(token, "Signup successful", true));
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        // In a real application, you would generate a reset token and send an email
        if (userService.findByEmail(email).isPresent()) {
            return ResponseEntity.ok("If this email exists in our system, you will receive a password reset link");
        }
        
        // Still return OK to prevent email enumeration attacks
        return ResponseEntity.ok("If this email exists in our system, you will receive a password reset link");
    }
}