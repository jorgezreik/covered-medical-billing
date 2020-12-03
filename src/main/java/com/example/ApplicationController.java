package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private ApplicationRepository repository;

    @Autowired
    public ApplicationController(ApplicationRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Application> get(@PathVariable("id") Long id) {
        Application application = repository.findOne(id);
        if (null == application)
            return new ResponseEntity<Application>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Application>(application, HttpStatus.OK);
    }

    // @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    // public ResponseEntity<Application> delete(@PathVariable("id") Long id) {
    // Application application = repository.findOne(id);
    // if (application == null)
    // return new ResponseEntity<Application>(HttpStatus.NOT_FOUND);
    // repository.delete(application);
    // return new ResponseEntity<Application>(application, HttpStatus.OK);
    // }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Application> update(@RequestBody Application application) {
        repository.save(application);
        return get(application.getId());
    }

    @RequestMapping
    public List<Application> all() {
        return repository.findAll();
    }
}
