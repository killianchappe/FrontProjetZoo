import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnclosComponent } from './update-enclos.component';

describe('UpdateEnclosComponent', () => {
  let component: UpdateEnclosComponent;
  let fixture: ComponentFixture<UpdateEnclosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEnclosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEnclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
