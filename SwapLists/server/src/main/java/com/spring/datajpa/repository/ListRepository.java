package com.spring.datajpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.datajpa.model.ListObj;

public interface ListRepository extends JpaRepository<ListObj, Long> {

}
