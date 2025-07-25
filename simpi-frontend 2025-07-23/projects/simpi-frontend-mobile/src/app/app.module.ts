import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { IonicGestureConfig } from '../utils/ionicGestureConfig';
import { AuthInterceptorProvider } from '../../../simpi-frontend-common/src/lib/interceptors/authInterceptor';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ], imports: [BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot({ animated: true }),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        SharedModule], providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
        AuthInterceptorProvider,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
}
