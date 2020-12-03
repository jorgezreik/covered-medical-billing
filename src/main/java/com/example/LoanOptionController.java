package com.example;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.ChargeCreateParams;
import com.stripe.param.PaymentIntentCreateParams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loans")
public class LoanOptionController {
    private LoanOptionRepository repository;
    private LoginuserRepository loginRepo;

    @Autowired
    public LoanOptionController(LoanOptionRepository repository, LoginuserRepository loginRepo) {
        this.repository = repository;
        this.loginRepo = loginRepo;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<LoanOption> get(@PathVariable("id") Long id) {
        LoanOption loan = repository.findOne(id);
        if (null == loan)
            return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    }

    // @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    // public ResponseEntity<LoanOption> delete(@PathVariable("id") Long id) {
    // LoanOption loan = repository.findOne(id);
    // if (loan == null)
    // return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);
    // repository.delete(loan);
    // return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    // }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<LoanOption> update(@RequestBody LoanOption loan) {
        repository.save(loan);
        return get(loan.getId());
    }

    // TODO: update the next payment date
    @RequestMapping(value = "/{id}/paynowach", method = RequestMethod.POST)
    public ResponseEntity<LoanOption> payLoanACH(@PathVariable("id") Long loanId, Principal principal)
            throws StripeException {
        Loginuser user = loginRepo.findByUserName(principal.getName());
        if (user.isAutopay()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        LoanOption loan = repository.findOne(loanId);
        Stripe.apiKey = System.getenv("STRIPE_SECRET_TEST"); // doublecheck that *100 is correct and check that it is
                                                             // actually casting properly
        ChargeCreateParams params = ChargeCreateParams.builder().setAmount((long) (loan.getNextPaymentAmount() * 100))
                .setCurrency("usd").setCustomer(user.getStripeCustomerId())
                .setDescription("Charge for: " + user.getFullName() + "for payment date: " + loan.getNextPaymentDate())
                .setReceiptEmail(user.getUserName()).build();
        try {
            Charge charge = Charge.create(params);
            String chargeId = charge.getId();
            // Update the array of charge ids
            String[] newPastChargeObj = Arrays.copyOf(loan.getPastChargeObj(), loan.getPastChargeObj().length + 1);
            newPastChargeObj[newPastChargeObj.length - 1] = chargeId;
            loan.setPastChargeObj(newPastChargeObj);

            // Update the amount paid
            Double newAmountPaid = loan.getAmountPaid() + loan.getNextPaymentAmount();
            loan.setAmountPaid(newAmountPaid);

            // Update the array of past payment dates
            String[] newPastDatesPaid = Arrays.copyOf(loan.getPastDatesPaid(), loan.getPastDatesPaid().length + 1);
            newPastDatesPaid[newPastDatesPaid.length - 1] = loan.getNextPaymentDate();
            loan.setPastDatesPaid(newPastDatesPaid);

            // update nextpayment date here

            repository.save(loan);
        } catch (Exception e) {
            System.out.println("Charge failed");
            throw new RuntimeException(e);
        }

        return new ResponseEntity<LoanOption>(loan, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/paynowcredit", method = RequestMethod.POST)
    public ResponseEntity<String> payLoanCredit(@PathVariable("id") Long loanId, Principal principal)
            throws StripeException {
        Loginuser user = loginRepo.findByUserName(principal.getName());
        if (user.isAutopay()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        LoanOption loan = repository.findOne(loanId);

        Stripe.apiKey = System.getenv("STRIPE_SECRET_TEST");

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder().setCurrency("usd")
                .setAmount((long) (loan.getNextPaymentAmount() * 100))
                // Verify your integration in this guide by including this parameter
                .putMetadata("integration_check", "accept_a_payment").build();

        PaymentIntent intent = PaymentIntent.create(params);
        String clientSecret = intent.getClientSecret();

        return new ResponseEntity<String>(clientSecret, HttpStatus.OK);
    }

    @RequestMapping
    public List<LoanOption> all() {
        return repository.findAll();
    }
}
