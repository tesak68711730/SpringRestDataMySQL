import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { CustomerService } from "../shared/customer/customer.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  data: any;
  constructor(private router: Router, private http: Http, private customerService: CustomerService) {
  }

  ngOnInit() {
  }

  loginUser(e){
    const userName = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    console.log('user -> ' + userName);
    console.log('pass -> ' + password);
    console.log(this.customerService.URL+ password);

    this.customerService.getByLastName(password).subscribe( data => {
      this.data = data;
      if (password == this.data.lastName) {
        console.log('login success' + JSON.stringify(data));
        this.customerService.setCustomerLoggedIn();
        this.router.navigate(['/customer-list'])
      }
      else {
        console.log('login fail' +JSON.stringify(data));
        this.router.navigate(['/login'])
      }
    }, error => alert(error.error));
  }
}
