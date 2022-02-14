import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  IsOperation = false;
  tipoOperacion!: string;

  constructor() { }

  ngOnInit(): void {
  }

  goTo(url: string) {
    this.tipoOperacion = url;
    this.IsOperation = true;
  }

  goBack(event: any) {
    this.IsOperation = false;
  }

}
