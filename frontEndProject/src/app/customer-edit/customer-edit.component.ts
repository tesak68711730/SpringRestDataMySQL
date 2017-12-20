import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../shared/customer/customer.service";
import { GiphyService } from "../shared/giphy/giphy.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit, OnDestroy {

  customer: any = {};
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private giphyService: GiphyService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        console.log('Call onInit method');
        this.customerService.get(id).subscribe((customer:any) => {
          if(customer){
            this.customer = customer;
            this.customer.href = customer._links.self.href;
            this.giphyService.get(customer.firstName).subscribe( url => this.customer.giphyUrl = url);
          }else{
            console.log(`Customer with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        })
      }
    })
  }

  ngOnDestroy() {
    console.log('Call onDestroy method');
    this.sub.unsubscribe();
  }

  private gotoList() {
    console.log('Call gotoList method');
    this.router.navigate(['/customer-list']);
  }

  save(form: NgForm) {
    console.log('Call save method');
    this.customerService.save(form).subscribe(result => {
     this.gotoList();
   }, error => console.error(error));
  }

  remove(href) {
    console.log('Call remove method');
    this.customerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}