export class Line extends PIXI.Graphics {
  points: number[];
  constructor(lineSize, lineColor) {
    super();

    let s = this.lineWidth = lineSize || 5;
    let c = this.lineColor = lineColor || 0x00ff00;
    // this.lineWidth;
    this.lineStyle(s, c);
    this.points = [0, 0];
  }

  updatePoints(points: number[]) {
    if (points.length !== 2) {
      return;
    }

    this.moveTo(this.points[0], this.points[1]);
    this.lineTo(points[0], points[1]);
    this.points = points;
  }

  clearNew() {
    let c = this.lineColor;
    let w = this.lineWidth;
    this.clear();
    this.lineStyle(w, c);
  }
  addPoint() {

  }
}
