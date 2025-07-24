import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabNavPageComponent } from './tabNav.page.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'nav',
    component: TabNavPageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'creator',
        loadChildren: () => import('../creator/creator.module').then(m => m.CreatorModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'simpis',
        loadChildren: () => import('../simpis/simpis.module').then(m => m.SimpisModule)
      },
      {
        path: 'steps',
        loadChildren: () => import('../steps/steps.module').then(m => m.StepsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/nav/home'
  }
];

@NgModule({
  imports: [SharedModule, IonicModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [TabNavPageComponent],
  providers: [],
})
export class TabNavModule {
}
