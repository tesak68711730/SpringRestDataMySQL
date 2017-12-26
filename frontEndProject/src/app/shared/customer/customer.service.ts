import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CustomerService {

  public URL = 'http://localhost:8080/rest/customers/';

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
    console.log('func -->> getAll');
    return this.http.get(this.URL);
  }

  getById(id: string) {
    console.log('func -->> getById');
    return this.http.get(this.URL + '/id/' + id);
  }

  getByLastName(name: string) {
    console.log('func -->> getByLastName');
    return this.http.get(this.URL  + name);
  }

  save(customer: any): Observable<any> {
    console.log('save - > ' + JSON.stringify(customer));
    let result: Observable<Object>;
    if (customer.id) {
      console.log('Call save method --> post     ----   ' + JSON.stringify(customer));
      result = this.http.patch(this.URL + '/update', customer);
    } else {
      console.log('Call save method --> put   -----     ' + JSON.stringify(customer));
      result = this.http.post(this.URL + 'create', customer);
    }
    return result;
  }

  remove(id: number) {
    console.log('Call remove method --> delete   -----   ' + id);
    return this.http.delete(this.URL + 'delete/' + id);
  }
}
