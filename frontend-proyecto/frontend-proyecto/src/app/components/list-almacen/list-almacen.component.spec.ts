import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlmacenComponent } from './list-almacen.component';

describe('ListAlmacenComponent', () => {
  let component: ListAlmacenComponent;
  let fixture: ComponentFixture<ListAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
