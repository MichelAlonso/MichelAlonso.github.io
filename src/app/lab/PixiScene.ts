import * as PIXI from 'pixi.js';
import { LiveDraw } from 'app/lab/LiveDraw';
import { DrawNoise } from 'app/lab/DrawNoise';
import { Utils } from 'app/Utils';

export class PixiScene {
  app: PIXI.Application;
  chaosLine: PIXI.Sprite;
  title = 'Michel Alonso';
  loaded = false;
  graphics: PIXI.Graphics;
  liveDraw: LiveDraw;
  background: PIXI.Sprite;
  drawNoise: DrawNoise;

  constructor(width?: number, height?: number) {
    this.app = new PIXI.Application(width, height);
    PIXI.loader.add('chaos_line', 'assets/chaos-line.png').load(this.load.bind(this));
    PIXI.loader.onLoad.add(this.start.bind(this));

    this.createBackground(this.app.renderer.width, this.app.renderer.height);
  }

  load(loader: PIXI.loaders.Loader, resources) {
    this.chaosLine = new PIXI.Sprite(resources.chaos_line.texture);
    this.chaosLine.alpha = 0.5;
    this.chaosLine.x = this.app.renderer.width / 2;
    this.chaosLine.y = this.app.renderer.height / 2;

    this.chaosLine.anchor.x = 0.5;
    this.chaosLine.anchor.y = 0.5;

    this.app.stage.addChild(this.chaosLine);
    this.app.ticker.add(this.update.bind(this));
  }

  start() {
    this.loaded = true;
    // this.liveDraw = new LiveDraw(this.app);
    // this.app.stage.addChild(this.liveDraw);

    this.drawNoise = new DrawNoise();
    this.app.stage.addChild(this.drawNoise);
  }

  update() {
    // this.liveDraw.update();
    this.drawNoise.update();
    this.chaosLine.rotation += 0.000001;
  }

  resizeCanvas(width: number, height: number) {
    if (this.app) {
      this.app.renderer.resize(width, height);
      this.chaosLine.x = this.app.renderer.width / 2;
      this.chaosLine.y = this.app.renderer.height / 2;
      this.createBackground(width, height);
      this.drawNoise.resize(width);
    }
  }

  createBackground(width: number, height: number) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const color1 = Utils.randomColor();
    const color2 = Utils.randomColor();
    gradient.addColorStop(0, '#' + color1);
    gradient.addColorStop(1, '#' + color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const texture = PIXI.Texture.fromCanvas(canvas);

    if (this.background) {
      this.app.stage.removeChild(this.background);
      this.background.destroy(true);
    }

    this.background = new PIXI.Sprite(texture);
    this.background.cacheAsBitmap = true;
    this.app.stage.addChildAt(this.background, 0);
  }
}
