package com.smartpark.service;

import com.smartpark.model.User;
import com.smartpark.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public String authenticate(String email, String password) {
        Optional<User> userOptional = userService.findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (userService.validatePassword(password, user.getPassword())) {
                return jwtUtil.generateToken(email);
            }
        }
        
        return null;
    }
}