package com.kc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kc.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

}
