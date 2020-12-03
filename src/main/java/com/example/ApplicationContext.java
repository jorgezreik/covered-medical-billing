package com.example;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.SessionTrackingMode;

import java.util.EnumSet;

public class ApplicationContext implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        servletContextEvent.getServletContext().setSessionTrackingModes(EnumSet.of(SessionTrackingMode.COOKIE));
        servletContextEvent.getServletContext().addListener(new SessionListener());
        // ServletConfig conf = httpServlet.getServletConfig();
        // ServletContext context = httpServlet.getServletContext();
        // context.setSessionTrackingModes(EnumSet.of(SessionTrackingMode.COOKIE));
        // context.addListener(new SessionListener());
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}