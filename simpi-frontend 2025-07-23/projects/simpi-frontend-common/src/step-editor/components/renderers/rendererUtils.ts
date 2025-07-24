import { Vector2 } from '../../models/vector2';

export class RendererUtils {

  // Code taken from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

  public static fillRoundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    context.beginPath();
    context.moveTo(x, y + radius);
    context.lineTo(x, y + height - radius);
    context.arcTo(x, y + height, x + radius, y + height, radius);
    context.lineTo(x + width - radius, y + height);
    context.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    context.lineTo(x + width, y + radius);
    context.arcTo(x + width, y, x + width - radius, y, radius);
    context.lineTo(x + radius, y);
    context.arcTo(x, y, x, y + radius, radius);
    context.fill();
  }

  /**
   * Converts the given hex color (#xxx or #xxxxxx) either to the inverse color
   * or if blackAndWhite is true, converts the hex color either to black or white
   * depending on what will have a larger contrast to the given hex color
   * @param hex Input color as hex string
   * @param blackOrWhite If true, output will always be #000000 or #FFFFFF
   */
  public static invertColor(hex: string, blackOrWhite: boolean): string {
    // Code taken from https://stackoverflow.com/a/35970186

    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    if (blackOrWhite) {
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    r = (255 - r);
    g = (255 - g);
    b = (255 - b);
    // pad each with zeros and return
    return '#' + this.padZero(r.toString(16)) + this.padZero(g.toString(16)) + this.padZero(b.toString(16));
  }

  private static padZero(str: string) {
    const zeros = new Array(2).join('0');
    return (zeros + str).slice(-2);
  }

  /**
   * Returns the positions of an arc with given radius around the given point with given angle.
   */
  public static getArrowHeadPos(arcCenterPoint: Vector2, radius: number, angle: number): Vector2 {
    return new Vector2(
      arcCenterPoint.x + Math.cos(angle) * radius,
      arcCenterPoint.y + Math.sin(angle) * radius);
  }

  public static rotateCanvas(context: CanvasRenderingContext2D, rotationCenter: Vector2, angle: number): void {
    if (!(context && rotationCenter && angle)) {
      return;
    }
    context.translate(rotationCenter.x, rotationCenter.y);
    context.rotate(angle);
    context.translate(-rotationCenter.x, -rotationCenter.y);
  }

  public static resetCanvasRotation(context: CanvasRenderingContext2D, rotationCenter: Vector2, angle: number): void {
    this.rotateCanvas(context, rotationCenter, -angle);
  }

  public static radiansFromDegree(degree: number): number {
    return degree * Math.PI / 180;
  }

  // https://easings.net/#easeOutBack
  public static easeOutBack(x: number): number {
    const c1 = 3.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  public static easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  }
}
