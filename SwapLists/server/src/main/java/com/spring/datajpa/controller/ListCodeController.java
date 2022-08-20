package com.spring.datajpa.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

import com.spring.datajpa.model.ListCode;
import com.spring.datajpa.model.ListObj;
import com.spring.datajpa.model.User;
import com.spring.datajpa.repository.ListCodeRepository;
import com.spring.datajpa.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ListCodeController {
	
	@Autowired
	ListCodeRepository listCodeRepository;
	
	@Autowired
	UserRepository userRepository;

	@GetMapping("/listcode/{id}")
	public ResponseEntity<List<ListCode>> getAllLists(@PathVariable("id") long userid) {
		try {
			List<ListCode> lc = new ArrayList<ListCode>();

			listCodeRepository.findByUserid(userid).forEach(lc::add);

			if (lc.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(lc, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/listcode")
	public ResponseEntity<List<ListCode>> checkListCode(@RequestParam(required = true) long listid) {
		try {
			List<ListCode> lists = new ArrayList<ListCode>();
			listCodeRepository.findByListid(listid).forEach(lists::add);
			if (lists.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(lists, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//Call findbyListID in userlistcodes -> Rows of ListCodes -> Get ID's from those rows.
	//Call findbyUserID on user table on all ID's -> Return set of emails
	//Returns a set of emails based on a listcode. (Called here listid)
	@GetMapping("/email")
	public ResponseEntity<Set<String>> getEmailsFromCode(@RequestParam(required = true) long listid) {
		List<ListCode> listCodeRows = new ArrayList<ListCode>();
		listCodeRepository.findByListid(listid).forEach(listCodeRows::add);
		List<Long> userids = new ArrayList<Long>(); //Will have all userID's
		for(ListCode lc: listCodeRows){
			long userID = lc.getUserId();
			userids.add(userID);
		}
		Set<String> emails = new HashSet<String>(); //Emails to be returned
		for(long id: userids){
			Optional<User> tempOptionalUser = userRepository.findByUserid(id);
			User tempUser = tempOptionalUser.get();
			String email = tempUser.getEmail();
			emails.add(email);
		}
		return new ResponseEntity<>(emails, HttpStatus.OK);
	}

	// create new list code
	@PostMapping("/listcode")
	public ResponseEntity<ListCode> createList(@RequestBody ListCode listCode) {
		try {
			ListCode lc = listCodeRepository
					.save(new ListCode(listCode.getUserId(), listCode.getListId()));
			return new ResponseEntity<>(lc, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

}
