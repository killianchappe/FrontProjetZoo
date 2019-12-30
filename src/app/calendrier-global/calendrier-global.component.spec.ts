import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierGlobalComponent } from './calendrier-global.component';

describe('CalendrierGlobalComponent', () => {
  let component: CalendrierGlobalComponent;
  let fixture: ComponentFixture<CalendrierGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
