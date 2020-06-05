(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~adds-root-module~appusers-appusers-module~feedcategories-root-module~feeds-root-module~group~a65a42c0"],{

/***/ "./node_modules/ngx-ui-switch/ui-switch.es5.js":
/*!*****************************************************!*\
  !*** ./node_modules/ngx-ui-switch/ui-switch.es5.js ***!
  \*****************************************************/
/*! exports provided: UiSwitchComponent, UiSwitchModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiSwitchComponent", function() { return UiSwitchComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiSwitchModule", function() { return UiSwitchModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return UI_SWITCH_OPTIONS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var UI_SWITCH_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('UI_SWITCH_OPTIONS');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var UI_SWITCH_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])((/**
     * @return {?}
     */
    function () { return UiSwitchComponent; })),
    multi: true,
};
var UiSwitchComponent = /** @class */ (function () {
    function UiSwitchComponent(config, cdr) {
        if (config === void 0) { config = {}; }
        this.cdr = cdr;
        /**
         * Emits changed value
         */
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * Emits DOM event
         */
        this.changeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * Emits changed value
         */
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onTouchedCallback = (/**
         * @param {?} v
         * @return {?}
         */
        function (v) { });
        this.onChangeCallback = (/**
         * @param {?} v
         * @return {?}
         */
        function (v) { });
        this.size = config && config.size || 'medium';
        this.color = config && config.color;
        this.switchOffColor = config && config.switchOffColor;
        this.switchColor = config && config.switchColor;
        this.defaultBgColor = config && config.defaultBgColor;
        this.defaultBoColor = config && config.defaultBoColor;
        this.checkedLabel = config && config.checkedLabel;
        this.uncheckedLabel = config && config.uncheckedLabel;
        this.checkedTextColor = config && config.checkedTextColor;
        this.uncheckedTextColor = config && config.uncheckedTextColor;
    }
    Object.defineProperty(UiSwitchComponent.prototype, "checked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._checked;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._checked = v !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiSwitchComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = v !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiSwitchComponent.prototype, "reverse", {
        get: /**
         * @return {?}
         */
        function () {
            return this._reverse;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._reverse = v !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiSwitchComponent.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._loading = v !== false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} flag
     * @return {?}
     */
    UiSwitchComponent.prototype.getColor = /**
     * @param {?=} flag
     * @return {?}
     */
    function (flag) {
        if (flag === void 0) { flag = ''; }
        if (flag === 'borderColor') {
            return this.defaultBoColor;
        }
        if (flag === 'switchColor') {
            if (this.reverse) {
                return !this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
            }
            return this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
        }
        if (flag === 'checkedTextColor') {
            return this.reverse ? this.uncheckedTextColor : this.checkedTextColor;
        }
        if (flag === 'uncheckedTextColor') {
            return this.reverse ? this.checkedTextColor : this.uncheckedTextColor;
        }
        if (this.reverse) {
            return !this.checked ? this.color : this.defaultBgColor;
        }
        return this.checked ? this.color : this.defaultBgColor;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UiSwitchComponent.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        this.checked = !this.checked;
        // Component events
        this.change.emit(this.checked);
        this.valueChange.emit(this.checked);
        this.changeEvent.emit(event);
        // value accessor callbacks
        this.onChangeCallback(this.checked);
        this.onTouchedCallback(this.checked);
        this.cdr.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UiSwitchComponent.prototype.onToggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.beforeChange) {
            this._beforeChange = this.beforeChange.subscribe((/**
             * @param {?} confirm
             * @return {?}
             */
            function (confirm) {
                if (confirm) {
                    _this.onClick(event);
                }
            }));
        }
        else {
            this.onClick(event);
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    UiSwitchComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj !== this.checked) {
            this.checked = !!obj;
        }
        if (this.cdr) {
            this.cdr.markForCheck();
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    UiSwitchComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    UiSwitchComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    UiSwitchComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    UiSwitchComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._beforeChange) {
            this._beforeChange.unsubscribe();
        }
    };
    UiSwitchComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ui-switch',
                    template: "\n    <span class=\"switch\"\n    [class.checked]=\"checked\"\n    [class.disabled]=\"disabled\"\n    [class.loading]=\"loading\"\n    [class.switch-large]=\"size === 'large'\"\n    [class.switch-medium]=\"size === 'medium'\"\n    [class.switch-small]=\"size === 'small'\"\n    [style.background-color]=\"getColor()\"\n    [style.border-color]=\"getColor('borderColor')\"\n    >\n    <span class=\"switch-pane\" *ngIf=\"checkedLabel || uncheckedLabel\">\n      <span class=\"switch-label-checked\"\n      [style.color]=\"getColor('checkedTextColor')\">{{ this.checkedLabel }}</span>\n      <span class=\"switch-label-unchecked\"\n      [style.color]=\"getColor('uncheckedTextColor')\">{{ this.uncheckedLabel }}</span>\n    </span>\n    <small [style.background]=\"getColor('switchColor')\">\n      <ng-content></ng-content>\n    </small>\n    </span>\n  ",
                    providers: [UI_SWITCH_CONTROL_VALUE_ACCESSOR],
                },] },
    ];
    /** @nocollapse */
    UiSwitchComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [UI_SWITCH_OPTIONS,] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }
    ]; };
    UiSwitchComponent.propDecorators = {
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        switchOffColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        switchColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        defaultBgColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        defaultBoColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        checkedLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        uncheckedLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        checkedTextColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        uncheckedTextColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        beforeChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        checked: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        reverse: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        loading: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        change: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        changeEvent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        valueChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onToggle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click', ['$event'],] }]
    };
    return UiSwitchComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UiSwitchModule = /** @class */ (function () {
    function UiSwitchModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    UiSwitchModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: UiSwitchModule,
            providers: [
                { provide: UI_SWITCH_OPTIONS, useValue: config || {} }
            ]
        };
    };
    UiSwitchModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [
                        UiSwitchComponent
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]
                    ],
                    exports: [
                        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                        UiSwitchComponent
                    ]
                },] },
    ];
    return UiSwitchModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ui-switch.es5.js.map


/***/ })

}]);
//# sourceMappingURL=default~adds-root-module~appusers-appusers-module~feedcategories-root-module~feeds-root-module~group~a65a42c0.js.map