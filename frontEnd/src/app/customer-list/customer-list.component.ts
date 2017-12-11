import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../shared/customer/customer.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  car: Array<any>;

  constructor(private customerService: CustomerService) {

    this.customerService.getAll().subscribe(data=>{
      this.car = data;
    });
  }

  ngOnInit() {
  }

}
