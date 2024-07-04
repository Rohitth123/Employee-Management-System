package com.example.employeedashboard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if ("admin".equals(loginRequest.getUsername()) && "admin123".equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(new LoginResponse("admin"));
        } else if ("employee".equals(loginRequest.getUsername()) && "employee123".equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(new LoginResponse("employee"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}

class LoginRequest {
    private String username;
    private String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

    // Getters and setters
}

class LoginResponse {
    private String role;

    public LoginResponse(String role) {
        this.role = role;
    }

    // Getter
    public String getRole() {
        return role;
    }
}
