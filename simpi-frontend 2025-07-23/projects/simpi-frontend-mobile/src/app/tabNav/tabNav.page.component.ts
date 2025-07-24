import { Component, OnInit } from '@angular/core';
import { TabNavService } from './tabNav.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  template: `
    <ion-content>
      <ion-tabs (ionTabsWillChange)="tabsWillChange($event)">
        <ion-tab-bar slot="bottom" [hidden]="(tabVisibility$ | async)!=='visible'">
          <ion-tab-button tab="home">
            <ion-icon class="icon" src="/assets/svg/home.svg"></ion-icon>
          </ion-tab-button>
          <ion-tab-button tab="creator">
            <ion-icon class="icon" src="/assets/svg/addSimpi.svg"></ion-icon>
          </ion-tab-button>
          <ion-tab-button tab="profile">
            <ion-icon class="icon" src="/assets/svg/profile.svg"></ion-icon>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  `,
  styleUrls: ['tabNav.page.component.scss']
})

export class TabNavPageComponent implements OnInit {
  public tabVisibility$: Observable<string>;

  constructor(private readonly tabNavService: TabNavService,
              private readonly authService: AuthService,
              private readonly navCtrl: NavController,
              private readonly alertController: AlertController) {
  }

  public ngOnInit(): void {
    this.tabVisibility$ = this.tabNavService.tabVisibility$;
  }

  public tabsWillChange(event: { tab: string; }) {
    if (event?.tab === 'creator') {
      this.redirectUserToProfilePageIfNotSignedIn();
    }
  }

  private redirectUserToProfilePageIfNotSignedIn(): void {
    this.authService.getToken().then(token => {
      if (!token) {
        this.presentAlert('Registration Required',
          'To create simpis we ask you to register first. It takes 30s and we guarantee that we are compliant with the GDPR data privacy regulations.')
          .then(() => {
            this.navCtrl.navigateForward('/nav/profile').catch(console.error);
          })
          .catch(() => this.navCtrl.navigateRoot('/nav/home').catch(console.error));
      }
    });
  }

  private async presentAlert(header: string, message: string): Promise<any> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
    return alert.onDidDismiss();
  }
}
