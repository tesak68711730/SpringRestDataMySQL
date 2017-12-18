import {Component} from "@angular/core";
import {State, process} from "@progress/kendo-data-query";
import {products} from "./products";
import {DataStateChangeEvent, GridDataResult} from "@progress/kendo-angular-grid";


@Component({
  selector: 'app-grid-view',
  template: `
    <kendo-grid
      [data]="gridData"
      [pageSize]="state.take"
      [skip]="state.skip"
      [sort]="state.sort"
      [filter]="state.filter"
      [sortable]="true"
      [pageable]="true"
      filterable="menu"
      (dataStateChange)="dataStateChange($event)"
    >
      <kendo-grid-column field="ProductID" title="ID" width="40" [filterable]="false">
      </kendo-grid-column>
      <kendo-grid-column field="ProductName" title="Product Name">
      </kendo-grid-column>
      <kendo-grid-column field="FirstOrderedOn" title="First Ordered On" width="240" filter="date" format="{0:d}">
      </kendo-grid-column>
      <kendo-grid-column field="UnitPrice" title="Unit Price" width="180" filter="numeric" format="{0:c}">
      </kendo-grid-column>
      <kendo-grid-column field="Discontinued" width="200" filter="boolean">
        <ng-template kendoGridCellTemplate let-dataItem>
          <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
        </ng-template>
      </kendo-grid-column>
    </kendo-grid>
  `
})
export class GridViewComponent {

  public state: State = {
    skip: 0,
    take: 5,
    //
    // // Initial filter descriptor
    // filter: {
    //   logic: 'and',
    //   filters: [{ field: 'ProductName', operator: 'contains', value: 'Chef' }]
    // }
  };

  public gridData: GridDataResult = process(products, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(products, this.state);
  }
}
