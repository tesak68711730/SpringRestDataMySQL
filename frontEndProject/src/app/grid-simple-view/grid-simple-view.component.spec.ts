import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSimpleViewComponent } from './grid-simple-view.component';

describe('GridSimpleViewComponent', () => {
  let component: GridSimpleViewComponent;
  let fixture: ComponentFixture<GridSimpleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridSimpleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSimpleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
