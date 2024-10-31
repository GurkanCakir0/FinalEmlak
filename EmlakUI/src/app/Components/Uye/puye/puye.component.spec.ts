/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PuyeComponent } from './puye.component';

describe('PuyeComponent', () => {
  let component: PuyeComponent;
  let fixture: ComponentFixture<PuyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
