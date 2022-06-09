import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() errMsg:any

  constructor() { }

  ngOnInit(): void {
  }
  reload(){
    window.location.reload();
  }

}
