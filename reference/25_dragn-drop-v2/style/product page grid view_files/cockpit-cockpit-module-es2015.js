(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cockpit-cockpit-module"],{

/***/ "../simpi-frontend-common/src/lib/services/users/user.service.ts":
/*!***********************************************************************!*\
  !*** ../simpi-frontend-common/src/lib/services/users/user.service.ts ***!
  \***********************************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _base_rest_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/rest.service */ "../simpi-frontend-common/src/lib/services/base/rest.service.ts");
/* harmony import */ var _simpi_common_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../simpi-common-config */ "../simpi-frontend-common/src/lib/simpi-common-config.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");







class UserService extends _base_rest_service__WEBPACK_IMPORTED_MODULE_1__["RestService"] {
    constructor(config, http) {
        super(config);
        this.config = config;
        this.http = http;
        this._userAccount = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
        this._saveUserInfo = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](undefined);
        this.saveUserInfo$ = this._saveUserInfo.asObservable();
        this.userServiceUrl = config.userServiceUrl;
        this.userAccount$ = this._userAccount.asObservable();
    }
    getUser(userId) {
        const url = `${this.userServiceUrl}/api/v1/users/${userId}`;
        return this.http.get(url, { headers: this.headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(userAccount => this._userAccount.next(userAccount)));
    }
    updateUserInfo(userId, updateUserRequest) {
        const url = `${this.userServiceUrl}/api/v1/users/${userId}`;
        return this.http.put(url, updateUserRequest, { headers: this.headers, observe: 'response' }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(({ status }) => {
            if (status === 204) {
                const { customerId, eMail, homeBrandId, id, phoneNumber } = this._userAccount.getValue();
                this._userAccount.next({
                    about: updateUserRequest.about,
                    forename: updateUserRequest.forename,
                    surname: updateUserRequest.surname,
                    customerId,
                    eMail,
                    homeBrandId,
                    id,
                    phoneNumber
                });
                return true;
            }
            return false;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(false)));
    }
    saveUserInfo() {
        this._saveUserInfo.next();
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_simpi_common_config__WEBPACK_IMPORTED_MODULE_2__["COMMON_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"])); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_simpi_common_config__WEBPACK_IMPORTED_MODULE_2__["COMMON_CONFIG"]]
            }] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/cockpit/cockpit.module.ts":
/*!*******************************************!*\
  !*** ./src/app/cockpit/cockpit.module.ts ***!
  \*******************************************/
/*! exports provided: CockpitModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CockpitModule", function() { return CockpitModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _container_cockpit_page_cockpit_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container/cockpit-page/cockpit-page.component */ "./src/app/cockpit/container/cockpit-page/cockpit-page.component.ts");
/* harmony import */ var _cockpit_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cockpit.routing */ "./src/app/cockpit/cockpit.routing.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "../../node_modules/ngx-toastr/__ivy_ngcc__/fesm2015/ngx-toastr.js");
/* harmony import */ var _components_settings_dropdown_settings_dropdown_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/settings-dropdown/settings-dropdown.component */ "./src/app/cockpit/components/settings-dropdown/settings-dropdown.component.ts");









class CockpitModule {
}
CockpitModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CockpitModule });
CockpitModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CockpitModule_Factory(t) { return new (t || CockpitModule)(); }, imports: [[
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastContainerModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_cockpit_routing__WEBPACK_IMPORTED_MODULE_3__["cockpitRoutes"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CockpitModule, { declarations: [_container_cockpit_page_cockpit_page_component__WEBPACK_IMPORTED_MODULE_2__["CockpitPageComponent"],
        _components_settings_dropdown_settings_dropdown_component__WEBPACK_IMPORTED_MODULE_6__["SettingsDropdownComponent"]], imports: [ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastContainerModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CockpitModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _container_cockpit_page_cockpit_page_component__WEBPACK_IMPORTED_MODULE_2__["CockpitPageComponent"],
                    _components_settings_dropdown_settings_dropdown_component__WEBPACK_IMPORTED_MODULE_6__["SettingsDropdownComponent"],
                ],
                imports: [
                    ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastContainerModule"],
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_cockpit_routing__WEBPACK_IMPORTED_MODULE_3__["cockpitRoutes"])
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/cockpit/cockpit.routing.ts":
/*!********************************************!*\
  !*** ./src/app/cockpit/cockpit.routing.ts ***!
  \********************************************/
/*! exports provided: cockpitRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cockpitRoutes", function() { return cockpitRoutes; });
/* harmony import */ var _container_cockpit_page_cockpit_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container/cockpit-page/cockpit-page.component */ "./src/app/cockpit/container/cockpit-page/cockpit-page.component.ts");

//import { DashboardComponent } from './components/dashboard/dashboard.component';
const cockpitRoutes = [
    {
        path: "",
        redirectTo: "cockpit",
        pathMatch: "full",
    },
    {
        path: "cockpit",
        component: _container_cockpit_page_cockpit_page_component__WEBPACK_IMPORTED_MODULE_0__["CockpitPageComponent"],
        children: [
            { path: "", redirectTo: "products", pathMatch: "full" },
            // {
            //     path: 'dashboard',
            //     component: DashboardComponent
            // },
            {
                path: "assets",
                loadChildren: () => Promise.all(/*! import() | resources-resources-module */[__webpack_require__.e("default~resources-resources-module~steps-steps-module"), __webpack_require__.e("resources-resources-module")]).then(__webpack_require__.bind(null, /*! ../resources/resources.module */ "./src/app/resources/resources.module.ts")).then((m) => m.ResourcesModule),
            },
            {
                path: "products",
                loadChildren: () => Promise.all(/*! import() | products-products-module */[__webpack_require__.e("default~analytics-analytics-module~products-products-module"), __webpack_require__.e("products-products-module")]).then(__webpack_require__.bind(null, /*! ../products/products.module */ "./src/app/products/products.module.ts")).then((m) => m.ProductsModule),
            },
            {
                path: "analytics",
                loadChildren: () => Promise.all(/*! import() | analytics-analytics-module */[__webpack_require__.e("default~analytics-analytics-module~products-products-module"), __webpack_require__.e("analytics-analytics-module")]).then(__webpack_require__.bind(null, /*! ../analytics/analytics.module */ "./src/app/analytics/analytics.module.ts")).then((m) => m.AnalyticsModule),
            },
            {
                path: "users",
                loadChildren: () => __webpack_require__.e(/*! import() | users-users-module */ "users-users-module").then(__webpack_require__.bind(null, /*! ../users/users.module */ "./src/app/users/users.module.ts")).then((m) => m.UsersModule),
            },
            {
                path: "settings",
                loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../branding/branding.module */ "./src/app/branding/branding.module.ts")).then((m) => m.BrandingModule),
            },
        ],
    },
];


/***/ }),

/***/ "./src/app/cockpit/components/settings-dropdown/settings-dropdown.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/cockpit/components/settings-dropdown/settings-dropdown.component.ts ***!
  \*************************************************************************************/
/*! exports provided: SettingsDropdownComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsDropdownComponent", function() { return SettingsDropdownComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _branding_components_settings_overview_settings_overview_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../branding/components/settings-overview/settings-overview.component */ "./src/app/branding/components/settings-overview/settings-overview.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service */ "../simpi-frontend-common/src/lib/services/auth/auth.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services_users_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/users/user.service */ "../simpi-frontend-common/src/lib/services/users/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/overlay */ "../../node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/overlay.js");












function SettingsDropdownComponent_ng_container_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsDropdownComponent_ng_container_0_ng_template_3_Template_li_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r4.openSettingsModal(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsDropdownComponent_ng_container_0_ng_template_3_Template_li_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.logoutUser(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function SettingsDropdownComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "img", 1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SettingsDropdownComponent_ng_container_0_Template_img_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.dropdownExpanded = !ctx_r7.dropdownExpanded; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, SettingsDropdownComponent_ng_container_0_ng_template_3_Template, 7, 0, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const userName_r1 = ctx.ngIf;
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("alt", "Profile picture of ", userName_r1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkConnectedOverlayOrigin", _r2)("cdkConnectedOverlayOpen", ctx_r0.dropdownExpanded);
} }
class SettingsDropdownComponent {
    constructor(authService, modalService, userService, router) {
        this.authService = authService;
        this.modalService = modalService;
        this.userService = userService;
        this.router = router;
        this.dropdownExpanded = false;
    }
    ngOnInit() {
        this.userName$ = this.authService.userInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])((userInfo) => {
            const id = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id; // userInfo is initially null
            if (id) {
                return this.userService.getUser(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this.userService.userAccount$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(({ forename, surname }) => `${forename} ${surname}`))));
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])('Unknown User');
            }
        }));
    }
    openSettingsModal() {
        this.dropdownExpanded = false;
        const modalRef = this.modalService.open(_branding_components_settings_overview_settings_overview_component__WEBPACK_IMPORTED_MODULE_2__["SettingsOverviewComponent"], {
            size: 'lg'
        });
        modalRef.componentInstance.width = '100%';
    }
    logoutUser() {
        this.authService.logout();
        this.router.navigateByUrl('/login').catch(console.error);
    }
}
SettingsDropdownComponent.ɵfac = function SettingsDropdownComponent_Factory(t) { return new (t || SettingsDropdownComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_users_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"])); };
SettingsDropdownComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SettingsDropdownComponent, selectors: [["sim-settings-dropdown"]], decls: 2, vars: 3, consts: [[4, "ngIf"], ["src", "./assets/images/profile.png", "cdkOverlayOrigin", "", 1, "user-profile", 3, "alt", "click"], ["trigger", "cdkOverlayOrigin"], ["class", "overlay", "cdkConnectedOverlay", "", 3, "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen"], [1, "settings-dropdown"], [3, "click"], ["src", "assets/svg/Settings.svg"], ["src", "assets/svg/Logout.svg"]], template: function SettingsDropdownComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SettingsDropdownComponent_ng_container_0_Template, 4, 3, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.userName$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__["CdkOverlayOrigin"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_10__["CdkConnectedOverlay"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["AsyncPipe"]], styles: [".user-profile[_ngcontent-%COMP%] {\n  height: 50px;\n  width: 50px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.settings-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n  width: 145px;\n  height: 75;\n  left: -95px;\n  top: 5px;\n  border: solid 1px var(--simpi-grey);\n  border-radius: 5px;\n  background: var(--simpi-white);\n  text-align: left;\n  padding: 0px !important;\n}\n\n.settings-dropdown[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%] {\n  padding-left: 20px !important;\n  padding-right: 20px !important;\n  width: 100%;\n  color: var(--simpi-text-color) !important;\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  list-style-type: none;\n  cursor: pointer;\n}\n\n.settings-dropdown[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]:hover {\n  background-color: var(--simpi-grey-hover);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL3NpbXBpLWZyb250ZW5kLXdlYi9zcmMvYXBwL2NvY2twaXQvY29tcG9uZW50cy9zZXR0aW5ncy1kcm9wZG93bi9zZXR0aW5ncy1kcm9wZG93bi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSxtQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSw2QkFBQTtFQUNBLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLHlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFDRTtFQUNFLHlDQUFBO0FBQ0oiLCJmaWxlIjoicHJvamVjdHMvc2ltcGktZnJvbnRlbmQtd2ViL3NyYy9hcHAvY29ja3BpdC9jb21wb25lbnRzL3NldHRpbmdzLWRyb3Bkb3duL3NldHRpbmdzLWRyb3Bkb3duLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXItcHJvZmlsZSB7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5zZXR0aW5ncy1kcm9wZG93biB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiAxNDVweDtcclxuICBoZWlnaHQ6IDc1O1xyXG4gIGxlZnQ6IC05NXB4O1xyXG4gIHRvcDo1cHg7XHJcbiAgYm9yZGVyOiBzb2xpZCAxcHggdmFyKC0tc2ltcGktZ3JleSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLXNpbXBpLXdoaXRlKTtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIHBhZGRpbmc6IDBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uc2V0dGluZ3MtZHJvcGRvd24gPiBsaSB7XHJcbiAgcGFkZGluZy1sZWZ0OiAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZy1yaWdodDogMjBweCAhaW1wb3J0YW50O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGNvbG9yOiB2YXIoLS1zaW1waS10ZXh0LWNvbG9yKSAhaW1wb3J0YW50O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNpbXBpLWdyZXktaG92ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0= */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('openClose', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                    transform: 'translateY(0)'
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('closed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                    transform: 'translateY(-100%)'
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('open => closed', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.2s')
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('closed => open', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.1s')
                ]),
            ]),
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SettingsDropdownComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'sim-settings-dropdown',
                templateUrl: './settings-dropdown.component.html',
                styleUrls: ['./settings-dropdown.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('openClose', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateY(0)'
                        })),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('closed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateY(-100%)'
                        })),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('open => closed', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.2s')
                        ]),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('closed => open', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.1s')
                        ]),
                    ]),
                ]
            }]
    }], function () { return [{ type: _simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }, { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"] }, { type: _simpi_frontend_common_src_lib_services_users_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/cockpit/container/cockpit-page/cockpit-page.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/cockpit/container/cockpit-page/cockpit-page.component.ts ***!
  \**************************************************************************/
/*! exports provided: CockpitPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CockpitPageComponent", function() { return CockpitPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shared_components_navigation_menu_navigation_menu_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/navigation-menu/navigation-menu.component */ "./src/app/shared/components/navigation-menu/navigation-menu.component.ts");
/* harmony import */ var _components_settings_dropdown_settings_dropdown_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/settings-dropdown/settings-dropdown.component */ "./src/app/cockpit/components/settings-dropdown/settings-dropdown.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





class CockpitPageComponent {
}
CockpitPageComponent.ɵfac = function CockpitPageComponent_Factory(t) { return new (t || CockpitPageComponent)(); };
CockpitPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CockpitPageComponent, selectors: [["sim-cockpit-page"]], decls: 12, vars: 0, consts: [[1, "top-bar-wrapper"], [1, "top-bar-logo"], ["src", "assets/svg/simpi-logo.svg", "alt", "SIMPI Logo", "width", "85", "height", "25"], [1, "top-bar-profile"], [1, "wrapper", "h-100"], ["id", "content"], [1, "nav-bar", "mb-3", "d-flex", "align-items-center"], [1, "navigation-routing"], [1, "container-fluid"]], template: function CockpitPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "sim-nav-menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "sim-settings-dropdown", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_components_navigation_menu_navigation_menu_component__WEBPACK_IMPORTED_MODULE_1__["NavigationMenuComponent"], _components_settings_dropdown_settings_dropdown_component__WEBPACK_IMPORTED_MODULE_2__["SettingsDropdownComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: [".wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n\n.nav-bar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 85px;\n  padding-left: 15px;\n  background-color: white;\n  align-self: start;\n}\n\n.text-black[_ngcontent-%COMP%] {\n  color: black;\n}\n\n.top-bar-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 80px;\n  position: fixed;\n  top: 0;\n  z-index: 999;\n  display: flex;\n  justify-content: space-between;\n  padding: 50px 65px;\n  padding-left: 10%;\n  padding-right: 10%;\n  background-color: #FFFFFF;\n  align-items: center;\n}\n\n.top-bar-logo[_ngcontent-%COMP%] {\n  position: relative;\n  width: 85px;\n}\n\n#content[_ngcontent-%COMP%] {\n  padding-top: 20px;\n  padding-left: 50px;\n  padding-right: 50px;\n  max-width: 1062px;\n  margin-left: auto;\n  margin-right: auto;\n  min-height: calc(100vh - 55px);\n  transition: all 0.3s;\n  position: absolute;\n  left: 0;\n  right: 0;\n  background: #FFFFFF;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL3NpbXBpLWZyb250ZW5kLXdlYi9zcmMvYXBwL2NvY2twaXQvY29udGFpbmVyL2NvY2twaXQtcGFnZS9jb2NrcGl0LXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFHSTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0FBREo7O0FBS0E7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFFQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0FBSEYiLCJmaWxlIjoicHJvamVjdHMvc2ltcGktZnJvbnRlbmQtd2ViL3NyYy9hcHAvY29ja3BpdC9jb250YWluZXIvY29ja3BpdC1wYWdlL2NvY2twaXQtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53cmFwcGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubmF2LWJhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBoZWlnaHQ6IDg1cHg7XHJcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGFsaWduLXNlbGY6IHN0YXJ0O1xyXG59XHJcblxyXG4udGV4dC1ibGFjayB7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4udG9wLWJhciB7XHJcbiAgICAmLXdyYXBwZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICB6LWluZGV4OiA5OTk7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgcGFkZGluZzogNTBweCA2NXB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMCU7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcblxyXG4gICYtbG9nbyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogODVweDtcclxuICB9XHJcbn1cclxuXHJcbiNjb250ZW50IHtcclxuICBwYWRkaW5nLXRvcDogMjBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDUwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICBtYXgtd2lkdGg6IDEwNjJweDtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDU1cHgpO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAvL3RvcDogNjBweDtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQ6ICNGRkZGRkY7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CockpitPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'sim-cockpit-page',
                templateUrl: './cockpit-page.component.html',
                styleUrls: ['./cockpit-page.component.scss']
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=cockpit-cockpit-module-es2015.js.map