import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.css']
})
export class SelectTypeComponent implements OnInit {

  @Output()
  indicarTipo: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  goTo(url: string) {
    this.indicarTipo.emit(url);
  }
}
