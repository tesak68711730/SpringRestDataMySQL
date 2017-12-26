import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerService } from "./shared/customer/customer.service";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { GiphyService } from "./shared/giphy/giphy.service";
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpModule } from "@angular/http";
import { AuthGuard } from "./shared/auth/auth.guard";
import { TableViewComponent } from './table-view/table-view.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { GridModule } from "@progress/kendo-angular-grid";
import { EditService } from "./grid-view/service/edit.service";
import { GridSimpleViewComponent } from './grid-simple-view/grid-simple-view.component';

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
    // canActivate: [AuthGuard],
    component: CustomerListComponent
  },
  {
    path: 'customer-add',
    // canActivate: [AuthGuard],
    component: CustomerEditComponent
  },
  {
    path: 'customer-edit/:id',
    // canActivate: [AuthGuard],
    component: CustomerEditComponent
  },
  {
    path: 'table-view',
    // canActivate: [AuthGuard],
    component: TableViewComponent
  },
  {
    path: 'grid-view',
    // canActivate: [AuthGuard],
    component: GridViewComponent,
  },
  {
    path: 'grid-simple-view',
    // canActivate: [AuthGuard],
    component: GridSimpleViewComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerEditComponent,
    LoginFormComponent,
    TableViewComponent,
    GridViewComponent,
    GridSimpleViewComponent
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
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule,
    HttpClientJsonpModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService,
    GiphyService,
    LoginFormComponent,
    AuthGuard,
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
