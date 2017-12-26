package com.javasampleapproach.restdata.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.javasampleapproach.restdata.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByFirstName(String name);

    Customer findOne(Long id);
}
