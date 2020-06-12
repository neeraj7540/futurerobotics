(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-pages-module~post-root-module"],{

/***/ "./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js":
/*!*********************************************************!*\
  !*** ./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js ***!
  \*********************************************************/
/*! exports provided: CKEditorModule, ɵa, ɵb, ɵc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CKEditorModule", function() { return CKEditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return CKEditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return CKButtonDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return CKGroupDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");





/**
 * CKGroup component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500">
 *      <ckbutton [name]="'SaveButton'" [command]="'saveCommand'" (click)="save($event)"
 *                [icon]="'/save.png'" [toolbar]="'customGroup,1'" [label]="'Save'">
 *      </ckbutton>
 *   </ckeditor>
 */
var CKButtonDirective = /** @class */ (function () {
    function CKButtonDirective() {
        this.click = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    CKButtonDirective.prototype.initialize = function (editor) {
        var _this = this;
        editor.instance.addCommand(this.command, {
            exec: function (evt) {
                _this.click.emit(evt);
            },
        });
        editor.instance.ui.addButton(this.name, {
            label: this.label,
            command: this.command,
            toolbar: this.toolbar,
            icon: this.icon,
        });
    };
    CKButtonDirective.prototype.ngOnInit = function () {
        if (!this.name)
            throw new Error('Attribute "name" is required on <ckbutton>');
        if (!this.command)
            throw new Error('Attribute "command" is required on <ckbutton>');
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKButtonDirective.prototype, "click", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKButtonDirective.prototype, "label", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKButtonDirective.prototype, "command", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKButtonDirective.prototype, "toolbar", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKButtonDirective.prototype, "name", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKButtonDirective.prototype, "icon", void 0);
    CKButtonDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: 'ckbutton',
        })
    ], CKButtonDirective);
    return CKButtonDirective;
}());

/**
 * CKGroup component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500">
 *      <ckgroup [name]="'exampleGroup2'" [previous]="'1'" [subgroupOf]="'exampleGroup1'">
 *          .
 *          .
 *      </ckgroup>
 *   </ckeditor>
 */
var CKGroupDirective = /** @class */ (function () {
    function CKGroupDirective() {
    }
    CKGroupDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Reconfigure each button's toolbar property within ckgroup to hold its parent's name
        this.toolbarButtons.forEach(function (button) { return (button.toolbar = _this.name); });
    };
    CKGroupDirective.prototype.initialize = function (editor) {
        editor.instance.ui.addToolbarGroup(this.name, this.previous, this.subgroupOf);
        // Initialize each button within ckgroup
        this.toolbarButtons.forEach(function (button) {
            button.initialize(editor);
        });
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKGroupDirective.prototype, "name", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKGroupDirective.prototype, "previous", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKGroupDirective.prototype, "subgroupOf", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(CKButtonDirective),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
    ], CKGroupDirective.prototype, "toolbarButtons", void 0);
    CKGroupDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: 'ckgroup',
        })
    ], CKGroupDirective);
    return CKGroupDirective;
}());

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
var CKEditorComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function CKEditorComponent(zone) {
        this.zone = zone;
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.editorChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ready = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.blur = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.focus = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.contentDom = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.fileUploadRequest = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.fileUploadResponse = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.paste = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.drop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._value = '';
    }
    CKEditorComponent_1 = CKEditorComponent;
    Object.defineProperty(CKEditorComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    CKEditorComponent.prototype.ngOnChanges = function (changes) {
        if (changes.readonly && this.instance) {
            this.instance.setReadOnly(changes.readonly.currentValue);
        }
    };
    /**
     * On component destroy
     */
    CKEditorComponent.prototype.ngOnDestroy = function () {
        if (this.instance) {
            this.instance.removeAllListeners();
            CKEDITOR.instances[this.instance.name].destroy();
            this.instance.destroy();
            this.instance = null;
        }
    };
    /**
     * On component view init
     */
    CKEditorComponent.prototype.ngAfterViewInit = function () {
        this.ckeditorInit(this.config || {});
    };
    /**
     * On component view checked
     */
    CKEditorComponent.prototype.ngAfterViewChecked = function () {
        this.ckeditorInit(this.config || {});
    };
    /**
     * Value update process
     */
    CKEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this.value = value;
            _this.onChange(value);
            _this.onTouched();
            _this.change.emit(value);
        });
    };
    /**
     * CKEditor init
     */
    CKEditorComponent.prototype.ckeditorInit = function (config) {
        var _this = this;
        if (typeof CKEDITOR === 'undefined') {
            console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        }
        else {
            // Check textarea exists
            if (this.instance || !this.documentContains(this.host.nativeElement)) {
                return;
            }
            if (this.readonly) {
                config.readOnly = this.readonly;
            }
            // CKEditor replace textarea
            this.instance = CKEDITOR.replace(this.host.nativeElement, config);
            // Set initial value
            this.instance.setData(this.value);
            // listen for instanceReady event
            this.instance.on('instanceReady', function (evt) {
                // if value has changed while instance loading
                // update instance with current component value
                if (_this.instance.getData() !== _this.value) {
                    _this.instance.setData(_this.value);
                }
                // send the evt to the EventEmitter
                _this.ready.emit(evt);
            });
            // CKEditor change event
            this.instance.on('change', function (evt) {
                _this.onTouched();
                var value = _this.instance.getData();
                if (_this.value !== value) {
                    // Debounce update
                    if (_this.debounce) {
                        if (_this.debounceTimeout)
                            clearTimeout(_this.debounceTimeout);
                        _this.debounceTimeout = setTimeout(function () {
                            _this.updateValue(value);
                            _this.debounceTimeout = null;
                        }, parseInt(_this.debounce));
                        // Live update
                    }
                    else {
                        _this.updateValue(value);
                    }
                }
                // Original ckeditor event dispatch
                _this.editorChange.emit(evt);
            });
            // CKEditor blur event
            this.instance.on('blur', function (evt) {
                _this.blur.emit(evt);
            });
            // CKEditor focus event
            this.instance.on('focus', function (evt) {
                _this.focus.emit(evt);
            });
            // CKEditor contentDom event
            this.instance.on('contentDom', function (evt) {
                _this.contentDom.emit(evt);
            });
            // CKEditor fileUploadRequest event
            this.instance.on('fileUploadRequest', function (evt) {
                _this.fileUploadRequest.emit(evt);
            });
            // CKEditor fileUploadResponse event
            this.instance.on('fileUploadResponse', function (evt) {
                _this.fileUploadResponse.emit(evt);
            });
            // CKEditor paste event
            this.instance.on('paste', function (evt) {
                _this.paste.emit(evt);
            });
            // CKEditor drop event
            this.instance.on('drop', function (evt) {
                _this.drop.emit(evt);
            });
            // Add Toolbar Groups to Editor. This will also add Buttons within groups.
            this.toolbarGroups.forEach(function (group) {
                group.initialize(_this);
            });
            // Add Toolbar Buttons to Editor.
            this.toolbarButtons.forEach(function (button) {
                button.initialize(_this);
            });
        }
    };
    /**
     * Implements ControlValueAccessor
     */
    CKEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
        if (this.instance)
            this.instance.setData(value);
    };
    CKEditorComponent.prototype.onChange = function (_) { };
    CKEditorComponent.prototype.onTouched = function () { };
    CKEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CKEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    CKEditorComponent.prototype.documentContains = function (node) {
        return document.contains ? document.contains(node) : document.body.contains(node);
    };
    var CKEditorComponent_1;
    CKEditorComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "config", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], CKEditorComponent.prototype, "readonly", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], CKEditorComponent.prototype, "debounce", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "change", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "editorChange", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "ready", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "blur", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "focus", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "contentDom", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "fileUploadRequest", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "fileUploadResponse", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "paste", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "drop", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('host', { static: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
    ], CKEditorComponent.prototype, "host", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(CKButtonDirective),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
    ], CKEditorComponent.prototype, "toolbarButtons", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChildren"])(CKGroupDirective),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
    ], CKEditorComponent.prototype, "toolbarGroups", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object])
    ], CKEditorComponent.prototype, "value", null);
    CKEditorComponent = CKEditorComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ckeditor',
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return CKEditorComponent_1; }),
                    multi: true,
                },
            ],
            template: "\n    <textarea #host></textarea>\n  "
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], CKEditorComponent);
    return CKEditorComponent;
}());

/**
 * CKEditorModule
 */
var CKEditorModule = /** @class */ (function () {
    function CKEditorModule() {
    }
    CKEditorModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [CKEditorComponent, CKButtonDirective, CKGroupDirective],
            exports: [CKEditorComponent, CKButtonDirective, CKGroupDirective],
        })
    ], CKEditorModule);
    return CKEditorModule;
}());

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ng2-ckeditor.js.map


/***/ }),

/***/ "./src/app/pages/pages-menu.ts":
/*!*************************************!*\
  !*** ./src/app/pages/pages-menu.ts ***!
  \*************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
var MENU_ITEMS = [
    {
        title: 'Dashboard',
        icon: 'nb-home',
        link: '/pages/dashboard',
    },
    {
        title: 'Manage Users',
        icon: 'nb-person',
        link: '/pages/appusers',
        children: [
            {
                title: 'Add',
                link: '/pages/appusers/add',
            },
            {
                title: 'View',
                link: '/pages/appusers/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'Manage Feeds',
        icon: 'nb-volume-high',
        link: '/pages/feeds',
        children: [
            // {
            //   title: 'Add',
            //   link: '/pages/appusers/add',
            // },
            {
                title: 'View',
                link: '/pages/feeds/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'Manage Groups',
        icon: 'nb-keypad',
        link: '/pages/groups',
        children: [
            {
                title: 'Add',
                link: '/pages/groups/add',
            },
            {
                title: 'View',
                link: '/pages/groups/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'Manage Feeds Categories',
        icon: 'nb-grid-b-outline',
        link: '/pages/feedcategories',
        children: [
            {
                title: 'Add',
                link: '/pages/feedcategories/add',
            },
            {
                title: 'View',
                link: '/pages/feedcategories/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'Manage Post',
        icon: 'nb-list',
        link: '/pages/post',
        children: [
            {
                title: 'Add',
                link: '/pages/post/add',
            },
            {
                title: 'View',
                link: '/pages/post/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'Manage Adds',
        icon: 'nb-star',
        link: '/pages/post',
        children: [
            {
                title: 'Add',
                link: '/pages/adds/add',
            },
            {
                title: 'View',
                link: '/pages/adds/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'Other App Links',
        icon: 'nb-gear',
        link: '/pages/otherapp',
        children: [
            {
                title: 'Add',
                link: '/pages/otherapp/add',
            },
            {
                title: 'View',
                link: '/pages/otherapp/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'Reported Feeds',
        icon: 'nb-alert',
        link: 'pages/reportedfeeds',
        children: [
            {
                title: 'View',
                link: '/pages/reportedfeeds/view',
            },
        ],
        hidden: false,
    },
    {
        title: 'CRM Pages',
        icon: 'nb-email',
        link: 'pages/pages',
        children: [
            {
                title: 'Add',
                link: '/pages/pages/add',
            },
            {
                title: 'View',
                link: '/pages/pages/view',
            },
        ],
        hidden: false,
    },
];


/***/ })

}]);
//# sourceMappingURL=default~pages-pages-module~post-root-module.js.map