package com.javasampleapproach.restdata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.javasampleapproach.restdata.model.Customer;
import org.springframework.web.bind.annotation.CrossOrigin;

//@RepositoryRestResource(/*collectionResourceRel = "customer", path = "customer"*/)
//
//@CrossOrigin(origins = "http://localhost:4200")
//public interface CustomerRepository extends JpaRepository<Customer, Long> {
////	List<Customer> findByLastName(@Param("name") String name);
//}



@RepositoryRestResource(collectionResourceRel = "customer", path = "customer")
@CrossOrigin(origins = "http://localhost:4200")
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByLastName(@Param("name") String name);
}
