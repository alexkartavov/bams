/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IgxCheckboxModule, IgxColumnComponent } from 'igniteui-angular';

import { ColumnHidingComponent } from './column-hiding.component';

describe('ColumnHidingComponent', () => {
  let component: ColumnHidingComponent;
  let fixture: ComponentFixture<ColumnHidingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnHidingComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        IgxCheckboxModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnHidingComponent);
    component = fixture.componentInstance;
    component.columns = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
