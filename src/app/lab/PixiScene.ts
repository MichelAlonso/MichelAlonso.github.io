import * as PIXI from 'pixi.js';
import { LiveDraw } from 'app/lab/LiveDraw';
import { DrawNoise } from 'app/lab/DrawNoise';

export class PixiScene {
  app: PIXI.Application;
  bunny: PIXI.Sprite;
  title = 'Michel Alonso';
  loaded = false;
  graphics: PIXI.Graphics;
  liveDraw: LiveDraw;
  background: PIXI.Sprite;
  drawNoise: DrawNoise;

  constructor(width?: number, height?: number) {
    this.app = new PIXI.Application(width, height);
    PIXI.loader.add('bunny', 'assets/bunny.png').load(this.load.bind(this));
    PIXI.loader.onLoad.add(this.start.bind(this));

    this.createBackground(this.app.renderer.width, this.app.renderer.height);
  }

  load(loader: PIXI.loaders.Loader, resources) {
    this.bunny = new PIXI.Sprite(resources.bunny.texture);
    this.bunny.alpha = 0.5;
    this.bunny.x = this.app.renderer.width / 2;
    this.bunny.y = this.app.renderer.height / 2;

    this.bunny.anchor.x = 0.5;
    this.bunny.anchor.y = 0.5;

    this.app.stage.addChild(this.bunny);
    this.app.ticker.add(this.update.bind(this));
  }

  start() {
    this.loaded = true;
    this.liveDraw = new LiveDraw(this.app);
    this.drawNoise = new DrawNoise();
    this.app.stage.addChild(this.liveDraw);
    this.app.stage.addChild(this.drawNoise);
  }

  update() {
    this.liveDraw.update();
    this.drawNoise.update();
    this.bunny.rotation += 0.000001;
  }

  resizeCanvas(width: number, height: number) {
    if (this.app) {
      this.app.renderer.resize(width, height);
      this.bunny.x = this.app.renderer.width / 2;
      this.bunny.y = this.app.renderer.height / 2;
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
    const color1 = this.randomColor();
    const color2 = this.randomColor();
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

  randomColor() {
    let color = PIXI.utils.rgb2hex([
      Math.random(),
      Math.random(),
      Math.random()
    ]).toString(16);
    color = this.pad(color, 6, 0);

    return color;
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
