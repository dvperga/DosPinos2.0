import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlmacenComponent } from './new-almacen.component';

describe('NewAlmacenComponent', () => {
  let component: NewAlmacenComponent;
  let fixture: ComponentFixture<NewAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
