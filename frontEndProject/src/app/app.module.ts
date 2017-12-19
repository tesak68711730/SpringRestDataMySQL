// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';
//
// import { GridModule } from '@progress/kendo-angular-grid';
//
// import { AppComponent } from './app.component';
//
// @NgModule({
//   bootstrap: [
//     AppComponent
//   ],
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     HttpClientModule,
//     GridModule
//   ]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { EditService } from './Service/edit.service';

@NgModule({
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
