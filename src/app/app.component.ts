import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as PIXI from 'pixi.js';
import { LiveDraw } from 'app/lab/LiveDraw';
import { PixiScene } from 'app/lab/PixiScene';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Michel Alonso';
  pixiScene: PixiScene;
  size: number[];
  @ViewChild('appContainer') appContainer: ElementRef;

  ngOnInit(): void {
    this.size = [window.innerWidth, window.innerHeight];
    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    this.pixiScene = new PixiScene(window.innerWidth, window.innerHeight);
    (<HTMLElement> this.appContainer.nativeElement)
      .insertBefore(this.pixiScene.app.view, this.appContainer.nativeElement.firstChild);
  }

  resizeCanvas() {
    this.size = [window.innerWidth, window.innerHeight];
    this.pixiScene.resizeCanvas(window.innerWidth, window.innerHeight);
  }

}
