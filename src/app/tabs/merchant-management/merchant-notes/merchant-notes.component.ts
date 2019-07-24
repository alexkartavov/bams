import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MerchantModel } from 'src/app/models/merchant-model';
import { MerchantNoteModel } from 'src/app/models/merchant-note-model';
import { AuthService } from 'src/app/_services/auth.service';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-merchant-notes',
  templateUrl: './merchant-notes.component.html',
  styleUrls: ['./merchant-notes.component.scss']
})
export class MerchantNotesComponent implements OnInit {

  @Input() id: number;
  @Input() header: string;
  @Input() merchant: MerchantModel;
  modalRef: BsModalRef;
  note = '';
  notes: Array<MerchantNoteModel>;
  @ViewChild('template', { read: TemplateRef }) public tmpl: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private merchDataService: MerchantDataService) { }

  ngOnInit() {
  }

  openModal(template) {
    // this.notes = [];
    // let note = new MerchantNoteModel();
    // note.note = 'test';
    // note.time = Date.now();
    // note.user = this.authService.getUserName();

    // this.notes.push(note);

    // note = new MerchantNoteModel();
    // note.note = 'test 2';
    // note.time = Date.now();
    // note.user = this.authService.getUserName();

    // this.notes.unshift(note);

    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
  }

  public show(h: string, merchant: MerchantModel) {
    if (merchant) {
      this.header = h;
      this.merchant = merchant;
      this.merchDataService.getNotes(merchant.applicationReferenceNo).subscribe(notes => {
        this.notes = [];
        if (notes && notes.length) {
          notes.forEach(n => {
            const noteModel = new MerchantNoteModel();
            noteModel.note = n.notes;
            // noteModel.time = Date.now();
            // noteModel.user = this.authService.getUserName();
            this.notes.unshift(noteModel);
          });
        }
        this.openModal(this.tmpl);
      });

      // this.openModal(this.tmpl);
    }
  }

  isEditing(): boolean {
    if (this.header === 'Notes') {
      return false;
    }
    return true;
  }

  saveNote() {
    if (this.note.length > 0) {
      this.merchDataService.postNote(this.merchant.applicationReferenceNo, this.note)
        .subscribe(
          next => {
            const noteModel = new MerchantNoteModel();
            noteModel.note = this.note;
            noteModel.time = Date.now();
            noteModel.user = this.authService.getUserName();
            this.notes.unshift(noteModel);
            this.note = '';
          },
          error => {
            this.alertify.error('Error posting a note');
          }
        );
      // this.modalRef.hide();
    }
  }

  getDateString(ticks): string {
    if (!ticks) {
      return '';
    }
    const d = new Date();
    d.setTime(parseInt(ticks, 10));
    return d.toLocaleDateString();
  }

  topDecorStyle() {
    if (this.isEditing()) {
      return {};
    }
    return {
      'border-bottom': '1px solid lightgray',
      'margin-left': '15px',
      'margin-right': '15px',
      'padding-left': '0px',
      'padding-right': '0px'
    };
  }

}
