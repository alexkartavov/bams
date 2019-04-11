/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IgxIconModule } from 'igniteui-angular';

import { SortIndicatorComponent } from './sort-indicator.component';

describe('SortIndicatorComponent', () => {
  let component: SortIndicatorComponent;
  let fixture: ComponentFixture<SortIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortIndicatorComponent ],
      imports: [
        IgxIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
