import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
  constructor(private http: HttpClient) {
    super([]);
  }

  private data: any[] = [];

  public read() {
    console.log('read func');
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch()
      .do(data => {
        this.data = data;
        console.log(JSON.stringify([data]))
      })
      .subscribe(data => {
        super.next(data);
      });
  }

  public save(data: any, isNew?: boolean) {
    console.log('save func data' + data + 'isNew ? ' + isNew);
    const action = isNew ? CREATE_ACTION : UPDATE_ACTION;
    this.reset();

    this.fetch(action, data)
      .subscribe(() => this.read(), () => this.read());
  }

  public remove(data: any) {
    console.log('remove func');
    this.reset();

    this.fetch(REMOVE_ACTION, data)
      .subscribe(() => this.read(), () => this.read());
  }

  public resetItem(dataItem: any) {
    console.log('reset item func');
    if (!dataItem) { return; }

    // find orignal data item
    const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

    // revert changes
    Object.assign(originalDataItem, dataItem);

    super.next(this.data);
  }

  private reset() {
    console.log('reset func ');
    this.data = [];
  }

  private fetch(action: string = '', data?: any): Observable<any[]>  {
    console.log('fetch func param' + action + ' -  data' + data + '  data-->> ' + JSON.stringify(this.http
      .jsonp(`https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(data)}`, 'callback')
      .map(res => <any[]>res)));
    return this.http
      .jsonp(`https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(data)}`, 'callback')
      .map(res => <any[]>res);
  }

  private serializeModels(data?: any): string {
    console.log('serialize func');
    console.log(data ? `&models=${JSON.stringify([data])}` : 'empty');
    return data ? `&models=${JSON.stringify([data])}` : '';
  }
}
