package com.spring.datajpa.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestMethod;

import com.spring.datajpa.model.ListObj;
import com.spring.datajpa.repository.ListRepository;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ListController {

	// need to be able to create list
	
	@Autowired
	ListRepository listRepository;

	@GetMapping("/lists/{id}")
	public ResponseEntity<ListObj> getList(@PathVariable("id") long listId) {
		Optional<ListObj> listData = listRepository.findById(listId);

		if (!listData.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(listData.get(), HttpStatus.OK);
	}

	// create new list
	@PostMapping("/lists") 
	public ResponseEntity<ListObj> createList(@RequestBody ListObj list) {
		try {
			ListObj _list = listRepository
					.save(new ListObj(list.getTitle(), list.getDescription()));
			return new ResponseEntity<>(_list, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/lists/{id}")
	public ResponseEntity<ListObj> updateItem(@PathVariable("id") long id, @RequestBody ListObj item) {
		Optional<ListObj> listData = listRepository.findById(id);

		if (listData.isPresent()) {
			ListObj _list = listData.get();
			_list.setTitle(item.getTitle());
			_list.setDescription(item.getDescription());
			return new ResponseEntity<>(listRepository.save(_list), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/lists/{id}")
	public ResponseEntity<HttpStatus> deleteList(@PathVariable("id") long id) {
		try {
			listRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
