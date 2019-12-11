import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmployeComponent } from './gestion-employe.component';

describe('GestionEmployeComponent', () => {
  let component: GestionEmployeComponent;
  let fixture: ComponentFixture<GestionEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
