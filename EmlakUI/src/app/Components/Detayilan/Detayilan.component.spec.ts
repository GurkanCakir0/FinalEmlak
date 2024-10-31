/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetayilanComponent } from './Detayilan.component';

describe('DetayilanComponent', () => {
  let component: DetayilanComponent;
  let fixture: ComponentFixture<DetayilanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetayilanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetayilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
