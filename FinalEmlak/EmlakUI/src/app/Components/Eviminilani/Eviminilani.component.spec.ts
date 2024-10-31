/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EviminilaniComponent } from './Eviminilani.component';

describe('EviminilaniComponent', () => {
  let component: EviminilaniComponent;
  let fixture: ComponentFixture<EviminilaniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EviminilaniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EviminilaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
