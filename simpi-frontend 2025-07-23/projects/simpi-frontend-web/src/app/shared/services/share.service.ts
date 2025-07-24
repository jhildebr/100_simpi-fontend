import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ShareItemModalComponent} from '../components/modals/share-item-modal/share-item-modal.component';

@Injectable({providedIn: 'root'})
export class ShareService {
  private _sharing: boolean = false;

  constructor(private modalService: NgbModal) {
  }

  public share(title: string, text: string, url: string): void {
    if (!text) {
      text = 'Check out this how-to!';
    }
    if (this._sharing) {
      return;
    }

    if (navigator && ('share' in navigator)) {
      this._sharing = true;
      navigator.share({
        title,
        text,
        url
      }).then(() => {
        this._sharing = false;
      }).catch(err => {
        this._sharing = false;
        console.error(err);
      });
    } else {
      const modalRef = this.modalService.open(ShareItemModalComponent);
      modalRef.componentInstance.sharedUrl = url;
    }
  }

  public shareQR(title: string, text: string, url: string): void {
    const modalRef = this.modalService.open(ShareItemModalComponent);
    modalRef.componentInstance.sharedUrl = url;
  }
}
