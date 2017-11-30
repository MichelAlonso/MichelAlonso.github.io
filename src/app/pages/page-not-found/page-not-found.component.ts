import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  @ViewChild('audioElement') audioElement: ElementRef;

  constructor() { }

  ngOnInit() {
    this.audioElement.nativeElement.volume = 0.1;
  }

}
