import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() header: string;
  @Input() message: string;
  @Input() okBtnText: string;
  @Input() cancelBtnText: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: BsModalService) {
    this.modalRef = this.modalService.show(template);
  }

  ok() {
    this.modalRef.hide();
    this.confirm.emit();
  }

  cancel() {
    this.modalRef.hide();
  }
}
