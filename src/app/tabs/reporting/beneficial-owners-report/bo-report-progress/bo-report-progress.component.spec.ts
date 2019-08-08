/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoReportProgressComponent } from './bo-report-progress.component';
import { ProgressbarModule, ModalModule } from 'ngx-bootstrap';

describe('BoReportProgressComponent', () => {
  let component: BoReportProgressComponent;
  let fixture: ComponentFixture<BoReportProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoReportProgressComponent ],
      imports: [
        ModalModule.forRoot(),
        ProgressbarModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoReportProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
