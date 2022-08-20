package com.spring.datajpa.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long userid;

	@Column(name = "email")
	private String email; 

	@Column(name = "password")
	private String password;
	
	@Column(name = "name")
	private String name; 


	public User() {

	}

	public User(String email, String password, String name) {
		this.email = email;
		this.password = password;
		this.name = name;
	}
	
	@JsonProperty("userid")
	public long getUserId() {
		return this.userid;
	}
	
	@JsonProperty("email")
	public String getEmail() {
		return this.email;
	}

	@JsonProperty("email")
	public void setEmail(String newEmail) {
		this.email = newEmail;
	}

	@JsonProperty("password")
	public String getPassword() {
		return password;
	}
	
	@JsonProperty("password")
	public void setPassWord(String newPass) {
		this.password = newPass;
	}
	
	@JsonProperty("name")
	public String getName() {
		return name;
	}
	
	@JsonProperty("name")
	public void setName(String newName) {
		this.name = newName;
	}
	
	@Override
	public String toString() {
		return this.email;
	}

}
