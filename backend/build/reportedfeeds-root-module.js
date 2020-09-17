(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reportedfeeds-root-module"],{

/***/ "./src/app/pages/reportedfeeds/root-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/reportedfeeds/root-routing.module.ts ***!
  \************************************************************/
/*! exports provided: RootRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootRoutingModule", function() { return RootRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _root_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./root.component */ "./src/app/pages/reportedfeeds/root.component.ts");
/* harmony import */ var _view_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/view.component */ "./src/app/pages/reportedfeeds/view/view.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [{
        path: '',
        component: _root_component__WEBPACK_IMPORTED_MODULE_2__["RootComponents"],
        children: [
            {
                path: 'view',
                component: _view_view_component__WEBPACK_IMPORTED_MODULE_3__["ViewComponent"],
            }
        ],
    }];
var RootRoutingModule = /** @class */ (function () {
    function RootRoutingModule() {
    }
    RootRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], RootRoutingModule);
    return RootRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/reportedfeeds/root.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/reportedfeeds/root.component.ts ***!
  \*******************************************************/
/*! exports provided: RootComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootComponents", function() { return RootComponents; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RootComponents = /** @class */ (function () {
    function RootComponents() {
    }
    RootComponents = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-users',
            template: "\n    <router-outlet></router-outlet>\n  ",
        })
    ], RootComponents);
    return RootComponents;
}());



/***/ }),

/***/ "./src/app/pages/reportedfeeds/root.module.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/reportedfeeds/root.module.ts ***!
  \****************************************************/
/*! exports provided: RootModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootModule", function() { return RootModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var _root_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./root-routing.module */ "./src/app/pages/reportedfeeds/root-routing.module.ts");
/* harmony import */ var _view_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/view.component */ "./src/app/pages/reportedfeeds/view/view.component.ts");
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-smart-table */ "./node_modules/ng2-smart-table/index.js");
/* harmony import */ var _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helpers/toaster.service */ "./src/app/helpers/toaster.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../interceptor/auth.interceptor */ "./src/app/interceptor/auth.interceptor.ts");
/* harmony import */ var _root_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./root.component */ "./src/app/pages/reportedfeeds/root.component.ts");
/* harmony import */ var ngx_ui_switch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-ui-switch */ "./node_modules/ngx-ui-switch/ui-switch.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// import { MapsModule } from '../../pages/maps/maps.module';


// import{SearchComponent} from '../maps/search-map/search/search.component';



var components = [
    _root_component__WEBPACK_IMPORTED_MODULE_8__["RootComponents"],
    _view_view_component__WEBPACK_IMPORTED_MODULE_3__["ViewComponent"],
    _view_view_component__WEBPACK_IMPORTED_MODULE_3__["ButtonViewComponent"]
];
var RootModule = /** @class */ (function () {
    function RootModule() {
    }
    RootModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_1__["ThemeModule"],
                _root_routing_module__WEBPACK_IMPORTED_MODULE_2__["RootRoutingModule"],
                ng2_smart_table__WEBPACK_IMPORTED_MODULE_4__["Ng2SmartTableModule"],
                ngx_ui_switch__WEBPACK_IMPORTED_MODULE_9__["UiSwitchModule"].forRoot({})
            ],
            declarations: components.slice(),
            providers: [
                _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_5__["ToastrMessages"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: _interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_7__["AuthInterceptor"], multi: true }
            ],
            entryComponents: [_view_view_component__WEBPACK_IMPORTED_MODULE_3__["ButtonViewComponent"]]
        })
    ], RootModule);
    return RootModule;
}());



/***/ }),

/***/ "./src/app/pages/reportedfeeds/view/view.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/reportedfeeds/view/view.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nb-card>\r\n  <nb-card-header>\r\nReported Feeds\r\n  </nb-card-header>\r\n  <nb-card-body>\r\n    <ng2-smart-table [settings]=\"settings\" [source]=\"source\" (edit)=\"viewUsrList($event,groupsModel)\"\r\n      (delete)=\"onDelete($event)\">\r\n    </ng2-smart-table>\r\n  </nb-card-body>\r\n</nb-card>\r\n\r\n<ng-template #groupsModel let-c=\"close\" let-d=\"dismiss\">\r\n <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">Reported by listed users</h4>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div> \r\n  <div class=\"modal-body\" style=\"overflow-y: scroll;height: 450px\">\r\n    <ul class=\"list-group\" style=\"list-style-type:none;\" *ngIf=\"allUsers.length>0\">\r\n     <li *ngFor=\"let item of allUsers; let i = index\">\r\n      <div class=\"list-group-item d-flex justify-content-between align-items-center\">\r\n        <img src=\"{{imagesUrl+item.appuser.image}}\" width=\"30\" height=\"30\"  alt=\"\">\r\n       <div style=\"width: 60%;\">\r\n        <span> {{item.appuser.name}}</span>\r\n       <span> {{item.appuser.email}}</span>\r\n      </div>\r\n     \r\n\r\n        <div  style=\"width: 30%;\" >\r\n          <span> {{item.reason}}</span>\r\n          <!-- <ui-switch [checked]=\"item.status\" (valueChange)=\"modifyGroupAccess(item,$event)\"></ui-switch> -->\r\n      </div>\r\n    </div>  \r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"c('Close click')\">Close</button>\r\n  </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/pages/reportedfeeds/view/view.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/reportedfeeds/view/view.component.ts ***!
  \************************************************************/
/*! exports provided: ViewComponent, ButtonViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewComponent", function() { return ViewComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonViewComponent", function() { return ButtonViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-smart-table */ "./node_modules/ng2-smart-table/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../helpers/toaster.service */ "./src/app/helpers/toaster.service.ts");
/* harmony import */ var _nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nebular/theme/components/toastr/model */ "./node_modules/@nebular/theme/components/toastr/model.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ViewComponent = /** @class */ (function () {
    function ViewComponent(http, router, toast, modalService, datePipe, _NgbModal) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.toast = toast;
        this.modalService = modalService;
        this.datePipe = datePipe;
        this._NgbModal = _NgbModal;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl;
        this.imagesUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].imagesUrl;
        this.allUsers = [];
        this.userGroups = [];
        this.dropdownList = [];
        this.selectedUserName = "";
        this.settings = {
            mode: 'external',
            actions: {
                columnTitle: "Reportd by users",
                position: 'right',
                edit: true,
                add: false,
                delete: false
            },
            add: {
                addButtonContent: '<i class="nb-person"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
            },
            edit: {
                editButtonContent: '<i class="nb-list"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            custom: [{
                    name: "groups",
                    title: '<i class="nb-trash"></i>'
                }],
            columns: {
                image: {
                    title: 'Feed Image',
                    type: 'html',
                    filter: false,
                    valuePrepareFunction: function (image) { return "<img width=\"30px\" src=\"" + _this.imagesUrl + image + "\" />"; },
                },
                description: {
                    title: 'Feed Description',
                    type: 'string',
                },
                feedCat: {
                    title: 'Feed Category',
                    type: 'string',
                },
                feedStatus: {
                    title: 'Action',
                    type: 'custom',
                    renderComponent: ButtonViewComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (row) {
                        });
                    }
                },
            },
        };
        this.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_1__["LocalDataSource"]();
    }
    ViewComponent.prototype.ngOnInit = function () {
        //  this.getAllGroups();
        this.getAllUsers();
    };
    ViewComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.http.get(this.baseUrl + 'api/reportedfeeds').subscribe(function (response) {
            // response.body console.log(response.body);
            response.body.forEach(function (element) {
                element['image'] = element.feed.image;
                element['description'] = element.feed.description;
                element['feedCat'] = element.feed.feedscategory.name;
                // element['userEmail']=element.appuser.email;
                element['feedStatus'] = element.feed.status;
            });
            _this.source.load(response.body);
        }, function (error) {
        });
    };
    ViewComponent.prototype.onDelete = function (event) {
        // if (confirm('Are you sure to delete this user?')) {
        //   this.http.delete(this.baseUrl + 'admin/user/' + event.data._id+"/delete")
        //     .subscribe(
        //       (response: any) => {
        //         if (response.message == 'User deleted successfully') {
        //              this.toast.showToast(NbToastStatus.SUCCESS, 'Users', response.message);
        //              this.getAllUsers();
        //         }
        //     });
        // }
    };
    ViewComponent.prototype.statusChange = function (data) {
        var _this = this;
        console.log(data);
        var itemStatus = data.feed.status;
        var itemId = data.feedId;
        if (itemStatus == '0') {
            itemStatus = '1';
        }
        else {
            itemStatus = '0';
        }
        data = {
            "status": itemStatus,
            "feedId": itemId
        };
        this.http.put(this.baseUrl + 'api/feedstatuschange', data).subscribe(function (response) {
            if (response.message == 'Status has been updated!') {
                _this.toast.showToast(_nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_7__["NbToastStatus"].SUCCESS, 'Feed', response.message);
                _this.getAllUsers();
            }
        }, function (error) {
        });
    };
    ViewComponent.prototype.viewUsrList = function (item, model) {
        var _this = this;
        // console.log(item); 
        //private modalService: NgbModal,
        this.allUsers = [];
        this.modalService.open(model, { size: 'lg', backdrop: 'static' });
        this.http.get(this.baseUrl + 'api/feedreporterlist/' + item.data.feedId).subscribe(function (response) {
            console.log(response);
            _this.allUsers = response.body;
        }, function (error) {
        });
    };
    ViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-sponsersview',
            template: __webpack_require__(/*! ./view.component.html */ "./src/app/pages/reportedfeeds/view/view.component.html"),
            styles: ["\n    nb-card {\n      transform: translate3d(0, 0, 0);\n    }\n  "],
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_6__["ToastrMessages"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModal"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModal"]])
    ], ViewComponent);
    return ViewComponent;
}());

var ButtonViewComponent = /** @class */ (function () {
    function ButtonViewComponent(vewcomp) {
        this.vewcomp = vewcomp;
        this.save = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ButtonViewComponent.prototype.ngOnInit = function () {
        this.renderValue = this.value.toString().toUpperCase();
    };
    ButtonViewComponent.prototype.onClick = function () {
        this.vewcomp.statusChange(this.rowData);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ButtonViewComponent.prototype, "value", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ButtonViewComponent.prototype, "rowData", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ButtonViewComponent.prototype, "save", void 0);
    ButtonViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'button-view',
            template: "\n    <button (click)=\"onClick()\" *ngIf=\"renderValue=='0'\">Enable Feed</button>\n    <button (click)=\"onClick()\" *ngIf=\"renderValue=='1'\">Disable Feed</button>\n\n  ",
        }),
        __metadata("design:paramtypes", [ViewComponent])
    ], ButtonViewComponent);
    return ButtonViewComponent;
}());



/***/ })

}]);
//# sourceMappingURL=reportedfeeds-root-module.js.map