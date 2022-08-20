package com.spring.datajpa.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "items")
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long item_id;

	@Column(name = "listid")
	private long listid;

	@Column(name = "item_value")
	private String item_value;

	@Column(name = "checked")
	private boolean checked;

	public Item() {

	}

	public Item(long listid, String item_value, boolean checked) {
		this.listid = listid;
		this.item_value = item_value;
		this.checked = checked;
	}
	
	@JsonProperty("item_id")
	public long getItemId() {
		return item_id;
	}

	@JsonProperty("listid")
	public long getListId() {
		return listid;
	}
	
	@JsonProperty("listid")
	public void setListId(long listid) {
		this.listid = listid;
	}

	@JsonProperty("item_value")
	public String getItemValue() {
		return item_value;
	}
	
	@JsonProperty("item_value")
	public void setItemValue(String item_value) {
		this.item_value = item_value;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean is_checked) {
		this.checked = is_checked;
	}

	@Override
	public String toString() {
		return "Items [ItemId=" + item_id + ", ListId=" + listid + ", ItemValue=" + item_value + ", Checked=" + checked + "]";
	}

}
