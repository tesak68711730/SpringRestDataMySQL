import { Observable } from "rxjs/Observable";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { GridDataResult } from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";

import { EditService } from './service/edit.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

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
    console.log('call we constructor');
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
    this.view = this.editService.map(data => process(data, this.gridState));
    this.editService.read();
    console.log('on init');
  }

  public onStateChange(state: State) {
    console.log('on state change');
    this.gridState = state;
    this.editService.read();
  }

  public addHandler({sender}) {
    console.log('add handler');
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required)
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({sender, rowIndex, dataItem}) {
    console.log('edit handler');
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id),
      'firstName': new FormControl(dataItem.firstName, Validators.required),
      'lastName': new FormControl(dataItem.lastName, Validators.required)
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({sender, rowIndex}) {
    console.log('cancel handler');
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
    console.log('save handler');
    this.editService.save(formGroup.value, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({dataItem}) {
    console.log('remove handler');
    this.editService.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    console.log('close editor');
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
