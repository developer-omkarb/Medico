import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  date:any
  spacialities:any

  searchForm :FormGroup
  searchtxtbox = new FormControl('')
  searchdrpdown = new FormControl('')
  appdate = new FormControl(new Date())
  constructor(private auth :AuthService,private fb: FormBuilder) {
    this.searchForm = fb.group({
      searchtxtbox : this.searchtxtbox,
      searchdrpdown : this.searchdrpdown,
      appdate : this.appdate
    })
   }

  ngOnInit(): void {
    this.auth.getSpacialities().subscribe(response=>{
      this.spacialities = response
    })
    this.search()
  }

  onDropDownChange(){this.search()}
  onTextBoxChange(){this.search()}
  AppointmentDataChange(){this.search()}

  @Output() searchClickEvent = new EventEmitter()
  search(){
    console.log(this.searchtxtbox.value,this.searchdrpdown.value,this.appdate.value)
    this.searchClickEvent.emit([this.searchtxtbox.value,this.searchdrpdown.value,this.appdate.value])
  }

}
