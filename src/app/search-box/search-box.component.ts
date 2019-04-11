import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  public searchBoxText = '';
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchText: string;

  constructor() { }

  ngOnInit() {
    if (this.searchText) {
      this.searchBoxText = this.searchText;
    }
  }

  clearSearch() {
    this.searchBoxText = '';
    this.search.emit(this.searchBoxText);
  }

  doSearch() {
    if (this.searchBoxText) {
      this.search.emit(this.searchBoxText);
    }
  }
}
