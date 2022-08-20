package com.spring.datajpa.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "listcodes")
public class ListCode {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "userid")
	private long userid;

	@Column(name = "listid")
	private long listid;

	public ListCode() {

	}

	public ListCode(long userid, long listid) {
		this.userid = userid;
		this.listid = listid;
	}
	
	@JsonProperty("userid")
	public long getUserId() {
		return userid;
	}

	@JsonProperty("listid")
	public long getListId() {
		return listid;
	}
	
	@JsonProperty("userid")
	public void setUserId(long userid) {
		this.userid = userid;
	}

	@JsonProperty("listid")
	public void setListId(long listid) {
		this.listid = listid;
	}

	@Override
	public String toString() {
		return "UserCode [userID=" + userid + ", ListId=" + listid + "]";
	}

}
