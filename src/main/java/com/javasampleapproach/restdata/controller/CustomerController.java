package com.javasampleapproach.restdata.controller;

import com.javasampleapproach.restdata.model.Customer;
import com.javasampleapproach.restdata.repository.CustomerRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class CustomerController {

    private CustomerRepository repository;

    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/customers")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Customer> customers() {
        return repository.findAll().stream()
                .filter(this::isCool)
                .collect(Collectors.toList());
    }

    private boolean isCool(Customer customer) {
        return !customer.getFirstName().equals("Jack") &&
                !customer.getFirstName().equals("Kim");
    }
}
