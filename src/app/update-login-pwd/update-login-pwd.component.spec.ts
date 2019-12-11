import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoginPwdComponent } from './update-login-pwd.component';

describe('UpdateLoginPwdComponent', () => {
  let component: UpdateLoginPwdComponent;
  let fixture: ComponentFixture<UpdateLoginPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLoginPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLoginPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
