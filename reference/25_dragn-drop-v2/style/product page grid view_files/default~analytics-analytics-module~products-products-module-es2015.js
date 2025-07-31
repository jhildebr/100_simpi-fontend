(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~analytics-analytics-module~products-products-module"],{

/***/ "./src/app/products/components/product-list/product-list.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/products/components/product-list/product-list.component.ts ***!
  \****************************************************************************/
/*! exports provided: ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function ProductListComponent_option_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const product_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngValue", product_r1.productId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", product_r1.productName, " ");
} }
class ProductListComponent {
    constructor(activeModal) {
        this.activeModal = activeModal;
        this.onSelectProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectedProductId = "";
    }
    ngOnInit() {
    }
    onConfirmSelection() {
        this.onSelectProduct.emit(this.selectedProductId);
    }
}
ProductListComponent.ɵfac = function ProductListComponent_Factory(t) { return new (t || ProductListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"])); };
ProductListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductListComponent, selectors: [["sim-product-list"]], inputs: { products: "products" }, outputs: { onSelectProduct: "onSelectProduct" }, decls: 17, vars: 2, consts: [[1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "dropdown-container"], ["id", "resourceType", 1, "form-control", 3, "ngModel", "ngModelChange"], ["value", "", "disabled", "", "selected", ""], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "modal-footer"], [1, "simpi-button-dark", "px-4", 3, "click"], [3, "ngValue"]], template: function ProductListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Clone: Select target product");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductListComponent_Template_button_click_3_listener() { return ctx.activeModal.dismiss("Cross click"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Target Product");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProductListComponent_Template_select_ngModelChange_10_listener($event) { return ctx.selectedProductId = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Select the project to clone ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ProductListComponent_option_13_Template, 2, 2, "option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductListComponent_Template_button_click_15_listener() { return ctx.onConfirmSelection(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " clone ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selectedProductId);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.products);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: [".dropdown-container[_ngcontent-%COMP%] {\n  display: flex;\n  -moz-column-gap: 35px;\n       column-gap: 35px;\n  align-items: center;\n}\n.dropdown-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  margin-bottom: 0;\n}\n.dropdown-container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  height: 40px;\n}\n.dropdown-container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  box-shadow: none;\n  border: 1px solid var(--simpi-color-blue);\n  outline: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL3NpbXBpLWZyb250ZW5kLXdlYi9zcmMvYXBwL3Byb2R1Y3RzL2NvbXBvbmVudHMvcHJvZHVjdC1saXN0L3Byb2R1Y3QtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxxQkFBQTtPQUFBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDSjtBQUNJO0VBQ0ksbUJBQUE7RUFDQSxnQkFBQTtBQUNSO0FBRUk7RUFDSSxrQkFBQTtFQUNBLFlBQUE7QUFBUjtBQUNRO0VBQ0EsZ0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGFBQUE7QUFDUiIsImZpbGUiOiJwcm9qZWN0cy9zaW1waS1mcm9udGVuZC13ZWIvc3JjL2FwcC9wcm9kdWN0cy9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZHJvcGRvd24tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBjb2x1bW4tZ2FwOiAzNXB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBsYWJlbCB7XHJcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdCB7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAmOmZvY3VzIHtcclxuICAgICAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXNpbXBpLWNvbG9yLWJsdWUpO1xyXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'sim-product-list',
                templateUrl: './product-list.component.html',
                styleUrls: ['./product-list.component.scss']
            }]
    }], function () { return [{ type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"] }]; }, { products: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], onSelectProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/products/container/product-settings-page/product-settings-page.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/products/container/product-settings-page/product-settings-page.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ProductSettingsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductSettingsPageComponent", function() { return ProductSettingsPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _shared_components_upload_img_modal_upload_img_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/components/upload-img-modal/upload-img-modal.component */ "./src/app/shared/components/upload-img-modal/upload-img-modal.component.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _simpi_frontend_common_src_lib_components_product_settings_product_settings_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/components/product-settings/product-settings.component */ "../simpi-frontend-common/src/lib/components/product-settings/product-settings.component.ts");









class ProductSettingsPageComponent {
    constructor(productService, router, route, location) {
        this.productService = productService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.componentActive = false;
        this.uploadImageModalComponent = _shared_components_upload_img_modal_upload_img_modal_component__WEBPACK_IMPORTED_MODULE_3__["UploadImgModalComponent"];
    }
    ngOnInit() {
        this.componentActive = true;
        this.getRoutingParamsObservable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeWhile"])(() => this.componentActive))
            .subscribe(({ brandAlias, productAlias, parent }) => {
            if (brandAlias && productAlias) {
                this.brandAlias = brandAlias;
                this.product$ = this.productService.getProductByAlias(brandAlias, productAlias);
            }
            this.navigateBackToOverview = parent === 'overview';
        });
    }
    getRoutingParamsObservable() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([this.route.root.firstChild.paramMap, this.route.paramMap, this.route.queryParamMap])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeWhile"])(() => this.componentActive), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(([rootParamMap, routeParamMap, queryParamMap]) => {
            return {
                brandAlias: rootParamMap === null || rootParamMap === void 0 ? void 0 : rootParamMap.get('brandAlias'),
                productAlias: routeParamMap === null || routeParamMap === void 0 ? void 0 : routeParamMap.get('productAlias'),
                parent: queryParamMap.get('parent'),
            };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(({ brandAlias, productAlias }) => !!brandAlias && !!productAlias));
    }
    ngOnDestroy() {
        this.componentActive = false;
    }
    navigateBack() {
        if (this.navigateBackToOverview) {
            this.router.navigate(['../..'], { relativeTo: this.route }).catch(console.error);
        }
        else {
            this.router.navigate(['..'], { relativeTo: this.route }).catch(console.error);
        }
    }
    onAliasChanged(newAlias) {
        this.location.replaceState(`/${this.brandAlias}/cockpit/products/${newAlias}/settings`);
    }
}
ProductSettingsPageComponent.ɵfac = function ProductSettingsPageComponent_Factory(t) { return new (t || ProductSettingsPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_4__["ProductService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"])); };
ProductSettingsPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductSettingsPageComponent, selectors: [["ng-component"]], decls: 2, vars: 4, consts: [[3, "product", "uploadImageModalComponent", "navigateBack", "aliasChanged"]], template: function ProductSettingsPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "sim-product-settings", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("navigateBack", function ProductSettingsPageComponent_Template_sim_product_settings_navigateBack_0_listener() { return ctx.navigateBack(); })("aliasChanged", function ProductSettingsPageComponent_Template_sim_product_settings_aliasChanged_0_listener($event) { return ctx.onAliasChanged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("product", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 2, ctx.product$))("uploadImageModalComponent", ctx.uploadImageModalComponent);
    } }, directives: [_simpi_frontend_common_src_lib_components_product_settings_product_settings_component__WEBPACK_IMPORTED_MODULE_7__["ProductSettingsComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: [""] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductSettingsPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                template: `
    <sim-product-settings [product]="product$ | async" [uploadImageModalComponent]="uploadImageModalComponent"
                          (navigateBack)="navigateBack()" (aliasChanged)="onAliasChanged($event)">
    </sim-product-settings>
  `,
                styles: [``]
            }]
    }], function () { return [{ type: _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_4__["ProductService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] }]; }, null); })();


/***/ }),

/***/ "./src/app/shared/services/dropdown-menu-helper.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/services/dropdown-menu-helper.service.ts ***!
  \*****************************************************************/
/*! exports provided: DropdownMenuHelperService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownMenuHelperService", function() { return DropdownMenuHelperService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _components_modals_share_item_modal_share_item_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/modals/share-item-modal/share-item-modal.component */ "./src/app/shared/components/modals/share-item-modal/share-item-modal.component.ts");
/* harmony import */ var _products_components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../products/components/product-list/product-list.component */ "./src/app/products/components/product-list/product-list.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _share_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./share.service */ "./src/app/shared/services/share.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! projects/simpi-frontend-common/src/lib/services/simpis/simpi.service */ "../simpi-frontend-common/src/lib/services/simpis/simpi.service.ts");
/* harmony import */ var projects_simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! projects/simpi-frontend-common/src/lib/services/brand/brand.service */ "../simpi-frontend-common/src/lib/services/brand/brand.service.ts");
/* harmony import */ var projects_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! projects/simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");













class DropdownMenuHelperService {
    constructor(modalService, shareService, router, route, simpiService, brandService, productService) {
        this.modalService = modalService;
        this.shareService = shareService;
        this.router = router;
        this.route = route;
        this.simpiService = simpiService;
        this.brandService = brandService;
        this.productService = productService;
        this.componentActive = false;
        this._componentActive = true;
        this._savedProduct = false;
    }
    navigateToSimpiStepEditor(paramsJson) {
        if (paramsJson) {
            const brandAlias = paramsJson.brandAlias;
            const productAlias = paramsJson.productAlias;
            const simpiAlias = paramsJson.simpiAlias;
            this.router
                .navigate([
                `${brandAlias}/cockpit/products/${productAlias}/simpis/${simpiAlias}/steps`,
            ])
                .catch(console.error);
        }
    }
    shareSimpi(simpi) {
        if (simpi) {
            const text = simpi.title
                ? `Check out this how-to: ${simpi.title}!`
                : undefined;
            const url = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl}/player/${simpi.alias}`;
            // if (navigator && "share" in navigator) {
            this.shareService.share(simpi.title, text, url);
            // } else {
            //   const modalRef = this.modalService.open(ShareItemModalComponent);
            //   modalRef.componentInstance.sharedUrl = url;
            // }
        }
    }
    shareQRSimpi(simpi) {
        if (simpi) {
            const url = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl}/player/${simpi.alias}`;
            const modalRef = this.modalService.open(_components_modals_share_item_modal_share_item_modal_component__WEBPACK_IMPORTED_MODULE_3__["ShareItemModalComponent"]);
            modalRef.componentInstance.sharedUrl = url;
        }
    }
    changeSimpiSettings(paramsJson) {
        if (paramsJson) {
            const brandAlias = paramsJson.brandAlias;
            const productAlias = paramsJson.productAlias;
            const simpiAlias = paramsJson.simpiAlias;
            this.router
                .navigate([
                `${brandAlias}/cockpit/products/${productAlias}/simpis/${simpiAlias}/settings`,
            ])
                .catch(console.error);
        }
    }
    deleteSimpi(simpi) {
        if (simpi) {
            console.log(this.simpiService);
            this.simpiService
                .deleteSimpi(simpi.simpiId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])(() => this.componentActive))
                .subscribe();
        }
    }
    cloneSimpi(simpi) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!simpi) {
                return;
            }
            const { brandAlias } = this.route.root.firstChild.snapshot.params;
            const brand = yield this.brandService
                .getBrandByAlias(brandAlias)
                .toPromise();
            const targets = yield this.productService
                .getProducts(brand.brandId, false, true)
                .toPromise();
            const modalRef = this.modalService.open(_products_components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_4__["ProductListComponent"], {
                centered: true,
            });
            modalRef.componentInstance.products = targets;
            modalRef.componentInstance.onSelectProduct.subscribe((productId) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                modalRef.close();
                let startTime = Date.now();
                yield this.simpiService
                    .cloneSimpi(simpi.simpiId, productId)
                    .toPromise()
                    .then(() => {
                    const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
                    alert(`SIMPI cloned successfully in ${secondsElapsed}s.`);
                })
                    .catch((reason) => {
                    var _a, _b;
                    alert(`Error cloning SIMPI: "${(_a = reason === null || reason === void 0 ? void 0 : reason.statusText) !== null && _a !== void 0 ? _a : "Unknown error"}" (${(_b = reason === null || reason === void 0 ? void 0 : reason.error) !== null && _b !== void 0 ? _b : reason}).`);
                });
            }));
        });
    }
    //for ProductOverviewPage (products in overview)
    changeProductSettings(productId, route) {
        this.router
            .navigate(["settings"], { relativeTo: route })
            .catch(console.error);
    }
    shareProduct() {
        if (this.product) {
            const text = this.product.productName
                ? `Check out this how-to! ${this.product.productName}`
                : undefined;
            const url = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl}/${this.product.brandAlias}/product/${this.product.productAlias}/overview`;
            this.shareService.share(this.product.productName, text, url);
        }
    }
    showProductSettings(paramsJson) {
        const brandAlias = paramsJson.brandAlias;
        const productAlias = paramsJson.productAlias;
        this.router
            .navigate([`${brandAlias}/cockpit/products/${productAlias}/settings`], {
            queryParams: { parent: "overview" },
        })
            .catch(console.error);
    }
    navigateToProductSettings(productAlias, route) {
        this.router
            .navigate([productAlias, "settings"], { relativeTo: route })
            .catch(console.error);
    }
    onDeleteProduct(id) {
        this.productService.setSelectedProduct(null);
        this.productService
            .deleteProduct(id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])(() => this._componentActive))
            .subscribe();
    }
    onSaveProduct() {
        this._savedProduct = false;
        const productToUpdate = {
            deploymentState: this.productForm.get("deploymentState").value,
            productImageId: this.productForm.get("productImageId").value,
            productPageImageId: this.productForm.get("productPageImageId").value,
            productName: this.productForm.get("productName").value,
        };
    }
}
DropdownMenuHelperService.ɵfac = function DropdownMenuHelperService_Factory(t) { return new (t || DropdownMenuHelperService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_share_service__WEBPACK_IMPORTED_MODULE_7__["ShareService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_9__["SimpiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](projects_simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_10__["BrandService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](projects_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_11__["ProductService"])); };
DropdownMenuHelperService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DropdownMenuHelperService, factory: DropdownMenuHelperService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DropdownMenuHelperService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: "root",
            }]
    }], function () { return [{ type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"] }, { type: _share_service__WEBPACK_IMPORTED_MODULE_7__["ShareService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] }, { type: projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_9__["SimpiService"] }, { type: projects_simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_10__["BrandService"] }, { type: projects_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_11__["ProductService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=default~analytics-analytics-module~products-products-module-es2015.js.map