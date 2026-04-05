package com.kc.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
 
@Entity
@Table(name = "contacts")
@Data
public class Contact {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(name = "full_name", nullable = false)
    private String fullName;
 
    @Column(nullable = false)
    private String email;
 
    @Column(name = "mobile_number", length = 15)
    private String mobileNumber;
 
    private String city;
 
    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;
 
    @PrePersist
    public void prePersist() {
        this.submittedAt = LocalDateTime.now();
    }
}
