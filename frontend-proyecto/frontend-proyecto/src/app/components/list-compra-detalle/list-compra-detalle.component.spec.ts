import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompraDetalleComponent } from './list-compra-detalle.component';

describe('ListCompraDetalleComponent', () => {
  let component: ListCompraDetalleComponent;
  let fixture: ComponentFixture<ListCompraDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompraDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
