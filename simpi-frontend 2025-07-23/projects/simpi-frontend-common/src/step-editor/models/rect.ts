import { Vector2 } from './vector2';

export class Rect {
    private _width: number;

    private _height: number;

    constructor(private p1: Vector2, private p2: Vector2) {
        const vdiff = p2.add(p1.inv());
        this._width = Math.abs(vdiff.x);
        this._height = Math.abs(vdiff.y);
    }

    public static createBounds(rects: Array<Rect>): Rect {
        const xCoordMin = rects.map(r => r.x).sort((x1, x2) => x1 - x2)[0];
        const xCoordMax = rects.map(r => r.p2.x).sort((x1, x2) => x2 - x1)[0];
        const yCoordMin = rects.map(r => r.y).sort((y1, y2) => y1 - y2)[0];
        const yCoordMax = rects.map(r => r.p2.y).sort((y1, y2) => y2 - y1)[0];

        return new Rect(new Vector2(xCoordMin, yCoordMin), new Vector2(xCoordMax, yCoordMax));
    }

    public static createBoundsFromPoints(points: Vector2[]): Rect {
        const xMin = points.map(p => p.x).sort((x1, x2) => x1 - x2)[0];
        const xMax = points.map(p => p.x).sort((x1, x2) => x2 - x1)[0];
        const yMin = points.map(p => p.y).sort((y1, y2) => y1 - y2)[0];
        const yMax = points.map(p => p.y).sort((y1, y2) => y2 - y1)[0];

        return new Rect(new Vector2(xMin, yMin), new Vector2(xMax, yMax));
    }

    public static create(x: number, y: number, width: number, height: number): Rect {
        const p1: Vector2 = new Vector2(x, y);
        const p2: Vector2 = new Vector2(x + width, y + height);
        return new Rect(p1, p2);
    }

    public expand(v: Vector2): Rect {
        return new Rect(this.p1, this.p2.add(v));
    }

    public translate(v: Vector2): Rect {
        return new Rect(this.p1.add(v), this.p2.add(v));
    }

    public isWithin(rect: Rect): boolean {
        return !(this.x < rect.x || this.y > rect.y || this.p2.x > rect.p2.x || this.p2.y > rect.p2.y);
    }

    public isPointWithin(v: Vector2): boolean {
        return v.x > this.x && v.x < this.p2.x && v.y > this.y && v.y < this.p2.y;
    }

    public clamp(rect: Rect): Rect {
        const x = Math.max(rect.x, this.p1.x);
        const y = Math.max(rect.y, this.p1.y);
        const x2 = Math.min(rect.p2.x, this.p2.x);
        const y2 = Math.min(rect.p2.y, this.p2.y);

        return new Rect(new Vector2(x, y), new Vector2(x2, y2));
    }

    public get center(): Vector2 {
        return new Vector2(this.p1.x + this.width / 2, this.p1.y + this.height / 2);
    }

    public centerWithin(container: Rect): Rect {
        const p1 = container.dimensions.scale(0.5).add(this.dimensions.scale(0.5).inv());
        return new Rect(p1, p1.add(this.dimensions));
    }

    public constraintWithin(rect: Rect): Rect {
        let x = Math.max(rect.x, this.x);
        let y = Math.max(rect.y, this.y);

        if (this.p2.x > rect.p2.x) {
            x = rect.p2.x - (this.width + 1);
        }

        if (this.p2.y > rect.p2.y) {
            y = rect.p2.y - (this.height + 1);
        }

        return new Rect(new Vector2(x, y), new Vector2(x + this.width, y + this.height));
    }

    public normalize(): Rect {
        return new Rect(this.p1.normalize(), this.p2.normalize());
    }

    public setDimensions(width: number, height: number): Rect {
        const x = this.p1.x;
        const y = this.p1.y;
        return new Rect(this.p1, new Vector2(x + width, y + height));
    }

    public setPosition(x: number, y: number): Rect {
        return new Rect(new Vector2(x, y), new Vector2(x + this.width, y + this.height));
    }

    public scale(s: number) {
        return new Rect(this.p1.scale(s), this.p2.scale(s));
    }

    public scaleXY(x: number, y: number): Rect {
        return new Rect(this.p1.scaleXY(x, y), this.p2.scaleXY(x, y));
    }

    public inflate(px: number): Rect {
        const v = new Vector2(px, px);
        return new Rect(this.p1.add(v.inv()), this.p2.add(v));
    }

    public adjustToRatio(width: number, height: number): Rect {
        if (this.width > this.height) {
            const heightRatio = height / width;
            const halfHeight = this.width * heightRatio / 2;

            return new Rect(
                new Vector2(this.x, this.y),
                new Vector2(this.x + this.width, this.y + 2 * halfHeight));
        }
        else {
            const widthRatio = width / height;
            const halfWidth = this.height * widthRatio / 2;

            return new Rect(
                new Vector2(this.x, this.y),
                new Vector2(this.x + 2 * halfWidth, this.y + this.height));
        }
    }

    public contains(v: Vector2): boolean {
        return v.x > this.x && v.x < this.point2.x && v.y > this.y && v.y < this.point2.y;
    }

    public deflate(px: number) {
        return this.inflate(-px);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get position(): Vector2 {
        return this.p1;
    }

    public get x(): number {
        return this.p1.x;
    }

    public get y(): number {
        return this.p1.y;
    }

    public get point1(): Vector2 {
        return this.p1;
    }

    public get point2(): Vector2 {
        return this.p2;
    }

    public get dimensions(): Vector2 {
        return new Vector2(this.width, this.height);
    }

    public clone(): Rect {
        return new Rect(this.p1, this.p2);
    }

    public toString(): string {
        return `${this.p1.toString()}-${this.p2.toString()}`;
    }
}