package com.kc.controller;


import org.springframework.web.bind.annotation.*;

import com.kc.model.Client;
import com.kc.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClientController {
	
	private final ClientRepository clientRepository;

	@GetMapping
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
 
    // POST add new client - used by admin panel
    @PostMapping
    public ResponseEntity<Client> addClient(@RequestBody Client client) {
        Client saved = clientRepository.save(client);
        return ResponseEntity.ok(saved);
    }
 
    // DELETE client
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
        return ResponseEntity.ok("Client deleted successfully");
    }
   
}
