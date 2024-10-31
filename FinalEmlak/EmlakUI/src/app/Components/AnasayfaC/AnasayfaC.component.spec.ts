/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnasayfaCComponent } from './AnasayfaC.component';

describe('AnasayfaCComponent', () => {
  let component: AnasayfaCComponent;
  let fixture: ComponentFixture<AnasayfaCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnasayfaCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnasayfaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
