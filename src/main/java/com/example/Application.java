package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

// import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import javax.persistence.Column;

@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "date_submitted")
    private String dateSubmitted;
    @Column(name = "response1")
    private String response1;
    @Column(name = "response2")
    private String response2;
    @Column(name = "response3")
    private String response3;

    public Long getId() {
        return this.id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDateSubmitted() {
        return this.dateSubmitted;
    }

    public void setDateSubmitted(String dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public String getResponse1() {
        return this.response1;
    }

    public void setResponse1(String response1) {
        this.response1 = response1;
    }

    public String getResponse2() {
        return this.response2;
    }

    public void setResponse2(String response2) {
        this.response2 = response2;
    }

    public String getResponse3() {
        return this.response3;
    }

    public void setResponse3(String response3) {
        this.response3 = response3;
    }

    public void updateParameters(Application other) {
        this.userId = other.getUserId();
        this.dateSubmitted = other.getDateSubmitted();
        this.response1 = other.getResponse1();
        this.response2 = other.getResponse2();
        this.response3 = other.getResponse3();
    }
}