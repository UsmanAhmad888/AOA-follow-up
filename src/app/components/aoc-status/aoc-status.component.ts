import { Component, Input, OnInit } from '@angular/core';
import { OrdinalPipe } from 'src/app/services/pipes/ordinal.pipe';

@Component({
  selector: 'app-aoc-status',
  templateUrl: './aoc-status.component.html',
  styleUrls: ['./aoc-status.component.scss']
})
export class AocStatusComponent implements OnInit {
  @Input() status: any
  cadenceSuffix: string = ''
  constructor(
  ) { }

  ngOnInit(): void {
  }

  getCadence(number) {
    switch (number) {
      case 1:
        this.status.cadenceIteration = 'st'
        break;
      case 2:
        this.status.cadenceIteration = 'nd'
        break;
      case 3:
        this.status.cadenceIteration = 'rd'
        break;
      case 4:
        this.status.cadenceIteration = 'th'
        break;
      default:
    }
  }
}
