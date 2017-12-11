import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {CustomerService} from "./shared/customer/customer.service";
import {HttpClientModule} from "@angular/common/http";
import { CustomerListComponent } from './customer-list/customer-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
