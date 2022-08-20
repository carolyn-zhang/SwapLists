package com.spring.datajpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.datajpa.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
	//mapping requires columns without underscores
	List<Item> findByListid(long listid);
}
