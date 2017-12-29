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
      })
      .subscribe(data => {
        super.next(data);
      });
  }

  public save(data: any, isNew?: boolean) {
    console.log('save func data');
    this.reset();

    if (!isNew) {
      console.log('Call edit method --> row id=' + data.id);
      this.http.put(this.URL + 'update', data).subscribe(() => this.read(), () => this.read());
    } else {
      console.log('add in grid method --> post');
      this.http.post(this.URL + 'create', data).subscribe(() => this.read(), () => this.read());
    }
  }

  public remove(dataItem: any) {
    console.log('remove func row id=' + dataItem.id);
    this.reset();
    return this.http.delete(this.URL + 'delete/' + dataItem.id).subscribe(() => this.read(), () => this.read());
  }

  private reset() {
    console.log('reset func');
    this.data = [];
  }

  private fetch(): Observable<any[]>  {
    console.log('refresh func');
    return this.http
      .get(this.URL)
      .map(res => <any[]>res);
  }
}
