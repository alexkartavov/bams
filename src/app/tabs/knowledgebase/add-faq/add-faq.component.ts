import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { FaqModel, CreateFaqModel } from 'src/app/models/faq-model';
import { FaqDataService } from 'src/app/_services/faq-data.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {

  modalRef: BsModalRef;
  public model = new FaqModel();
  @Output() success: EventEmitter <FaqModel> = new EventEmitter();
  topicsData: any[];

  constructor(private modalService: BsModalService,
    private alertify: AlertifyService,
    private faqDataService: FaqDataService,
    private authService: AuthService,
    private valueService: ValueProcessingService) {
      this.topicsData = valueService.kbTopicsData;
    }

  ngOnInit() {
    // this.merchData = this.merchDataService.getData();
  }

  openModal(template: BsModalService) {
    this.modalRef = this.modalService.show(template);
  }

  update() {
    this.faqDataService.createFaq(this.prepareModel(this.model),
      () => {
        this.alertify.success('New FAQ has been created.');
        this.success.emit(this.model);
      },
      (err) => this.alertify.error('Error: ' + err.message));
  }

  prepareModel(m: FaqModel): FaqModel {
    const m1 = Object.assign({}, m);
    // m1.answer = htmlEncode(m1.answer);
    return m1;
  }

  // typeaheadSelect(event) {
  //   if (event.item) {

  //   }
  // }

}
