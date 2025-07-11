import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPagamentoComponent } from './new-pagamento.component';

describe('NewPagamentoComponent', () => {
  let component: NewPagamentoComponent;
  let fixture: ComponentFixture<NewPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPagamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
