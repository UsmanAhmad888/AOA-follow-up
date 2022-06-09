import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-call-details',
  templateUrl: './call-details.component.html',
  styleUrls: ['./call-details.component.scss']
})
export class CallDetailsComponent implements OnInit {
  @Output() callDetailsItems = new EventEmitter<any>();
  callDetails: any = {};
  @Input() vm: any=  {};
  constructor() { }

  ngOnInit(): void {
  }

  addComment() {
    this.callDetailsItems.emit(this.vm);
  }

}
