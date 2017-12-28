import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from "../customer/customer.service";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private customerService: CustomerService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.customerService.getCustomerLoggedIn();
  }
}
