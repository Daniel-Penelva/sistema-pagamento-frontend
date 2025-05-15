import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEstudantesComponent } from './load-estudantes.component';

describe('LoadEstudantesComponent', () => {
  let component: LoadEstudantesComponent;
  let fixture: ComponentFixture<LoadEstudantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadEstudantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
