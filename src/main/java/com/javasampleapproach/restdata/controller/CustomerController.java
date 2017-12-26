package com.javasampleapproach.restdata.controller;

import com.javasampleapproach.restdata.model.Customer;
import com.javasampleapproach.restdata.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/rest/customers")
public class CustomerController{

    @Autowired
    private CustomerRepository repository;

    @GetMapping("/")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Customer> getAll(){
        return repository.findAll();
    }
    // -------------------Retrieve All Customers---------------------------------------------
    @GetMapping("/{name}")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Customer> getCustomer(@PathVariable("name") final String name){
        return repository.findByLastName(name);
    }

    // -------------------Retrieve Single Customers------------------------------------------
    @GetMapping("/id/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> getId(@PathVariable("id") final Long id) {
        Customer customer = repository.findOne(id);
        if (customer == null)
            return new ResponseEntity("User with id " + id
                    + " not found", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    // -------------------Create a Customer-------------------------------------------

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> creareCustomer(@RequestBody Customer customer, UriComponentsBuilder ucBuilder) {
        repository.save(customer);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/rest/customers/id/{id}").buildAndExpand(customer.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    // ------------------- Update a Customer ------------------------------------------------

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> updateUser(@RequestBody Customer customer) {

        Customer currentCustumer = repository.findOne(customer.getId());
        currentCustumer.setId(customer.getId());
        currentCustumer.setFirstName(customer.getFirstName());
        currentCustumer.setLastName(customer.getLastName());

        repository.save(currentCustumer);
        return new ResponseEntity<>(currentCustumer, HttpStatus.OK);
    }

    // ------------------- Delete a Customer-----------------------------------------

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
        repository.delete(id);
        return new ResponseEntity<Customer>(HttpStatus.NO_CONTENT);
    }
}
