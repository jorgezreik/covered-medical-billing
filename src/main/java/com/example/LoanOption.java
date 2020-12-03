package com.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

// import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import javax.persistence.Column;

@Entity
public class LoanOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "amount_total")
    private double amountTotal;
    @Column(name = "amount_paid")
    private double amountPaid;
    @Column(name = "apr")
    private double apr;
    @Column(name = "months_total")
    private int monthsTotal;
    @Column(name = "next_payment_amount")
    private double nextPaymentAmount;
    @Column(name = "next_payment_date")
    private String nextPaymentDate;
    @Column(name = "medical_center")
    private String medicalCenter;
    @Column(name = "processed_date")
    private String processedDate;
    @Type(type = "string-array")
    @Column(name = "past_dates_paid", columnDefinition = "text[]") // @JsonFormat(shape=JsonFormat.Shape.ARRAY)
    private String[] pastDatesPaid;
    @Type(type = "string-array")
    @Column(name = "past_charge_obj", columnDefinition = "text[]")
    private String[] pastChargeObj;

    public String[] getPastChargeObj() {
        return this.pastChargeObj;
    }

    public void setPastChargeObj(String[] pastChargeObj) {
        this.pastChargeObj = pastChargeObj;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getAmountTotal() {
        return this.amountTotal;
    }

    public void setAmountTotal(Double amountTotal) {
        this.amountTotal = amountTotal;
    }

    public Double getAmountPaid() {
        return this.amountPaid;
    }

    public void setAmountPaid(Double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Double getApr() {
        return this.apr;
    }

    public void setApr(Double apr) {
        this.apr = apr;
    }

    public Integer getMonthsTotal() {
        return this.monthsTotal;
    }

    public void setMonthsTotal(Integer months) {
        this.monthsTotal = months;
    }

    public String getNextPaymentDate() {
        return this.nextPaymentDate;
    }

    public void setNextPaymentDate(String nextPaymentDate) {
        this.nextPaymentDate = nextPaymentDate;
    }

    public String getMedicalCenter() {
        return this.medicalCenter;
    }

    public void setMedicalCenter(String medicalCenter) {
        this.medicalCenter = medicalCenter;
    }

    public String getProcessedDate() {
        return this.processedDate;
    }

    public void setProcessedDate(String processedDate) {
        this.processedDate = processedDate;
    }

    public String[] getPastDatesPaid() {
        return this.pastDatesPaid;
    }

    public void setPastDatesPaid(String[] pastDatesPaid) {
        this.pastDatesPaid = pastDatesPaid;
    }

    public Long getId() {
        return id;
    }

    public Double getNextPaymentAmount() {
        return this.nextPaymentAmount;
    }

    public void setNextPaymentAmount(Double nextPaymentAmount) {
        this.nextPaymentAmount = nextPaymentAmount;
    }

    public void updateParameters(LoanOption other) {
        this.amountTotal = other.getAmountTotal();
        this.apr = other.getApr();
        this.monthsTotal = other.getMonthsTotal();
        this.nextPaymentDate = other.getNextPaymentDate();
        this.amountPaid = other.getAmountPaid();
        this.pastDatesPaid = other.getPastDatesPaid();
        this.medicalCenter = other.getMedicalCenter();
        this.processedDate = other.getProcessedDate();
        this.userId = other.getUserId();
        this.nextPaymentAmount = other.getNextPaymentAmount();
        this.pastChargeObj = other.getPastChargeObj();
    }
}