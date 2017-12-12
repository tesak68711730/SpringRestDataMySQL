import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CustomerService {

  public API = '//localhost:8080';
  public CAR_API = this.API + '/customers';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/customers');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }


  save(customer: any): Observable<any> {
    let result: Observable<Object>;
    if (customer['href']) {
      result = this.http.put(customer.href, customer);
    } else {
      result = this.http.post(this.CAR_API, customer);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
