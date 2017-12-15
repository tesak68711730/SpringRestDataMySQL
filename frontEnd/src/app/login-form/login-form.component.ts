import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // private apiUrl = 'http://localhost:8080/customer';

  private searchUrl = 'http://localhost:8080/customer/search/findByLastName?name=';
  data: any = {};

  constructor(private router: Router, private http: Http) {
  }

  ngOnInit() {
  }

  loginUser(e){
    const userName = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    console.log('user -> ' + userName);
    console.log('pass -> ' + password);
    console.log(this.searchUrl + password);

    this.http.get(this.searchUrl + password)
      .map((res: Response) => res.json()).subscribe( data => {
      this.data = data;

      console.log(data);
      console.log(data._embedded.customer[0].lastName);
      if (password == data._embedded.customer[0].lastName)
        console.log('succes')
        this.router.navigate(['/customer-list'])
    });
  }



  // private getContacts() {
  //   this.http.get(this.searchUrl + '' + pass)
  //     .map((res: Response) => res.json()).subscribe( data => {
  //     this.data = data;
  //   });
  // }
  //
  // private getData() {
  //   return this.http.get(this.searchUrl + '' + pass)
  //     .map((res: Response) => res.json());
  // }
}
