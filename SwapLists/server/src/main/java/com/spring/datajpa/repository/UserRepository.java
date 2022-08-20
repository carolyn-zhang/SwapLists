package com.spring.datajpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.datajpa.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	//mapping requires columns without underscores
	Optional<User> findByUserid(long userid);
	List<User> findByEmail(String email);
}