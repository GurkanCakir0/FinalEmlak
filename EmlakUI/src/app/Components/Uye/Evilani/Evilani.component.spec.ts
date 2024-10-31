/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvilaniComponent } from './Evilani.component';

describe('EvilaniComponent', () => {
  let component: EvilaniComponent;
  let fixture: ComponentFixture<EvilaniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvilaniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvilaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
