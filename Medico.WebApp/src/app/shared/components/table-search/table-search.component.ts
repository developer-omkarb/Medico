import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent implements OnInit {
  @Input() placeholderText:string
  searchedTextValue:string

  @Output() searchTexChangedEvent = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }
  EmitSearchEvent(){
    this.searchTexChangedEvent.emit(this.searchedTextValue)
  }

}
