package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Plaidtoken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "public_token")
    private String publicToken;

    @Column(name = "account_id")
    private String accountId;

    @Column(name = "bank_name")
    private String bankName;

    public String getBankName() {
        return this.bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public Long getId() {
        return id;
    }

    public String getPublicToken() {
        return publicToken;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setPublicToken(String publicToken) {
        this.publicToken = publicToken;
    }

    public void setAccoundId(String accoundId) {
        this.accountId = accoundId;
    }

    public void updateParameters(Plaidtoken other) {
        this.publicToken = other.getPublicToken();
        this.accountId = other.getAccountId();
        this.bankName = other.getBankName();
    }
}