import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'new-simpis-page.component.html',
})

export class NewSimpisPageComponent implements OnInit {
  public loading: boolean = true;
  public simpis$: Observable<SimpiResponse[]>;

  constructor(private route: ActivatedRoute, private simpiService: SimpiService,
              private productService: ProductService, private navCtrl: NavController) {
  }

  public ngOnInit(): void {
    this.simpis$ = this.simpiService.getSimpisByProductId(environment.mobileCreatedSimpisProductId, false, true, false).pipe(
      finalize(() => this.loading = false)
    );
  }

  public onNavigateToSimpi(simpiId: string): void {
    this.navCtrl.navigateForward(`/nav/steps/${simpiId}`).catch(console.error);
  }

  public onBackClick(): void {
    this.navCtrl.back();
  }
}
