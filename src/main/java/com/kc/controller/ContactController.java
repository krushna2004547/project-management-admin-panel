package com.kc.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kc.model.Contact;
import com.kc.repository.ContactRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {
 
    private final ContactRepository contactRepository;
 
    // POST submit contact form - used by landing page
    @PostMapping
    public ResponseEntity<String> submitContact(@RequestBody Contact contact) {
        contactRepository.save(contact);
        return ResponseEntity.ok("Contact form submitted successfully");
    }
 
    // GET all contact responses - used by admin panel
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }
}
