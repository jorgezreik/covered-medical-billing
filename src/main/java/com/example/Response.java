package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

// import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import javax.persistence.Column;

@Entity
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "application_id")
    private long applicationId;
    @Column(name = "question")
    private String question;
    @Column(name = "text")
    private String text;
    @Column(name = "salt")
    private String salt;

    public Long getApplicationId() {
        return this.applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSalt() {
        return this.salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Long getId() {
        return this.id;
    }

    public String getQuestion() {
        return this.question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void updateParameters(Response other) {
        this.applicationId = other.getApplicationId();
        this.text = other.getText();
        this.salt = other.getSalt();
        this.question = other.getQuestion();
    }
}