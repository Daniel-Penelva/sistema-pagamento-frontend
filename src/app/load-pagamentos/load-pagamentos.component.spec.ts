import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPagamentosComponent } from './load-pagamentos.component';

describe('LoadPagamentosComponent', () => {
  let component: LoadPagamentosComponent;
  let fixture: ComponentFixture<LoadPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadPagamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
