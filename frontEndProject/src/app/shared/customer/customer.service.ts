import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CustomerService {

  public API = '//localhost:8080';
  public CAR_API = this.API + '/customer';

  private isCustomerLoggedIn;

  constructor(private http: HttpClient) {
    this.isCustomerLoggedIn = false;
  }

  setCustomerLoggedIn(){
    this.isCustomerLoggedIn = true;
  }

  getCustomerLoggedIn(){
    return this.isCustomerLoggedIn;
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/customers');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }


  save(customer: any): Observable<any> {
    let result: Observable<Object>;
    if (customer['href']) {
      console.log('Call save method --> put     ----   ' + customer.href, customer);
      result = this.http.patch(customer.href, customer);
    } else {
      console.log('Call save method --> post   -----   ' + this.CAR_API, customer);
      result = this.http.post(this.CAR_API, customer);
    }
    return result;
  }

  remove(href: string) {
    console.log('Call remove method --> delete   -----   ' + href);
    return this.http.delete(href);
  }
}
