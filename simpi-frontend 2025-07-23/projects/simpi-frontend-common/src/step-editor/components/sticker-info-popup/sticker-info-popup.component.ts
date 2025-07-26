import { Component, Input, OnInit } from '@angular/core';

export interface StickerInfoData {
  x: number;
  y: number;
  scale: number; // Scale factor (1.0 = 100%)
  rotation: number; // Rotation angle in radians
}

@Component({
  selector: 'sim-sticker-info-popup',
  templateUrl: './sticker-info-popup.component.html',
  styleUrls: ['./sticker-info-popup.component.scss']
})
export class StickerInfoPopupComponent implements OnInit {

  @Input() public visible: boolean = false;
  @Input() public position: { x: number; y: number } = { x: 0, y: 0 };
  @Input() public data: StickerInfoData = { x: 0, y: 0, scale: 1.0, rotation: 0 };

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Get formatted position X as integer
   */
  public getFormattedX(): string {
    return Math.round(this.data.x).toString();
  }

  /**
   * Get formatted position Y as integer  
   */
  public getFormattedY(): string {
    return Math.round(this.data.y).toString();
  }

  /**
   * Get formatted scale as percentage
   */
  public getFormattedScale(): string {
    return Math.round(this.data.scale * 100).toString() + '%';
  }

  /**
   * Get formatted rotation as degrees
   */
  public getFormattedRotation(): string {
    const degrees = this.data.rotation * (180 / Math.PI);
    return Math.round(degrees).toString() + '°';
  }
}