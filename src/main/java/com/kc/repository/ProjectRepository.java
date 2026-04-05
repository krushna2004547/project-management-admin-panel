package com.kc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kc.model.Project;
public interface ProjectRepository extends JpaRepository<Project, Long> {

}
