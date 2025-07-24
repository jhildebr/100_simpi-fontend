import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { path: 'steps', loadChildren: () => import('./steps/steps.module').then(m => m.StepsModule) },
    {
        path: '',
        loadChildren: () => import('./tabNav/tabNav.module').then(m => m.TabNavModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppRoutingModule { }
