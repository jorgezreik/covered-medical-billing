package com.example;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.Principal;
import java.util.List;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Token;
import com.stripe.param.CustomerCreateParams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class LoginuserController {

    private LoginuserRepository repository;
    private LoanOptionRepository loanRepo;
    private ApplicationRepository appRepo;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public LoginuserController(LoginuserRepository repository, LoanOptionRepository loanRepo,
            ApplicationRepository appRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.repository = repository;
        this.loanRepo = loanRepo;
        this.appRepo = appRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public ResponseEntity<Loginuser> editUser(@RequestBody Loginuser loginuser, Principal principal) {
        Loginuser foundLoginuser = repository.findByUserName(principal.getName());
        if (null == foundLoginuser)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);
        else {
            if (!foundLoginuser.getUserName().equals(principal.getName())) {
                return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
            }
            foundLoginuser.updateParameters(loginuser);
            repository.save(foundLoginuser);
            return get(principal);
        }
    }

    @RequestMapping(value = "/signinstatus", method = RequestMethod.GET)
    public boolean getSignInStatus(Principal principal) {
        if (principal == null) {
            return false;
        } else {
            return true;
        }
    }

    @RequestMapping(value = "/selectedloan", method = RequestMethod.GET)
    public ResponseEntity<LoanOption> getSelectedLoanOption(Principal principal) {
        Loginuser user = repository.findByUserName(principal.getName());
        if (null == user)
            return new ResponseEntity<LoanOption>(HttpStatus.NOT_FOUND);

        String userName = user.getUserName();
        if (!userName.equals(principal.getName())) {
            return new ResponseEntity<LoanOption>(HttpStatus.FORBIDDEN);
        }

        LoanOption selectedLoan = loanRepo.findOne(user.getSelectedLoan());
        return new ResponseEntity<LoanOption>(selectedLoan, HttpStatus.OK);
    }

    @RequestMapping(value = "/loans", method = RequestMethod.GET)
    public ResponseEntity<List<LoanOption>> getAllLoanOptions(Principal principal) {
        Loginuser user = repository.findByUserName(principal.getName());
        if (null == user)
            return new ResponseEntity<List<LoanOption>>(HttpStatus.NOT_FOUND);

        String userName = user.getUserName();
        if (!userName.equals(principal.getName())) {
            return new ResponseEntity<List<LoanOption>>(HttpStatus.FORBIDDEN);
        }

        List<LoanOption> allLoans = loanRepo.findByUserId(user.getId());
        return new ResponseEntity<List<LoanOption>>(allLoans, HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody Loginuser user) {
        if (repository.findByUserName(user.getUserName()) != null) {
            System.out.println("User already exists");
            return new ResponseEntity<>("Account already exists for that email.", HttpStatus.CONFLICT);
        }
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            // user.setPassword(NoOpPasswordEncoder.getInstance().encode(user.getPassword()));
            repository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // make it (e, HttpStatus.BAD_REQUEST)
        }

    }

    @RequestMapping(method = RequestMethod.GET, value = "/application")
    public ResponseEntity<Application> getApplication(Principal principal) {
        Loginuser user = repository.findByUserName(principal.getName());
        if (null == user)
            return new ResponseEntity<Application>(HttpStatus.NOT_FOUND);
        String userName = user.getUserName();
        if (!userName.equals(principal.getName())) {
            return new ResponseEntity<Application>(HttpStatus.FORBIDDEN);
        }
        Application application = appRepo.findByUserId(user.getId());
        return new ResponseEntity<Application>(application, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Loginuser> get(Principal principal) {
        Loginuser user = repository.findByUserName(principal.getName());
        if (null == user)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);

        String userName = user.getUserName();
        if (!userName.equals(principal.getName())) {
            return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<Loginuser>(user, HttpStatus.OK);

    }

    @RequestMapping(value = "/manualverify", method = RequestMethod.POST)
    public ResponseEntity<?> manualPayment(@RequestBody Token requestToken, Principal principal)
            throws StripeException {
        Stripe.apiKey = System.getenv("STRIPE_SECRET_TEST");
        String tokenID = requestToken.getId();
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setDescription("Customer Object for User " + principal.getName()).setSource(tokenID).build();

        Customer customer = Customer.create(params);
        String customerId = customer.getId();
        Loginuser currUser = repository.findByUserName(principal.getName());
        currUser.setStripeCustomerId(customerId);
        repository.save(currUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
