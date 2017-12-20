import { Component } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';

import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CustomerService } from "../shared/customer/customer.service";
import { Http, Response } from "@angular/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-grid-simple-view',
  templateUrl: './grid-simple-view.component.html',
  styleUrls: ['./grid-simple-view.component.scss']
})
export class GridSimpleViewComponent{

  customers: any = {};
  private searchUrl = 'http://localhost:8080/customers';

  constructor(private customerService: CustomerService, private http: Http, private router: Router) {

    this.http.get(this.searchUrl)
      .map((res: Response) => res.json()).subscribe( data => {
      this.customers = data;
      console.log('customers');
      console.log(this.customers);//._embedded.customer

    });
  }

  public state: State = {
    sort: [],
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [
        { field: 'firstName', operator: 'contains', value: 'a' }
      ]
    }
  };
  public formGroup: FormGroup;
  private editedRowIndex: number;

  public gridData: GridDataResult = process(this.customers, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.customers, this.state);
    console.log('gridData');
    console.log(this.gridData);
  }

  public addHandler({sender}) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required)
    });
    console.log('add data -->>  ');
    console.log(this.formGroup);
    sender.addRow(this.formGroup);
  }

  editHandler({sender, rowIndex, dataItem}): void{
    console.log('edit');
    console.log('sender');
    console.log(sender);
    console.log('rowIndex');
    console.log(rowIndex);
    console.log('dataItem');
    console.log(dataItem);
  }

  saveHandler({sender, rowIndex, formGroup, isNew}): void{
    console.log('save');
    console.log('formGroup');
    console.log(this.formGroup);
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  public removeHandler({dataItem}) {
    const deleteVar = 'http://localhost:8080/customer/';
    console.log('Call remove method' + deleteVar + dataItem.id);
    this.customerService.remove(deleteVar + dataItem.id).subscribe(result => {

    }, error => console.error(error));
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
