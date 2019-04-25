/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { IgxIconModule } from 'igniteui-angular';

import { FilterTicketsComponent } from './filter-tickets.component';

describe('FilterTicketsComponent', () => {
  let component: FilterTicketsComponent;
  let fixture: ComponentFixture<FilterTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTicketsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        IgxIconModule,
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
