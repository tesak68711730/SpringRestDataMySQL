import { Component } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';

import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CustomerService } from "../shared/customer/customer.service";
import { Http, Response } from "@angular/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-grid-simple-view',
  templateUrl: './grid-simple-view.component.html',
  styleUrls: ['./grid-simple-view.component.scss']
})
export class GridSimpleViewComponent {

  customers: any = {};
  private getDataUrl = 'http://localhost:8080/customers';
  private daoUrl = 'http://localhost:8080/customer';

  constructor(private customerService: CustomerService, private http: Http, private router: Router) {

    this.http.get(this.getDataUrl)
      .map((res: Response) => res.json()).subscribe( data => {
      this.customers = data;
      console.log('customers');
      console.log(this.customers);
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
  public gridData: GridDataResult;

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
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id),
      'firstName': new FormControl(dataItem.firstName, Validators.required),
      'lastName': new FormControl(dataItem.lastName, Validators.required)
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  saveHandler({sender, rowIndex, formGroup, isNew}): void{
    console.log('save');
    console.log('is new ?  -- ' + isNew);
    const customerDao: any = formGroup.value;
    if (!isNew) {
      console.log('Call edit method --> put     ----   ' + this.daoUrl, 'formGrup save put -->>  ' + formGroup.value);
      this.http.patch(this.daoUrl + '/' + customerDao.id, formGroup.value).subscribe(result => {

      }, error => console.error(error));
    } else {
      console.log('add in grid --->>>  ' + this.daoUrl, 'formGrup save post -->>  ' + formGroup.value);
      this.http.post(this.daoUrl, formGroup.value).subscribe(result => {

      }, error => console.error(error));
    }
    sender.closeRow(rowIndex);
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  public removeHandler({dataItem}) {
    console.log('Call remove method' + this.daoUrl + dataItem.id);
    this.customerService.remove(this.daoUrl + '/' + dataItem.id).subscribe(result => {

    }, error => console.error(error));
    this.gridData;
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
