package com.kc.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
 
@Entity
@Table(name = "newsletters")
@Data
public class Newsletter {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false, unique = true)
    private String email;
 
    @Column(name = "subscribed_at")
    private LocalDateTime subscribedAt;
 
    @PrePersist
    public void prePersist() {
        this.subscribedAt = LocalDateTime.now();
    }
}
