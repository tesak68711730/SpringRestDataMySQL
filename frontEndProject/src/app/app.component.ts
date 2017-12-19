// import { Component } from '@angular/core';
// import { sampleProducts } from './products';
// import { State, process } from "@progress/kendo-data-query";
// import {DataStateChangeEvent, GridDataResult} from "@progress/kendo-angular-grid";
//
//
// @Component({
//   selector: 'app-root',
//   template: `
// <kendo-grid
//         [data]="gridData"
//         [pageSize]="state.take"
//         [skip]="state.skip"
//         [sort]="state.sort"
//         [filter]="state.filter"
//         [sortable]="true"
//         [pageable]="true"
//         [filterable]="true"
//         (dataStateChange)="dataStateChange($event)"
//     >
//     <kendo-grid-column field="ProductID" title="ID" width="40" [filterable]="false">
//     </kendo-grid-column>
//     <kendo-grid-column field="ProductName" title="Product Name">
//     </kendo-grid-column>
//     <kendo-grid-column field="FirstOrderedOn" title="First Ordered On" width="240" filter="date" format="{0:d}">
//     </kendo-grid-column>
//     <kendo-grid-column field="UnitPrice" title="Unit Price" width="180" filter="numeric" format="{0:c}">
//     </kendo-grid-column>
//     <kendo-grid-column field="Discontinued" width="120" filter="boolean">
//         <ng-template kendoGridCellTemplate let-dataItem>
//             <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
//         </ng-template>
//     </kendo-grid-column>
//     </kendo-grid>
// `
// })
// export class AppComponent {
//
//   public state: State = {
//     skip: 0,
//     take: 5,
//
//     // Initial filter descriptor
//     filter: {
//       logic: 'and',
//       filters: [{ field: 'ProductName', operator: 'contains', value: 'Chef' }]
//     }
//   };
//
//   public gridData: GridDataResult = process(sampleProducts, this.state);
//
//   public dataStateChange(state: DataStateChangeEvent): void {
//     this.state = state;
//     this.gridData = process(sampleProducts, this.state);
//   }
// }


import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './model/Product';
import { EditService } from './Service/edit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public view: Observable<GridDataResult>;
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

// https://www.telerik.com/kendo-angular-ui/components/grid/data-operations/filtering/#toc-customizing-filters
/*  fetch func call -->  https://demos.telerik.com/kendo-ui/service/Products/? callback
core.js:3660 Angular is running in the development mode. Call enableProdMode() to enable the production mode.
edit.service.ts:65 fetch func call -->  https://demos.telerik.com/kendo-ui/service/Products/create?&models=[{"ProductID":null,"ProductName":"asd","UnitPrice":1,"UnitsInStock":23,"Discontinued":true}] callback
edit.service.ts:65 fetch func call -->  https://demos.telerik.com/kendo-ui/service/Products/? callback
edit.service.ts:65 fetch func call -->  https://demos.telerik.com/kendo-ui/service/Products/update?&models=[{"ProductID":79,"ProductName":"test","UnitPrice":3,"UnitsInStock":123,"Discontinued":false}] callback
edit.service.ts:65 fetch func call -->  https://demos.telerik.com/kendo-ui/service/Products/? callback
edit.service.ts:65 fetch func call -->  https://demos.telerik.com/kendo-ui/service/Products/destroy?&models=[{"ProductID":79,"ProductName":"test","UnitPrice":3,"UnitsInStock":123,"Discontinued":false}] callback
edit.service.ts:65 fetch func call -->  https://demos.telerik.com/kendo-ui/service/Products/? callback  */
