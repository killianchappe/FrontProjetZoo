import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionZooComponent } from './gestion-zoo.component';

describe('GestionZooComponent', () => {
  let component: GestionZooComponent;
  let fixture: ComponentFixture<GestionZooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionZooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionZooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
