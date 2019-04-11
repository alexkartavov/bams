import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-more-actions-merchant',
  templateUrl: './more-actions-merchant.component.html',
  styleUrls: ['./more-actions-merchant.component.scss']
})
export class MoreActionsMerchantComponent implements OnInit {

  @Input() id: number;

  constructor() { }

  ngOnInit() {
  }

}
