package com.kc.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kc.model.Newsletter;
import com.kc.repository.NewsletterRepository;

import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NewsletterController {
 
    private final NewsletterRepository newsletterRepository;

    // POST subscribe email - used by landing page
    @PostMapping
    public ResponseEntity<String> subscribe(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        // Check if already subscribed
        if (newsletterRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already subscribed");
        }
        Newsletter newsletter = new Newsletter();
        newsletter.setEmail(email);
        newsletterRepository.save(newsletter);
        return ResponseEntity.ok("Subscribed successfully");
    }
 
    // GET all subscribed emails - used by admin panel
    @GetMapping
    public List<Newsletter> getAllSubscribers() {
        return newsletterRepository.findAll();
    }
}
