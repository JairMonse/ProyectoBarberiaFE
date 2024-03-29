import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCarritoComponent } from './listado-carrito.component';

describe('ListadoCarritoComponent', () => {
  let component: ListadoCarritoComponent;
  let fixture: ComponentFixture<ListadoCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
