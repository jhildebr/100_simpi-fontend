(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["products-products-module"],{

/***/ "./src/app/products/components/deleted-product-overview/deleted-product-overview.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/products/components/deleted-product-overview/deleted-product-overview.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: DeletedProductOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletedProductOverviewComponent", function() { return DeletedProductOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _shared_components_context_menu_sim_context_menu_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/components/context-menu/sim-context-menu.component */ "./src/app/shared/components/context-menu/sim-context-menu.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "../../node_modules/@fortawesome/angular-fontawesome/__ivy_ngcc__/fesm2015/angular-fontawesome.js");





function DeletedProductOverviewComponent_div_1_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 9);
} if (rf & 2) {
    const product_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", product_r1.productImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", "Product image of " + product_r1.productName);
} }
const _c0 = function () { return ["fas", "image"]; };
function DeletedProductOverviewComponent_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "fa-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
} }
function DeletedProductOverviewComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DeletedProductOverviewComponent_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const product_r1 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.showSimpis(product_r1.productId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, DeletedProductOverviewComponent_div_1_img_2_Template, 1, 2, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, DeletedProductOverviewComponent_div_1_div_3_Template, 3, 2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "sim-context-menu", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const product_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", product_r1.productImageUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !product_r1.productImageUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("menuEntries", ctx_r0.contextMenuEntries)("menuEntryClickHandlerParameter", product_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](product_r1.productName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", product_r1.simpiCount + (product_r1.simpiCount === 1 ? " Simpi" : " Simpies"), " ");
} }
class DeletedProductOverviewComponent {
    constructor() {
        this.restoreProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onShowSimpis = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.contextMenuEntries = [
            { text: 'Restore', clickHandler: product => this.restoreProduct.emit(product), iconUrl: 'assets/svg/restore.svg' },
        ];
    }
    showSimpis(productId) {
        this.onShowSimpis.emit(productId);
    }
}
DeletedProductOverviewComponent.ɵfac = function DeletedProductOverviewComponent_Factory(t) { return new (t || DeletedProductOverviewComponent)(); };
DeletedProductOverviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DeletedProductOverviewComponent, selectors: [["sim-deleted-product-overview"]], inputs: { products: "products" }, outputs: { restoreProduct: "restoreProduct", onShowSimpis: "onShowSimpis" }, decls: 2, vars: 1, consts: [[1, "product-container"], ["class", "product-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "product-item", 3, "click"], [1, "product-image-container"], ["class", "product-image", 3, "src", "alt", 4, "ngIf"], ["class", "no-image-box", 4, "ngIf"], [3, "menuEntries", "menuEntryClickHandlerParameter"], [1, "product-name"], [1, "simpis-count"], [1, "product-image", 3, "src", "alt"], [1, "no-image-box"], [1, "no-image-icon"], ["size", "2x", 3, "icon"]], template: function DeletedProductOverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DeletedProductOverviewComponent_div_1_Template, 9, 6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.products);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _shared_components_context_menu_sim_context_menu_component__WEBPACK_IMPORTED_MODULE_2__["SimContextMenu"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FaIconComponent"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DeletedProductOverviewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'sim-deleted-product-overview',
                templateUrl: './deleted-product-overview.component.html',
            }]
    }], null, { products: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], restoreProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], onShowSimpis: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/products/components/product-details/product-details.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/products/components/product-details/product-details.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ProductDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsComponent", function() { return ProductDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/overlay */ "../../node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/overlay.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ "../../node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/portal.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _webPlayer_components_webplayer_webplayer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../webPlayer/components/webplayer/webplayer.component */ "./src/app/webPlayer/components/webplayer/webplayer.component.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_shared_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/shared/constants */ "../simpi-frontend-common/src/lib/shared/constants.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _shared_components_modals_privacy_modal_privacy_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/components/modals/privacy-modal/privacy-modal.component */ "./src/app/shared/components/modals/privacy-modal/privacy-modal.component.ts");
/* harmony import */ var projects_simpi_frontend_common_src_step_editor_components_containScaleStrategy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! projects/simpi-frontend-common/src/step-editor/components/containScaleStrategy */ "../simpi-frontend-common/src/step-editor/components/containScaleStrategy.ts");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/platform */ "../../node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/platform.js");
/* harmony import */ var ng2_dragula__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-dragula */ "../../node_modules/ng2-dragula/__ivy_ngcc__/dist/fesm2015/ng2-dragula.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! projects/simpi-frontend-common/src/lib/services/simpis/simpi.service */ "../simpi-frontend-common/src/lib/services/simpis/simpi.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _shared_components_deployment_state_icon_sim_deployment_state_icon_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../shared/components/deployment-state-icon/sim-deployment-state-icon.component */ "./src/app/shared/components/deployment-state-icon/sim-deployment-state-icon.component.ts");
/* harmony import */ var _shared_directives_delay_drag_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../shared/directives/delay-drag.directive */ "./src/app/shared/directives/delay-drag.directive.ts");
/* harmony import */ var _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../shared/components/card/card.component */ "./src/app/shared/components/card/card.component.ts");
/* harmony import */ var _shared_components_context_menu_sim_context_menu_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../shared/components/context-menu/sim-context-menu.component */ "./src/app/shared/components/context-menu/sim-context-menu.component.ts");





















const _c0 = ["productNameInput"];
function ProductDetailsComponent_ng_container_0_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 13);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r3.product.productPageImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function ProductDetailsComponent_ng_container_0_sim_deployment_state_icon_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "sim-deployment-state-icon", 14);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("deploymentState", ctx_r4.product.deploymentState);
} }
function ProductDetailsComponent_ng_container_0_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductDetailsComponent_ng_container_0_div_4_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r13.changeProductPageImageClicked(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProductDetailsComponent_ng_container_0_h1_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductDetailsComponent_ng_container_0_h1_6_Template_h1_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r15.onProductNameClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6.product.productName);
} }
function ProductDetailsComponent_ng_container_0_input_7_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 18, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup.enter", function ProductDetailsComponent_ng_container_0_input_7_Template_input_keyup_enter_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r18.updateProductName(); })("blur", function ProductDetailsComponent_ng_container_0_input_7_Template_input_blur_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r20.updateProductName(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r7.productNameFormControl);
} }
function ProductDetailsComponent_ng_container_0_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductDetailsComponent_ng_container_0_div_8_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r21.onChangeProductSettingsClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductDetailsComponent_ng_container_0_div_8_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r23.addSimpi(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "+ \u00A0 Add SIMPI");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProductDetailsComponent_ng_container_0_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "There's nothing here but potential");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Add your first SIMPI by clicking the + Add SIMPI button.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProductDetailsComponent_ng_container_0_ng_container_11_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function ProductDetailsComponent_ng_container_0_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dragulaModelChange", function ProductDetailsComponent_ng_container_0_ng_container_11_Template_div_dragulaModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r25.simpis = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProductDetailsComponent_ng_container_0_ng_container_11_ng_container_2_Template, 1, 0, "ng-container", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dragula", ctx_r10.draggableGroupName)("dragulaModel", ctx_r10.simpis);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r1);
} }
function ProductDetailsComponent_ng_container_0_ng_template_12_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function ProductDetailsComponent_ng_container_0_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProductDetailsComponent_ng_container_0_ng_template_12_ng_container_1_Template, 1, 0, "ng-container", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r1);
} }
function ProductDetailsComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProductDetailsComponent_ng_container_0_img_2_Template, 1, 1, "img", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProductDetailsComponent_ng_container_0_sim_deployment_state_icon_3_Template, 1, 1, "sim-deployment-state-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ProductDetailsComponent_ng_container_0_div_4_Template, 2, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ProductDetailsComponent_ng_container_0_h1_6_Template, 2, 1, "h1", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ProductDetailsComponent_ng_container_0_input_7_Template, 2, 1, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ProductDetailsComponent_ng_container_0_div_8_Template, 5, 0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ProductDetailsComponent_ng_container_0_div_9_Template, 6, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ProductDetailsComponent_ng_container_0_ng_container_11_Template, 3, 3, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ProductDetailsComponent_ng_container_0_ng_template_12_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](13);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.product.productPageImageUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.readonly);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.readonly);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.editProductName && !ctx_r0.product.hideTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.editProductName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.readonly);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isLoaded && (!ctx_r0.simpiGroups || ctx_r0.simpiGroups.length === 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.readonly)("ngIfElse", _r11);
} }
function ProductDetailsComponent_ng_template_1_div_0_sim_card_4_div_1_sim_context_menu_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "sim-context-menu", 37);
} if (rf & 2) {
    const simpi_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("menuEntries", ctx_r33.contextMenuEntries)("menuEntryClickHandlerParameter", simpi_r31);
} }
function ProductDetailsComponent_ng_template_1_div_0_sim_card_4_div_1_sim_context_menu_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "sim-context-menu", 37);
} if (rf & 2) {
    const simpi_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("menuEntries", ctx_r34.deletedSimpiContextMenuEntries)("menuEntryClickHandlerParameter", simpi_r31);
} }
function ProductDetailsComponent_ng_template_1_div_0_sim_card_4_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "sim-deployment-state-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProductDetailsComponent_ng_template_1_div_0_sim_card_4_div_1_sim_context_menu_2_Template, 1, 2, "sim-context-menu", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProductDetailsComponent_ng_template_1_div_0_sim_card_4_div_1_sim_context_menu_3_Template, 1, 2, "sim-context-menu", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const simpi_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("deploymentState", simpi_r31.deploymentInfo == null ? null : simpi_r31.deploymentInfo.deploymentState)("clickHandler", ctx_r32.deploymentIconClickHandler)("clickHandlerParameter", simpi_r31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !simpi_r31.deleted);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", simpi_r31.deleted);
} }
function ProductDetailsComponent_ng_template_1_div_0_sim_card_4_Template(rf, ctx) { if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "sim-card", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousedown", function ProductDetailsComponent_ng_template_1_div_0_sim_card_4_Template_sim_card_mousedown_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r39); const simpi_r31 = ctx.$implicit; const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r38.mousedown(simpi_r31.simpiId); })("mouseup", function ProductDetailsComponent_ng_template_1_div_0_sim_card_4_Template_sim_card_mouseup_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r39); const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r40.mouseup($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProductDetailsComponent_ng_template_1_div_0_sim_card_4_div_1_Template, 4, 5, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const simpi_r31 = ctx.$implicit;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("text", simpi_r31.title)("imageUrl", simpi_r31.thumbnailUrl)("placeholderBackgroundColor", simpi_r31.iconColor)("LabelColor", ctx_r30.product.brandPrimaryColor)("brand", ctx_r30.product.brandName)("numberOfSteps", simpi_r31.stepCount)("id", simpi_r31.simpiId)("stepsLabelClickHandler", ctx_r30.stepsLabelClickHandler)("clickHandlerParameter", simpi_r31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r30.readonly);
} }
function ProductDetailsComponent_ng_template_1_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ProductDetailsComponent_ng_template_1_div_0_sim_card_4_Template, 2, 10, "sim-card", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const simpiGroup_r29 = ctx.$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("delayDrag", ctx_r28.dragStartDelay);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](simpiGroup_r29.groupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", simpiGroup_r29.simpis);
} }
function ProductDetailsComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ProductDetailsComponent_ng_template_1_div_0_Template, 5, 3, "div", 28);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.simpiGroups)("ngForTrackBy", ctx_r2.trackBy);
} }
class ProductDetailsComponent {
    constructor(overlay, platform, dragulaService, modalService, simpiService) {
        this.overlay = overlay;
        this.platform = platform;
        this.dragulaService = dragulaService;
        this.modalService = modalService;
        this.simpiService = simpiService;
        this._componentActive = true;
        this._overlayShown = false;
        this.editProductName = false;
        this.contextMenuEntries = [
            {
                text: 'Edit steps',
                clickHandler: (simpiStats) => this.editSimpiSteps.emit({
                    simpiAlias: simpiStats.alias,
                    productAlias: this.product.productAlias,
                    brandAlias: this.product.brandAlias,
                }),
                iconUrl: 'assets/svg/edit.svg',
            },
            {
                text: 'Create QR code',
                clickHandler: (simpiStats) => this.shareQRSimpi.emit(simpiStats),
                iconUrl: 'assets/svg/scaner-barcode.svg',
            },
            {
                text: 'Share SIMPI',
                clickHandler: (simpiStats) => this.shareSimpi.emit(simpiStats),
                iconUrl: 'assets/svg/share.svg',
            },
            {
                text: 'Clone SIMPI',
                clickHandler: (simpiStats) => this.cloneSimpi.emit(simpiStats),
                iconUrl: 'assets/svg/clone.svg',
            },
            {
                text: 'Settings',
                clickHandler: (simpiStats) => {
                    this.changeSimpiSettings.emit({
                        simpiAlias: simpiStats.alias,
                        productAlias: this.product.productAlias,
                        brandAlias: this.product.brandAlias,
                    });
                },
                iconUrl: 'assets/svg/edit.svg',
            },
            {
                text: 'Delete',
                clickHandler: (simpiStats) => this.deleteSimpi.emit(simpiStats),
                iconUrl: 'assets/svg/delete.svg',
            },
        ];
        this.deletedSimpiContextMenuEntries = [
            {
                text: 'Restore',
                clickHandler: (simpiStats) => this.restoreSimpi.emit(simpiStats),
                iconUrl: 'assets/svg/restore.svg',
            },
        ];
        this.dragStartDelay = 500;
        this.draggableId = _simpi_frontend_common_src_lib_shared_constants__WEBPACK_IMPORTED_MODULE_5__["EMPTY_GUID"];
        this.draggableGroupName = 'SIMPIS';
        this.readonly = true;
        this.isLoaded = false;
        this.shareProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editSimpiSteps = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.shareQRSimpi = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.shareSimpi = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cloneSimpi = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changeSimpiSettings = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.deleteSimpi = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.restoreSimpi = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changeProductPageImage = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changeProductName = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changeProductSettings = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onAddSimpi = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changeOrder = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.deploymentIconClickHandler = (simpi) => simpi.deleted
            ? this.restoreSimpi.emit(simpi)
            : this.showPrivacyModal(simpi);
        this.stepsLabelClickHandler = (simpi) => this.editSimpiSteps.emit({
            simpiAlias: simpi.alias,
            productAlias: this.product.productAlias,
            brandAlias: this.product.brandAlias,
        });
    }
    ngOnInit() {
        this.editProductName = false;
        this.dragulaService.createGroup(this.draggableGroupName, {
            copy: false,
            delay: this.dragStartDelay,
        });
        this.dragulaService
            .dropModel(this.draggableGroupName)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(100), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._componentActive))
            .subscribe(() => {
            const idsAndIndexes = this.simpiGroupsToChangeOrderRequestArray(this.simpiGroups);
            this.changeOrder.emit(idsAndIndexes);
        });
    }
    trackBy(index, simpi) {
        return simpi.simpiId;
    }
    ngAfterViewInit() {
        this.componentPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["ComponentPortal"](_webPlayer_components_webplayer_webplayer_component__WEBPACK_IMPORTED_MODULE_4__["WebplayerComponent"]);
    }
    mousedown(simpiId) {
        this.draggableId = _simpi_frontend_common_src_lib_shared_constants__WEBPACK_IMPORTED_MODULE_5__["EMPTY_GUID"];
        this._selectedSimpiId = simpiId;
        const isMobile = this.platform.ANDROID || this.platform.IOS;
        if (isMobile) {
            event.preventDefault();
        }
        this._timer = setTimeout(() => {
            this.draggableId = simpiId;
        }, this.dragStartDelay);
    }
    mouseup(e) {
        const target = e.target;
        if (target.classList.contains('dropdown-toggle')) {
            return;
        }
        clearTimeout(this._timer);
        if (this.draggableId === _simpi_frontend_common_src_lib_shared_constants__WEBPACK_IMPORTED_MODULE_5__["EMPTY_GUID"]) {
            this.selectSimpi(this._selectedSimpiId);
        }
    }
    selectSimpi(simpiId) {
        this._overlayShown = true;
        const isMobile = this.platform.ANDROID || this.platform.IOS;
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const configs = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayConfig"]({
            hasBackdrop: true,
            backdropClass: 'overlay-background',
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: isMobile ? '100%' : '92vw',
            height: isMobile ? '100%' : '92vh',
            positionStrategy,
            disposeOnNavigation: true,
        });
        if (!this._overlayRef) {
            this._overlayRef = this.overlay.create(configs);
        }
        if (!this.componentPortal.isAttached) {
            this._componentRef = this.componentPortal.attach(this._overlayRef);
            this.subscribeToClose();
            this.subscribeToBackdrop();
            this.subscribeToShare();
        }
        this._componentRef.instance.simpiId = simpiId;
        this._componentRef.instance.scaleStrategy = new projects_simpi_frontend_common_src_step_editor_components_containScaleStrategy__WEBPACK_IMPORTED_MODULE_8__["ContainScaleStrategy"]();
    }
    showPrivacyModal(simpi) {
        const modalRef = this.modalService.open(_shared_components_modals_privacy_modal_privacy_modal_component__WEBPACK_IMPORTED_MODULE_7__["PrivacyModalComponent"]);
        modalRef.componentInstance.targetType = 'Simpi';
        modalRef.componentInstance.targetName = simpi.title;
        modalRef.componentInstance.selection = simpi.deploymentInfo.deploymentState;
        modalRef.result.then((deploymentState) => {
            this.simpiService
                .changeSimpiDeploymentInfo(simpi.simpiId, deploymentState)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._componentActive))
                .subscribe();
        });
    }
    subscribeToClose() {
        this._componentRef.instance.close
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._overlayShown))
            .subscribe(() => {
            this.closePlayer();
        });
    }
    subscribeToShare() {
        this._componentRef.instance.share
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._overlayShown))
            .subscribe(() => {
            this.shareProduct.emit();
        });
    }
    subscribeToBackdrop() {
        this._overlayRef
            .backdropClick()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._overlayShown))
            .subscribe(() => {
            this.closePlayer();
        });
    }
    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
        this._componentActive = false;
        this.dragulaService.destroy(this.draggableGroupName);
    }
    closePlayer() {
        this._overlayShown = false;
        if (this.componentPortal.isAttached) {
            this.componentPortal.detach();
        }
        this._componentRef.onDestroy(null);
        this._componentRef.destroy();
        this._overlayRef = undefined;
    }
    addSimpi() {
        this.onAddSimpi.emit();
    }
    changeProductPageImageClicked() {
        this.changeProductPageImage.emit();
    }
    onProductNameClick() {
        var _a, _b;
        if (!this.readonly) {
            this.productNameFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]((_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.productName) !== null && _b !== void 0 ? _b : '', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required);
            this.editProductName = true;
            window.setTimeout(() => {
                var _a, _b;
                (_b = (_a = this.productNameInput) === null || _a === void 0 ? void 0 : _a.nativeElement) === null || _b === void 0 ? void 0 : _b.focus();
            }, 0);
        }
    }
    updateProductName() {
        if (!this.readonly) {
            if (this.productNameFormControl.valid) {
                this.editProductName = false;
                this.changeProductName.emit(this.productNameFormControl.value);
            }
        }
    }
    onChangeProductSettingsClick() {
        if (!this.readonly && this.product) {
            this.changeProductSettings.emit(this.product.productId);
        }
    }
    simpiGroupsToChangeOrderRequestArray(simpiGroups) {
        return simpiGroups.reduce((a, val) => a.concat(val.simpis), [])
            .map((simpiResponse, index) => {
            return { objectId: simpiResponse.simpiId, positionIndex: index };
        });
    }
}
ProductDetailsComponent.ɵfac = function ProductDetailsComponent_Factory(t) { return new (t || ProductDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_9__["Platform"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ng2_dragula__WEBPACK_IMPORTED_MODULE_10__["DragulaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_12__["SimpiService"])); };
ProductDetailsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductDetailsComponent, selectors: [["sim-product-details"]], viewQuery: function ProductDetailsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.productNameInput = _t.first);
    } }, inputs: { product: "product", simpis: "simpis", simpiGroups: "simpiGroups", readonly: "readonly", isLoaded: "isLoaded" }, outputs: { shareProduct: "shareProduct", editSimpiSteps: "editSimpiSteps", shareQRSimpi: "shareQRSimpi", shareSimpi: "shareSimpi", cloneSimpi: "cloneSimpi", changeSimpiSettings: "changeSimpiSettings", deleteSimpi: "deleteSimpi", restoreSimpi: "restoreSimpi", changeProductPageImage: "changeProductPageImage", changeProductName: "changeProductName", changeProductSettings: "changeProductSettings", onAddSimpi: "onAddSimpi", changeOrder: "changeOrder" }, decls: 3, vars: 1, consts: [[4, "ngIf"], ["simpiList", ""], [1, "d-flex", "justify-content-center", "product-page-container"], ["class", "img-fluid product-page-image", "alt", "product cover image", 3, "src", 4, "ngIf"], ["class", "deploymentState-icon", 3, "deploymentState", 4, "ngIf"], ["class", "circle-icon-button", "role", "button", 3, "click", 4, "ngIf"], [1, "product-title"], [3, "click", 4, "ngIf"], ["type", "text", "class", "product-name-input", "autofocus", "", 3, "formControl", "keyup.enter", "blur", 4, "ngIf"], ["class", "product-controls", 4, "ngIf"], [1, "simpi-container", "container-fluid"], [4, "ngIf", "ngIfElse"], ["public", ""], ["alt", "product cover image", 1, "img-fluid", "product-page-image", 3, "src"], [1, "deploymentState-icon", 3, "deploymentState"], ["role", "button", 1, "circle-icon-button", 3, "click"], ["src", "assets/svg/camera.svg", "alt", "Edit image icon"], [3, "click"], ["type", "text", "autofocus", "", 1, "product-name-input", 3, "formControl", "keyup.enter", "blur"], ["productNameInput", ""], [1, "product-controls"], ["role", "button", "title", "Product Settings", 1, "icon-button", 3, "click"], ["src", "assets/svg/edit.svg", "alt", "Edit icon"], [1, "simpi-button-dark", 3, "click"], ["src", "./assets/images/how_to.png", "alt", "how to", 1, "mx-auto", "d-block", "w-25", "my-5"], [1, "text-center"], [3, "dragula", "dragulaModel", "dragulaModelChange"], [4, "ngTemplateOutlet"], ["class", "simpi-group-container", 3, "delayDrag", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "simpi-group-container", 3, "delayDrag"], [1, "row", "row-cols-lg-5", "row-cols-md-4", "row-cols-sm-3", "row-cols-2"], ["class", "col simpi-group-form", 3, "text", "imageUrl", "placeholderBackgroundColor", "LabelColor", "brand", "numberOfSteps", "id", "stepsLabelClickHandler", "clickHandlerParameter", "mousedown", "mouseup", 4, "ngFor", "ngForOf"], [1, "col", "simpi-group-form", 3, "text", "imageUrl", "placeholderBackgroundColor", "LabelColor", "brand", "numberOfSteps", "id", "stepsLabelClickHandler", "clickHandlerParameter", "mousedown", "mouseup"], ["class", "simpi-controls", 4, "ngIf"], [1, "simpi-controls"], [1, "deploymentState-icon", "small", 3, "deploymentState", "clickHandler", "clickHandlerParameter"], [3, "menuEntries", "menuEntryClickHandlerParameter", 4, "ngIf"], [3, "menuEntries", "menuEntryClickHandlerParameter"]], template: function ProductDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ProductDetailsComponent_ng_container_0_Template, 14, 9, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProductDetailsComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.product);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__["NgIf"], _shared_components_deployment_state_icon_sim_deployment_state_icon_component__WEBPACK_IMPORTED_MODULE_14__["DeploymentStateIconComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlDirective"], ng2_dragula__WEBPACK_IMPORTED_MODULE_10__["DragulaDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgTemplateOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgForOf"], _shared_directives_delay_drag_directive__WEBPACK_IMPORTED_MODULE_15__["DelayDragDirective"], _shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_16__["CardComponent"], _shared_components_context_menu_sim_context_menu_component__WEBPACK_IMPORTED_MODULE_17__["SimContextMenu"]], styles: [".product-page-container[_ngcontent-%COMP%] {\n  width: 100%;\n  position: relative;\n}\n@media (max-width: 767.98px) {\n  .product-page-container[_ngcontent-%COMP%] {\n    position: relative;\n    left: -15px;\n    right: -15px;\n    width: calc(100% + 30px);\n  }\n}\n.product-page-container[_ngcontent-%COMP%]   div.circle-icon-button[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 15px;\n  bottom: 15px;\n}\n.product-page-container[_ngcontent-%COMP%]   .deploymentState-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 15px;\n  right: 15px;\n}\n.product-title[_ngcontent-%COMP%] {\n  padding-top: 30px;\n  margin-bottom: 30px;\n  padding-bottom: 10px;\n  position: -webkit-sticky;\n  position: sticky;\n  top: -10px;\n  background-color: #ffffff;\n  z-index: 10;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n.product-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: Circular Std, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 26px;\n  line-height: 33px;\n  color: #000000;\n  padding: 1px 2px;\n}\n@media (max-width: 991.98px) {\n  .product-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n    line-height: 23px;\n    color: var(--simpi-color-dark-blue-7);\n  }\n}\n.product-title[_ngcontent-%COMP%]   input.product-name-input[_ngcontent-%COMP%] {\n  width: 400px;\n  font-family: Circular Std, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 26px;\n  line-height: 33px;\n  color: #000000;\n  margin-bottom: 0.5rem;\n  border: none;\n  padding: 1px 2px;\n}\n.product-title[_ngcontent-%COMP%]   input.product-name-input[_ngcontent-%COMP%]:focus {\n  border: none;\n}\n@media (max-width: 991.98px) {\n  .product-title[_ngcontent-%COMP%]   input.product-name-input[_ngcontent-%COMP%] {\n    font-size: 18px;\n    line-height: 23px;\n    color: var(--simpi-color-dark-blue-7);\n  }\n}\n.product-title[_ngcontent-%COMP%]   .product-controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 24px;\n}\n.simpi-element[_ngcontent-%COMP%] {\n  position: relative;\n}\n.simpi-element[_ngcontent-%COMP%]   .deploymentState-icon[_ngcontent-%COMP%] {\n  top: 8px;\n  right: 8px;\n}\n@media (max-width: 991.98px) {\n  .simpi-element[_ngcontent-%COMP%]   .deploymentState-icon[_ngcontent-%COMP%] {\n    right: 40px;\n  }\n}\n.simpi-group-container[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\nh3[_ngcontent-%COMP%] {\n  color: #000000;\n}\nh4[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n  color: #000000;\n}\n@media (max-width: 991.98px) {\n  h4[_ngcontent-%COMP%] {\n    font-size: 18px;\n    line-height: 23px;\n    color: var(--simpi-color-dark-blue-7);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL3NpbXBpLWZyb250ZW5kLXdlYi9zcmMvYXBwL3Byb2R1Y3RzL2NvbXBvbmVudHMvcHJvZHVjdC1kZXRhaWxzL3Byb2R1Y3QtZGV0YWlscy5jb21wb25lbnQuc2NzcyIsIm5vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9taXhpbnMvX2JyZWFrcG9pbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0U7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFKSjtBQ3NFSTtFRHBFRjtJQUtJLGtCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSx3QkFBQTtFQUhKO0FBQ0Y7QUFLSTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFITjtBQU1JO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtBQUpOO0FBVUE7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSx3QkFBQTtFQUFBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtBQVJGO0FBVUU7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUFSSjtBQzZCSTtFRGxCRTtJQUNFLGVBQUE7SUFDQSxpQkFBQTtJQUNBLHFDQUFBO0VBUk47QUFDRjtBQVlFO0VBQ0UsWUFBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQVZKO0FBWUk7RUFDRSxZQUFBO0FBVk47QUNPSTtFRE9FO0lBQ0UsZUFBQTtJQUNBLGlCQUFBO0lBQ0EscUNBQUE7RUFYTjtBQUNGO0FBZUU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7QUFiSjtBQWlCQTtFQUNFLGtCQUFBO0FBZEY7QUFnQkU7RUFDRSxRQUFBO0VBQ0EsVUFBQTtBQWRKO0FDaEJJO0VEaUNFO0lBQ0UsV0FBQTtFQWROO0FBQ0Y7QUFtQkE7RUFDRSxtQkFBQTtBQWhCRjtBQW1CQTtFQUNFLGNBQUE7QUFoQkY7QUFtQkE7RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUFoQkY7QUNsQ0k7RURvREE7SUFDRSxlQUFBO0lBQ0EsaUJBQUE7SUFDQSxxQ0FBQTtFQWZKO0FBQ0YiLCJmaWxlIjoicHJvamVjdHMvc2ltcGktZnJvbnRlbmQtd2ViL3NyYy9hcHAvcHJvZHVjdHMvY29tcG9uZW50cy9wcm9kdWN0LWRldGFpbHMvcHJvZHVjdC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIn5ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnNcIjtcclxuQGltcG9ydCBcIn5ib290c3RyYXAvc2Nzcy92YXJpYWJsZXNcIjtcclxuQGltcG9ydCBcIn5ib290c3RyYXAvc2Nzcy9taXhpbnMvYnJlYWtwb2ludHNcIjtcclxuXHJcbi5wcm9kdWN0LXBhZ2Uge1xyXG4gICYtY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgIEBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtZG93bihzbSkge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIGxlZnQ6IC0xNXB4O1xyXG4gICAgICByaWdodDogLTE1cHg7XHJcbiAgICAgIHdpZHRoOiBjYWxjKDEwMCUgKyAzMHB4KTtcclxuICAgIH1cclxuXHJcbiAgICBkaXYuY2lyY2xlLWljb24tYnV0dG9uIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICByaWdodDogMTVweDtcclxuICAgICAgYm90dG9tOiAxNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5kZXBsb3ltZW50U3RhdGUtaWNvbiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAxNXB4O1xyXG4gICAgICByaWdodDogMTVweDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XHJcblxyXG4ucHJvZHVjdC10aXRsZSB7XHJcbiAgcGFkZGluZy10b3A6IDMwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICBwb3NpdGlvbjogc3RpY2t5O1xyXG4gIHRvcDogLTEwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICB6LWluZGV4OiAxMDtcclxuXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtZmFtaWx5OiBDaXJjdWxhciBTdGQsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDMzcHg7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgIHBhZGRpbmc6IDFweCAycHg7XHJcblxyXG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKG1kKSB7XHJcbiAgICAgICYge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMjNweDtcclxuICAgICAgICBjb2xvcjogdmFyKC0tc2ltcGktY29sb3ItZGFyay1ibHVlLTcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlucHV0LnByb2R1Y3QtbmFtZS1pbnB1dCB7XHJcbiAgICB3aWR0aDogNDAwcHg7XHJcbiAgICBmb250LWZhbWlseTogQ2lyY3VsYXIgU3RkLCBzYW5zLXNlcmlmO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAzM3B4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBwYWRkaW5nOiAxcHggMnB4O1xyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKG1kKSB7XHJcbiAgICAgICYge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMjNweDtcclxuICAgICAgICBjb2xvcjogdmFyKC0tc2ltcGktY29sb3ItZGFyay1ibHVlLTcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5wcm9kdWN0LWNvbnRyb2xzIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIGdhcDogMjRweDtcclxuICB9XHJcbn1cclxuXHJcbi5zaW1waS1lbGVtZW50IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gIC5kZXBsb3ltZW50U3RhdGUtaWNvbiB7XHJcbiAgICB0b3A6IDhweDtcclxuICAgIHJpZ2h0OiA4cHg7XHJcblxyXG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKG1kKSB7XHJcbiAgICAgICYge1xyXG4gICAgICAgIHJpZ2h0OiA0MHB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uc2ltcGktZ3JvdXAtY29udGFpbmVyIHtcclxuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xyXG59XHJcblxyXG5oMyB7XHJcbiAgY29sb3I6ICMwMDAwMDA7XHJcbn1cclxuXHJcbmg0IHtcclxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG4gIEBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtZG93bihtZCkge1xyXG4gICAgJiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDIzcHg7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1zaW1waS1jb2xvci1kYXJrLWJsdWUtNylcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gQnJlYWtwb2ludCB2aWV3cG9ydCBzaXplcyBhbmQgbWVkaWEgcXVlcmllcy5cbi8vXG4vLyBCcmVha3BvaW50cyBhcmUgZGVmaW5lZCBhcyBhIG1hcCBvZiAobmFtZTogbWluaW11bSB3aWR0aCksIG9yZGVyIGZyb20gc21hbGwgdG8gbGFyZ2U6XG4vL1xuLy8gICAgKHhzOiAwLCBzbTogNTc2cHgsIG1kOiA3NjhweCwgbGc6IDk5MnB4LCB4bDogMTIwMHB4KVxuLy9cbi8vIFRoZSBtYXAgZGVmaW5lZCBpbiB0aGUgYCRncmlkLWJyZWFrcG9pbnRzYCBnbG9iYWwgdmFyaWFibGUgaXMgdXNlZCBhcyB0aGUgYCRicmVha3BvaW50c2AgYXJndW1lbnQgYnkgZGVmYXVsdC5cblxuLy8gTmFtZSBvZiB0aGUgbmV4dCBicmVha3BvaW50LCBvciBudWxsIGZvciB0aGUgbGFzdCBicmVha3BvaW50LlxuLy9cbi8vICAgID4+IGJyZWFrcG9pbnQtbmV4dChzbSlcbi8vICAgIG1kXG4vLyAgICA+PiBicmVha3BvaW50LW5leHQoc20sICh4czogMCwgc206IDU3NnB4LCBtZDogNzY4cHgsIGxnOiA5OTJweCwgeGw6IDEyMDBweCkpXG4vLyAgICBtZFxuLy8gICAgPj4gYnJlYWtwb2ludC1uZXh0KHNtLCAkYnJlYWtwb2ludC1uYW1lczogKHhzIHNtIG1kIGxnIHhsKSlcbi8vICAgIG1kXG5AZnVuY3Rpb24gYnJlYWtwb2ludC1uZXh0KCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzLCAkYnJlYWtwb2ludC1uYW1lczogbWFwLWtleXMoJGJyZWFrcG9pbnRzKSkge1xuICAkbjogaW5kZXgoJGJyZWFrcG9pbnQtbmFtZXMsICRuYW1lKTtcbiAgQHJldHVybiBpZigkbiAhPSBudWxsIGFuZCAkbiA8IGxlbmd0aCgkYnJlYWtwb2ludC1uYW1lcyksIG50aCgkYnJlYWtwb2ludC1uYW1lcywgJG4gKyAxKSwgbnVsbCk7XG59XG5cbi8vIE1pbmltdW0gYnJlYWtwb2ludCB3aWR0aC4gTnVsbCBmb3IgdGhlIHNtYWxsZXN0IChmaXJzdCkgYnJlYWtwb2ludC5cbi8vXG4vLyAgICA+PiBicmVha3BvaW50LW1pbihzbSwgKHhzOiAwLCBzbTogNTc2cHgsIG1kOiA3NjhweCwgbGc6IDk5MnB4LCB4bDogMTIwMHB4KSlcbi8vICAgIDU3NnB4XG5AZnVuY3Rpb24gYnJlYWtwb2ludC1taW4oJG5hbWUsICRicmVha3BvaW50czogJGdyaWQtYnJlYWtwb2ludHMpIHtcbiAgJG1pbjogbWFwLWdldCgkYnJlYWtwb2ludHMsICRuYW1lKTtcbiAgQHJldHVybiBpZigkbWluICE9IDAsICRtaW4sIG51bGwpO1xufVxuXG4vLyBNYXhpbXVtIGJyZWFrcG9pbnQgd2lkdGguIE51bGwgZm9yIHRoZSBsYXJnZXN0IChsYXN0KSBicmVha3BvaW50LlxuLy8gVGhlIG1heGltdW0gdmFsdWUgaXMgY2FsY3VsYXRlZCBhcyB0aGUgbWluaW11bSBvZiB0aGUgbmV4dCBvbmUgbGVzcyAwLjAycHhcbi8vIHRvIHdvcmsgYXJvdW5kIHRoZSBsaW1pdGF0aW9ucyBvZiBgbWluLWAgYW5kIGBtYXgtYCBwcmVmaXhlcyBhbmQgdmlld3BvcnRzIHdpdGggZnJhY3Rpb25hbCB3aWR0aHMuXG4vLyBTZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL21lZGlhcXVlcmllcy00LyNtcS1taW4tbWF4XG4vLyBVc2VzIDAuMDJweCByYXRoZXIgdGhhbiAwLjAxcHggdG8gd29yayBhcm91bmQgYSBjdXJyZW50IHJvdW5kaW5nIGJ1ZyBpbiBTYWZhcmkuXG4vLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3ODI2MVxuLy9cbi8vICAgID4+IGJyZWFrcG9pbnQtbWF4KHNtLCAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpKVxuLy8gICAgNzY3Ljk4cHhcbkBmdW5jdGlvbiBicmVha3BvaW50LW1heCgkbmFtZSwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbmV4dDogYnJlYWtwb2ludC1uZXh0KCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICBAcmV0dXJuIGlmKCRuZXh0LCBicmVha3BvaW50LW1pbigkbmV4dCwgJGJyZWFrcG9pbnRzKSAtIC4wMiwgbnVsbCk7XG59XG5cbi8vIFJldHVybnMgYSBibGFuayBzdHJpbmcgaWYgc21hbGxlc3QgYnJlYWtwb2ludCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIG5hbWUgd2l0aCBhIGRhc2ggaW4gZnJvbnQuXG4vLyBVc2VmdWwgZm9yIG1ha2luZyByZXNwb25zaXZlIHV0aWxpdGllcy5cbi8vXG4vLyAgICA+PiBicmVha3BvaW50LWluZml4KHhzLCAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpKVxuLy8gICAgXCJcIiAgKFJldHVybnMgYSBibGFuayBzdHJpbmcpXG4vLyAgICA+PiBicmVha3BvaW50LWluZml4KHNtLCAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpKVxuLy8gICAgXCItc21cIlxuQGZ1bmN0aW9uIGJyZWFrcG9pbnQtaW5maXgoJG5hbWUsICRicmVha3BvaW50czogJGdyaWQtYnJlYWtwb2ludHMpIHtcbiAgQHJldHVybiBpZihicmVha3BvaW50LW1pbigkbmFtZSwgJGJyZWFrcG9pbnRzKSA9PSBudWxsLCBcIlwiLCBcIi0jeyRuYW1lfVwiKTtcbn1cblxuLy8gTWVkaWEgb2YgYXQgbGVhc3QgdGhlIG1pbmltdW0gYnJlYWtwb2ludCB3aWR0aC4gTm8gcXVlcnkgZm9yIHRoZSBzbWFsbGVzdCBicmVha3BvaW50LlxuLy8gTWFrZXMgdGhlIEBjb250ZW50IGFwcGx5IHRvIHRoZSBnaXZlbiBicmVha3BvaW50IGFuZCB3aWRlci5cbkBtaXhpbiBtZWRpYS1icmVha3BvaW50LXVwKCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gICRtaW46IGJyZWFrcG9pbnQtbWluKCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICBAaWYgJG1pbiB7XG4gICAgQG1lZGlhIChtaW4td2lkdGg6ICRtaW4pIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuLy8gTWVkaWEgb2YgYXQgbW9zdCB0aGUgbWF4aW11bSBicmVha3BvaW50IHdpZHRoLiBObyBxdWVyeSBmb3IgdGhlIGxhcmdlc3QgYnJlYWtwb2ludC5cbi8vIE1ha2VzIHRoZSBAY29udGVudCBhcHBseSB0byB0aGUgZ2l2ZW4gYnJlYWtwb2ludCBhbmQgbmFycm93ZXIuXG5AbWl4aW4gbWVkaWEtYnJlYWtwb2ludC1kb3duKCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gICRtYXg6IGJyZWFrcG9pbnQtbWF4KCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICBAaWYgJG1heCB7XG4gICAgQG1lZGlhIChtYXgtd2lkdGg6ICRtYXgpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuLy8gTWVkaWEgdGhhdCBzcGFucyBtdWx0aXBsZSBicmVha3BvaW50IHdpZHRocy5cbi8vIE1ha2VzIHRoZSBAY29udGVudCBhcHBseSBiZXR3ZWVuIHRoZSBtaW4gYW5kIG1heCBicmVha3BvaW50c1xuQG1peGluIG1lZGlhLWJyZWFrcG9pbnQtYmV0d2VlbigkbG93ZXIsICR1cHBlciwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbWluOiBicmVha3BvaW50LW1pbigkbG93ZXIsICRicmVha3BvaW50cyk7XG4gICRtYXg6IGJyZWFrcG9pbnQtbWF4KCR1cHBlciwgJGJyZWFrcG9pbnRzKTtcblxuICBAaWYgJG1pbiAhPSBudWxsIGFuZCAkbWF4ICE9IG51bGwge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkbWluKSBhbmQgKG1heC13aWR0aDogJG1heCkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtYXggPT0gbnVsbCB7XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC11cCgkbG93ZXIsICRicmVha3BvaW50cykge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtaW4gPT0gbnVsbCB7XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKCR1cHBlciwgJGJyZWFrcG9pbnRzKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cblxuLy8gTWVkaWEgYmV0d2VlbiB0aGUgYnJlYWtwb2ludCdzIG1pbmltdW0gYW5kIG1heGltdW0gd2lkdGhzLlxuLy8gTm8gbWluaW11bSBmb3IgdGhlIHNtYWxsZXN0IGJyZWFrcG9pbnQsIGFuZCBubyBtYXhpbXVtIGZvciB0aGUgbGFyZ2VzdCBvbmUuXG4vLyBNYWtlcyB0aGUgQGNvbnRlbnQgYXBwbHkgb25seSB0byB0aGUgZ2l2ZW4gYnJlYWtwb2ludCwgbm90IHZpZXdwb3J0cyBhbnkgd2lkZXIgb3IgbmFycm93ZXIuXG5AbWl4aW4gbWVkaWEtYnJlYWtwb2ludC1vbmx5KCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gICRtaW46IGJyZWFrcG9pbnQtbWluKCRuYW1lLCAkYnJlYWtwb2ludHMpO1xuICAkbWF4OiBicmVha3BvaW50LW1heCgkbmFtZSwgJGJyZWFrcG9pbnRzKTtcblxuICBAaWYgJG1pbiAhPSBudWxsIGFuZCAkbWF4ICE9IG51bGwge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkbWluKSBhbmQgKG1heC13aWR0aDogJG1heCkge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtYXggPT0gbnVsbCB7XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC11cCgkbmFtZSwgJGJyZWFrcG9pbnRzKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2UgaWYgJG1pbiA9PSBudWxsIHtcbiAgICBAaW5jbHVkZSBtZWRpYS1icmVha3BvaW50LWRvd24oJG5hbWUsICRicmVha3BvaW50cykge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductDetailsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'sim-product-details',
                templateUrl: 'product-details.component.html',
                styleUrls: ['product-details.component.scss'],
            }]
    }], function () { return [{ type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"] }, { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_9__["Platform"] }, { type: ng2_dragula__WEBPACK_IMPORTED_MODULE_10__["DragulaService"] }, { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbModal"] }, { type: projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_12__["SimpiService"] }]; }, { product: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], simpis: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], simpiGroups: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], readonly: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], isLoaded: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], shareProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], editSimpiSteps: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], shareQRSimpi: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], shareSimpi: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], cloneSimpi: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], changeSimpiSettings: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], deleteSimpi: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], restoreSimpi: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], changeProductPageImage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], changeProductName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], changeProductSettings: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], onAddSimpi: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], changeOrder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], productNameInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['productNameInput']
        }] }); })();


/***/ }),

/***/ "./src/app/products/components/product-overview/product-overview.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/products/components/product-overview/product-overview.component.ts ***!
  \************************************************************************************/
/*! exports provided: ProductOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductOverviewComponent", function() { return ProductOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _shared_components_modals_share_item_modal_share_item_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/components/modals/share-item-modal/share-item-modal.component */ "./src/app/shared/components/modals/share-item-modal/share-item-modal.component.ts");
/* harmony import */ var _shared_components_modals_privacy_modal_privacy_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/modals/privacy-modal/privacy-modal.component */ "./src/app/shared/components/modals/privacy-modal/privacy-modal.component.ts");
/* harmony import */ var projects_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! projects/simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _shared_components_context_menu_sim_context_menu_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/components/context-menu/sim-context-menu.component */ "./src/app/shared/components/context-menu/sim-context-menu.component.ts");
/* harmony import */ var _shared_components_deployment_state_icon_sim_deployment_state_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/components/deployment-state-icon/sim-deployment-state-icon.component */ "./src/app/shared/components/deployment-state-icon/sim-deployment-state-icon.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "../../node_modules/@fortawesome/angular-fontawesome/__ivy_ngcc__/fesm2015/angular-fontawesome.js");












function ProductOverviewComponent_div_1_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 10);
} if (rf & 2) {
    const product_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", product_r1.productImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", "Product image of " + product_r1.productName);
} }
const _c0 = function () { return ["fas", "image"]; };
function ProductOverviewComponent_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "fa-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
} }
function ProductOverviewComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductOverviewComponent_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const product_r1 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.showSimpis(product_r1.productId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProductOverviewComponent_div_1_img_2_Template, 1, 2, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProductOverviewComponent_div_1_div_3_Template, 3, 2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "sim-context-menu", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "sim-deployment-state-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const product_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", product_r1.productImageUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !product_r1.productImageUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("menuEntries", ctx_r0.contextMenuEntries)("menuEntryClickHandlerParameter", product_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("deploymentState", product_r1.deploymentState)("clickHandler", ctx_r0.deploymentIconClickHandler)("clickHandlerParameter", product_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](product_r1.productName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", product_r1.simpiCount + (product_r1.simpiCount === 1 ? " Simpi" : " Simpies"), " ");
} }
class ProductOverviewComponent {
    constructor(productService, modalService) {
        this.productService = productService;
        this.modalService = modalService;
        this.draggingRow = false;
        this.config = {};
        this.addingAborted = false;
        this._componentActive = true;
        this.addProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.enableOrDisableAddMode = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.unselectProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onShowSimpis = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.saveProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.reloadData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.deleteProduct = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.showProductSettings = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.contextMenuEntries = [
            {
                text: "Settings",
                clickHandler: (product) => {
                    this.showProductSettings.emit({
                        productAlias: product.productAlias,
                        brandAlias: product.brandAlias,
                    });
                },
                iconUrl: "assets/svg/edit.svg",
            },
            {
                text: "Share Product",
                clickHandler: (product) => this.onShareProduct(product.productId),
                iconUrl: "assets/svg/share.svg",
            },
            {
                text: "Delete",
                clickHandler: (product) => this.deleteProduct.emit(product.productId),
                iconUrl: "assets/svg/delete.svg",
            },
        ];
        this.deploymentIconClickHandler = (product) => this.showPrivacyModalDialog(product);
    }
    ngOnInit() {
        this.productService.addProductRequested$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeWhile"])(() => this._componentActive))
            .subscribe((requested) => {
            if (requested) {
                this.addProduct.emit();
            }
        });
    }
    showProductDetails(product) {
        this.selectProduct.emit(product);
    }
    enableAddMode() {
        this.addingAborted = false;
        if (!this.addModeEnabled) {
            this.enableOrDisableAddMode.emit(true);
        }
    }
    disableAddMode() {
        this.addingAborted = true;
        if (this.addModeEnabled) {
            this.enableOrDisableAddMode.emit(false);
        }
    }
    onShareProduct(productId) {
        const modalRef = this.modalService.open(_shared_components_modals_share_item_modal_share_item_modal_component__WEBPACK_IMPORTED_MODULE_3__["ShareItemModalComponent"]);
        modalRef.componentInstance.modalTitle = "Share Product";
        this.productService.products$.subscribe((products) => {
            if (products) {
                const product = products.find((x) => x.productId === productId);
                modalRef.componentInstance.sharedUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].baseUrl}/${product.brandAlias}/product/${product.productAlias}/overview`;
            }
        });
    }
    showSimpis(productId) {
        this.onShowSimpis.emit(productId);
    }
    showPrivacyModalDialog(product) {
        this.selectProduct.emit(product);
        const modalRef = this.modalService.open(_shared_components_modals_privacy_modal_privacy_modal_component__WEBPACK_IMPORTED_MODULE_4__["PrivacyModalComponent"]);
        modalRef.componentInstance.form = this.productForm;
        modalRef.componentInstance.targetType = "Product";
        modalRef.componentInstance.targetName = product.productName;
        modalRef.result
            .then(() => {
            this.saveProduct.emit();
        })
            .catch((e) => {
            this.unselectProduct.emit(product);
        });
    }
    ngOnDestroy() {
        this._componentActive = false;
    }
}
ProductOverviewComponent.ɵfac = function ProductOverviewComponent_Factory(t) { return new (t || ProductOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](projects_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__["ProductService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"])); };
ProductOverviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductOverviewComponent, selectors: [["sim-product-overview"]], inputs: { addModeEnabled: "addModeEnabled", addProductRequested: "addProductRequested", products: "products", productForm: "productForm", errorLoadingData: "errorLoadingData", productImageUrl: "productImageUrl", productPageImageUrl: "productPageImageUrl" }, outputs: { addProduct: "addProduct", selectProduct: "selectProduct", enableOrDisableAddMode: "enableOrDisableAddMode", unselectProduct: "unselectProduct", onShowSimpis: "onShowSimpis", saveProduct: "saveProduct", reloadData: "reloadData", deleteProduct: "deleteProduct", showProductSettings: "showProductSettings" }, decls: 2, vars: 1, consts: [[1, "product-container"], ["class", "product-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "product-item", 3, "click"], [1, "product-image-container"], ["class", "product-image", 3, "src", "alt", 4, "ngIf"], ["class", "no-image-box", 4, "ngIf"], [3, "menuEntries", "menuEntryClickHandlerParameter"], [1, "deploymentState-icon", "small", 3, "deploymentState", "clickHandler", "clickHandlerParameter"], [1, "product-name"], [1, "simpis-count"], [1, "product-image", 3, "src", "alt"], [1, "no-image-box"], [1, "no-image-icon"], ["size", "2x", 3, "icon"]], template: function ProductOverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProductOverviewComponent_div_1_Template, 10, 9, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.products);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _shared_components_context_menu_sim_context_menu_component__WEBPACK_IMPORTED_MODULE_8__["SimContextMenu"], _shared_components_deployment_state_icon_sim_deployment_state_icon_component__WEBPACK_IMPORTED_MODULE_9__["DeploymentStateIconComponent"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__["FaIconComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9zaW1waS1mcm9udGVuZC13ZWIvc3JjL2FwcC9wcm9kdWN0cy9jb21wb25lbnRzL3Byb2R1Y3Qtb3ZlcnZpZXcvcHJvZHVjdC1vdmVydmlldy5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductOverviewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "sim-product-overview",
                templateUrl: "./product-overview.component.html",
                styleUrls: ["./product-overview.component.scss"],
            }]
    }], function () { return [{ type: projects_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__["ProductService"] }, { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"] }]; }, { addModeEnabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], addProductRequested: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], products: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], productForm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], errorLoadingData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], productImageUrl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], productPageImageUrl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], addProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], selectProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], enableOrDisableAddMode: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], unselectProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], onShowSimpis: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], saveProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], reloadData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], deleteProduct: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], showProductSettings: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/products/components/product-routing/product-routing.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/products/components/product-routing/product-routing.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ProductRoutingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductRoutingComponent", function() { return ProductRoutingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _shared_components_tab_nav_tab_nav_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/tab-nav/tab-nav.component */ "./src/app/shared/components/tab-nav/tab-nav.component.ts");






class ProductRoutingComponent {
    constructor(productService, router) {
        this.productService = productService;
        this.router = router;
        this._componentActive = true;
        this.productRoutes = [
            { url: './', text: 'Published  ' },
            { url: 'deleted', text: 'Deleted  ' }
        ];
    }
    ngOnInit() {
        this.productService.deleteRestoreOperation$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(operation => {
            if (operation) {
                this.getProducts();
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeWhile"])(() => this._componentActive)).subscribe();
    }
    ngAfterContentInit() {
        this.getProducts();
    }
    getProducts() {
        this.productService.products$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(products => {
            if (products) {
                const publishedProducts = products.filter(p => !p.deleted).length;
                const deletedProducts = products.length - publishedProducts;
                this.productRoutes[0].text = 'Published ' + publishedProducts;
                this.productRoutes[1].text = 'Deleted ' + deletedProducts;
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeWhile"])(() => this._componentActive)).subscribe();
    }
    ngOnDestroy() {
        this._componentActive = false;
    }
    clickAddProductButton($event) {
        this.productService.requestAddingProduct();
    }
}
ProductRoutingComponent.ɵfac = function ProductRoutingComponent_Factory(t) { return new (t || ProductRoutingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_2__["ProductService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
ProductRoutingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductRoutingComponent, selectors: [["ng-component"]], decls: 7, vars: 1, consts: [[1, "page-title-container"], [1, "page-title"], [1, "simpi-button-dark", 3, "click"], [3, "routes"]], template: function ProductRoutingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Products");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductRoutingComponent_Template_button_click_3_listener($event) { return ctx.clickAddProductButton($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "+ \u00A0 Add Product");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "sim-tab-nav", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routes", ctx.productRoutes);
    } }, directives: [_shared_components_tab_nav_tab_nav_component__WEBPACK_IMPORTED_MODULE_4__["TabNavComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["[_nghost-%COMP%] {\n        display: block;\n        padding-top: 30px;\n    }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductRoutingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                template: `
    <div class="page-title-container">
      <h1 class="page-title">Products</h1>
      <button (click)="clickAddProductButton($event)" class="simpi-button-dark">+ &nbsp;  Add Product</button>
    </div>
    <sim-tab-nav [routes]='productRoutes'></sim-tab-nav>
    <router-outlet></router-outlet>
  `,
                styles: [`
    :host {
        display: block;
        padding-top: 30px;
    }
  `]
            }]
    }], function () { return [{ type: _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_2__["ProductService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/products/container/deleted-product-overview-page/deleted-product-overview-page.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/products/container/deleted-product-overview-page/deleted-product-overview-page.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: DeletedProductOverviewPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletedProductOverviewPageComponent", function() { return DeletedProductOverviewPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/storage/storage.service */ "../simpi-frontend-common/src/lib/services/storage/storage.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _components_deleted_product_overview_deleted_product_overview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/deleted-product-overview/deleted-product-overview.component */ "./src/app/products/components/deleted-product-overview/deleted-product-overview.component.ts");









function DeletedProductOverviewPageComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "sim-deleted-product-overview", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("restoreProduct", function DeletedProductOverviewPageComponent_ng_container_0_Template_sim_deleted_product_overview_restoreProduct_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.restoreProduct($event.productId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const products_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("products", products_r1);
} }
class DeletedProductOverviewPageComponent {
    constructor(productService) {
        this.productService = productService;
        this._componentActive = true;
        this.errorLoadingData = false;
    }
    ngOnInit() {
        _simpi_frontend_common_src_lib_services_storage_storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"].retrieve(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].authStorageKey)
            .then(userInfoJson => {
            var _a;
            this._brandId = (_a = JSON.parse(userInfoJson)) === null || _a === void 0 ? void 0 : _a.homeBrandId;
            this.deletedProducts$ = this.productService.products$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(products => {
                if (products) {
                    return products.filter(x => x.deleted);
                }
            }));
            this.loadData();
        });
    }
    loadData() {
        this.errorLoadingData = false;
        this.productService.getProducts(this._brandId, true, true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(() => {
            this.errorLoadingData = true;
            return rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeWhile"])(() => this._componentActive)).subscribe();
    }
    restoreProduct(productId) {
        this.productService.restoreProduct(productId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeWhile"])(() => this._componentActive)).subscribe();
    }
    ngOnDestroy() {
        this._componentActive = false;
    }
}
DeletedProductOverviewPageComponent.ɵfac = function DeletedProductOverviewPageComponent_Factory(t) { return new (t || DeletedProductOverviewPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__["ProductService"])); };
DeletedProductOverviewPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DeletedProductOverviewPageComponent, selectors: [["sim-deleted-product-overview-page"]], decls: 2, vars: 3, consts: [[4, "ngIf"], [3, "products", "restoreProduct"]], template: function DeletedProductOverviewPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, DeletedProductOverviewPageComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.deletedProducts$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _components_deleted_product_overview_deleted_product_overview_component__WEBPACK_IMPORTED_MODULE_7__["DeletedProductOverviewComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DeletedProductOverviewPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'sim-deleted-product-overview-page',
                template: `
        <ng-container *ngIf="(deletedProducts$ | async) as products">
            <sim-deleted-product-overview [products]='products'
            (restoreProduct)='restoreProduct($event.productId)'
            ></sim-deleted-product-overview>
        </ng-container>
    `
            }]
    }], function () { return [{ type: _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__["ProductService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/products/container/product-overview-page/product-overview-page.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/products/container/product-overview-page/product-overview-page.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ProductOverviewPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductOverviewPageComponent", function() { return ProductOverviewPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _simpi_frontend_common_src_lib_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/models */ "../simpi-frontend-common/src/lib/models/index.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service */ "../simpi-frontend-common/src/lib/services/auth/auth.service.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/brand/brand.service */ "../simpi-frontend-common/src/lib/services/brand/brand.service.ts");
/* harmony import */ var projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! projects/simpi-frontend-common/src/lib/services/simpis/simpi.service */ "../simpi-frontend-common/src/lib/services/simpis/simpi.service.ts");
/* harmony import */ var _shared_services_dropdown_menu_helper_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/services/dropdown-menu-helper.service */ "./src/app/shared/services/dropdown-menu-helper.service.ts");
/* harmony import */ var _components_product_overview_product_overview_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/product-overview/product-overview.component */ "./src/app/products/components/product-overview/product-overview.component.ts");















class ProductOverviewPageComponent {
    constructor(fb, productService, location, router, route, cdr, authService, brandService, simpiService, dropdownMenuHelperService) {
        this.fb = fb;
        this.productService = productService;
        this.location = location;
        this.router = router;
        this.route = route;
        this.cdr = cdr;
        this.authService = authService;
        this.brandService = brandService;
        this.simpiService = simpiService;
        this.dropdownMenuHelperService = dropdownMenuHelperService;
        this._componentActive = true;
        this._savedProduct = false;
        this.addModeEnabled = false;
        this.errorLoadingData = false;
        this.labelLeft = "DRAFT";
        this.labelRight = "PUBLISHED";
    }
    ngOnInit() {
        this.buildProductForm();
        this.products$ = this.authService.userInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pluck"])("id"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((id) => {
            this._userId = id;
            this.productForm.patchValue({ creatorId: this._userId });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(this.route.root.firstChild.params), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(([_, params]) => {
            this._brandAlias = params.brandAlias;
            if (this._brandAlias) {
                this.productForm.patchValue({ brandAlias: this._brandAlias });
                return this.brandService.getBrandByAlias(this._brandAlias).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((brandResponse) => {
                    if (brandResponse) {
                        this._brandId = brandResponse.brandId;
                        this.productForm.patchValue({ brandId: this._brandId });
                        this.loadData();
                    }
                }));
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => {
            return this.productService.products$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((products) => {
                if (products) {
                    if (products.length) {
                        return products
                            .filter((x) => !x.deleted)
                            .sort((a, b) => { var _a; return ((_a = a.productName) !== null && _a !== void 0 ? _a : "").localeCompare(b.productName); });
                    }
                    return [];
                }
            }));
        }));
        this.selectedProduct$ = this.productService.selectedProduct$;
        this.productImageUrl$ = this.productService.tempProductImageUrl$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])());
        this.productPageImageUrl$ =
            this.productService.tempProductPageImageUrl$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])());
        this.cdr.detectChanges();
    }
    onReloadData() {
        this.loadData();
    }
    loadData() {
        this.errorLoadingData = false;
        this.productService
            .getProducts(this._brandId, true, true)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(() => {
            this.errorLoadingData = true;
            return rxjs__WEBPACK_IMPORTED_MODULE_2__["EMPTY"];
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._componentActive))
            .subscribe();
        this.brandService
            .getBrandById(this._brandId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._componentActive))
            .subscribe((brandResponse) => {
            this._brandName = brandResponse.brandName;
        });
    }
    onSaveProduct() {
        this._savedProduct = false;
        const productToUpdate = {
            deploymentState: this.productForm.get("deploymentState").value,
            productImageId: this.productForm.get("productImageId").value,
            productPageImageId: this.productForm.get("productPageImageId").value,
            productName: this.productForm.get("productName").value,
        };
        this.productService
            .saveProduct(this.productForm.get("productId").value, productToUpdate)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((r) => {
            if (r.status === 204) {
                this._savedProduct = true;
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._componentActive))
            .subscribe();
    }
    onDeleteProduct(id) {
        this.dropdownMenuHelperService.onDeleteProduct(id);
    }
    onUnselectProduct() {
        this.buildProductForm();
    }
    buildProductForm() {
        this.productForm = this.fb.group({
            brandId: [this._brandId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            brandAlias: [this._brandAlias, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            brandName: [
                { value: this._brandName, disabled: false },
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            ],
            productName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            creatorId: [this._userId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            deploymentState: [_simpi_frontend_common_src_lib_models__WEBPACK_IMPORTED_MODULE_4__["DeploymentStateResponse"].Private],
            productImageId: [null],
            productPageImageId: [null],
            lastUpdated: [null],
            creationDate: [null],
            productId: [null],
        });
        this.cdr.detectChanges();
    }
    onAddProduct() {
        let productToAdd = {
            productId: null,
            brandId: this.productForm.get("brandId").value,
            brandAlias: this.productForm.get("brandAlias").value,
            creatorId: this.productForm.get("creatorId").value,
            productName: this.productForm.get("productName").value,
            brandName: this.productForm.get("brandName").value,
            deploymentState: this.productForm.get("deploymentState").value,
            productImageId: this.productForm.get("productImageId").value,
            productPageImageId: this.productForm.get("productPageImageId").value,
        };
        this.productService
            .addProduct(productToAdd)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((result) => {
            if (result) {
                this.navigateToProductSettings(result.alias);
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this._componentActive))
            .subscribe();
    }
    onShowSimpis(productId) {
        this.productService.setSelectedProduct({
            productId: productId,
        });
        this.simpiService.setSelectedSimpi(null);
        this.products$ = this.products$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((products) => {
            if (products) {
                const product = products.find((x) => x.productId === productId);
                if (product) {
                    if (product.simpiCount > 0) {
                        this.router.navigate([`${product.productAlias}`], {
                            relativeTo: this.route,
                        });
                    }
                    else {
                        this.router.navigate([
                            `${product.productAlias}/simpis/new-simpi/steps`,
                            { assistant: true },
                        ], { relativeTo: this.route });
                    }
                }
            }
        }));
    }
    onEnableOrDisableAddMode(enabled) {
        if (enabled) {
            this.productService.setSelectedProduct(null);
            this.buildProductForm();
            this.addModeEnabled = true;
            this.productService.setTempProductImageUrl("");
            this.productService.setTempProductPageImageUrl("");
        }
        if (!enabled) {
            this.addModeEnabled = false;
            this.productService.setTempProductImageUrl("");
            this.productService.setTempProductPageImageUrl("");
            this.productService.removeProductImage(this.productForm.get("productImageId").value);
            this.productService.removeProductPageImage(this.productForm.get("productPageImageId").value);
        }
    }
    onSelectProduct(product) {
        this.addModeEnabled = false;
        this.productService.setSelectedProduct(product);
        this.populateProductForm(product);
    }
    populateProductForm(product) {
        this.productForm.patchValue({
            productId: product.productId,
            brandId: product.brandId,
            brandAlias: product.brandAlias,
            brandName: product.brandName,
            productName: product.productName,
            creatorId: product.creatorId,
            deploymentState: product.deploymentState,
            productImageId: product.productImageId,
            productPageImageId: product.productPageImageId,
            creationDate: product.creationDate,
            lastUpdated: product.lastUpdated,
        });
    }
    showProductSettings(paramsJson) {
        this.dropdownMenuHelperService.showProductSettings(paramsJson);
    }
    ngOnDestroy() {
        this._componentActive = false;
    }
    navigateToProductSettings(productAlias) {
        this.dropdownMenuHelperService.navigateToProductSettings(productAlias, this.route);
    }
}
ProductOverviewPageComponent.ɵfac = function ProductOverviewPageComponent_Factory(t) { return new (t || ProductOverviewPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__["ProductService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_9__["BrandService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_10__["SimpiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_dropdown_menu_helper_service__WEBPACK_IMPORTED_MODULE_11__["DropdownMenuHelperService"])); };
ProductOverviewPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductOverviewPageComponent, selectors: [["sim-product-overview-page"]], decls: 4, vars: 12, consts: [[3, "products", "productForm", "addModeEnabled", "errorLoadingData", "productImageUrl", "productPageImageUrl", "addProduct", "enableOrDisableAddMode", "onShowSimpis", "selectProduct", "unselectProduct", "saveProduct", "deleteProduct", "reloadData", "showProductSettings"]], template: function ProductOverviewPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "sim-product-overview", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("addProduct", function ProductOverviewPageComponent_Template_sim_product_overview_addProduct_0_listener() { return ctx.onAddProduct(); })("enableOrDisableAddMode", function ProductOverviewPageComponent_Template_sim_product_overview_enableOrDisableAddMode_0_listener($event) { return ctx.onEnableOrDisableAddMode($event); })("onShowSimpis", function ProductOverviewPageComponent_Template_sim_product_overview_onShowSimpis_0_listener($event) { return ctx.onShowSimpis($event); })("selectProduct", function ProductOverviewPageComponent_Template_sim_product_overview_selectProduct_0_listener($event) { return ctx.onSelectProduct($event); })("unselectProduct", function ProductOverviewPageComponent_Template_sim_product_overview_unselectProduct_0_listener() { return ctx.onUnselectProduct(); })("saveProduct", function ProductOverviewPageComponent_Template_sim_product_overview_saveProduct_0_listener() { return ctx.onSaveProduct(); })("deleteProduct", function ProductOverviewPageComponent_Template_sim_product_overview_deleteProduct_0_listener($event) { return ctx.onDeleteProduct($event); })("reloadData", function ProductOverviewPageComponent_Template_sim_product_overview_reloadData_0_listener() { return ctx.onReloadData(); })("showProductSettings", function ProductOverviewPageComponent_Template_sim_product_overview_showProductSettings_0_listener($event) { return ctx.showProductSettings($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("products", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 6, ctx.products$))("productForm", ctx.productForm)("addModeEnabled", ctx.addModeEnabled)("errorLoadingData", ctx.errorLoadingData)("productImageUrl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 8, ctx.productImageUrl$))("productPageImageUrl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 10, ctx.productPageImageUrl$));
    } }, directives: [_components_product_overview_product_overview_component__WEBPACK_IMPORTED_MODULE_12__["ProductOverviewComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductOverviewPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "sim-product-overview-page",
                template: `
    <sim-product-overview
      [products]="products$ | async"
      [productForm]="productForm"
      (addProduct)="onAddProduct()"
      [addModeEnabled]="addModeEnabled"
      [errorLoadingData]="errorLoadingData"
      (enableOrDisableAddMode)="onEnableOrDisableAddMode($event)"
      (onShowSimpis)="onShowSimpis($event)"
      (selectProduct)="onSelectProduct($event)"
      [productImageUrl]="productImageUrl$ | async"
      [productPageImageUrl]="productPageImageUrl$ | async"
      (unselectProduct)="onUnselectProduct()"
      (saveProduct)="onSaveProduct()"
      (deleteProduct)="onDeleteProduct($event)"
      (reloadData)="onReloadData()"
      (showProductSettings)="showProductSettings($event)"
    >
    </sim-product-overview>
  `,
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_5__["ProductService"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"] }, { type: _simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_9__["BrandService"] }, { type: projects_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_10__["SimpiService"] }, { type: _shared_services_dropdown_menu_helper_service__WEBPACK_IMPORTED_MODULE_11__["DropdownMenuHelperService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/products/container/product-overview-public-page/product-overview-public-page.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/products/container/product-overview-public-page/product-overview-public-page.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: ProductOverviewPublicPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductOverviewPublicPageComponent", function() { return ProductOverviewPublicPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _simpi_frontend_common_src_lib_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/models */ "../simpi-frontend-common/src/lib/models/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var projects_simpi_frontend_common_src_lib_models_notAvailableReasonType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! projects/simpi-frontend-common/src/lib/models/notAvailableReasonType */ "../simpi-frontend-common/src/lib/models/notAvailableReasonType.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service */ "../simpi-frontend-common/src/lib/services/simpis/simpi.service.ts");
/* harmony import */ var _shared_services_share_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/services/share.service */ "./src/app/shared/services/share.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/brand/brand.service */ "../simpi-frontend-common/src/lib/services/brand/brand.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _simpi_frontend_common_src_lib_components_not_available_not_available_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/components/not-available/not-available.component */ "../simpi-frontend-common/src/lib/components/not-available/not-available.component.ts");
/* harmony import */ var _components_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/product-details/product-details.component */ "./src/app/products/components/product-details/product-details.component.ts");
















function ProductOverviewPublicPageComponent_sim_not_available_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "sim-not-available", 10);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("reason", ctx_r0.notAvailableReason);
} }
function ProductOverviewPublicPageComponent_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 11);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r1.brandLogoImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function ProductOverviewPublicPageComponent_sim_product_details_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "sim-product-details", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("shareProduct", function ProductOverviewPublicPageComponent_sim_product_details_3_Template_sim_product_details_shareProduct_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.onShare(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("product", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 4, ctx_r2.product$))("simpis", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 6, ctx_r2.simpis$))("simpiGroups", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 8, ctx_r2.simpiGroups$))("readonly", true);
} }
class ProductOverviewPublicPageComponent {
    constructor(productService, route, simpiService, shareService, metaService, titleService, brandService) {
        this.productService = productService;
        this.route = route;
        this.simpiService = simpiService;
        this.shareService = shareService;
        this.metaService = metaService;
        this.titleService = titleService;
        this.brandService = brandService;
        this.productNotAvailable = false;
        this.copyRightsYear = new Date().getFullYear();
        this.sortByGroupName = (a, b) => {
            if (a.groupName === b.groupName) {
                return 0;
            }
            if (this.isNullOrEmpty(a.groupName)) {
                return -1;
            }
            if (this.isNullOrEmpty(b.groupName)) {
                return 1;
            }
            return a.groupName.localeCompare(b.groupName);
        };
    }
    ngOnInit() {
        const { brandAlias, productAlias } = this.route.snapshot.params;
        this.product$ = this.productService.getProductByAlias(brandAlias, productAlias)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((prod) => {
            if (prod) {
                this._productName = prod.productName;
                this._productAlias = prod.productAlias;
                this._brandAlias = prod.brandAlias;
                this.brandLogoImageUrl = this.brandService.getLogoImageUrl(prod.brandLogoImageId);
                this.simpis$ = this.simpiService.getSimpisByProductId(prod.productId, false, true);
                this.simpiGroups$ = this.simpis$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(x => this.groupSimpis(x)));
                this.productNotAvailable = false;
                this.setPageMetadata(prod);
            }
            else {
                this.setNoIndexMetaTag();
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => {
            this.productNotAvailable = true;
            if ((err === null || err === void 0 ? void 0 : err.status) === 404) {
                this.notAvailableReason = projects_simpi_frontend_common_src_lib_models_notAvailableReasonType__WEBPACK_IMPORTED_MODULE_5__["NotAvailableReasonType"].NOT_FOUND;
            }
            else if ((err === null || err === void 0 ? void 0 : err.status) === 403) {
                this.notAvailableReason = projects_simpi_frontend_common_src_lib_models_notAvailableReasonType__WEBPACK_IMPORTED_MODULE_5__["NotAvailableReasonType"].PRIVATE;
            }
            else {
                console.error(err);
            }
            return rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
        }));
    }
    onShare() {
        const text = this._productName ? `Check out this how-to! ${this._productName}` : undefined;
        const url = `${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl}/${this._brandAlias}/product/${this._productAlias}/overview`;
        this.shareService.share(this._productName, text, url);
    }
    groupSimpis(simpis) {
        const simpiGroups = [];
        for (const simpi of simpis) {
            if (simpiGroups.some(x => x.groupName === simpi.groupName)) {
                simpiGroups.find(x => x.groupName === simpi.groupName).simpis.push(simpi);
            }
            else {
                simpiGroups.push({ groupName: simpi.groupName, simpis: [simpi] });
            }
        }
        return simpiGroups.sort(this.sortByGroupName);
    }
    isNullOrEmpty(str) {
        return (str == null || !str || str.length === 0);
    }
    setPageMetadata(product) {
        this.titleService.setTitle('SIMPIS for ' + product.brandName + ' ' + product.productName);
        this.setDescriptionMetaTag(product);
        if (product.deploymentState !== _simpi_frontend_common_src_lib_models__WEBPACK_IMPORTED_MODULE_2__["DeploymentStateResponse"].Public) {
            this.setNoIndexMetaTag();
        }
    }
    setDescriptionMetaTag(product) {
        this.metaService.addTag({
            name: 'description',
            content: 'A collection of interactive how-tos for ' + product.brandName + ' ' + product.productName,
        });
    }
    setNoIndexMetaTag() {
        this.metaService.addTag({
            name: 'robots',
            content: 'noindex',
        });
    }
}
ProductOverviewPublicPageComponent.ɵfac = function ProductOverviewPublicPageComponent_Factory(t) { return new (t || ProductOverviewPublicPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_6__["ProductService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_8__["SimpiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_share_service__WEBPACK_IMPORTED_MODULE_9__["ShareService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__["Meta"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__["Title"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_11__["BrandService"])); };
ProductOverviewPublicPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductOverviewPublicPageComponent, selectors: [["ng-component"]], decls: 16, vars: 4, consts: [[1, "container", "h-100"], [3, "reason", 4, "ngIf"], ["class", "img-fluid product-page-brand-logo", "alt", "Brand Logo", 3, "src", 4, "ngIf"], [3, "product", "simpis", "simpiGroups", "readonly", "shareProduct", 4, "ngIf"], [1, "mt-auto"], [1, "footer"], [1, "d-flex", "flex-column", "flex-md-row", "h-100", "align-items-center-sm"], ["href", "https://www.simpi.me/imprint"], ["href", "https://www.simpi.me/data-privacy"], [1, "ml-auto"], [3, "reason"], ["alt", "Brand Logo", 1, "img-fluid", "product-page-brand-logo", 3, "src"], [3, "product", "simpis", "simpiGroups", "readonly", "shareProduct"]], template: function ProductOverviewPublicPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProductOverviewPublicPageComponent_sim_not_available_1_Template, 1, 1, "sim-not-available", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProductOverviewPublicPageComponent_img_2_Template, 1, 1, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProductOverviewPublicPageComponent_sim_product_details_3_Template, 4, 10, "sim-product-details", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "footer", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Impressum");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " | ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Datenschutzbestimmungen");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.productNotAvailable);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.productNotAvailable && ctx.brandLogoImageUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.productNotAvailable);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" \u00A9 ", ctx.copyRightsYear, " SIMPI GmbH. Alle Rechte vorbehalten ");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], _simpi_frontend_common_src_lib_components_not_available_not_available_component__WEBPACK_IMPORTED_MODULE_13__["NotAvailableComponent"], _components_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_14__["ProductDetailsComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"]], styles: [".container[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      max-width: 960px;\n    }\n\n    .footer[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      border-top: 1px solid rgba(0, 0, 0, 0.12);\n    }\n\n    .product-page-brand-logo[_ngcontent-%COMP%] {\n      height: 50px;\n      max-width: 200px;\n      display: block;\n      object-fit: contain;\n      margin: 30px auto;\n    }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductOverviewPublicPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                template: `
    <div class="container h-100">
      <sim-not-available *ngIf="productNotAvailable" [reason]="notAvailableReason"></sim-not-available>
      <img *ngIf="!productNotAvailable && brandLogoImageUrl" [src]="brandLogoImageUrl"
           class="img-fluid product-page-brand-logo" alt="Brand Logo">
      <sim-product-details *ngIf="!productNotAvailable" [product]="product$ | async" [simpis]="simpis$ | async"
                           [simpiGroups]="simpiGroups$ | async" [readonly]="true" (shareProduct)="onShare()">
      </sim-product-details>
      <div class="mt-auto"></div>
      <footer class="footer">
        <div class="d-flex flex-column flex-md-row h-100 align-items-center-sm">
          <div>
            <a href="https://www.simpi.me/imprint">Impressum</a>
            |
            <a href="https://www.simpi.me/data-privacy">Datenschutzbestimmungen</a>
          </div>
          <div class="ml-auto"></div>
          <div>
            © {{ copyRightsYear }} SIMPI GmbH. Alle Rechte vorbehalten
          </div>
        </div>
      </footer>
    </div>
  `,
                styles: [`
    .container {
      display: flex;
      flex-direction: column;
      max-width: 960px;
    }

    .footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .product-page-brand-logo {
      height: 50px;
      max-width: 200px;
      display: block;
      object-fit: contain;
      margin: 30px auto;
    }
  `]
            }]
    }], function () { return [{ type: _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_6__["ProductService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] }, { type: _simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_8__["SimpiService"] }, { type: _shared_services_share_service__WEBPACK_IMPORTED_MODULE_9__["ShareService"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__["Meta"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__["Title"] }, { type: _simpi_frontend_common_src_lib_services_brand_brand_service__WEBPACK_IMPORTED_MODULE_11__["BrandService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/products/container/product-page/product-page.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/products/container/product-page/product-page.component.ts ***!
  \***************************************************************************/
/*! exports provided: ProductPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPageComponent", function() { return ProductPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _shared_components_upload_img_modal_upload_img_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/components/upload-img-modal/upload-img-modal.component */ "./src/app/shared/components/upload-img-modal/upload-img-modal.component.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services_images_upload_img_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/images/upload-img-modal.service */ "../simpi-frontend-common/src/lib/services/images/upload-img-modal.service.ts");
/* harmony import */ var _shared_services_dropdown_menu_helper_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/services/dropdown-menu-helper.service */ "./src/app/shared/services/dropdown-menu-helper.service.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services */ "../simpi-frontend-common/src/lib/services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service */ "../simpi-frontend-common/src/lib/services/simpis/simpi.service.ts");
/* harmony import */ var _simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service */ "../simpi-frontend-common/src/lib/services/auth/auth.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _components_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/product-details/product-details.component */ "./src/app/products/components/product-details/product-details.component.ts");
















class ProductPageComponent {
    constructor(dropdownMenuHelperService, productService, route, simpiService, authService, modalService, router, uploadImgModalService, location) {
        this.dropdownMenuHelperService = dropdownMenuHelperService;
        this.productService = productService;
        this.route = route;
        this.simpiService = simpiService;
        this.authService = authService;
        this.modalService = modalService;
        this.router = router;
        this.uploadImgModalService = uploadImgModalService;
        this.location = location;
        this.componentActive = false;
        this.sortByGroupName = (a, b) => {
            if (a.groupName === b.groupName) {
                return 0;
            }
            if (this.isNullOrEmpty(a.groupName)) {
                return -1;
            }
            if (this.isNullOrEmpty(b.groupName)) {
                return 1;
            }
            return a.groupName.localeCompare(b.groupName);
        };
    }
    ngOnInit() {
        this.componentActive = true;
        this.authService.userInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this.componentActive), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pluck"])('id'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((id) => {
            this.userId = id;
        }));
        this.getRoutingParamsObservable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this.componentActive))
            .subscribe(({ brandAlias, productAlias }) => {
            if (brandAlias && productAlias) {
                this.product$ = this.productService
                    .getProductByAlias(brandAlias, productAlias)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((prod) => {
                    if (prod) {
                        console.log(prod.productAlias);
                        this.product = prod;
                        this.simpis$ = this.simpiService.getSimpisByProductId(prod.productId, false, true);
                        this.simpis$.subscribe((x) => (this.isLoaded = true));
                        this.simpiGroups$ = this.simpis$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(x => this.groupSimpis(x)));
                    }
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])((err) => {
                    if ((err === null || err === void 0 ? void 0 : err.status) === 404) {
                        console.error(err === null || err === void 0 ? void 0 : err.error);
                    }
                    else {
                        console.error(err);
                    }
                    return [];
                }));
            }
        });
    }
    groupSimpis(simpis) {
        const simpiGroups = [];
        for (const simpi of simpis) {
            if (simpiGroups.some(x => x.groupName === simpi.groupName)) {
                simpiGroups.find(x => x.groupName === simpi.groupName).simpis.push(simpi);
            }
            else {
                simpiGroups.push({ groupName: simpi.groupName, simpis: [simpi] });
            }
        }
        return simpiGroups.sort(this.sortByGroupName);
    }
    isNullOrEmpty(str) {
        return (str == null || !str || str.length === 0);
    }
    getRoutingParamsObservable() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])([
            this.route.root.firstChild.paramMap,
            this.route.paramMap,
        ]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this.componentActive), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(([rootParamMap, routeParamMap]) => {
            return {
                brandAlias: rootParamMap === null || rootParamMap === void 0 ? void 0 : rootParamMap.get('brandAlias'),
                productAlias: routeParamMap === null || routeParamMap === void 0 ? void 0 : routeParamMap.get('productAlias'),
            };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(({ brandAlias, productAlias }) => !!brandAlias && !!productAlias));
    }
    ngOnDestroy() {
        this.componentActive = false;
    }
    // dropdown-menu-functions implemented through injection of dropdown-menu-service
    shareProduct() {
        console.log(this.product.productAlias);
        this.dropdownMenuHelperService.shareProduct();
    }
    changeProductSettings(productId) {
        this.dropdownMenuHelperService.changeProductSettings(productId, this.route);
    }
    navigateToSimpiStepEditor(simpi) {
        this.dropdownMenuHelperService.navigateToSimpiStepEditor(simpi);
    }
    shareSimpi(simpi) {
        this.dropdownMenuHelperService.shareSimpi(simpi);
    }
    shareQRSimpi(simpi) {
        this.dropdownMenuHelperService.shareQRSimpi(simpi);
    }
    changeSimpiSettings(simpi) {
        this.dropdownMenuHelperService.changeSimpiSettings(simpi);
    }
    deleteSimpi(simpi) {
        this.dropdownMenuHelperService.deleteSimpi(simpi);
    }
    cloneSimpi(simpi) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.dropdownMenuHelperService.cloneSimpi(simpi);
        });
    }
    openProductPageImgModal() {
        const modalRef = this.modalService.open(_shared_components_upload_img_modal_upload_img_modal_component__WEBPACK_IMPORTED_MODULE_4__["UploadImgModalComponent"]);
        modalRef.componentInstance.imageType = _simpi_frontend_common_src_lib_services_images_upload_img_modal_service__WEBPACK_IMPORTED_MODULE_5__["ImageType"].ProductPageImage;
        modalRef.componentInstance.modalTitle = 'Upload Product Page Image';
        if (this.product) {
            modalRef.componentInstance.productId = this.product.productId;
            modalRef.result.then((result) => {
                if (result !== 'Cancel click') {
                    this.productService
                        .changeProductPageImage(this.product.productId, result.uploadedImageId)
                        .subscribe(() => {
                        this.product.productPageImageId = result.uploadedImageId;
                        this.product.productPageImageUrl =
                            this.productService.getProductPageImageUrl(result.uploadedImageId);
                        this.uploadImgModalService.clearState();
                        this.product$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.product);
                    });
                }
            }, (rejected) => {
                console.log(rejected);
            });
        }
    }
    restoreSimpi(simpi) {
        if (simpi) {
            this.simpiService
                .restoreSimpi(simpi.simpiId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this.componentActive))
                .subscribe();
        }
    }
    onChangeOrder(e) {
        this.simpiService.changeSimpiOrder(e).subscribe();
    }
    changeProductName(newProductName) {
        const oldProductName = this.product.productName;
        if (!newProductName || newProductName === oldProductName) {
            return;
        }
        this.product.productName = newProductName + '  (saving...)';
        this.productService
            .renameProduct(this.product.productId, newProductName)
            .subscribe((response) => {
            if (response.ok) {
                this.product.productName = newProductName + '  (saved ✔)';
                this.product.productAlias = response.body.newProductAlias;
                this.location.replaceState(`/${this.product.brandAlias}/cockpit/products/${response.body.newProductAlias}`);
            }
            else {
                this.product.productName = newProductName + '  (error ❌)';
                console.warn('Could not rename product:', response.status, response.statusText);
            }
            window.setTimeout(() => {
                if (response.ok) {
                    this.product.productName = newProductName;
                }
                else {
                    this.product.productName = oldProductName;
                }
            }, 3000);
        }, (error) => {
            var _a;
            this.product.productName = newProductName + '  (error ❌)';
            console.warn('Could not rename product:', (_a = error === null || error === void 0 ? void 0 : error.statusText) !== null && _a !== void 0 ? _a : error);
            window.setTimeout(() => {
                this.product.productName = oldProductName;
            }, 3000);
        });
    }
    navigateToSimpiAssistant() {
        this.router
            .navigate(['simpis/new-simpi/steps'], { relativeTo: this.route })
            .catch(console.error);
    }
}
ProductPageComponent.ɵfac = function ProductPageComponent_Factory(t) { return new (t || ProductPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_services_dropdown_menu_helper_service__WEBPACK_IMPORTED_MODULE_6__["DropdownMenuHelperService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_7__["ProductService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_9__["SimpiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_simpi_frontend_common_src_lib_services_images_upload_img_modal_service__WEBPACK_IMPORTED_MODULE_5__["UploadImgModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_12__["Location"])); };
ProductPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProductPageComponent, selectors: [["ng-component"]], decls: 3, vars: 8, consts: [[3, "product", "simpiGroups", "readonly", "isLoaded", "shareProduct", "changeProductPageImage", "changeProductName", "changeProductSettings", "editSimpiSteps", "deleteSimpi", "restoreSimpi", "shareSimpi", "shareQRSimpi", "cloneSimpi", "changeSimpiSettings", "onAddSimpi", "changeOrder"]], template: function ProductPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "sim-product-details", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("shareProduct", function ProductPageComponent_Template_sim_product_details_shareProduct_0_listener() { return ctx.shareProduct(); })("changeProductPageImage", function ProductPageComponent_Template_sim_product_details_changeProductPageImage_0_listener() { return ctx.openProductPageImgModal(); })("changeProductName", function ProductPageComponent_Template_sim_product_details_changeProductName_0_listener($event) { return ctx.changeProductName($event); })("changeProductSettings", function ProductPageComponent_Template_sim_product_details_changeProductSettings_0_listener($event) { return ctx.changeProductSettings($event); })("editSimpiSteps", function ProductPageComponent_Template_sim_product_details_editSimpiSteps_0_listener($event) { return ctx.navigateToSimpiStepEditor($event); })("deleteSimpi", function ProductPageComponent_Template_sim_product_details_deleteSimpi_0_listener($event) { return ctx.deleteSimpi($event); })("restoreSimpi", function ProductPageComponent_Template_sim_product_details_restoreSimpi_0_listener($event) { return ctx.restoreSimpi($event); })("shareSimpi", function ProductPageComponent_Template_sim_product_details_shareSimpi_0_listener($event) { return ctx.shareSimpi($event); })("shareQRSimpi", function ProductPageComponent_Template_sim_product_details_shareQRSimpi_0_listener($event) { return ctx.shareQRSimpi($event); })("cloneSimpi", function ProductPageComponent_Template_sim_product_details_cloneSimpi_0_listener($event) { return ctx.cloneSimpi($event); })("changeSimpiSettings", function ProductPageComponent_Template_sim_product_details_changeSimpiSettings_0_listener($event) { return ctx.changeSimpiSettings($event); })("onAddSimpi", function ProductPageComponent_Template_sim_product_details_onAddSimpi_0_listener() { return ctx.navigateToSimpiAssistant(); })("changeOrder", function ProductPageComponent_Template_sim_product_details_changeOrder_0_listener($event) { return ctx.onChangeOrder($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("product", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 4, ctx.product$))("simpiGroups", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 6, ctx.simpiGroups$))("readonly", false)("isLoaded", ctx.isLoaded);
    } }, directives: [_components_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_13__["ProductDetailsComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"]], styles: [""] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ProductPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                template: `
    <sim-product-details
      [product]="product$ | async"
      [simpiGroups]="simpiGroups$ | async"
      [readonly]="false"
      [isLoaded]="isLoaded"
      (shareProduct)="shareProduct()"
      (changeProductPageImage)="openProductPageImgModal()"
      (changeProductName)="changeProductName($event)"
      (changeProductSettings)="changeProductSettings($event)"
      (editSimpiSteps)="navigateToSimpiStepEditor($event)"
      (deleteSimpi)="deleteSimpi($event)"
      (restoreSimpi)="restoreSimpi($event)"
      (shareSimpi)="shareSimpi($event)"
      (shareQRSimpi)="shareQRSimpi($event)"
      (cloneSimpi)="cloneSimpi($event)"
      (changeSimpiSettings)="changeSimpiSettings($event)"
      (onAddSimpi)="navigateToSimpiAssistant()"
      (changeOrder)="onChangeOrder($event)"
    >
    </sim-product-details>
  `,
                styles: [``],
            }]
    }], function () { return [{ type: _shared_services_dropdown_menu_helper_service__WEBPACK_IMPORTED_MODULE_6__["DropdownMenuHelperService"] }, { type: _simpi_frontend_common_src_lib_services__WEBPACK_IMPORTED_MODULE_7__["ProductService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] }, { type: _simpi_frontend_common_src_lib_services_simpis_simpi_service__WEBPACK_IMPORTED_MODULE_9__["SimpiService"] }, { type: _simpi_frontend_common_src_lib_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"] }, { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbModal"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] }, { type: _simpi_frontend_common_src_lib_services_images_upload_img_modal_service__WEBPACK_IMPORTED_MODULE_5__["UploadImgModalService"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_12__["Location"] }]; }, null); })();


/***/ }),

/***/ "./src/app/products/products.module.ts":
/*!*********************************************!*\
  !*** ./src/app/products/products.module.ts ***!
  \*********************************************/
/*! exports provided: ProductsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsModule", function() { return ProductsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _components_product_overview_product_overview_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/product-overview/product-overview.component */ "./src/app/products/components/product-overview/product-overview.component.ts");
/* harmony import */ var _container_product_overview_page_product_overview_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container/product-overview-page/product-overview-page.component */ "./src/app/products/container/product-overview-page/product-overview-page.component.ts");
/* harmony import */ var _components_product_routing_product_routing_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/product-routing/product-routing.component */ "./src/app/products/components/product-routing/product-routing.component.ts");
/* harmony import */ var _products_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./products.routing */ "./src/app/products/products.routing.ts");
/* harmony import */ var _container_deleted_product_overview_page_deleted_product_overview_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./container/deleted-product-overview-page/deleted-product-overview-page.component */ "./src/app/products/container/deleted-product-overview-page/deleted-product-overview-page.component.ts");
/* harmony import */ var _components_deleted_product_overview_deleted_product_overview_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/deleted-product-overview/deleted-product-overview.component */ "./src/app/products/components/deleted-product-overview/deleted-product-overview.component.ts");
/* harmony import */ var _container_product_overview_public_page_product_overview_public_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./container/product-overview-public-page/product-overview-public-page.component */ "./src/app/products/container/product-overview-public-page/product-overview-public-page.component.ts");
/* harmony import */ var _components_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/product-details/product-details.component */ "./src/app/products/components/product-details/product-details.component.ts");
/* harmony import */ var _container_product_page_product_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./container/product-page/product-page.component */ "./src/app/products/container/product-page/product-page.component.ts");
/* harmony import */ var _container_product_settings_page_product_settings_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./container/product-settings-page/product-settings-page.component */ "./src/app/products/container/product-settings-page/product-settings-page.component.ts");
/* harmony import */ var ng2_dragula__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-dragula */ "../../node_modules/ng2-dragula/__ivy_ngcc__/dist/fesm2015/ng2-dragula.js");
/* harmony import */ var _components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/product-list/product-list.component */ "./src/app/products/components/product-list/product-list.component.ts");

















class ProductsModule {
}
ProductsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ProductsModule });
ProductsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ProductsModule_Factory(t) { return new (t || ProductsModule)(); }, imports: [[
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            ng2_dragula__WEBPACK_IMPORTED_MODULE_13__["DragulaModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_products_routing__WEBPACK_IMPORTED_MODULE_6__["productRoutes"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ProductsModule, { declarations: [_components_product_overview_product_overview_component__WEBPACK_IMPORTED_MODULE_3__["ProductOverviewComponent"],
        _components_product_overview_product_overview_component__WEBPACK_IMPORTED_MODULE_3__["ProductOverviewComponent"],
        _container_product_overview_page_product_overview_page_component__WEBPACK_IMPORTED_MODULE_4__["ProductOverviewPageComponent"],
        _components_product_routing_product_routing_component__WEBPACK_IMPORTED_MODULE_5__["ProductRoutingComponent"],
        _container_deleted_product_overview_page_deleted_product_overview_page_component__WEBPACK_IMPORTED_MODULE_7__["DeletedProductOverviewPageComponent"],
        _components_deleted_product_overview_deleted_product_overview_component__WEBPACK_IMPORTED_MODULE_8__["DeletedProductOverviewComponent"],
        _container_product_overview_public_page_product_overview_public_page_component__WEBPACK_IMPORTED_MODULE_9__["ProductOverviewPublicPageComponent"],
        _components_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_10__["ProductDetailsComponent"],
        _container_product_page_product_page_component__WEBPACK_IMPORTED_MODULE_11__["ProductPageComponent"],
        _container_product_settings_page_product_settings_page_component__WEBPACK_IMPORTED_MODULE_12__["ProductSettingsPageComponent"],
        _components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_14__["ProductListComponent"]], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        ng2_dragula__WEBPACK_IMPORTED_MODULE_13__["DragulaModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _components_product_overview_product_overview_component__WEBPACK_IMPORTED_MODULE_3__["ProductOverviewComponent"],
                    _components_product_overview_product_overview_component__WEBPACK_IMPORTED_MODULE_3__["ProductOverviewComponent"],
                    _container_product_overview_page_product_overview_page_component__WEBPACK_IMPORTED_MODULE_4__["ProductOverviewPageComponent"],
                    _components_product_routing_product_routing_component__WEBPACK_IMPORTED_MODULE_5__["ProductRoutingComponent"],
                    _container_deleted_product_overview_page_deleted_product_overview_page_component__WEBPACK_IMPORTED_MODULE_7__["DeletedProductOverviewPageComponent"],
                    _components_deleted_product_overview_deleted_product_overview_component__WEBPACK_IMPORTED_MODULE_8__["DeletedProductOverviewComponent"],
                    _container_product_overview_public_page_product_overview_public_page_component__WEBPACK_IMPORTED_MODULE_9__["ProductOverviewPublicPageComponent"],
                    _components_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_10__["ProductDetailsComponent"],
                    _container_product_page_product_page_component__WEBPACK_IMPORTED_MODULE_11__["ProductPageComponent"],
                    _container_product_settings_page_product_settings_page_component__WEBPACK_IMPORTED_MODULE_12__["ProductSettingsPageComponent"],
                    _components_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_14__["ProductListComponent"],
                ],
                imports: [
                    _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                    ng2_dragula__WEBPACK_IMPORTED_MODULE_13__["DragulaModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_products_routing__WEBPACK_IMPORTED_MODULE_6__["productRoutes"])
                ],
                entryComponents: []
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/products/products.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/products/products.routing.ts ***!
  \**********************************************/
/*! exports provided: productRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productRoutes", function() { return productRoutes; });
/* harmony import */ var _components_product_routing_product_routing_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/product-routing/product-routing.component */ "./src/app/products/components/product-routing/product-routing.component.ts");
/* harmony import */ var _container_product_overview_page_product_overview_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container/product-overview-page/product-overview-page.component */ "./src/app/products/container/product-overview-page/product-overview-page.component.ts");
/* harmony import */ var _container_deleted_product_overview_page_deleted_product_overview_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container/deleted-product-overview-page/deleted-product-overview-page.component */ "./src/app/products/container/deleted-product-overview-page/deleted-product-overview-page.component.ts");
/* harmony import */ var _container_product_overview_public_page_product_overview_public_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container/product-overview-public-page/product-overview-public-page.component */ "./src/app/products/container/product-overview-public-page/product-overview-public-page.component.ts");
/* harmony import */ var _container_product_page_product_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container/product-page/product-page.component */ "./src/app/products/container/product-page/product-page.component.ts");
/* harmony import */ var _container_product_settings_page_product_settings_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./container/product-settings-page/product-settings-page.component */ "./src/app/products/container/product-settings-page/product-settings-page.component.ts");






const productRoutes = [
    {
        path: '',
        component: _components_product_routing_product_routing_component__WEBPACK_IMPORTED_MODULE_0__["ProductRoutingComponent"],
        children: [
            {
                path: '',
                component: _container_product_overview_page_product_overview_page_component__WEBPACK_IMPORTED_MODULE_1__["ProductOverviewPageComponent"]
            },
            {
                path: 'deleted',
                component: _container_deleted_product_overview_page_deleted_product_overview_page_component__WEBPACK_IMPORTED_MODULE_2__["DeletedProductOverviewPageComponent"]
            }
        ]
    },
    {
        path: ':productAlias/overview',
        pathMatch: 'full',
        component: _container_product_overview_public_page_product_overview_public_page_component__WEBPACK_IMPORTED_MODULE_3__["ProductOverviewPublicPageComponent"]
    },
    {
        path: ':productAlias',
        pathMatch: 'full',
        component: _container_product_page_product_page_component__WEBPACK_IMPORTED_MODULE_4__["ProductPageComponent"]
    },
    {
        path: ':productAlias/settings',
        pathMatch: 'full',
        component: _container_product_settings_page_product_settings_page_component__WEBPACK_IMPORTED_MODULE_5__["ProductSettingsPageComponent"]
    },
    {
        path: ':productAlias/simpis',
        pathMatch: 'prefix',
        loadChildren: () => __webpack_require__.e(/*! import() | simpis-simpis-module */ "simpis-simpis-module").then(__webpack_require__.bind(null, /*! ../simpis/simpis.module */ "./src/app/simpis/simpis.module.ts")).then(m => m.SimpisModule)
    },
    {
        path: '**',
        redirectTo: '/'
    }
];


/***/ })

}]);
//# sourceMappingURL=products-products-module-es2015.js.map