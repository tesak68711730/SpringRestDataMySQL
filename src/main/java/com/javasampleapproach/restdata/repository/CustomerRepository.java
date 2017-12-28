package com.javasampleapproach.restdata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.javasampleapproach.restdata.model.Customer;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByLastName(String name);

    Customer findOne(Long id);
}
