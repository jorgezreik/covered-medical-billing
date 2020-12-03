package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class Loginuser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "role")
    private String role;
    @Column(name = "password")
    private String password;
    @Column(name = "loan_option1")
    private String loanOption1;
    @Column(name = "loan_option2")
    private String loanOption2;
    @Column(name = "loan_option3")
    private String loanOption3;
    @Column(name = "selected_loan")
    private long selectedLoan;
    @Column(name = "autopay")
    private boolean autopay;
    @Column(name = "stripe_customer_id")
    private String stripeCustomerId;
    @Column(name = "phone")
    private String phone;
    @Column(name = "bank_account_id")
    private String bankAccountId;
    @Column(name = "bank_name")
    private String bankName;

    public String getBankName() {
        return this.bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAccountId() {
        return this.bankAccountId;
    }

    public void setBankAccountId(String bankAccountId) {
        this.bankAccountId = bankAccountId;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getSelectedLoan() {
        return this.selectedLoan;
    }

    public void setSelectedLoan(long selectedLoan) {
        this.selectedLoan = selectedLoan;
    }

    public boolean isAutopay() {
        return this.autopay;
    }

    public void setAutopay(boolean autopay) {
        this.autopay = autopay;
    }

    public String getStripeCustomerId() {
        return this.stripeCustomerId;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUserName() {
        return userName;
    }

    public String getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }

    public String getLoanOption1() {
        return this.loanOption1;
    }

    public String getLoanOption2() {
        return this.loanOption2;
    }

    public String getLoanOption3() {
        return this.loanOption3;
    }

    public void setName(String fullName) {
        this.fullName = fullName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLoanOption1(String loanOption1) {
        this.loanOption1 = loanOption1;
    }

    public void setLoanOption2(String loanOption2) {
        this.loanOption2 = loanOption2;
    }

    public void setLoanOption3(String loanOption3) {
        this.loanOption3 = loanOption3;
    }

    public void updateParameters(Loginuser other) {
        this.fullName = other.getFullName();
        this.userName = other.getUserName();
        this.role = other.getRole();
        this.password = other.getPassword();
        this.loanOption1 = other.getLoanOption1();
        this.loanOption2 = other.getLoanOption2();
        this.loanOption3 = other.getLoanOption3();
        this.stripeCustomerId = other.getStripeCustomerId();
        this.selectedLoan = other.getSelectedLoan();
        this.autopay = other.isAutopay();
        this.phone = other.getPhone();
        this.bankAccountId = other.getBankAccountId();
        this.bankName = other.getBankName();
    }
}