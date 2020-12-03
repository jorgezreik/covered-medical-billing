package com.example;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;

@RestController
@RequestMapping("/api/plaidtokens")
public class PlaidtokenController {
    private PlaidtokenRepository repository;
    private LoginuserRepository loginuserRepo;

    @Autowired
    public PlaidtokenController(PlaidtokenRepository repository, LoginuserRepository loginuserRepo) {
        this.repository = repository;
        this.loginuserRepo = loginuserRepo;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Plaidtoken> get(@PathVariable("id") Long id) {
        Plaidtoken token = repository.findOne(id);
        if (null == token)
            return new ResponseEntity<Plaidtoken>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Plaidtoken>(token, HttpStatus.OK);
    }

    // @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    // public ResponseEntity<Plaidtoken> delete(@PathVariable("id") Long id) {
    // Plaidtoken token = repository.findOne(id);
    // if (token == null)
    // return new ResponseEntity<Plaidtoken>(HttpStatus.NOT_FOUND);
    // repository.delete(token);
    // return new ResponseEntity<Plaidtoken>(token, HttpStatus.OK);
    // }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Plaidtoken> update(@RequestBody Plaidtoken token, Principal principal)
            throws IOException, StripeException {
        repository.save(token);
        String[] tokenArray = plaidToStripe.getTokens(token.getPublicToken(), token.getAccountId());

        // System.out.println(tokenArray[0]);
        // System.out.println(tokenArray[1]);

        Stripe.apiKey = System.getenv("STRIPE_SECRET_TEST");

        Map<String, Object> params = new HashMap<>();
        params.put("source", tokenArray[1]);

        Customer customer = Customer.create(params);
        // System.out.println("CUSTOMER SOURCE ");
        // System.out.println(customer.getSources());

        String customerId = customer.getId();
        // String bankName = tokenArray[0];
        Loginuser currUser = loginuserRepo.findByUserName(principal.getName());
        // Loginuser currUser = loginuserRepo.findOne(userId);
        currUser.setStripeCustomerId(customerId);
        currUser.setBankName(token.getBankName());
        // currUser.setBankName(bankName);
        // currUser.updateParameters(currUser);
        loginuserRepo.save(currUser);

        return get(token.getId());
    }

    @RequestMapping
    public List<Plaidtoken> all() {
        return repository.findAll();
    }
}