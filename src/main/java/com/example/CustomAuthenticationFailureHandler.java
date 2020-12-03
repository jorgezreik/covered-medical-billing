package com.example;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Autowired
    private MessageSource messages;

    @Autowired
    private LocaleResolver localeResolver;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {

        final Locale locale = localeResolver.resolveLocale(request);

        String errorMessage = "Invalid Credentials";

        if (exception.getMessage().equalsIgnoreCase("User is disabled")) {
            errorMessage = "Your account is disabled please check your mail and click on the confirmation link";
        } else if (exception.getMessage().equalsIgnoreCase("User account has expired")) {
            errorMessage = "Your registration token has expired. Please register again.";
        } else if (exception.getMessage().equalsIgnoreCase("blocked")) {
            errorMessage = "This ip is blocked for 24 hours";
        } else if (exception.getMessage().equalsIgnoreCase("unusual location")) {
            errorMessage = "You are trying to login from unusual location, check your email for more details";
        }

        request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, errorMessage);

        System.out.println(exception.getClass().getSimpleName());

        if (exception.getClass().getSimpleName().equals("BadCredentialsException")) {
            getRedirectStrategy().sendRedirect(request, response, "/badcredentials");
        }
        // else if
        // (exception.getClass().getSimpleName().equals("SessionAuthenticationException"))
        // {
        // getRedirectStrategy().sendRedirect(request, response, "/sessionauth");
        // }
    }
}