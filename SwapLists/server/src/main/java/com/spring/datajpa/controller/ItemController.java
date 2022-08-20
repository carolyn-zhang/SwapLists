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

import com.spring.datajpa.model.Item;
import com.spring.datajpa.repository.ItemRepository;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ItemController {

	// need to be able to create item, delete item, check item
	
	@Autowired
	ItemRepository itemRepository;
	
	@GetMapping("/items/{id}")
	public ResponseEntity<List<Item>> getAllItems(@PathVariable("id") long listid) {
		try {
			List<Item> items = new ArrayList<Item>();

			itemRepository.findByListid(listid).forEach(items::add);

			if (items.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(items, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/item/{id}")
	public ResponseEntity<Item> getItemById(@PathVariable("id") long item_id) {
		Optional<Item> itemData = itemRepository.findById(item_id);

		if (itemData.isPresent()) {
			return new ResponseEntity<>(itemData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	// POST http://localhost:8080/api/item
	/* Test Case for POST, creating new Item
	   {
		  "listid": 12345,
		  "item_value": "apples and bananas"
		}
	*/
	// create new item
	@PostMapping("/item")
	public ResponseEntity<Item> createItem(@RequestBody Item item) {
		try {
			Item _item = itemRepository
					.save(new Item(item.getListId(), item.getItemValue(), false));
			return new ResponseEntity<>(_item, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// PUT http://localhost:8080/api/item/6
	/* Test Case for PUT, updating an Item by id
	  {
	  	"checked": true
	  }
	  
	*/
	// update item contents and checked status by id
	@PutMapping("/item/{id}")
	public ResponseEntity<Item> updateItem(@PathVariable("id") long id, @RequestBody Item item) {
		Optional<Item> itemData = itemRepository.findById(id);

		if (itemData.isPresent()) {
			Item _item = itemData.get();
			_item.setItemValue(item.getItemValue());
			_item.setChecked(item.isChecked());
			return new ResponseEntity<>(itemRepository.save(_item), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// DELETE http://localhost:8080/api/item/6
	// delete an item by id
	@DeleteMapping("/item/{id}")
	public ResponseEntity<HttpStatus> deleteItem(@PathVariable("id") long id) {
		try {
			itemRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
