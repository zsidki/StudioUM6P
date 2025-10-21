package com.example.demo.model;


import jakarta.persistence.*;


@Entity
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;

    // If you need a file related to the group, add a property for it.
    private String devisFile;

    // Add the method getDevisFile()
    public String getDevisFile() {
        return devisFile;
    }

    public void setDevisFile(String devisFile) {
        this.devisFile = devisFile;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

}
