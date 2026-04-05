package com.kc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kc.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long>{

}
