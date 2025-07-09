import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudanteDetailsComponent } from './estudante-details.component';

describe('EstudanteDetailsComponent', () => {
  let component: EstudanteDetailsComponent;
  let fixture: ComponentFixture<EstudanteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudanteDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudanteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
