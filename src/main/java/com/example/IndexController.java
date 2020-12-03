package com.example;

import java.util.Map;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController {
    @RequestMapping(value = "/{path:[^\\.]*}") //
    public String index(Map<String, Object> model) {
        return "index.html";
    }
    // @RequestMapping("/")
    // @ResponseBody
    // public String home() {
    // return "Welcome to home page";
    // }

    // @RequestMapping("/login")
    // public String loginPage(Map<String, Object> model) {
    // Authentication authentication =
    // SecurityContextHolder.getContext().getAuthentication();
    // if (!(authentication instanceof AnonymousAuthenticationToken)) {
    // return "index.html";
    // }
    // return "login.html";
    // }

    // @RequestMapping("/logout-success")
    // public String logoutPage(Map<String, Object> model) {
    // return "logout";
    // }

}