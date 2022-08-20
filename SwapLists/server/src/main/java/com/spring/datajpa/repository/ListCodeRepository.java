package com.spring.datajpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

//import org.springframework.data.jpa.repository.Param;

import com.spring.datajpa.model.ListCode;

public interface ListCodeRepository extends JpaRepository<ListCode, Long> {
	//mapping requires columns without underscores

	List<ListCode> findByUserid(long userid);
	List<ListCode> findByListid(long listid);
}
