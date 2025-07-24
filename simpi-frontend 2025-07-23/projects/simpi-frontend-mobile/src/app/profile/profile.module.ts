import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { profileRoutes } from "./profile.routing";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { ProfileRoutingPageComponent } from './container/profile-routing-page/profile-routing-page.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { LoginRegisterComponent } from './container/login-register/login-register.component';
import { LoginRegisterInputComponent } from './components/login-register-input/login-register-input.component';
import { LoginRegisterVerifyComponent } from './components/login-register-verify/login-register-verify.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        RouterModule.forChild(profileRoutes),
    ],
    exports: [],
    declarations: [ProfileOverviewComponent, ProfileRoutingPageComponent, ProfileEditComponent, LoginRegisterComponent, LoginRegisterInputComponent, LoginRegisterVerifyComponent],
    providers: []
})
export class ProfileModule { }
