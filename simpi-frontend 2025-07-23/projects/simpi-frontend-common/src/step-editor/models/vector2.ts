import { Rect } from './rect';

export class Vector2 {
  constructor(public x: number, public y: number) {
  }

  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public inv(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  public abs(): Vector2 {
    return new Vector2(Math.abs(this.x), Math.abs(this.y));
  }

  public scale(lambda: number) {
    return new Vector2(this.x * lambda, this.y * lambda);
  }

  public scaleXY(x: number, y: number) {
    return new Vector2(this.x * x, this.y * y);
  }

  public add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public distance(vector: Vector2): number {
    return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
  }

  public normalize(): Vector2 {
    const mag = this.magnitude();
    return new Vector2(this.x / mag, this.y / mag);
  }

  public max(): number {
    return Math.max(this.x, this.y);
  }

  public min(): number {
    return Math.min(this.x, this.y);
  }

  public constraintIn(rect: Rect): Vector2 {
    return new Vector2(
      Math.max(rect.x, Math.min(rect.point2.x, this.x)),
      Math.max(rect.y, Math.min(rect.point2.y, this.y)));
  }

  public rotate(rotationCenter: Vector2, rotationAngleRadians: number): Vector2 {
    if (this.x == rotationCenter.x && this.y == rotationCenter.y) {
      return this.clone();
    }

    const p: Vector2 = this.add(rotationCenter.inv());
    const p_rot: Vector2 = new Vector2(p.x * Math.cos(rotationAngleRadians) - p.y * Math.sin(rotationAngleRadians),
      p.x * Math.sin(rotationAngleRadians) + p.y * Math.cos(rotationAngleRadians));

    return p_rot.add(rotationCenter);
  }

  public roundToInt(): Vector2 {
    return new Vector2(Math.round(this.x) , Math.round(this.y));
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
