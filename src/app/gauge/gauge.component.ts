import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {
  @Input() value: number;
  @Input() rangeLow: number;
  @Input() rangeHigh: number;
  constructor() { }

  ngOnInit() {
  }

}
