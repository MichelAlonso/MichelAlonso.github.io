import { Line } from 'app/lab/Line';

export class LiveDraw extends PIXI.Container {
  speed: number;
  countDirection: number;
  line: Line;
  tick: number;
  app: PIXI.Application;
  point: PIXI.Point;
  direction: number;

  constructor(app: PIXI.Application) {
    super();
    this.app = app;
    this.tick = 0;
    this.line = new Line(1, 0xeeeeee);
    this.addChild(this.line);

    this.line.x = this.app.screen.width / 2;
    this.line.y = this.app.screen.height / 2;
    this.line.width = this.app.screen.width;
    this.line.height = this.app.screen.height;
    this.point = new PIXI.Point(0, 1);
    this.direction = 1;
    this.countDirection = 10;
    this.speed = 0.2;
  }

  update() {
    this.tick++;
    this.speed += 0.001;
    switch (this.direction) {
      case 0:
        this.point.x += this.speed;
        break;

      case 1:
        this.point.y += this.speed;
        break;

      case 2:
        this.point.x -= this.speed;
        break;

      case 3:
        this.point.y -= this.speed;
        break;

      default:
        break;
    }

    // if (this.tick > this.countDirection) {
    //   const random = Math.ceil(Math.random() * 2);
    //   this.direction += random === 2 ? 1 : 3;
    //   this.direction = this.direction % 4;
    //   this.countDirection = Math.floor(Math.random() * 30) + 1;
    //   if (this.speed > 1) {
    //     this.countDirection /= this.speed;
    //   }
    //   // this.tick = 0;
    // }
    // this.line.updatePoints([this.point.x, this.point.y]);

    const p = new PIXI.Point(-50, this.tick);
    const v = new PIXI.Point(0 - this.tick , -75);
    const w = new PIXI.Point(50, 75);
    const a = this.distToSegment(p, v, w);
    if (this.tick > 200) {
      this.tick = -200;
    }
    this.line.updatePoints([v.x, v.y]);
    this.line.clearNew();
    this.line.lineStyle(1, 0xeeeeee);
    this.line.updatePoints([w.x, w.y]);
    this.line.lineStyle(4, 0x00ff00);
    this.line.drawRect(p.x, p.y, 2, 2);
    this.line.lineStyle(1, 0xff0000);
    this.line.drawRect(0, 0, a, 5);
  }

  sqr(x) {
    return x * x
  }

  dist2(v, w) {
    return this.sqr(v.x - w.x) + this.sqr(v.y - w.y)
  }

  distToSegmentSquared(p, v, w) {
    const l2 = this.dist2(v, w);
    if (l2 === 0) {
      return this.dist2(p, v);
    }
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));

    return this.dist2(p, { x: v.x + t * (w.x - v.x),
                           y: v.y + t * (w.y - v.y) });
  }

  distToSegment(p, v, w) {
    return Math.sqrt(this.distToSegmentSquared(p, v, w));
  }

}
