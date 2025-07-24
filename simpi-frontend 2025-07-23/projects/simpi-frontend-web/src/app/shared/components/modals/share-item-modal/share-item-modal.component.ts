import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';
import QRCodeStyling from "qr-code-styling";

@Component({
  selector: 'sim-share-item-modal',
  templateUrl: 'share-item-modal.component.html',
  styleUrls: ['share-item-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ShareItemModalComponent implements OnInit {
  public size: number = 400;
  public copySucceededRecently: boolean = false;
  public downloadSucceededRecently: boolean = false;
  public foregroundColor: string = "#ffffff";
  public backgroundColor: string = "#2e3cf5";
  public transform: string = "rotate(-3.5) scale(0.9) translate(0 40)";
  public image: string = "assets/png/simpi-icon-100px.png";

  @Input()
  public modalTitle: string = 'Share Simpi';

  @Input()
  public sharedUrl: string;

  @ViewChild("innerQrCode", { static: true })
  public innerQrCode: ElementRef;

  @ViewChild("outerQrCode", { static: true })
  public outerQrCode: ElementRef;

  constructor(public activeModal: NgbActiveModal, private clipboard: Clipboard) {
  }

  public ngOnInit(): void {
    const qrCode = new QRCodeStyling({
      data: this.sharedUrl,
      width: this.size * 2 / 3,
      height: this.size * 2 / 3,
      margin: 7,
      type: 'svg',
      backgroundOptions: {
        color: this.backgroundColor
      },
      dotsOptions: {
        color: this.foregroundColor,
        type: 'dots'
      },
      cornersDotOptions: {
        color: this.foregroundColor,
        type: 'square'
      },
      cornersSquareOptions: {
        color: this.foregroundColor,
        type: 'square'
      },
      qrOptions: {
        typeNumber: 6,
        errorCorrectionLevel: 'M',
        mode: 'Byte'
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.8,
        margin: 6
      },
      image: this.image
    });

    qrCode.append(this.innerQrCode.nativeElement);
  }

  public copyLink(): void {
    if (this.clipboard.copy(this.sharedUrl)) {
      this.copySucceededRecently = true;
      window.setTimeout(() => this.copySucceededRecently = false, 3000);
    }
  }

  public downloadCode(): void {
    const data = this.outerQrCode.nativeElement.outerHTML;
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    this.startDownload(url, this.modalTitle + ".svg");
    URL.revokeObjectURL(url);
    this.downloadSucceededRecently = true;
    window.setTimeout(() => this.downloadSucceededRecently = false, 3000);
  }

  private startDownload(url: string, title: string): void {
    var anchor = document.createElement("a");
    anchor.download = title;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
