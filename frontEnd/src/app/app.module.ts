import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerService } from "./shared/customer/customer.service";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { GiphyService } from "./shared/giphy/giphy.service";
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpModule } from "@angular/http";
import { AuthGuard } from "./shared/auth/auth.guard";

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'customer-list',
    canActivate: [AuthGuard],
    component: CustomerListComponent
  },
  {
    path: 'customer-add',
    canActivate: [AuthGuard],
    component: CustomerEditComponent
  },
  {
    path: 'customer-edit/:id',
    canActivate: [AuthGuard],
    component: CustomerEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerEditComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [CustomerService, GiphyService, LoginFormComponent, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
