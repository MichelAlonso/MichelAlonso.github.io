import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  titles: string[];
  title: string;

  constructor() {
    this.titles =[
      'Not under construction. Not a building.',
      'Under construction, forever and never.'
    ]

    const index = Math.floor(Math.random() * this.titles.length);
    this.title = this.titles[index];
  }

  ngOnInit() {
  }

}
