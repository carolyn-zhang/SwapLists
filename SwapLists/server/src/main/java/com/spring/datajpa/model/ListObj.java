package com.spring.datajpa.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "lists")
public class ListObj {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long listId;


	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	public ListObj() {

	}

	public ListObj(String title, String description) {
		this.title = title;
		this.description = description;
	}
	
	@JsonProperty("listId")
	public long getListId() {
		return listId;
	}

	@JsonProperty("title")
	public String getTitle() {
		return title;
	}

	@JsonProperty("title")
	public void setTitle(String title) {
		this.title = title;
	}

	@JsonProperty("description")
	public String getDescription() {
		return description;
	}

	@JsonProperty("description")
	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Lists [ListId=" + listId + ", title=" + title + ", description=" + description + "]";
	}

}
