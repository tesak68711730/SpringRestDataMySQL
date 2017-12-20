import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Customers';

  constructor(private router: Router) {
  }

  tableView(){
    this.router.navigate(['/table-view'])
  }

  listView(){
    this.router.navigate(['/customer-list'])
  }

  gridView(){
    this.router.navigate(['/grid-view'])
  }

  gridSimpleView(){
    this.router.navigate(['/grid-simple-view'])
  }
}

