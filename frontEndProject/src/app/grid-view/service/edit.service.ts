import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
  constructor(private http: HttpClient) {
    super([]);
  }

  private data: any[] = [];
  public URL = 'http://localhost:8080/rest/customers/';

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
    console.log('save func data' + JSON.stringify(data) + 'isNew ? ' + isNew);
    this.reset();

    // this.fetch(action, data)
    //   .subscribe(() => this.read(), () => this.read());

    console.log('save');
    console.log('is new ?  -- ' + isNew);
    if (!isNew) {
      console.log('Call edit method --> put     ----   ' + this.URL, + JSON.stringify(data));
      this.http.put(this.URL + 'update', data).subscribe(result => {

      }, error => console.error(error));
    } else {
      console.log('add in grid --->>>   psot    ----   ' + this.URL, + JSON.stringify(data));
      this.http.post(this.URL + 'create', data).subscribe(result => {

      }, error => console.error(error));
    }
  }

  public remove(dataItem: any) {
    console.log('remove func' + JSON.stringify(dataItem.id));
    this.reset();
    return this.http.delete(this.URL + 'delete/' + dataItem.id).subscribe(result => {

    }, error => console.error(error));
  }

  private reset() {
    console.log('reset func ');
    this.data = [];
  }

  private fetch(): Observable<any[]>  {
    console.log('data-->> ' + JSON.stringify(this.http
      .get(`http://localhost:8080/rest/customers/`)
      .map(res => <any[]>res)));
    return this.http
      .get(`http://localhost:8080/rest/customers/`)
      .map(res => <any[]>res);
  }
}
