import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {EditService} from "./Service/edit.service";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GridModule
  ],
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    }
  ]
})
export class AppModule { }
