import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../shared/customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {GiphyService} from "../shared/giphy/giphy.service";

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  customers: Array<any>;

  constructor(private customerService: CustomerService,
              private router: Router,) {
    this.customerService.getAll().subscribe(data=>{
      this.customers = data;
    });
  }

  ngOnInit() {}


  edit(id){
    console.log('onClick press edit' + id);
    this.router.navigate(['/customer-edit/' + id]);
  }


  remove(href) {
    console.log('Call delete method -->  ' + href);
    this.customerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  private gotoList() {
    console.log('Call gotoList method');
    this.router.navigate(['/table-view']);
  }
}
