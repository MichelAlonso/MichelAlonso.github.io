export class DrawNoise extends PIXI.Container {
  graphics: PIXI.Graphics;
  tick: number;
  points: number[];
  color = 0xffffff;
  lineWidth = 4;
  noiseScale = 2;
  noiseWidth = 1360;
  tickMax = 20;

  constructor() {
    super();
    this.interactive = true;
    this.graphics = new PIXI.Graphics();
    this.tick = 0;
    this.points = [];
    this.addChild(this.graphics);
    this.on('mousemove', this.mouseChange.bind(this));
  }

  mouseChange(event: PIXI.interaction.InteractionEvent) {
    this.noiseScale = (window.innerHeight - event.data.global.y) * 0.05;
    this.lineWidth = Math.ceil(Math.random() * 10) + 2;
  }

  update() {
    this.tick++;

    if (this.tick > this.tickMax) {
      this.tickMax = Math.random() * 200;
      this.tick = 0;
      return;
    }
    this.graphics.clear();
    this.graphics.lineStyle(this.lineWidth, this.color);
    let i = 0;
    let random = 0;

    for (i = 0; i < this.noiseWidth; i++) {
      random = Math.random() * this.noiseScale;
      this.graphics.moveTo(i, random);
      this.graphics.lineTo(i, 800);
    }
  }

  resize(width: number) {
    if (width > 2000) {
      this.noiseWidth = 1360;
    }
    this.noiseWidth = width;
  }

}
