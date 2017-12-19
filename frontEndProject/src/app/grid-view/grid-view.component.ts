import {Observable} from "rxjs/Observable";
import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { GridDataResult } from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";

import { Product } from './model';
import { EditService } from './service/edit.service';


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {
  public view: Observable<GridDataResult>;
  customer: any = {};
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public formGroup: FormGroup;

  private editService: EditService;
  private editedRowIndex: number;

  constructor(@Inject(EditService) editServiceFactory: any) {
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
    this.view = this.editService.map(data => process(data, this.gridState));
    this.customer = this.view._isScalar.valueOf();
    console.log('all data to send to grid');
    console.log(this.customer);

    this.editService.read();
  }

  public onStateChange(state: State) {
    this.gridState = state;

    this.editService.read();
  }

  public addHandler({sender}) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'ProductID': new FormControl(),
      'ProductName': new FormControl('', Validators.required),
      'UnitPrice': new FormControl(0),
      'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
      'Discontinued': new FormControl(false)
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'ProductID': new FormControl(dataItem.ProductID),
      'ProductName': new FormControl(dataItem.ProductName, Validators.required),
      'UnitPrice': new FormControl(dataItem.UnitPrice),
      'UnitsInStock': new FormControl(
        dataItem.UnitsInStock,
        Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
      'Discontinued': new FormControl(dataItem.Discontinued)
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
    const product: Product = formGroup.value;

    this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({dataItem}) {
    this.editService.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
