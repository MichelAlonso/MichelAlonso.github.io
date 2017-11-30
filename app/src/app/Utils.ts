export class Utils {
  static randomColor() {
    let color = PIXI.utils.rgb2hex([
      Math.random(),
      Math.random(),
      Math.random()
    ]).toString(16);
    color = this.pad(color, 6, 0);

    return color;
  }

  static pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
