package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {
    private ResponseRepository repository;

    @Autowired
    public ResponseController(ResponseRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Response> get(@PathVariable("id") Long id) {
        Response response = repository.findOne(id);
        if (null == response)
            return new ResponseEntity<Response>(HttpStatus.NOT_FOUND);
        Response decryptedResponse = new Response();
        decryptedResponse.updateParameters(response);
        String response_secret_key = System.getenv("RESPONSE_SECRET_KEY");
        TextEncryptor decryptor = Encryptors.text(response_secret_key, decryptedResponse.getSalt());
        String decryptedText = decryptor.decrypt(decryptedResponse.getText());
        decryptedResponse.setText(decryptedText);
        return new ResponseEntity<Response>(decryptedResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Response> update(@RequestBody Response response) {
        String oldText = response.getText();
        String response_secret_key = System.getenv("RESPONSE_SECRET_KEY");
        String newSalt = KeyGenerators.string().generateKey();
        TextEncryptor encryptor = Encryptors.text(response_secret_key, newSalt);
        String encryptedText = encryptor.encrypt(oldText);
        response.setText(encryptedText);
        response.setSalt(newSalt);
        repository.save(response);
        return get(response.getId());
    }
}
