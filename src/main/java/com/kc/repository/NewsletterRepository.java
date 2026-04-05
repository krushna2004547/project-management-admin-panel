package com.kc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kc.model.Newsletter;

public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {
     
	Optional<Newsletter> findByEmail(String email);
}
