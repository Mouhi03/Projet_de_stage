package com.smartpark.model;

public class AuthResponse {
    private String token;
    private String message;
    private boolean success;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, String message, boolean success) {
        this.token = token;
        this.message = message;
        this.success = success;
    }
    
    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}