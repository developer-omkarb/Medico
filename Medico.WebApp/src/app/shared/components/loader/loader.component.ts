import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent{
  counter : Array<number> = [1,1,1]
  constructor(public loader:LoaderService) { }
}
