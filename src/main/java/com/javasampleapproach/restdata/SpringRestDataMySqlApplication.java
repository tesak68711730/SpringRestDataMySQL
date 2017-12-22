package com.javasampleapproach.restdata;

import com.javasampleapproach.restdata.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringRestDataMySqlApplication implements CommandLineRunner {

	CustomerRepository customerRepository;

	public static void main(String[] args) {
		SpringApplication.run(SpringRestDataMySqlApplication.class, args);
	}

	@Override
	public void run(String... args) {
//		customerRepository.save(new Customer("Jack", "Smith"));
//		customerRepository.save(new Customer("Adam", "Johnson"));
//		customerRepository.save(new Customer("Kim", "Smith"));
//		customerRepository.save(new Customer("David", "Williams"));
//		customerRepository.save(new Customer("Iustin", "Stratan"));
//		customerRepository.save(new Customer("test", "test"));
//		customerRepository.save(new Customer("Ioana", "Ciubotari"));
//		customerRepository.save(new Customer("Nicolas", "Johnson"));
	}

//	@Bean
//	ApplicationRunner init(CarRepository repository) {
//		return args -> {
//			Stream.of("Ferrari", "Jaguar", "Porsche", "Lamborghini", "Bugatti",
//					"AMC Gremlin", "Triumph Stag", "Ford Pinto", "Yugo GV").forEach(name -> {
//				Car car = new Car();
//				car.setName(name);
//				repository.save(car);
//			});
//			repository.findAll().forEach(car -> System.out.println(car));
//		};
//	}
}