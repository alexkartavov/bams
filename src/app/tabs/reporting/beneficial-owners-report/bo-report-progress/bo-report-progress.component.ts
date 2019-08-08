import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-bo-report-progress',
  templateUrl: './bo-report-progress.component.html',
  styleUrls: ['./bo-report-progress.component.scss']
})
export class BoReportProgressComponent implements OnInit {

  modalRef: BsModalRef;
  message = '';
  progress = 0;
  isDiscovering = false;
  isProgress = false;
  @ViewChild('template', { read: TemplateRef }) public template: TemplateRef<any>;
  @Output() cancelled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template, { ignoreBackdropClick: true });
  }

  setProgressParams(message, progress, isDiscovering, isProgress) {
    this.message = message;
    this.progress = progress;
    this.isDiscovering = isDiscovering;
    this.isProgress = isProgress;
  }

  updateProgress(progress) {
    this.progress = progress;
  }

  cancel() {
    this.cancelled.emit();
    this.modalRef.hide();
  }

}
