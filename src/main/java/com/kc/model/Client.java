package com.kc.model;

import jakarta.persistence.*;
import lombok.Data;
 
@Entity
@Table(name = "clients")
@Data
public class Client {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false)
    private String name;
 
    @Column(columnDefinition = "TEXT")
    private String description;
 
    private String designation;
 
    @Column(name = "image_url", length = 500)
    private String imageUrl;
}
