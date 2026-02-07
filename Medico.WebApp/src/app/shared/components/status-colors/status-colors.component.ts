import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-colors',
  templateUrl: './status-colors.component.html',
  styleUrls: ['./status-colors.component.css']
})
export class StatusColorsComponent implements OnInit {
  @Input() showStatus : boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
