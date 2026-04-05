package com.kc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kc.model.Project;
import com.kc.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {
	
	private final ProjectRepository projectRepository;
	

	@GetMapping
	public List<Project> getAllProjects(){
		return projectRepository.findAll();
	}
	
	//post and new project - used by Admin panel
	@PostMapping
	public ResponseEntity<Project> addProject(@RequestBody Project project){
		Project saved = projectRepository.save(project);
		return ResponseEntity.ok(saved);
	}
	
     //Delete project - admin can remove
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProject(@PathVariable Long id){
		projectRepository.deleteById(id);
		return ResponseEntity.ok("project deleted succesfully");
	}
	
}
