(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["appusers-appusers-module"],{

/***/ "./src/app/pages/appusers/add/add.component.html":
/*!*******************************************************!*\
  !*** ./src/app/pages/appusers/add/add.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-lg-7\">\n    <nb-card>\n      <nb-card-header>App User</nb-card-header>\n      <nb-card-body>\n        <form [formGroup]=\"eventForm\" #form [formGroup]=\"eventForm\" (ngSubmit)=\"addEvent()\">\n          <div class=\"form-group row\">\n            <label class=\"col-sm-3 col-form-label\">Name </label>\n            <div class=\"col-sm-9\">\n              <input type=\"text\"   autofocus formControlName=\"name\" class=\"form-control\" placeholder=\"Username\"\n                [ngClass]=\"{ 'is-invalid': submitted && f.name.errors, 'form-control-danger':submitted && f.name.errors }\" />\n              <ng-container *ngIf=\"submitted && f.name.errors\">\n                <p class=\"error-message\"> \n                  Name is required & must be at least 4 characters!\n                </p>\n              </ng-container>\n            \n            </div>\n          </div>\n\n\n          <div class=\"form-group row\">\n              <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Email</label>\n              <div class=\"col-sm-9\">\n                <input type=\"email\"  [ngClass]=\"{'form-control-danger':submitted && f.email.errors}\" class=\"form-control\"\n                  formControlName=\"email\" placeholder=\"Email\" [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\" autocomplete=\"off\"/>\n                <ng-container *ngIf=\"submitted && f.email.errors\">\n                  <p class=\"error-message\">\n                    Email is required and must be a valid email address!\n                  </p>\n                \n                </ng-container>\n              </div>\n            </div>\n\n\n            <div class=\"form-group row\">\n              <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Date of Birth</label>\n              <div class=\"col-sm-9\">\n                <input [nbDatepicker]=\"datepicker\"  [ngClass]=\"{'form-control-danger':submitted && f.dob.errors}\" class=\"form-control\"\n                  formControlName=\"dob\" placeholder=\"date of birth\"  [ngClass]=\"{ 'is-invalid': submitted && f.dob.errors }\" autocomplete=\"off\"/>\n                  <nb-datepicker #datepicker></nb-datepicker>\n                  <ng-container *ngIf=\"submitted && f.dob.errors\">\n                    <p class=\"error-message\">\n                    Date of birth is required!\n                  </p>\n                \n                </ng-container>\n         \n              </div>\n            </div>\n\n\n            <div class=\"form-group row\">\n              <label class=\"col-sm-3 col-form-label\">About </label>\n              <div class=\"col-sm-9\">\n                <input type=\"text\"   autofocus formControlName=\"about\" class=\"form-control\" placeholder=\"about\"\n               />\n       \n              </div>\n            </div>\n\n            <div class=\"form-group row\">\n              <label class=\"col-sm-3 col-form-label\">Location</label>\n              <div class=\"col-sm-9\">\n                <input type=\"text\"   autofocus formControlName=\"location\" class=\"form-control\" placeholder=\"Location\"\n               />\n               </div>\n            </div>\n\n            <div class=\"form-group row\">\n              <label class=\"col-sm-3 col-form-label\">Country</label>\n              <div class=\"col-sm-9\">\n                   <select name=\"country\" formControlName=\"country\" class=\"form-control\">\n                    <option *ngFor=\"let item of citiesList\" \n                      [value]=\"item.name\" \n                    >\n                    {{item.name}}\n                  </option>\n                  </select>\n\n               </div>\n            </div>\n        \n            <div class=\"form-group row\">\n              <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Work</label>\n              <div class=\"col-sm-9\">\n                <textarea type=\"number\"   class=\"form-control\"\n                  formControlName=\"work\" placeholder=\"Work details\" autocomplete=\"off\"></textarea>\n             </div>\n            </div> \n\n\n            <div class=\"form-group row\">\n              <label class=\"col-sm-3 col-form-label\">Hire Availability</label>\n              <div class=\"col-sm-9\">\n                   <select name=\"hireAvailable\" formControlName=\"hireAvailable\" class=\"form-control\">\n                    <option [value]=\"1\" >Yes</option>\n                    <option [value]=\"0\" >No</option>\n                  </select>\n\n               </div>\n            </div>\n\n\n            \n\n            <div class=\"form-group row\">\n              <label class=\"col-sm-3 col-form-label\">Occupation </label>\n              <div class=\"col-sm-9\">\n                <input type=\"text\"   autofocus formControlName=\"occupation\" class=\"form-control\" placeholder=\"Occupation\"\n               />\n       \n              </div>\n            </div>\n\n            <div class=\"form-group row\">\n              <label class=\"col-sm-3 col-form-label\">Company </label>\n              <div class=\"col-sm-9\">\n                <input type=\"text\"   autofocus formControlName=\"company\" class=\"form-control\" placeholder=\"Company\"\n               />\n       \n              </div>\n            </div>\n\n            <div class=\"form-group row\">\n              <label class=\"col-sm-3 col-form-label\">Experience </label>\n              <div class=\"col-sm-9\">\n                <input type=\"text\"  autofocus formControlName=\"experience\" class=\"form-control\" placeholder=\"Experience\"\n               />\n       \n              </div>\n            </div>\n          <!-- <div class=\"form-group row\">\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Work</label>\n            <div class=\"col-sm-9\">\n              <textarea type=\"number\"   class=\"form-control\"\n                formControlName=\"work\" placeholder=\"Work details\" autocomplete=\"off\"></textarea>\n           </div>\n          </div>  -->\n\n        <div class=\"form-group row\">\n          <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Additional</label>\n          <div class=\"col-sm-9\">\n            <textarea type=\"number\"   class=\"form-control\"\n              formControlName=\"additional\" placeholder=\"Additional details\"\n               autocomplete=\"off\"></textarea>\n        </div>\n      </div>\n\n            <div class=\"form-group row\">\n            <label class=\"col-sm-3 col-form-label\"> Image</label>\n            <div class=\"col-sm-9\">\n              <input type=\"file\" nbInput fullWidth #file accept='image/*' (change)=\"preview(file.files)\" />\n              <input type=\"hidden\" formControlName=\"image\" class=\"form-control\" />\n              <ng-container *ngIf=\"submitted && fileData==null\">\n                <p class=\"error-message\">\n                  Image is required\n                </p>\n              </ng-container>\n            </div>\n          </div>\n\n          <div class=\"form-group row\">\n            <label class=\"col-sm-3 col-form-label\">Password</label>\n            <div class=\"col-sm-9\">\n              <input type=\"password\" formControlName=\"password\" class=\"form-control\"\n                placeholder=\"********\" autocomplete=\"off\" [ngClass]=\"{'form-control-danger':submitted && f.password.errors}\"/>\n                <ng-container *ngIf=\"submitted && f.password.errors\">\n                    <p class=\"error-message\">\n                      Password  is required & must be at least 8 characters!\n                    </p>\n                  </ng-container>\n            </div>\n          </div>\n  \n          <div class=\"form-group row\">\n            <div class=\"offset-sm-3 col-sm-9\">\n              <p class=\"error-message\">{{formError}}</p>\n              <button type=\"submit\" [nbSpinner]=\"spinner\" nbSpinnerStatus=\"success\"\n                class=\"btn  btn-success \">Add</button>\n            </div>\n          </div>\n        </form>\n      </nb-card-body>\n    </nb-card>\n  </div>\n\n  <div class=\"col-lg-5\">\n    <nb-card>\n      <nb-card-header>User image</nb-card-header>\n      <nb-card-body>\n        <img [src]=\"imgURL\" width=\"auto\" height=\"170\" alt=\"\">\n      </nb-card-body>\n    </nb-card>\n\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/appusers/add/add.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/pages/appusers/add/add.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-default :host nb-card-body {\n  overflow: visible; }\n.nb-theme-default :host .input-group {\n  margin-bottom: 1rem; }\n.nb-theme-default :host .error-message {\n  color: #ff4c6a; }\n.nb-theme-default :host .btn {\n  cursor: pointer; }\n.nb-theme-default :host .size {\n  height: 200px; }\n.nb-theme-default :host /deep/ agm-map {\n  width: 100%;\n  height: 576px; }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-cosmic :host nb-card-body {\n  overflow: visible; }\n.nb-theme-cosmic :host .input-group {\n  margin-bottom: 1rem; }\n.nb-theme-cosmic :host .error-message {\n  color: #ff4c6a; }\n.nb-theme-cosmic :host .btn {\n  cursor: pointer; }\n.nb-theme-cosmic :host .size {\n  height: 200px; }\n.nb-theme-cosmic :host /deep/ agm-map {\n  width: 100%;\n  height: 576px; }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-corporate :host nb-card-body {\n  overflow: visible; }\n.nb-theme-corporate :host .input-group {\n  margin-bottom: 1rem; }\n.nb-theme-corporate :host .error-message {\n  color: #ff4c6a; }\n.nb-theme-corporate :host .btn {\n  cursor: pointer; }\n.nb-theme-corporate :host .size {\n  height: 200px; }\n.nb-theme-corporate :host /deep/ agm-map {\n  width: 100%;\n  height: 576px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYXBwdXNlcnMvYWRkL0M6XFxVc2Vyc1xcSFBcXERlc2t0b3BcXGNxbHN5c1xcanVzdGlubWluZC9ub2RlX21vZHVsZXNcXEBuZWJ1bGFyXFx0aGVtZVxcc3R5bGVzXFxfdGhlbWluZy5zY3NzIiwic3JjL2FwcC9wYWdlcy9hcHB1c2Vycy9hZGQvQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcY3Fsc3lzXFxqdXN0aW5taW5kL25vZGVfbW9kdWxlc1xcQG5lYnVsYXJcXHRoZW1lXFxzdHlsZXNcXGNvcmVcXF9taXhpbnMuc2NzcyIsInNyYy9hcHAvcGFnZXMvYXBwdXNlcnMvYWRkL0M6XFxVc2Vyc1xcSFBcXERlc2t0b3BcXGNxbHN5c1xcanVzdGlubWluZC9ub2RlX21vZHVsZXNcXEBuZWJ1bGFyXFx0aGVtZVxcc3R5bGVzXFxjb3JlXFxfZnVuY3Rpb25zLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2FwcHVzZXJzL2FkZC9DOlxcVXNlcnNcXEhQXFxEZXNrdG9wXFxjcWxzeXNcXGp1c3Rpbm1pbmQvbm9kZV9tb2R1bGVzXFxAbmVidWxhclxcdGhlbWVcXHN0eWxlc1xcdGhlbWVzXFxfZGVmYXVsdC5zY3NzIiwic3JjL2FwcC9wYWdlcy9hcHB1c2Vycy9hZGQvQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcY3Fsc3lzXFxqdXN0aW5taW5kL25vZGVfbW9kdWxlc1xcQG5lYnVsYXJcXHRoZW1lXFxzdHlsZXNcXHRoZW1lc1xcX2Nvc21pYy5zY3NzIiwic3JjL2FwcC9wYWdlcy9hcHB1c2Vycy9hZGQvQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcY3Fsc3lzXFxqdXN0aW5taW5kL25vZGVfbW9kdWxlc1xcQG5lYnVsYXJcXHRoZW1lXFxzdHlsZXNcXHRoZW1lc1xcX2NvcnBvcmF0ZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9hcHB1c2Vycy9hZGQvQzpcXFVzZXJzXFxIUFxcRGVza3RvcFxcY3Fsc3lzXFxqdXN0aW5taW5kL3NyY1xcYXBwXFxwYWdlc1xcYXBwdXNlcnNcXGFkZFxcYWRkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSDs7R0FFRztBQ1RIOzs7O0dBSUc7QUFzS0g7Ozs7R0FJRztBQXNCSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW1IRTtBQ3ZURjs7OztHQUlHO0FDSkg7Ozs7R0FJRztBREpIOzs7O0dBSUc7QURKSDs7OztHQUlHO0FBc0tIOzs7O0dBSUc7QUFzQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtSEU7QUd2VEY7Ozs7R0FJRztBRkpIOzs7O0dBSUc7QURKSDs7OztHQUlHO0FBc0tIOzs7O0dBSUc7QUFzQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtSEU7QUV2VEY7Ozs7R0FJRztBREpIOzs7O0dBSUc7QURKSDs7OztHQUlHO0FBc0tIOzs7O0dBSUc7QUFzQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtSEU7QUl2VEY7Ozs7R0FJRztBSEpIOzs7O0dBSUc7QURKSDs7OztHQUlHO0FBc0tIOzs7O0dBSUc7QUFzQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtSEU7QUV2VEY7Ozs7R0FJRztBREpIOzs7O0dBSUc7QURKSDs7OztHQUlHO0FBc0tIOzs7O0dBSUc7QUFzQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtSEU7QURyTUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFtQkU7QU1oSUo7RUFDRSxrQkFBaUIsRUFDbEI7QUFFRDtFQUNFLG9CQUFtQixFQUNwQjtBQUVEO0VBQ0UsZUFDRixFQUFDO0FBTUQ7RUFDQSxnQkFBZSxFQUNkO0FBQ0g7RUFDRSxjQUFhLEVBQ2Q7QUFDQztFQUNFLFlBQVc7RUFDWCxjSDZEc0IsRUc1RHZCO0FOb0ZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUJFO0FNaElKO0VBQ0Usa0JBQWlCLEVBQ2xCO0FBRUQ7RUFDRSxvQkFBbUIsRUFDcEI7QUFFRDtFQUNFLGVBQ0YsRUFBQztBQU1EO0VBQ0EsZ0JBQWUsRUFDZDtBQUNIO0VBQ0UsY0FBYSxFQUNkO0FBQ0M7RUFDRSxZQUFXO0VBQ1gsY0g2RHNCLEVHNUR2QjtBTm9GQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1CRTtBTWhJSjtFQUNFLGtCQUFpQixFQUNsQjtBQUVEO0VBQ0Usb0JBQW1CLEVBQ3BCO0FBRUQ7RUFDRSxlQUNGLEVBQUM7QUFNRDtFQUNBLGdCQUFlLEVBQ2Q7QUFDSDtFQUNFLGNBQWEsRUFDZDtBQUNDO0VBQ0UsWUFBVztFQUNYLGNINkRzQixFRzVEdkIiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9hcHB1c2Vycy9hZGQvYWRkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5cbi8qKlxuICogVGhpcyBpcyBhIHN0YXJ0aW5nIHBvaW50IHdoZXJlIHdlIGRlY2xhcmUgdGhlIG1hcHMgb2YgdGhlbWVzIGFuZCBnbG9iYWxseSBhdmFpbGFibGUgZnVuY3Rpb25zL21peGluc1xuICovXG5cbkBpbXBvcnQgJ2NvcmUvbWl4aW5zJztcbkBpbXBvcnQgJ2NvcmUvZnVuY3Rpb25zJztcblxuJG5iLWVuYWJsZWQtdGhlbWVzOiAoKSAhZ2xvYmFsO1xuJG5iLWVuYWJsZS1jc3MtdmFyaWFibGVzOiBmYWxzZSAhZ2xvYmFsO1xuXG4kbmItdGhlbWVzOiAoKSAhZ2xvYmFsO1xuJG5iLXRoZW1lcy1ub24tcHJvY2Vzc2VkOiAoKSAhZ2xvYmFsO1xuJG5iLXRoZW1lcy1leHBvcnQ6ICgpICFnbG9iYWw7XG5cbkBmdW5jdGlvbiBuYi10aGVtZSgka2V5KSB7XG4gIEByZXR1cm4gbWFwLWdldCgkdGhlbWUsICRrZXkpO1xufVxuXG5AZnVuY3Rpb24gbmItZ2V0LXZhbHVlKCR0aGVtZSwgJGtleSwgJHZhbHVlKSB7XG4gIEBpZiAodHlwZS1vZigkdmFsdWUpID09ICdzdHJpbmcnKSB7XG4gICAgJHRtcDogbWFwLWdldCgkdGhlbWUsICR2YWx1ZSk7XG5cbiAgICBAaWYgKCR0bXAgIT0gbnVsbCkge1xuICAgICAgQHJldHVybiBuYi1nZXQtdmFsdWUoJHRoZW1lLCAkdmFsdWUsICR0bXApO1xuICAgIH1cbiAgfVxuXG4gIEByZXR1cm4gbWFwLWdldCgkdGhlbWUsICRrZXkpO1xufVxuXG5AZnVuY3Rpb24gY29udmVydC10by1jc3MtdmFyaWFibGVzKCR2YXJpYWJsZXMpIHtcbiAgJHJlc3VsdDogKCk7XG4gIEBlYWNoICR2YXIsICR2YWx1ZSBpbiAkdmFyaWFibGVzIHtcbiAgICAkcmVzdWx0OiBtYXAtc2V0KCRyZXN1bHQsICR2YXIsICctLXZhcigjeyR2YXJ9KScpO1xuICB9XG5cbiAgQGRlYnVnICRyZXN1bHQ7XG4gIEByZXR1cm4gJHJlc3VsdDtcbn1cblxuQGZ1bmN0aW9uIHNldC1nbG9iYWwtdGhlbWUtdmFycygkdGhlbWUsICR0aGVtZS1uYW1lKSB7XG4gICR0aGVtZTogJHRoZW1lICFnbG9iYWw7XG4gICR0aGVtZS1uYW1lOiAkdGhlbWUtbmFtZSAhZ2xvYmFsO1xuICBAaWYgKCRuYi1lbmFibGUtY3NzLXZhcmlhYmxlcykge1xuICAgICR0aGVtZTogY29udmVydC10by1jc3MtdmFyaWFibGVzKCR0aGVtZSkgIWdsb2JhbDtcbiAgfVxuICBAcmV0dXJuICR0aGVtZTtcbn1cblxuQGZ1bmN0aW9uIG5iLXJlZ2lzdGVyLXRoZW1lKCR0aGVtZSwgJG5hbWUsICRkZWZhdWx0OiBudWxsKSB7XG5cbiAgJHRoZW1lLWRhdGE6ICgpO1xuXG5cbiAgQGlmICgkZGVmYXVsdCAhPSBudWxsKSB7XG5cbiAgICAkdGhlbWU6IG1hcC1tZXJnZShtYXAtZ2V0KCRuYi10aGVtZXMtbm9uLXByb2Nlc3NlZCwgJGRlZmF1bHQpLCAkdGhlbWUpO1xuICAgICRuYi10aGVtZXMtbm9uLXByb2Nlc3NlZDogbWFwLXNldCgkbmItdGhlbWVzLW5vbi1wcm9jZXNzZWQsICRuYW1lLCAkdGhlbWUpICFnbG9iYWw7XG5cbiAgICAkdGhlbWUtZGF0YTogbWFwLXNldCgkdGhlbWUtZGF0YSwgZGF0YSwgJHRoZW1lKTtcbiAgICAkbmItdGhlbWVzLWV4cG9ydDogbWFwLXNldCgkbmItdGhlbWVzLWV4cG9ydCwgJG5hbWUsIG1hcC1zZXQoJHRoZW1lLWRhdGEsIHBhcmVudCwgJGRlZmF1bHQpKSAhZ2xvYmFsO1xuXG4gIH0gQGVsc2Uge1xuICAgICRuYi10aGVtZXMtbm9uLXByb2Nlc3NlZDogbWFwLXNldCgkbmItdGhlbWVzLW5vbi1wcm9jZXNzZWQsICRuYW1lLCAkdGhlbWUpICFnbG9iYWw7XG5cbiAgICAkdGhlbWUtZGF0YTogbWFwLXNldCgkdGhlbWUtZGF0YSwgZGF0YSwgJHRoZW1lKTtcbiAgICAkbmItdGhlbWVzLWV4cG9ydDogbWFwLXNldCgkbmItdGhlbWVzLWV4cG9ydCwgJG5hbWUsIG1hcC1zZXQoJHRoZW1lLWRhdGEsIHBhcmVudCwgbnVsbCkpICFnbG9iYWw7XG4gIH1cblxuICAkdGhlbWUtcGFyc2VkOiAoKTtcbiAgQGVhY2ggJGtleSwgJHZhbHVlIGluICR0aGVtZSB7XG4gICAgJHRoZW1lLXBhcnNlZDogbWFwLXNldCgkdGhlbWUtcGFyc2VkLCAka2V5LCBuYi1nZXQtdmFsdWUoJHRoZW1lLCAka2V5LCAkdmFsdWUpKTtcbiAgfVxuXG4gIC8vIGVuYWJsZSByaWdodCBhd2F5IHdoZW4gaW5zdGFsbGVkXG4gICR0aGVtZS1wYXJzZWQ6IHNldC1nbG9iYWwtdGhlbWUtdmFycygkdGhlbWUtcGFyc2VkLCAkbmFtZSk7XG4gIEByZXR1cm4gbWFwLXNldCgkbmItdGhlbWVzLCAkbmFtZSwgJHRoZW1lLXBhcnNlZCk7XG59XG5cbkBmdW5jdGlvbiBnZXQtZW5hYmxlZC10aGVtZXMoKSB7XG4gICR0aGVtZXMtdG8taW5zdGFsbDogKCk7XG5cbiAgQGlmIChsZW5ndGgoJG5iLWVuYWJsZWQtdGhlbWVzKSA+IDApIHtcbiAgICBAZWFjaCAkdGhlbWUtbmFtZSBpbiAkbmItZW5hYmxlZC10aGVtZXMge1xuICAgICAgJHRoZW1lcy10by1pbnN0YWxsOiBtYXAtc2V0KCR0aGVtZXMtdG8taW5zdGFsbCwgJHRoZW1lLW5hbWUsIG1hcC1nZXQoJG5iLXRoZW1lcywgJHRoZW1lLW5hbWUpKTtcbiAgICB9XG4gIH0gQGVsc2Uge1xuICAgICR0aGVtZXMtdG8taW5zdGFsbDogJG5iLXRoZW1lcztcbiAgfVxuXG4gIEByZXR1cm4gJHRoZW1lcy10by1pbnN0YWxsO1xufVxuXG5AbWl4aW4gaW5zdGFsbC1jc3MtdmFyaWFibGVzKCR0aGVtZS1uYW1lLCAkdmFyaWFibGVzKSB7XG4gIC5uYi10aGVtZS0jeyR0aGVtZS1uYW1lfSB7XG4gICAgQGVhY2ggJHZhciwgJHZhbHVlIGluICR2YXJpYWJsZXMge1xuICAgICAgLS0jeyR2YXJ9OiAkdmFsdWU7XG4gICAgfVxuICB9XG59XG5cbi8vIFRPRE86IHdlIGhpZGUgOmhvc3QgaW5zaWRlIG9mIGl0IHdoaWNoIGlzIG5vdCBvYnZpb3VzXG5AbWl4aW4gbmItaW5zdGFsbC1jb21wb25lbnQoKSB7XG5cbiAgJHRoZW1lcy10by1pbnN0YWxsOiBnZXQtZW5hYmxlZC10aGVtZXMoKTtcblxuICBAZWFjaCAkdGhlbWUtbmFtZSwgJHRoZW1lIGluICR0aGVtZXMtdG8taW5zdGFsbCB7XG4gICAgLypcbiAgICAgIDpob3N0IGNhbiBiZSBwcmVmaXhlZFxuICAgICAgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iLzhkMGVlMzQ5MzlmMTRjMDc4NzZkMjIyYzI1YjQwNWVkNDU4YTM0ZDMvcGFja2FnZXMvY29tcGlsZXIvc3JjL3NoYWRvd19jc3MudHMjTDQ0MVxuXG4gICAgICBXZSBoYXZlIHRvIHVzZSA6aG9zdCBpbnN0ZWQgb2YgOmhvc3QtY29udGV4dCgkdGhlbWUpLCB0byBiZSBhYmxlIHRvIHByZWZpeCB0aGVtZSBjbGFzc1xuICAgICAgd2l0aCBzb21ldGhpbmcgZGVmaW5lZCBpbnNpZGUgb2YgQGNvbnRlbnQsIGJ5IHByZWZpeGluZyAmLlxuICAgICAgRm9yIGV4YW1wbGUgdGhpcyBzY3NzIGNvZGU6XG4gICAgICAgIC5uYi10aGVtZS1kZWZhdWx0IHtcbiAgICAgICAgICAuc29tZS1zZWxlY3RvciAmIHtcbiAgICAgICAgICAgIC4uLlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgV2lsbCByZXN1bHQgaW4gbmV4dCBjc3M6XG4gICAgICAgIC5zb21lLXNlbGVjdG9yIC5uYi10aGVtZS1kZWZhdWx0IHtcbiAgICAgICAgICAuLi5cbiAgICAgICAgfVxuXG4gICAgICBJdCBkb2Vzbid0IHdvcmsgd2l0aCA6aG9zdC1jb250ZXh0IGJlY2F1c2UgYW5ndWxhciBzcGxpdHRpbmcgaXQgaW4gdHdvIHNlbGVjdG9ycyBhbmQgcmVtb3Zlc1xuICAgICAgcHJlZml4IGluIG9uZSBvZiB0aGUgc2VsZWN0b3JzLlxuICAgICovXG4gICAgLm5iLXRoZW1lLSN7JHRoZW1lLW5hbWV9IDpob3N0IHtcbiAgICAgICR0aGVtZTogc2V0LWdsb2JhbC10aGVtZS12YXJzKCR0aGVtZSwgJHRoZW1lLW5hbWUpO1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBuYi1mb3ItdGhlbWUoJG5hbWUpIHtcbiAgQGlmICgkdGhlbWUtbmFtZSA9PSAkbmFtZSkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBuYi1leGNlcHQtdGhlbWUoJG5hbWUpIHtcbiAgQGlmICgkdGhlbWUtbmFtZSAhPSAkbmFtZSkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbi8vIFRPRE86IGFub3RoZXIgbWl4aW5nIGZvciB0aGUgYWxtb3N0IHNhbWUgdGhpbmdcbkBtaXhpbiBuYi1pbnN0YWxsLXJvb3QtY29tcG9uZW50KCkge1xuICBAd2FybiAnYG5iLWluc3RhbGwtcm9vdC1jb21wb25lbnRgIGlzIGRlcHJpY2F0ZWQsIHJlcGxhY2Ugd2l0aCBgbmItaW5zdGFsbC1jb21wb25lbnRgLCBhcyBgYm9keWAgaXMgcm9vdCBlbGVtZW50IG5vdyc7XG5cbiAgQGluY2x1ZGUgbmItaW5zdGFsbC1jb21wb25lbnQoKSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG5iLWluc3RhbGwtZ2xvYmFsKCkge1xuICAkdGhlbWVzLXRvLWluc3RhbGw6IGdldC1lbmFibGVkLXRoZW1lcygpO1xuXG4gIEBlYWNoICR0aGVtZS1uYW1lLCAkdGhlbWUgaW4gJHRoZW1lcy10by1pbnN0YWxsIHtcbiAgICAubmItdGhlbWUtI3skdGhlbWUtbmFtZX0ge1xuICAgICAgJHRoZW1lOiBzZXQtZ2xvYmFsLXRoZW1lLXZhcnMoJHRoZW1lLCAkdGhlbWUtbmFtZSk7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuQG1peGluIG5iLXNjcm9sbGJhcnMoJGZnLCAkYmcsICRzaXplLCAkYm9yZGVyLXJhZGl1czogJHNpemUgLyAyKSB7XG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiAkc2l6ZTtcbiAgICBoZWlnaHQ6ICRzaXplO1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgYmFja2dyb3VuZDogJGZnO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAkYm9yZGVyLXJhZGl1cztcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgIGJhY2tncm91bmQ6ICRiZztcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZVxuICAvLyBGb3IgSW50ZXJuZXQgRXhwbG9yZXJcbiAgc2Nyb2xsYmFyLWZhY2UtY29sb3I6ICRmZztcbiAgc2Nyb2xsYmFyLXRyYWNrLWNvbG9yOiAkYmc7XG59XG5cbkBtaXhpbiBuYi1yYWRpYWwtZ3JhZGllbnQoJGNvbG9yLTEsICRjb2xvci0yLCAkY29sb3ItMykge1xuICBiYWNrZ3JvdW5kOiAkY29sb3ItMjsgLyogT2xkIGJyb3dzZXJzICovXG4gIGJhY2tncm91bmQ6IC1tb3otcmFkaWFsLWdyYWRpZW50KGJvdHRvbSwgZWxsaXBzZSBjb3ZlciwgJGNvbG9yLTEgMCUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbG9yLTIgNDUlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb2xvci0zIDEwMCUpOyAvKiBGRjMuNi0xNSAqL1xuICBiYWNrZ3JvdW5kOiAtd2Via2l0LXJhZGlhbC1ncmFkaWVudChib3R0b20sIGVsbGlwc2UgY292ZXIsICRjb2xvci0xIDAlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb2xvci0yIDQ1JSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29sb3ItMyAxMDAlKTsgLyogQ2hyb21lMTAtMjUsU2FmYXJpNS4xLTYgKi9cbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgYm90dG9tLCAkY29sb3ItMSAwJSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29sb3ItMiA0NSUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbG9yLTMgMTAwJSk7IC8qIFczQywgSUUxMCssIEZGMTYrLCBDaHJvbWUyNissIE9wZXJhMTIrLCBTYWZhcmk3KyAqL1xuICBmaWx0ZXI6IHByb2dpZDpkeGltYWdldHJhbnNmb3JtLm1pY3Jvc29mdC5ncmFkaWVudChzdGFydENvbG9yc3RyPSckY29sb3ItMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZENvbG9yc3RyPSckY29sb3ItMycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdyYWRpZW50VHlwZT0xKTsgLyogSUU2LTkgZmFsbGJhY2sgb24gaG9yaXpvbnRhbCBncmFkaWVudCAqL1xufVxuXG5AbWl4aW4gbmItcmlnaHQtZ3JhZGllbnQoJGxlZnQtY29sb3IsICRyaWdodC1jb2xvcikge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICRsZWZ0LWNvbG9yLCAkcmlnaHQtY29sb3IpO1xufVxuXG5AbWl4aW4gbmItaGVhZGluZ3MoJGZyb206IDEsICR0bzogNikge1xuICBAZm9yICRpIGZyb20gJGZyb20gdGhyb3VnaCAkdG8ge1xuICAgIGgjeyRpfSB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBob3Zlci1mb2N1cy1hY3RpdmUge1xuICAmOmZvY3VzLFxuICAmOmFjdGl2ZSxcbiAgJjpob3ZlciB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIGNlbnRlci1ob3Jpem9udGFsLWFic29sdXRlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwKTtcbiAgbGVmdDogNTAlO1xufVxuXG5AbWl4aW4gaW5zdGFsbC10aHVtYigpIHtcbiAgJHRodW1iLXNlbGVjdG9yczogKFxuICAgICc6Oi13ZWJraXQtc2xpZGVyLXRodW1iJ1xuICAgICc6Oi1tb3otcmFuZ2UtdGh1bWInXG4gICAgJzo6LW1zLXRodW1iJ1xuICApO1xuXG4gIEBlYWNoICRzZWxlY3RvciBpbiAkdGh1bWItc2VsZWN0b3JzIHtcbiAgICAmI3skc2VsZWN0b3J9IHtcbiAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gaW5zdGFsbC10cmFjaygpIHtcbiAgJHRodW1iLXNlbGVjdG9yczogKFxuICAgICc6Oi13ZWJraXQtc2xpZGVyLXJ1bm5hYmxlLXRyYWNrJ1xuICAgICc6Oi1tb3otcmFuZ2UtdHJhY2snXG4gICAgJzo6LW1zLXRyYWNrJ1xuICApO1xuXG4gIEBlYWNoICRzZWxlY3RvciBpbiAkdGh1bWItc2VsZWN0b3JzIHtcbiAgICAmI3skc2VsZWN0b3J9IHtcbiAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gaW5zdGFsbC1wbGFjZWhvbGRlcigkY29sb3IsICRmb250LXNpemUpIHtcbiAgJHBsYWNlaG9sZGVyLXNlbGVjdG9yczogKFxuICAgICc6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXInXG4gICAgJzo6LW1vei1wbGFjZWhvbGRlcidcbiAgICAnOi1tb3otcGxhY2Vob2xkZXInXG4gICAgJzotbXMtaW5wdXQtcGxhY2Vob2xkZXInXG4gICk7XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIEBpbmNsdWRlIHBsYWNlaG9sZGVyKCRjb2xvciwgJGZvbnQtc2l6ZSk7XG4gIH1cblxuICBAZWFjaCAkc2VsZWN0b3IgaW4gJHBsYWNlaG9sZGVyLXNlbGVjdG9ycyB7XG4gICAgJiN7JHNlbGVjdG9yfSB7XG4gICAgICBAaW5jbHVkZSBwbGFjZWhvbGRlcigkY29sb3IsICRmb250LXNpemUpO1xuICAgIH1cblxuICAgICY6Zm9jdXMjeyRzZWxlY3Rvcn0ge1xuICAgICAgQGluY2x1ZGUgcGxhY2Vob2xkZXItZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHBsYWNlaG9sZGVyKCRjb2xvciwgJGZvbnQtc2l6ZSkge1xuICBjb2xvcjogJGNvbG9yO1xuICBmb250LXNpemU6ICRmb250LXNpemU7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuQG1peGluIHBsYWNlaG9sZGVyLWZvY3VzKCkge1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbn1cblxuQG1peGluIGFuaW1hdGlvbigkYW5pbWF0ZS4uLikge1xuICAkbWF4OiBsZW5ndGgoJGFuaW1hdGUpO1xuICAkYW5pbWF0aW9uczogJyc7XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkbWF4IHtcbiAgICAkYW5pbWF0aW9uczogI3skYW5pbWF0aW9ucyArIG50aCgkYW5pbWF0ZSwgJGkpfTtcblxuICAgIEBpZiAkaSA8ICRtYXgge1xuICAgICAgJGFuaW1hdGlvbnM6ICN7JGFuaW1hdGlvbnMgKyAnLCAnfTtcbiAgICB9XG4gIH1cbiAgLXdlYmtpdC1hbmltYXRpb246ICRhbmltYXRpb25zO1xuICAtbW96LWFuaW1hdGlvbjogICAgJGFuaW1hdGlvbnM7XG4gIC1vLWFuaW1hdGlvbjogICAgICAkYW5pbWF0aW9ucztcbiAgYW5pbWF0aW9uOiAgICAgICAgICRhbmltYXRpb25zO1xufVxuXG5AbWl4aW4ga2V5ZnJhbWVzKCRhbmltYXRpb25OYW1lKSB7XG4gIEAtd2Via2l0LWtleWZyYW1lcyAjeyRhbmltYXRpb25OYW1lfSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbiAgQC1tb3ota2V5ZnJhbWVzICN7JGFuaW1hdGlvbk5hbWV9IHtcbiAgICBAY29udGVudDtcbiAgfVxuICBALW8ta2V5ZnJhbWVzICN7JGFuaW1hdGlvbk5hbWV9IHtcbiAgICBAY29udGVudDtcbiAgfVxuICBAa2V5ZnJhbWVzICN7JGFuaW1hdGlvbk5hbWV9IHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgbWl4aW4gZ2VuZXJhdGVzIGtleWZhbWVzLlxuICogQmVjYXVzZSBvZiBhbGwga2V5ZnJhbWVzIGNhbid0IGJlIHNjb3BlZCxcbiAqIHdlIG5lZWQgdG8gcHV0cyB1bmlxdWUgbmFtZSBpbiBlYWNoIGJ0bi1wdWxzZSBjYWxsLlxuICovXG5AbWl4aW4gYnRuLXB1bHNlKCRuYW1lLCAkY29sb3IpIHtcbiAgJi5idG4tcHVsc2Uge1xuICAgIEBpbmNsdWRlIGFuaW1hdGlvbihidG4tI3skbmFtZX0tcHVsc2UgMS41cyBpbmZpbml0ZSk7XG4gIH1cblxuICBAaW5jbHVkZSBrZXlmcmFtZXMoYnRuLSN7JG5hbWV9LXB1bHNlKSB7XG4gICAgMCUge1xuICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgIG9wYWNpdHk6IG5iLXRoZW1lKGJ0bi1kaXNhYmxlZC1vcGFjaXR5KTtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAxcmVtIDAgJGNvbG9yO1xuICAgICAgb3BhY2l0eTogMC44O1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICBvcGFjaXR5OiBuYi10aGVtZShidG4tZGlzYWJsZWQtb3BhY2l0eSk7XG4gICAgfVxuICB9XG59XG5cbi8qXG5cbkFjY29yZGluZyB0byB0aGUgc3BlY2lmaWNhdGlvbiAoaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy1zY29waW5nLTEvI2hvc3Qtc2VsZWN0b3IpXG46aG9zdCBhbmQgOmhvc3QtY29udGV4dCBhcmUgcHNldWRvLWNsYXNzZXMuIFNvIHdlIGFzc3VtZSB0aGV5IGNvdWxkIGJlIGNvbWJpbmVkLFxubGlrZSBvdGhlciBwc2V1ZG8tY2xhc3NlcywgZXZlbiBzYW1lIG9uZXMuXG5Gb3IgZXhhbXBsZTogJzpudGgtb2YtdHlwZSgybik6bnRoLW9mLXR5cGUoZXZlbiknLlxuXG5JZGVhbCBzb2x1dGlvbiB3b3VsZCBiZSB0byBwcmVwZW5kIGFueSBzZWxlY3RvciB3aXRoIDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKS5cblRoZW4gbmVidWxhciBjb21wb25lbnRzIHdpbGwgYmVoYXZlIGFzIGFuIGh0bWwgZWxlbWVudCBhbmQgcmVzcG9uZCB0byBbZGlyXSBhdHRyaWJ1dGUgb24gYW55IGxldmVsLFxuc28gZGlyZWN0aW9uIGNvdWxkIGJlIG92ZXJyaWRkZW4gb24gYW55IGNvbXBvbmVudCBsZXZlbC5cblxuSW1wbGVtZW50YXRpb24gY29kZTpcblxuQG1peGluIG5iLXJ0bCgpIHtcbiAgLy8gYWRkICMgdG8gc2NzcyBpbnRlcnBvbGF0aW9uIHN0YXRlbWVudC5cbiAgLy8gaXQgd29ya3MgaW4gY29tbWVudHMgYW5kIHdlIGNhbid0IHVzZSBpdCBoZXJlXG4gIEBhdC1yb290IHtzZWxlY3Rvci1hcHBlbmQoJzpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKScsICYpfSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQW5kIHdoZW4gd2UgY2FsbCBpdCBzb21ld2hlcmU6XG5cbjpob3N0IHtcbiAgLnNvbWUtY2xhc3Mge1xuICAgIEBpbmNsdWRlIG5iLXJ0bCgpIHtcbiAgICAgIC4uLlxuICAgIH1cbiAgfVxufVxuOmhvc3QtY29udGV4dCguLi4pIHtcbiAgLnNvbWUtY2xhc3Mge1xuICAgIEBpbmNsdWRlIG5iLXJ0bCgpIHtcbiAgICAgIC4uLlxuICAgIH1cbiAgfVxufVxuXG5SZXN1bHQgd2lsbCBsb29rIGxpa2U6XG5cbjpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKTpob3N0IC5zb21lLWNsYXNzIHtcbiAgLi4uXG59XG46aG9zdC1jb250ZXh0KFtkaXI9cnRsXSk6aG9zdC1jb250ZXh0KC4uLikgLnNvbWUtY2xhc3Mge1xuICAuLi5cbn1cblxuKlxuICBTaWRlIG5vdGU6XG4gIDpob3N0LWNvbnRleHQoKTpob3N0IHNlbGVjdG9yIGFyZSB2YWxpZC4gaHR0cHM6Ly9saXN0cy53My5vcmcvQXJjaGl2ZXMvUHVibGljL3d3dy1zdHlsZS8yMDE1RmViLzAzMDUuaHRtbFxuXG4gIDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKTpob3N0LWNvbnRleHQoLi4uKSBzaG91bGQgbWF0Y2ggYW55IHBlcm11dGF0aW9uLFxuICBzbyBvcmRlciBpcyBub3QgaW1wb3J0YW50LlxuKlxuXG5cbkN1cnJlbnRseSwgdGhlcmUncmUgdHdvIHByb2JsZW1zIHdpdGggdGhpcyBhcHByb2FjaDpcblxuRmlyc3QsIGlzIHRoYXQgd2UgY2FuJ3QgY29tYmluZSA6aG9zdCwgOmhvc3QtY29udGV4dC4gQW5ndWxhciBidWdzICMxNDM0OSwgIzE5MTk5LlxuRm9yIHRoZSBtb21lbnQgb2Ygd3JpdGluZywgdGhlIG9ubHkgcG9zc2libGUgd2F5IGlzOlxuOmhvc3Qge1xuICA6aG9zdC1jb250ZXh0KC4uLikge1xuICAgIC4uLlxuICB9XG59XG5JdCBkb2Vzbid0IHdvcmsgZm9yIHVzIGJlY2F1c2UgbWl4aW4gY291bGQgYmUgY2FsbGVkIHNvbWV3aGVyZSBkZWVwZXIsIGxpa2U6XG46aG9zdCB7XG4gIHAge1xuICAgIEBpbmNsdWRlIG5iLXJ0bCgpIHsgLi4uIH1cbiAgfVxufVxuV2UgYXJlIG5vdCBhYmxlIHRvIGdvIHVwIHRvIDpob3N0IGxldmVsIHRvIHBsYWNlIGNvbnRlbnQgcGFzc2VkIHRvIG1peGluLlxuXG5UaGUgc2Vjb25kIHByb2JsZW0gaXMgdGhhdCB3ZSBvbmx5IGNhbiBiZSBzdXJlIHRoYXQgd2UgYXBwZW5kaW5nIDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSB0byBhbm90aGVyXG46aG9zdC86aG9zdC1jb250ZXh0IHBzZXVkby1jbGFzcyB3aGVuIGNhbGxlZCBpbiB0aGVtZSBmaWxlcyAoKi50aGVtZS5zY3NzKS5cbiAgKlxuICAgIFNpZGUgbm90ZTpcbiAgICBDdXJyZW50bHksIG5iLWluc3RhbGwtY29tcG9uZW50IHVzZXMgYW5vdGhlciBhcHByb2FjaCB3aGVyZSA6aG9zdCBwcmVwZW5kZWQgd2l0aCB0aGUgdGhlbWUgbmFtZVxuICAgIChodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvNWI5NjA3ODYyNGIwYTQ3NjBmMmRiY2Y2ZmRmMGJkNjI3OTFiZTViYi9wYWNrYWdlcy9jb21waWxlci9zcmMvc2hhZG93X2Nzcy50cyNMNDQxKSxcbiAgICBidXQgaXQgd2FzIG1hZGUgdG8gYmUgYWJsZSB0byB1c2UgY3VycmVudCByZWFsaXphdGlvbiBvZiBydGwgYW5kIGl0IGNhbiBiZSByZXdyaXR0ZW4gYmFjayB0b1xuICAgIDpob3N0LWNvbnRleHQoJHRoZW1lKSBvbmNlIHdlIHdpbGwgYmUgYWJsZSB0byB1c2UgbXVsdGlwbGUgc2hhZG93IHNlbGVjdG9ycy5cbiAgKlxuQnV0IHdoZW4gaXQncyBjYWxsZWQgaW4gKi5jb21wb25lbnQuc2NzcyB3ZSBjYW4ndCBiZSBzdXJlLCB0aGF0IHNlbGVjdG9yIHN0YXJ0cyB3aXRoIDpob3N0Lzpob3N0LWNvbnRleHQsXG5iZWNhdXNlIGFuZ3VsYXIgYWxsb3dzIG9taXR0aW5nIHBzZXVkby1jbGFzc2VzIGlmIHdlIGRvbid0IG5lZWQgdG8gc3R5bGUgOmhvc3QgY29tcG9uZW50IGl0c2VsZi5cbldlIGNhbiBicmVhayBzdWNoIHNlbGVjdG9ycywgYnkganVzdCBhcHBlbmRpbmcgOmhvc3QtY29udGV4dChbZGlyPXJ0bF0pIHRvIHRoZW0uXG4gICoqKlxuICAgIFBvc3NpYmxlIHNvbHV0aW9uXG4gICAgY2hlY2sgaWYgd2UgaW4gdGhlbWUgYnkgc29tZSB0aGVtZSB2YXJpYWJsZXMgYW5kIGlmIHNvIGFwcGVuZCwgb3RoZXJ3aXNlIG5lc3QgbGlrZVxuICAgIEBhdC1yb290IDpob3N0LWNvbnRleHQoW2Rpcj1ydGxdKSB7XG4gICAgICAvLyBhZGQgIyB0byBzY3NzIGludGVycG9sYXRpb24gc3RhdGVtZW50LlxuICAgICAgLy8gaXQgd29ya3MgaW4gY29tbWVudHMgYW5kIHdlIGNhbid0IHVzZSBpdCBoZXJlXG4gICAgICB7Jn0ge1xuICAgICAgICBAY29udGVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgV2hhdCBpZiA6aG9zdCBzcGVjaWZpZWQ/IENhbiB3ZSBhZGQgc3BhY2UgaW4gOmhvc3QtY29udGV4dCguLi4pIDpob3N0P1xuICAgIE9yIG1heWJlIGFkZCA6aG9zdCBzZWxlY3RvciBhbnl3YXk/IElmIG11bHRpcGxlIDpob3N0IHNlbGVjdG9ycyBhcmUgYWxsb3dlZFxuICAqKipcblxuXG5Qcm9ibGVtcyB3aXRoIHRoZSBjdXJyZW50IGFwcHJvYWNoLlxuXG4xLiBEaXJlY3Rpb24gY2FuIGJlIGFwcGxpZWQgb25seSBvbiBkb2N1bWVudCBsZXZlbCwgYmVjYXVzZSBtaXhpbiBwcmVwZW5kcyB0aGVtZSBjbGFzcyxcbndoaWNoIHBsYWNlZCBvbiB0aGUgYm9keS5cbjIuICouY29tcG9uZW50LnNjc3Mgc3R5bGVzIHNob3VsZCBiZSBpbiA6aG9zdCBzZWxlY3Rvci4gT3RoZXJ3aXNlIGFuZ3VsYXIgd2lsbCBhZGQgaG9zdFxuYXR0cmlidXRlIHRvIFtkaXI9cnRsXSBhdHRyaWJ1dGUgYXMgd2VsbC5cblxuXG5HZW5lcmFsIHByb2JsZW1zLlxuXG5MdHIgaXMgZGVmYXVsdCBkb2N1bWVudCBkaXJlY3Rpb24sIGJ1dCBmb3IgcHJvcGVyIHdvcmsgb2YgbmItbHRyIChtZWFucyBsdHIgb25seSksXG5bZGlyPWx0cl0gc2hvdWxkIGJlIHNwZWNpZmllZCBhdCBsZWFzdCBzb21ld2hlcmUuICc6bm90KFtkaXI9cnRsXScgbm90IGFwcGxpY2FibGUgaGVyZSxcbmJlY2F1c2UgaXQncyBzYXRpc2Z5IGFueSBwYXJlbnQsIHRoYXQgZG9uJ3QgaGF2ZSBbZGlyPXJ0bF0gYXR0cmlidXRlLlxuUHJldmlvdXMgYXBwcm9hY2ggd2FzIHRvIHVzZSBzaW5nbGUgcnRsIG1peGluIGFuZCByZXNldCBsdHIgcHJvcGVydGllcyB0byBpbml0aWFsIHZhbHVlLlxuQnV0IHNvbWV0aW1lcyBpdCdzIGhhcmQgdG8gZmluZCwgd2hhdCB0aGUgcHJldmlvdXMgdmFsdWUgc2hvdWxkIGJlLiBBbmQgc3VjaCBtaXhpbiBjYWxsIGxvb2tzIHRvbyB2ZXJib3NlLlxuKi9cblxuQG1peGluIF9wcmVwZW5kLXdpdGgtc2VsZWN0b3IoJHNlbGVjdG9yLCAkcHJvcDogbnVsbCwgJHZhbHVlOiBudWxsKSB7XG4gICN7JHNlbGVjdG9yfSAmIHtcbiAgICBAaWYgJHByb3AgIT0gbnVsbCB7XG4gICAgICAjeyRwcm9wfTogJHZhbHVlO1xuICAgIH1cblxuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBuYi1sdHIoJHByb3A6IG51bGwsICR2YWx1ZTogbnVsbCkge1xuICBAaW5jbHVkZSBfcHJlcGVuZC13aXRoLXNlbGVjdG9yKCdbZGlyPWx0cl0nLCAkcHJvcCwgJHZhbHVlKSB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIG5iLXJ0bCgkcHJvcDogbnVsbCwgJHZhbHVlOiBudWxsKSB7XG4gIEBpbmNsdWRlIF9wcmVwZW5kLXdpdGgtc2VsZWN0b3IoJ1tkaXI9cnRsXScsICRwcm9wLCAkdmFsdWUpIHtcbiAgICBAY29udGVudDtcbiAgfTtcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuLy8vIFNsaWdodGx5IGxpZ2h0ZW4gYSBjb2xvclxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGNvbG9yIC0gY29sb3IgdG8gdGludFxuLy8vIEBwYXJhbSB7TnVtYmVyfSAkcGVyY2VudGFnZSAtIHBlcmNlbnRhZ2Ugb2YgYCRjb2xvcmAgaW4gcmV0dXJuZWQgY29sb3Jcbi8vLyBAcmV0dXJuIHtDb2xvcn1cbkBmdW5jdGlvbiB0aW50KCRjb2xvciwgJHBlcmNlbnRhZ2UpIHtcbiAgQHJldHVybiBtaXgod2hpdGUsICRjb2xvciwgJHBlcmNlbnRhZ2UpO1xufVxuXG4vLy8gU2xpZ2h0bHkgZGFya2VuIGEgY29sb3Jcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciAtIGNvbG9yIHRvIHNoYWRlXG4vLy8gQHBhcmFtIHtOdW1iZXJ9ICRwZXJjZW50YWdlIC0gcGVyY2VudGFnZSBvZiBgJGNvbG9yYCBpbiByZXR1cm5lZCBjb2xvclxuLy8vIEByZXR1cm4ge0NvbG9yfVxuQGZ1bmN0aW9uIHNoYWRlKCRjb2xvciwgJHBlcmNlbnRhZ2UpIHtcbiAgQHJldHVybiBtaXgoYmxhY2ssICRjb2xvciwgJHBlcmNlbnRhZ2UpO1xufVxuXG5AZnVuY3Rpb24gbWFwLXNldCgkbWFwLCAka2V5LCAkdmFsdWU6IG51bGwpIHtcbiAgJG5ldzogKCRrZXk6ICR2YWx1ZSk7XG4gIEByZXR1cm4gbWFwLW1lcmdlKCRtYXAsICRuZXcpO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5AaW1wb3J0ICcuLi9jb3JlL2Z1bmN0aW9ucyc7XG5AaW1wb3J0ICcuLi9jb3JlL21peGlucyc7XG5cbiR0aGVtZTogKFxuICBmb250LW1haW46IHVucXVvdGUoJ1wiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBzYW5zLXNlcmlmJyksXG4gIGZvbnQtc2Vjb25kYXJ5OiBmb250LW1haW4sXG5cbiAgZm9udC13ZWlnaHQtdGhpbjogMjAwLFxuICBmb250LXdlaWdodC1saWdodDogMzAwLFxuICBmb250LXdlaWdodC1ub3JtYWw6IDQwMCxcbiAgZm9udC13ZWlnaHQtYm9sZGVyOiA1MDAsXG4gIGZvbnQtd2VpZ2h0LWJvbGQ6IDYwMCxcbiAgZm9udC13ZWlnaHQtdWx0cmEtYm9sZDogODAwLFxuXG4gIC8vIFRPRE86IHVzZSBpdCBhcyBhIGRlZmF1bHQgZm9udC1zaXplXG4gIGJhc2UtZm9udC1zaXplOiAxNnB4LFxuXG4gIGZvbnQtc2l6ZS14bGc6IDEuMjVyZW0sXG4gIGZvbnQtc2l6ZS1sZzogMS4xMjVyZW0sXG4gIGZvbnQtc2l6ZTogMXJlbSxcbiAgZm9udC1zaXplLXNtOiAwLjg3NXJlbSxcbiAgZm9udC1zaXplLXhzOiAwLjc1cmVtLFxuXG4gIHJhZGl1czogMC4zNzVyZW0sXG4gIHBhZGRpbmc6IDEuMjVyZW0sXG4gIG1hcmdpbjogMS41cmVtLFxuICBsaW5lLWhlaWdodDogMS4yNSxcblxuICBjb2xvci1iZzogI2ZmZmZmZixcbiAgY29sb3ItYmctYWN0aXZlOiAjZTllZGYyLFxuICBjb2xvci1mZzogI2E0YWJiMyxcbiAgY29sb3ItZmctaGVhZGluZzogIzJhMmEyYSxcbiAgY29sb3ItZmctdGV4dDogIzRiNGI0YixcbiAgY29sb3ItZmctaGlnaGxpZ2h0OiAjNDBkYzdlLFxuXG4gIHNlcGFyYXRvcjogI2ViZWVmMixcblxuICBjb2xvci1ncmF5OiByZ2JhKDgxLCAxMTMsIDE2NSwgMC4xNSksXG4gIGNvbG9yLW5ldXRyYWw6IHRyYW5zcGFyZW50LFxuICBjb2xvci13aGl0ZTogI2ZmZmZmZixcbiAgY29sb3ItZGlzYWJsZWQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSxcblxuICBjb2xvci1wcmltYXJ5OiAjOGE3ZmZmLFxuICBjb2xvci1zdWNjZXNzOiAjNDBkYzdlLFxuICBjb2xvci1pbmZvOiAjNGNhNmZmLFxuICBjb2xvci13YXJuaW5nOiAjZmZhMTAwLFxuICBjb2xvci1kYW5nZXI6ICNmZjRjNmEsXG5cbiAgLy8gVE9ETzogbW92ZSB0byBjb25zdGFudHNcbiAgc29jaWFsLWNvbG9yLWZhY2Vib29rOiAjM2I1OTk4LFxuICBzb2NpYWwtY29sb3ItdHdpdHRlcjogIzU1YWNlZSxcbiAgc29jaWFsLWNvbG9yLWdvb2dsZTogI2RkNGIzOSxcbiAgc29jaWFsLWNvbG9yLWxpbmtlZGluOiAjMDE3N2I1LFxuICBzb2NpYWwtY29sb3ItZ2l0aHViOiAjNmI2YjZiLFxuICBzb2NpYWwtY29sb3Itc3RhY2tvdmVyZmxvdzogIzJmOTZlOCxcbiAgc29jaWFsLWNvbG9yLWRyaWJibGU6ICNmMjY3OTgsXG4gIHNvY2lhbC1jb2xvci1iZWhhbmNlOiAjMDA5M2ZhLFxuXG4gIGJvcmRlci1jb2xvcjogY29sb3ItZ3JheSxcbiAgc2hhZG93OiAwIDJweCAxMnB4IDAgI2RmZTNlYixcblxuICBsaW5rLWNvbG9yOiAjM2RjYzZkLFxuICBsaW5rLWNvbG9yLWhvdmVyOiAjMmVlNTZiLFxuICBsaW5rLWNvbG9yLXZpc2l0ZWQ6IGxpbmstY29sb3IsXG5cbiAgc2Nyb2xsYmFyLWZnOiAjZGFkYWRhLFxuICBzY3JvbGxiYXItYmc6ICNmMmYyZjIsXG4gIHNjcm9sbGJhci13aWR0aDogNXB4LFxuICBzY3JvbGxiYXItdGh1bWItcmFkaXVzOiAyLjVweCxcblxuICByYWRpYWwtZ3JhZGllbnQ6IG5vbmUsXG4gIGxpbmVhci1ncmFkaWVudDogbm9uZSxcblxuICBjYXJkLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBjYXJkLWxpbmUtaGVpZ2h0OiBsaW5lLWhlaWdodCxcbiAgY2FyZC1mb250LXdlaWdodDogZm9udC13ZWlnaHQtbm9ybWFsLFxuICBjYXJkLWZnOiBjb2xvci1mZywgLy8gVE9ETzogbm90IHVzZWRcbiAgY2FyZC1mZy10ZXh0OiBjb2xvci1mZy10ZXh0LFxuICBjYXJkLWZnLWhlYWRpbmc6IGNvbG9yLWZnLWhlYWRpbmcsIC8vIFRPRE86IG5vdCB1c2VkXG4gIGNhcmQtYmc6IGNvbG9yLWJnLFxuICBjYXJkLWhlaWdodC14eHNtYWxsOiA5NnB4LFxuICBjYXJkLWhlaWdodC14c21hbGw6IDIxNnB4LFxuICBjYXJkLWhlaWdodC1zbWFsbDogMzM2cHgsXG4gIGNhcmQtaGVpZ2h0LW1lZGl1bTogNDU2cHgsXG4gIGNhcmQtaGVpZ2h0LWxhcmdlOiA1NzZweCxcbiAgY2FyZC1oZWlnaHQteGxhcmdlOiA2OTZweCxcbiAgY2FyZC1oZWlnaHQteHhsYXJnZTogODE2cHgsXG4gIGNhcmQtc2hhZG93OiBzaGFkb3csXG4gIGNhcmQtYm9yZGVyLXdpZHRoOiAwLFxuICBjYXJkLWJvcmRlci10eXBlOiBzb2xpZCxcbiAgY2FyZC1ib3JkZXItY29sb3I6IGNvbG9yLWJnLFxuICBjYXJkLWJvcmRlci1yYWRpdXM6IHJhZGl1cyxcbiAgY2FyZC1wYWRkaW5nOiBwYWRkaW5nLFxuICBjYXJkLW1hcmdpbjogbWFyZ2luLFxuICBjYXJkLWhlYWRlci1mb250LWZhbWlseTogZm9udC1zZWNvbmRhcnksXG4gIGNhcmQtaGVhZGVyLWZvbnQtc2l6ZTogZm9udC1zaXplLWxnLFxuICBjYXJkLWhlYWRlci1mb250LXdlaWdodDogZm9udC13ZWlnaHQtYm9sZCxcbiAgY2FyZC1zZXBhcmF0b3I6IHNlcGFyYXRvcixcbiAgY2FyZC1oZWFkZXItZmc6IGNvbG9yLWZnLCAvLyBUT0RPOiBub3QgdXNlZFxuICBjYXJkLWhlYWRlci1mZy1oZWFkaW5nOiBjb2xvci1mZy1oZWFkaW5nLFxuICBjYXJkLWhlYWRlci1hY3RpdmUtYmc6IGNvbG9yLWZnLFxuICBjYXJkLWhlYWRlci1hY3RpdmUtZmc6IGNvbG9yLWJnLFxuICBjYXJkLWhlYWRlci1kaXNhYmxlZC1iZzogY29sb3ItZGlzYWJsZWQsXG4gIGNhcmQtaGVhZGVyLXByaW1hcnktYmc6IGNvbG9yLXByaW1hcnksXG4gIGNhcmQtaGVhZGVyLWluZm8tYmc6IGNvbG9yLWluZm8sXG4gIGNhcmQtaGVhZGVyLXN1Y2Nlc3MtYmc6IGNvbG9yLXN1Y2Nlc3MsXG4gIGNhcmQtaGVhZGVyLXdhcm5pbmctYmc6IGNvbG9yLXdhcm5pbmcsXG4gIGNhcmQtaGVhZGVyLWRhbmdlci1iZzogY29sb3ItZGFuZ2VyLFxuICBjYXJkLWhlYWRlci1ib3JkZXItd2lkdGg6IDFweCxcbiAgY2FyZC1oZWFkZXItYm9yZGVyLXR5cGU6IHNvbGlkLFxuICBjYXJkLWhlYWRlci1ib3JkZXItY29sb3I6IGNhcmQtc2VwYXJhdG9yLFxuXG4gIGhlYWRlci1mb250LWZhbWlseTogZm9udC1zZWNvbmRhcnksXG4gIGhlYWRlci1mb250LXNpemU6IGZvbnQtc2l6ZSxcbiAgaGVhZGVyLWxpbmUtaGVpZ2h0OiBsaW5lLWhlaWdodCxcbiAgaGVhZGVyLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBoZWFkZXItYmc6IGNvbG9yLWJnLFxuICBoZWFkZXItaGVpZ2h0OiA0Ljc1cmVtLFxuICBoZWFkZXItcGFkZGluZzogMS4yNXJlbSxcbiAgaGVhZGVyLXNoYWRvdzogc2hhZG93LFxuXG4gIGZvb3Rlci1oZWlnaHQ6IDQuNzI1cmVtLFxuICBmb290ZXItcGFkZGluZzogMS4yNXJlbSxcbiAgZm9vdGVyLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBmb290ZXItZmctaGlnaGxpZ2h0OiBjb2xvci1mZy1oZWFkaW5nLFxuICBmb290ZXItYmc6IGNvbG9yLWJnLFxuICBmb290ZXItc2VwYXJhdG9yOiBzZXBhcmF0b3IsXG4gIGZvb3Rlci1zaGFkb3c6IHNoYWRvdyxcblxuICBsYXlvdXQtZm9udC1mYW1pbHk6IGZvbnQtbWFpbixcbiAgbGF5b3V0LWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBsYXlvdXQtbGluZS1oZWlnaHQ6IGxpbmUtaGVpZ2h0LFxuICBsYXlvdXQtZmc6IGNvbG9yLWZnLFxuICBsYXlvdXQtYmc6ICNlYmVmZjUsXG4gIGxheW91dC1taW4taGVpZ2h0OiAxMDB2aCxcbiAgbGF5b3V0LWNvbnRlbnQtd2lkdGg6IDkwMHB4LFxuICBsYXlvdXQtd2luZG93LW1vZGUtbWluLXdpZHRoOiAzMDBweCxcbiAgbGF5b3V0LXdpbmRvdy1tb2RlLW1heC13aWR0aDogMTkyMHB4LFxuICBsYXlvdXQtd2luZG93LW1vZGUtYmc6IGxheW91dC1iZyxcbiAgbGF5b3V0LXdpbmRvdy1tb2RlLXBhZGRpbmctdG9wOiA0Ljc1cmVtLFxuICBsYXlvdXQtd2luZG93LXNoYWRvdzogc2hhZG93LFxuICBsYXlvdXQtcGFkZGluZzogMi4yNXJlbSAyLjI1cmVtIDAuNzVyZW0sXG4gIGxheW91dC1tZWRpdW0tcGFkZGluZzogMS41cmVtIDEuNXJlbSAwLjVyZW0sXG4gIGxheW91dC1zbWFsbC1wYWRkaW5nOiAxcmVtIDFyZW0gMCxcblxuICBzaWRlYmFyLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBzaWRlYmFyLWxpbmUtaGVpZ2h0OiBsaW5lLWhlaWdodCxcbiAgc2lkZWJhci1mZzogY29sb3ItZmctaGVhZGluZyxcbiAgc2lkZWJhci1iZzogY29sb3ItYmcsXG4gIHNpZGViYXItaGVpZ2h0OiAxMDB2aCxcbiAgc2lkZWJhci13aWR0aDogMTZyZW0sXG4gIHNpZGViYXItd2lkdGgtY29tcGFjdDogMy41cmVtLFxuICBzaWRlYmFyLXBhZGRpbmc6IHBhZGRpbmcsXG4gIHNpZGViYXItaGVhZGVyLWhlaWdodDogMy41cmVtLFxuICBzaWRlYmFyLWZvb3Rlci1oZWlnaHQ6IDMuNXJlbSxcbiAgc2lkZWJhci1zaGFkb3c6IHNoYWRvdyxcblxuICBtZW51LWZvbnQtZmFtaWx5OiBmb250LXNlY29uZGFyeSxcbiAgbWVudS1mb250LXNpemU6IGZvbnQtc2l6ZSxcbiAgbWVudS1mb250LXdlaWdodDogZm9udC13ZWlnaHQtYm9sZGVyLFxuICBtZW51LWZnOiBjb2xvci1mZy10ZXh0LFxuICBtZW51LWJnOiBjb2xvci1iZyxcbiAgbWVudS1hY3RpdmUtZmc6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIG1lbnUtYWN0aXZlLWJnOiBjb2xvci1iZyxcbiAgbWVudS1hY3RpdmUtZm9udC13ZWlnaHQ6IGZvbnQtd2VpZ2h0LWJvbGQsXG5cbiAgbWVudS1zdWJtZW51LWJnOiBjb2xvci1iZyxcbiAgbWVudS1zdWJtZW51LWZnOiBjb2xvci1mZy10ZXh0LFxuICBtZW51LXN1Ym1lbnUtYWN0aXZlLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBtZW51LXN1Ym1lbnUtYWN0aXZlLWJnOiBjb2xvci1iZyxcbiAgbWVudS1zdWJtZW51LWFjdGl2ZS1ib3JkZXItY29sb3I6IGNvbG9yLWZnLWhpZ2hsaWdodCxcbiAgbWVudS1zdWJtZW51LWFjdGl2ZS1zaGFkb3c6IG5vbmUsXG4gIG1lbnUtc3VibWVudS1ob3Zlci1mZzogbWVudS1zdWJtZW51LWFjdGl2ZS1mZyxcbiAgbWVudS1zdWJtZW51LWhvdmVyLWJnOiBtZW51LXN1Ym1lbnUtYmcsXG4gIG1lbnUtc3VibWVudS1pdGVtLWJvcmRlci13aWR0aDogMC4xMjVyZW0sXG4gIG1lbnUtc3VibWVudS1pdGVtLWJvcmRlci1yYWRpdXM6IHJhZGl1cyxcbiAgbWVudS1zdWJtZW51LWl0ZW0tcGFkZGluZzogMC41cmVtIDFyZW0sXG4gIG1lbnUtc3VibWVudS1pdGVtLWNvbnRhaW5lci1wYWRkaW5nOiAwIDEuMjVyZW0sXG4gIG1lbnUtc3VibWVudS1wYWRkaW5nOiAwLjVyZW0sXG5cbiAgbWVudS1ncm91cC1mb250LXdlaWdodDogZm9udC13ZWlnaHQtYm9sZGVyLFxuICBtZW51LWdyb3VwLWZvbnQtc2l6ZTogMC44NzVyZW0sXG4gIG1lbnUtZ3JvdXAtZmc6IGNvbG9yLWZnLFxuICBtZW51LWdyb3VwLXBhZGRpbmc6IDFyZW0gMS4yNXJlbSxcbiAgbWVudS1pdGVtLXBhZGRpbmc6IDAuNjc1cmVtIDAuNzVyZW0sXG4gIG1lbnUtaXRlbS1zZXBhcmF0b3I6IHNlcGFyYXRvcixcbiAgbWVudS1pY29uLWZvbnQtc2l6ZTogMi41cmVtLFxuICBtZW51LWljb24tbWFyZ2luOiAwIDAuMjVyZW0gMCxcbiAgbWVudS1pY29uLWNvbG9yOiBjb2xvci1mZyxcbiAgbWVudS1pY29uLWFjdGl2ZS1jb2xvcjogY29sb3ItZmctaGVhZGluZyxcblxuICB0YWJzLWZvbnQtZmFtaWx5OiBmb250LXNlY29uZGFyeSxcbiAgdGFicy1mb250LXNpemU6IGZvbnQtc2l6ZS1sZyxcbiAgdGFicy1jb250ZW50LWZvbnQtZmFtaWx5OiBmb250LW1haW4sXG4gIHRhYnMtY29udGVudC1mb250LXNpemU6IGZvbnQtc2l6ZSxcbiAgdGFicy1hY3RpdmUtYmc6IHRyYW5zcGFyZW50LFxuICB0YWJzLWFjdGl2ZS1mb250LXdlaWdodDogY2FyZC1oZWFkZXItZm9udC13ZWlnaHQsXG4gIHRhYnMtcGFkZGluZzogcGFkZGluZyxcbiAgdGFicy1jb250ZW50LXBhZGRpbmc6IDAsXG4gIHRhYnMtaGVhZGVyLWJnOiB0cmFuc3BhcmVudCxcbiAgdGFicy1zZXBhcmF0b3I6IHNlcGFyYXRvcixcbiAgdGFicy1mZzogY29sb3ItZmcsXG4gIHRhYnMtZmctdGV4dDogY29sb3ItZmctdGV4dCxcbiAgdGFicy1mZy1oZWFkaW5nOiBjb2xvci1mZy1oZWFkaW5nLFxuICB0YWJzLWJnOiB0cmFuc3BhcmVudCxcbiAgdGFicy1zZWxlY3RlZDogY29sb3Itc3VjY2VzcyxcbiAgdGFicy1zZWxlY3RlZC1zZWNvbmQtY29sb3I6IGNvbG9yLXN1Y2Nlc3MsXG4gIHRhYnMtc2VsZWN0ZWQtZGVncmVlczogMCxcbiAgdGFicy1pY29uLW9ubHktbWF4LXdpZHRoOiA1NzZweCxcblxuICByb3V0ZS10YWJzLWZvbnQtZmFtaWx5OiBmb250LXNlY29uZGFyeSxcbiAgcm91dGUtdGFicy1mb250LXNpemU6IGZvbnQtc2l6ZS1sZyxcbiAgcm91dGUtdGFicy1hY3RpdmUtYmc6IHRyYW5zcGFyZW50LFxuICByb3V0ZS10YWJzLWFjdGl2ZS1mb250LXdlaWdodDogY2FyZC1oZWFkZXItZm9udC13ZWlnaHQsXG4gIHJvdXRlLXRhYnMtcGFkZGluZzogcGFkZGluZyxcbiAgcm91dGUtdGFicy1oZWFkZXItYmc6IHRyYW5zcGFyZW50LFxuICByb3V0ZS10YWJzLXNlcGFyYXRvcjogc2VwYXJhdG9yLFxuICByb3V0ZS10YWJzLWZnOiBjb2xvci1mZyxcbiAgcm91dGUtdGFicy1mZy1oZWFkaW5nOiBjb2xvci1mZy1oZWFkaW5nLFxuICByb3V0ZS10YWJzLWJnOiB0cmFuc3BhcmVudCxcbiAgcm91dGUtdGFicy1zZWxlY3RlZDogY29sb3Itc3VjY2VzcyxcbiAgcm91dGUtdGFicy1pY29uLW9ubHktbWF4LXdpZHRoOiA1NzZweCxcblxuICB1c2VyLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICB1c2VyLWxpbmUtaGVpZ2h0OiBsaW5lLWhlaWdodCxcbiAgdXNlci1iZzogY29sb3ItYmcsXG4gIHVzZXItZmc6IGNvbG9yLWZnLFxuICB1c2VyLWZnLWhpZ2hsaWdodDogI2JjYzNjYyxcbiAgdXNlci1mb250LWZhbWlseS1zZWNvbmRhcnk6IGZvbnQtc2Vjb25kYXJ5LFxuICB1c2VyLXNpemUtc21hbGw6IDEuNXJlbSxcbiAgdXNlci1zaXplLW1lZGl1bTogMi41cmVtLFxuICB1c2VyLXNpemUtbGFyZ2U6IDMuMjVyZW0sXG4gIHVzZXItc2l6ZS14bGFyZ2U6IDRyZW0sXG5cbiAgcG9wb3Zlci1mZzogY29sb3ItZmctaGVhZGluZyxcbiAgcG9wb3Zlci1iZzogY29sb3ItYmcsXG4gIHBvcG92ZXItYm9yZGVyOiBjb2xvci1zdWNjZXNzLFxuICBwb3BvdmVyLWJvcmRlci1yYWRpdXM6IHJhZGl1cyxcbiAgcG9wb3Zlci1zaGFkb3c6IG5vbmUsXG4gIHBvcG92ZXItYXJyb3ctc2l6ZTogMTFweCxcblxuICBjb250ZXh0LW1lbnUtZmc6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIGNvbnRleHQtbWVudS1iZzogY29sb3ItYmcsXG4gIGNvbnRleHQtbWVudS1hY3RpdmUtZmc6IGNvbG9yLXdoaXRlLFxuICBjb250ZXh0LW1lbnUtYWN0aXZlLWJnOiBjb2xvci1zdWNjZXNzLFxuICBjb250ZXh0LW1lbnUtYm9yZGVyOiBjb2xvci1zdWNjZXNzLFxuICBjb250ZXh0LW1lbnUtYm9yZGVyLXJhZGl1czogcmFkaXVzLFxuICBjb250ZXh0LW1lbnUtc2hhZG93OiBub25lLFxuICBjb250ZXh0LW1lbnUtYXJyb3ctc2l6ZTogMTFweCxcblxuICBhY3Rpb25zLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBhY3Rpb25zLWZvbnQtZmFtaWx5OiBmb250LXNlY29uZGFyeSxcbiAgYWN0aW9ucy1saW5lLWhlaWdodDogbGluZS1oZWlnaHQsXG4gIGFjdGlvbnMtZmc6IGNvbG9yLWZnLFxuICBhY3Rpb25zLWJnOiBjb2xvci1iZyxcbiAgYWN0aW9ucy1zZXBhcmF0b3I6IHNlcGFyYXRvcixcbiAgYWN0aW9ucy1wYWRkaW5nOiBwYWRkaW5nLFxuICBhY3Rpb25zLXNpemUtc21hbGw6IDEuNXJlbSxcbiAgYWN0aW9ucy1zaXplLW1lZGl1bTogMi4yNXJlbSxcbiAgYWN0aW9ucy1zaXplLWxhcmdlOiAzLjVyZW0sXG5cbiAgc2VhcmNoLWJ0bi1vcGVuLWZnOiBjb2xvci1mZyxcbiAgc2VhcmNoLWJ0bi1jbG9zZS1mZzpcdGNvbG9yLWZnLFxuICBzZWFyY2gtYmc6IGxheW91dC1iZyxcbiAgc2VhcmNoLWJnLXNlY29uZGFyeTogY29sb3ItZmcsXG4gIHNlYXJjaC10ZXh0OiBjb2xvci1mZy1oZWFkaW5nLFxuICBzZWFyY2gtaW5mbzogY29sb3ItZmcsXG4gIHNlYXJjaC1kYXNoOiBjb2xvci1mZyxcbiAgc2VhcmNoLXBsYWNlaG9sZGVyOiBjb2xvci1mZyxcblxuICBzbWFydC10YWJsZS1oZWFkZXItZm9udC1mYW1pbHk6IGZvbnQtc2Vjb25kYXJ5LFxuICBzbWFydC10YWJsZS1oZWFkZXItZm9udC1zaXplOiBmb250LXNpemUsXG4gIHNtYXJ0LXRhYmxlLWhlYWRlci1mb250LXdlaWdodDogZm9udC13ZWlnaHQtYm9sZCxcbiAgc21hcnQtdGFibGUtaGVhZGVyLWxpbmUtaGVpZ2h0OiBsaW5lLWhlaWdodCxcbiAgc21hcnQtdGFibGUtaGVhZGVyLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBzbWFydC10YWJsZS1oZWFkZXItYmc6IGNvbG9yLWJnLFxuXG4gIHNtYXJ0LXRhYmxlLWZvbnQtZmFtaWx5OiBmb250LW1haW4sXG4gIHNtYXJ0LXRhYmxlLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBzbWFydC10YWJsZS1mb250LXdlaWdodDogZm9udC13ZWlnaHQtbm9ybWFsLFxuICBzbWFydC10YWJsZS1saW5lLWhlaWdodDogbGluZS1oZWlnaHQsXG4gIHNtYXJ0LXRhYmxlLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBzbWFydC10YWJsZS1iZzogY29sb3ItYmcsXG5cbiAgc21hcnQtdGFibGUtYmctZXZlbjogI2Y1ZjdmYyxcbiAgc21hcnQtdGFibGUtZmctc2Vjb25kYXJ5OiBjb2xvci1mZyxcbiAgc21hcnQtdGFibGUtYmctYWN0aXZlOiAjZTZmM2ZmLFxuICBzbWFydC10YWJsZS1wYWRkaW5nOiAwLjg3NXJlbSAxLjI1cmVtLFxuICBzbWFydC10YWJsZS1maWx0ZXItcGFkZGluZzogMC4zNzVyZW0gMC41cmVtLFxuICBzbWFydC10YWJsZS1zZXBhcmF0b3I6IHNlcGFyYXRvcixcbiAgc21hcnQtdGFibGUtYm9yZGVyLXJhZGl1czogcmFkaXVzLFxuXG4gIHNtYXJ0LXRhYmxlLXBhZ2luZy1ib3JkZXItY29sb3I6IHNlcGFyYXRvcixcbiAgc21hcnQtdGFibGUtcGFnaW5nLWJvcmRlci13aWR0aDogMXB4LFxuICBzbWFydC10YWJsZS1wYWdpbmctZmctYWN0aXZlOiAjZmZmZmZmLFxuICBzbWFydC10YWJsZS1wYWdpbmctYmctYWN0aXZlOiBjb2xvci1zdWNjZXNzLFxuICBzbWFydC10YWJsZS1wYWdpbmctaG92ZXI6IHJnYmEoMCwgMCwgMCwgMC4wNSksXG5cbiAgdG9hc3RyLWJnOiBjb2xvci1iZyxcbiAgdG9hc3RyLXBhZGRpbmc6IDEuMTI1cmVtLFxuICB0b2FzdHItZmc6IGNvbG9yLWZnLXRleHQsXG4gIHRvYXN0ci1ib3JkZXI6IDAuMTI1cmVtIHNvbGlkLFxuICB0b2FzdHItYm9yZGVyLXJhZGl1czogcmFkaXVzLFxuICB0b2FzdHItYm9yZGVyLWNvbG9yOiAjYmNjM2NjLFxuICB0b2FzdHItaWNvbi1yYWRpdXM6IDAuMjVyZW0sXG4gIHRvYXN0ci1zaGFkb3c6IHNoYWRvdyxcblxuICBidG4tZmc6IGNvbG9yLXdoaXRlLFxuICBidG4tZm9udC1mYW1pbHk6IGZvbnQtc2Vjb25kYXJ5LFxuICBidG4tbGluZS1oZWlnaHQ6IGxpbmUtaGVpZ2h0LFxuICBidG4tZGlzYWJsZWQtb3BhY2l0eTogMC4zLFxuICBidG4tY3Vyc29yOiBkZWZhdWx0LFxuXG4gIGJ0bi1wcmltYXJ5LWJnOiBjb2xvci1wcmltYXJ5LFxuICBidG4tc2Vjb25kYXJ5LWJnOiB0cmFuc3BhcmVudCxcbiAgYnRuLWluZm8tYmc6IGNvbG9yLWluZm8sXG4gIGJ0bi1zdWNjZXNzLWJnOiBjb2xvci1zdWNjZXNzLFxuICBidG4td2FybmluZy1iZzogY29sb3Itd2FybmluZyxcbiAgYnRuLWRhbmdlci1iZzogY29sb3ItZGFuZ2VyLFxuXG4gIGJ0bi1zZWNvbmRhcnktYm9yZGVyOiAjZGFkZmU2LFxuICBidG4tc2Vjb25kYXJ5LWJvcmRlci13aWR0aDogMnB4LFxuXG4gIGJ0bi1wYWRkaW5nLXktbGc6IDAuODc1cmVtLFxuICBidG4tcGFkZGluZy14LWxnOiAxLjc1cmVtLFxuICBidG4tZm9udC1zaXplLWxnOiBmb250LXNpemUtbGcsXG5cbiAgLy8gZGVmYXVsdCBzaXplXG4gIGJ0bi1wYWRkaW5nLXktbWQ6IDAuNzVyZW0sXG4gIGJ0bi1wYWRkaW5nLXgtbWQ6IDEuNXJlbSxcbiAgYnRuLWZvbnQtc2l6ZS1tZDogMXJlbSxcblxuICBidG4tcGFkZGluZy15LXNtOiAwLjYyNXJlbSxcbiAgYnRuLXBhZGRpbmcteC1zbTogMS41cmVtLFxuICBidG4tZm9udC1zaXplLXNtOiAwLjg3NXJlbSxcblxuICBidG4tcGFkZGluZy15LXhzOiAwLjVyZW0sXG4gIGJ0bi1wYWRkaW5nLXgteHM6IDEuMjVyZW0sXG4gIGJ0bi1mb250LXNpemUteHM6IDAuNzVyZW0sXG5cbiAgYnRuLWJvcmRlci1yYWRpdXM6IHJhZGl1cyxcbiAgYnRuLXJlY3RhbmdsZS1ib3JkZXItcmFkaXVzOiAwLjI1cmVtLFxuICBidG4tc2VtaS1yb3VuZC1ib3JkZXItcmFkaXVzOiAwLjc1cmVtLFxuICBidG4tcm91bmQtYm9yZGVyLXJhZGl1czogMS41cmVtLFxuXG4gIGJ0bi1oZXJvLXNoYWRvdzogbm9uZSxcbiAgYnRuLWhlcm8tdGV4dC1zaGFkb3c6IG5vbmUsXG4gIGJ0bi1oZXJvLWJldmVsLXNpemU6IDAgMCAwIDAsXG4gIGJ0bi1oZXJvLWdsb3ctc2l6ZTogMCAwIDAgMCxcbiAgYnRuLWhlcm8tcHJpbWFyeS1nbG93LXNpemU6IGJ0bi1oZXJvLWdsb3ctc2l6ZSxcbiAgYnRuLWhlcm8tc3VjY2Vzcy1nbG93LXNpemU6IGJ0bi1oZXJvLWdsb3ctc2l6ZSxcbiAgYnRuLWhlcm8td2FybmluZy1nbG93LXNpemU6IGJ0bi1oZXJvLWdsb3ctc2l6ZSxcbiAgYnRuLWhlcm8taW5mby1nbG93LXNpemU6IGJ0bi1oZXJvLWdsb3ctc2l6ZSxcbiAgYnRuLWhlcm8tZGFuZ2VyLWdsb3ctc2l6ZTogYnRuLWhlcm8tZ2xvdy1zaXplLFxuICBidG4taGVyby1zZWNvbmRhcnktZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLWRlZ3JlZTogMjBkZWcsXG4gIGJ0bi1oZXJvLXByaW1hcnktZGVncmVlOiBidG4taGVyby1kZWdyZWUsXG4gIGJ0bi1oZXJvLXN1Y2Nlc3MtZGVncmVlOiBidG4taGVyby1kZWdyZWUsXG4gIGJ0bi1oZXJvLXdhcm5pbmctZGVncmVlOiAxMGRlZyxcbiAgYnRuLWhlcm8taW5mby1kZWdyZWU6IC0xMGRlZyxcbiAgYnRuLWhlcm8tZGFuZ2VyLWRlZ3JlZTogLTIwZGVnLFxuICBidG4taGVyby1zZWNvbmRhcnktZGVncmVlOiBidG4taGVyby1kZWdyZWUsXG4gIGJ0bi1oZXJvLWJvcmRlci1yYWRpdXM6IHJhZGl1cyxcblxuICBidG4tb3V0bGluZS1mZzogY29sb3ItZmctaGVhZGluZyxcbiAgYnRuLW91dGxpbmUtaG92ZXItZmc6ICNmZmZmZmYsXG4gIGJ0bi1vdXRsaW5lLWZvY3VzLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuXG4gIGJ0bi1ncm91cC1iZzogbGF5b3V0LWJnLFxuICBidG4tZ3JvdXAtZmc6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIGJ0bi1ncm91cC1zZXBhcmF0b3I6ICNkYWRmZTYsXG5cbiAgZm9ybS1jb250cm9sLXRleHQtcHJpbWFyeS1jb2xvcjogY29sb3ItZmctaGVhZGluZyxcbiAgZm9ybS1jb250cm9sLWJnOiBjb2xvci1iZyxcbiAgZm9ybS1jb250cm9sLWZvY3VzLWJnOiBjb2xvci1iZyxcblxuICBmb3JtLWNvbnRyb2wtYm9yZGVyLXdpZHRoOiAycHgsXG4gIGZvcm0tY29udHJvbC1ib3JkZXItdHlwZTogc29saWQsXG4gIGZvcm0tY29udHJvbC1ib3JkZXItcmFkaXVzOiByYWRpdXMsXG4gIGZvcm0tY29udHJvbC1zZW1pLXJvdW5kLWJvcmRlci1yYWRpdXM6IDAuNzVyZW0sXG4gIGZvcm0tY29udHJvbC1yb3VuZC1ib3JkZXItcmFkaXVzOiAxLjVyZW0sXG4gIGZvcm0tY29udHJvbC1ib3JkZXItY29sb3I6ICNkYWRmZTYsXG4gIGZvcm0tY29udHJvbC1zZWxlY3RlZC1ib3JkZXItY29sb3I6IGNvbG9yLXN1Y2Nlc3MsXG5cbiAgZm9ybS1jb250cm9sLWluZm8tYm9yZGVyLWNvbG9yOiBjb2xvci1pbmZvLFxuICBmb3JtLWNvbnRyb2wtc3VjY2Vzcy1ib3JkZXItY29sb3I6IGNvbG9yLXN1Y2Nlc3MsXG4gIGZvcm0tY29udHJvbC1kYW5nZXItYm9yZGVyLWNvbG9yOiBjb2xvci1kYW5nZXIsXG4gIGZvcm0tY29udHJvbC13YXJuaW5nLWJvcmRlci1jb2xvcjogY29sb3Itd2FybmluZyxcblxuICBmb3JtLWNvbnRyb2wtcGxhY2Vob2xkZXItY29sb3I6IGNvbG9yLWZnLFxuICBmb3JtLWNvbnRyb2wtcGxhY2Vob2xkZXItZm9udC1zaXplOiAxcmVtLFxuXG4gIGZvcm0tY29udHJvbC1mb250LXNpemU6IDFyZW0sXG4gIGZvcm0tY29udHJvbC1wYWRkaW5nOiAwLjc1cmVtIDEuMTI1cmVtLFxuICBmb3JtLWNvbnRyb2wtZm9udC1zaXplLXNtOiBmb250LXNpemUtc20sXG4gIGZvcm0tY29udHJvbC1wYWRkaW5nLXNtOiAwLjM3NXJlbSAxLjEyNXJlbSxcbiAgZm9ybS1jb250cm9sLWZvbnQtc2l6ZS1sZzogZm9udC1zaXplLWxnLFxuICBmb3JtLWNvbnRyb2wtcGFkZGluZy1sZzogMS4xMjVyZW0sXG5cbiAgZm9ybS1jb250cm9sLWxhYmVsLWZvbnQtd2VpZ2h0OiA0MDAsXG5cbiAgZm9ybS1jb250cm9sLWZlZWRiYWNrLWZvbnQtc2l6ZTogMC44NzVyZW0sXG4gIGZvcm0tY29udHJvbC1mZWVkYmFjay1mb250LXdlaWdodDogZm9udC13ZWlnaHQtbm9ybWFsLFxuXG4gIGNoZWNrYm94LWJnOiB0cmFuc3BhcmVudCxcbiAgY2hlY2tib3gtc2l6ZTogMS4yNXJlbSxcbiAgY2hlY2tib3gtYm9yZGVyLXNpemU6IDJweCxcbiAgY2hlY2tib3gtYm9yZGVyLWNvbG9yOiBmb3JtLWNvbnRyb2wtYm9yZGVyLWNvbG9yLFxuICBjaGVja2JveC1jaGVja21hcms6IHRyYW5zcGFyZW50LFxuXG4gIGNoZWNrYm94LWNoZWNrZWQtYmc6IHRyYW5zcGFyZW50LFxuICBjaGVja2JveC1jaGVja2VkLXNpemU6IDEuMjVyZW0sXG4gIGNoZWNrYm94LWNoZWNrZWQtYm9yZGVyLXNpemU6IDJweCxcbiAgY2hlY2tib3gtY2hlY2tlZC1ib3JkZXItY29sb3I6IGNvbG9yLXN1Y2Nlc3MsXG4gIGNoZWNrYm94LWNoZWNrZWQtY2hlY2ttYXJrOiBjb2xvci1mZy1oZWFkaW5nLFxuXG4gIGNoZWNrYm94LWRpc2FibGVkLWJnOiB0cmFuc3BhcmVudCxcbiAgY2hlY2tib3gtZGlzYWJsZWQtc2l6ZTogMS4yNXJlbSxcbiAgY2hlY2tib3gtZGlzYWJsZWQtYm9yZGVyLXNpemU6IDJweCxcbiAgY2hlY2tib3gtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOiBjb2xvci1mZy1oZWFkaW5nLFxuICBjaGVja2JveC1kaXNhYmxlZC1jaGVja21hcms6IGNvbG9yLWZnLWhlYWRpbmcsXG5cbiAgbW9kYWwtZm9udC1zaXplOiBmb250LXNpemUsXG4gIG1vZGFsLWxpbmUtaGVpZ2h0OiBsaW5lLWhlaWdodCxcbiAgbW9kYWwtZm9udC13ZWlnaHQ6IGZvbnQtd2VpZ2h0LW5vcm1hbCxcbiAgbW9kYWwtZmc6IGNvbG9yLWZnLXRleHQsXG4gIG1vZGFsLWZnLWhlYWRpbmc6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIG1vZGFsLWJnOiBjb2xvci1iZyxcbiAgbW9kYWwtYm9yZGVyOiB0cmFuc3BhcmVudCxcbiAgbW9kYWwtYm9yZGVyLXJhZGl1czogcmFkaXVzLFxuICBtb2RhbC1wYWRkaW5nOiBwYWRkaW5nLFxuICBtb2RhbC1oZWFkZXItZm9udC1mYW1pbHk6IGZvbnQtc2Vjb25kYXJ5LFxuICBtb2RhbC1oZWFkZXItZm9udC13ZWlnaHQ6IGZvbnQtd2VpZ2h0LWJvbGRlcixcbiAgbW9kYWwtaGVhZGVyLWZvbnQtc2l6ZTogZm9udC1zaXplLWxnLFxuICBtb2RhbC1ib2R5LWZvbnQtZmFtaWx5OiBmb250LW1haW4sXG4gIG1vZGFsLWJvZHktZm9udC13ZWlnaHQ6IGZvbnQtd2VpZ2h0LW5vcm1hbCxcbiAgbW9kYWwtYm9keS1mb250LXNpemU6IGZvbnQtc2l6ZSxcbiAgbW9kYWwtc2VwYXJhdG9yOiBzZXBhcmF0b3IsXG5cbiAgYmFkZ2UtZmctdGV4dDogY29sb3Itd2hpdGUsXG4gIGJhZGdlLXByaW1hcnktYmctY29sb3I6IGNvbG9yLXByaW1hcnksXG4gIGJhZGdlLXN1Y2Nlc3MtYmctY29sb3I6IGNvbG9yLXN1Y2Nlc3MsXG4gIGJhZGdlLWluZm8tYmctY29sb3I6IGNvbG9yLWluZm8sXG4gIGJhZGdlLXdhcm5pbmctYmctY29sb3I6IGNvbG9yLXdhcm5pbmcsXG4gIGJhZGdlLWRhbmdlci1iZy1jb2xvcjogY29sb3ItZGFuZ2VyLFxuXG4gIHByb2dyZXNzLWJhci1oZWlnaHQteGxnOiAxLjc1cmVtLFxuICBwcm9ncmVzcy1iYXItaGVpZ2h0LWxnOiAxLjVyZW0sXG4gIHByb2dyZXNzLWJhci1oZWlnaHQ6IDEuMzc1cmVtLFxuICBwcm9ncmVzcy1iYXItaGVpZ2h0LXNtOiAxLjI1cmVtLFxuICBwcm9ncmVzcy1iYXItaGVpZ2h0LXhzOiAxcmVtLFxuICBwcm9ncmVzcy1iYXItYW5pbWF0aW9uLWR1cmF0aW9uOiA0MDBtcyxcbiAgcHJvZ3Jlc3MtYmFyLWZvbnQtc2l6ZS14bGc6IGZvbnQtc2l6ZS14bGcsXG4gIHByb2dyZXNzLWJhci1mb250LXNpemUtbGc6IGZvbnQtc2l6ZS1sZyxcbiAgcHJvZ3Jlc3MtYmFyLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBwcm9ncmVzcy1iYXItZm9udC1zaXplLXNtOiBmb250LXNpemUtc20sXG4gIHByb2dyZXNzLWJhci1mb250LXNpemUteHM6IGZvbnQtc2l6ZS14cyxcbiAgcHJvZ3Jlc3MtYmFyLXJhZGl1czogcmFkaXVzLFxuICBwcm9ncmVzcy1iYXItYmc6IGxheW91dC1iZyxcbiAgcHJvZ3Jlc3MtYmFyLWZvbnQtY29sb3I6IGNvbG9yLXdoaXRlLFxuICBwcm9ncmVzcy1iYXItZm9udC13ZWlnaHQ6IGZvbnQtd2VpZ2h0LWJvbGQsXG4gIHByb2dyZXNzLWJhci1kZWZhdWx0LWJnOiBjb2xvci1pbmZvLFxuICBwcm9ncmVzcy1iYXItcHJpbWFyeS1iZzogY29sb3ItcHJpbWFyeSxcbiAgcHJvZ3Jlc3MtYmFyLXN1Y2Nlc3MtYmc6IGNvbG9yLXN1Y2Nlc3MsXG4gIHByb2dyZXNzLWJhci1pbmZvLWJnOiBjb2xvci1pbmZvLFxuICBwcm9ncmVzcy1iYXItd2FybmluZy1iZzogY29sb3Itd2FybmluZyxcbiAgcHJvZ3Jlc3MtYmFyLWRhbmdlci1iZzogY29sb3ItZGFuZ2VyLFxuXG4gIGFsZXJ0LWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBhbGVydC1saW5lLWhlaWdodDogbGluZS1oZWlnaHQsXG4gIGFsZXJ0LWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC1ub3JtYWwsXG4gIGFsZXJ0LWZnOiBjb2xvci13aGl0ZSxcbiAgYWxlcnQtb3V0bGluZS1mZzogY29sb3ItZmcsXG4gIGFsZXJ0LWJnOiBjb2xvci1iZyxcbiAgYWxlcnQtYWN0aXZlLWJnOiBjb2xvci1mZyxcbiAgYWxlcnQtZGlzYWJsZWQtYmc6IGNvbG9yLWRpc2FibGVkLFxuICBhbGVydC1kaXNhYmxlZC1mZzogY29sb3ItZmcsXG4gIGFsZXJ0LXByaW1hcnktYmc6IGNvbG9yLXByaW1hcnksXG4gIGFsZXJ0LWluZm8tYmc6IGNvbG9yLWluZm8sXG4gIGFsZXJ0LXN1Y2Nlc3MtYmc6IGNvbG9yLXN1Y2Nlc3MsXG4gIGFsZXJ0LXdhcm5pbmctYmc6IGNvbG9yLXdhcm5pbmcsXG4gIGFsZXJ0LWRhbmdlci1iZzogY29sb3ItZGFuZ2VyLFxuICBhbGVydC1oZWlnaHQteHhzbWFsbDogNTJweCxcbiAgYWxlcnQtaGVpZ2h0LXhzbWFsbDogNzJweCxcbiAgYWxlcnQtaGVpZ2h0LXNtYWxsOiA5MnB4LFxuICBhbGVydC1oZWlnaHQtbWVkaXVtOiAxMTJweCxcbiAgYWxlcnQtaGVpZ2h0LWxhcmdlOiAxMzJweCxcbiAgYWxlcnQtaGVpZ2h0LXhsYXJnZTogMTUycHgsXG4gIGFsZXJ0LWhlaWdodC14eGxhcmdlOiAxNzJweCxcbiAgYWxlcnQtc2hhZG93OiBub25lLFxuICBhbGVydC1ib3JkZXItcmFkaXVzOiByYWRpdXMsXG4gIGFsZXJ0LXBhZGRpbmc6IDFyZW0gMS4xMjVyZW0sXG4gIGFsZXJ0LWNsb3NhYmxlLXBhZGRpbmc6IDNyZW0sXG4gIGFsZXJ0LWJ1dHRvbi1wYWRkaW5nOiAzcmVtLFxuICBhbGVydC1tYXJnaW46IG1hcmdpbixcblxuICBjaGF0LWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBjaGF0LWZnOiBjb2xvci13aGl0ZSxcbiAgY2hhdC1iZzogY29sb3ItYmcsXG4gIGNoYXQtYm9yZGVyLXJhZGl1czogcmFkaXVzLFxuICBjaGF0LWZnLXRleHQ6IGNvbG9yLWZnLXRleHQsXG4gIGNoYXQtaGVpZ2h0LXh4c21hbGw6IDk2cHgsXG4gIGNoYXQtaGVpZ2h0LXhzbWFsbDogMjE2cHgsXG4gIGNoYXQtaGVpZ2h0LXNtYWxsOiAzMzZweCxcbiAgY2hhdC1oZWlnaHQtbWVkaXVtOiA0NTZweCxcbiAgY2hhdC1oZWlnaHQtbGFyZ2U6IDU3NnB4LFxuICBjaGF0LWhlaWdodC14bGFyZ2U6IDY5NnB4LFxuICBjaGF0LWhlaWdodC14eGxhcmdlOiA4MTZweCxcbiAgY2hhdC1ib3JkZXI6IGJvcmRlcixcbiAgY2hhdC1wYWRkaW5nOiBwYWRkaW5nLFxuICBjaGF0LXNoYWRvdzogc2hhZG93LFxuICBjaGF0LXNlcGFyYXRvcjogc2VwYXJhdG9yLFxuICBjaGF0LW1lc3NhZ2UtZmc6IGNvbG9yLXdoaXRlLFxuICBjaGF0LW1lc3NhZ2UtYmc6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzRjYTZmZiwgIzU5YmZmZiksXG4gIGNoYXQtbWVzc2FnZS1yZXBseS1iZzogY29sb3ItYmctYWN0aXZlLFxuICBjaGF0LW1lc3NhZ2UtcmVwbHktZmc6IGNvbG9yLWZnLXRleHQsXG4gIGNoYXQtbWVzc2FnZS1hdmF0YXItYmc6IGNvbG9yLWZnLFxuICBjaGF0LW1lc3NhZ2Utc2VuZGVyLWZnOiBjb2xvci1mZyxcbiAgY2hhdC1tZXNzYWdlLXF1b3RlLWZnOiBjb2xvci1mZyxcbiAgY2hhdC1tZXNzYWdlLXF1b3RlLWJnOiBjb2xvci1iZy1hY3RpdmUsXG4gIGNoYXQtbWVzc2FnZS1maWxlLWZnOiBjb2xvci1mZyxcbiAgY2hhdC1tZXNzYWdlLWZpbGUtYmc6IHRyYW5zcGFyZW50LFxuICBjaGF0LWZvcm0tYmc6IHRyYW5zcGFyZW50LFxuICBjaGF0LWZvcm0tZmc6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIGNoYXQtZm9ybS1ib3JkZXI6IHNlcGFyYXRvcixcbiAgY2hhdC1mb3JtLXBsYWNlaG9sZGVyLWZnOiBjb2xvci1mZyxcbiAgY2hhdC1mb3JtLWFjdGl2ZS1ib3JkZXI6IGNvbG9yLWZnLFxuICBjaGF0LWFjdGl2ZS1iZzogY29sb3ItZmcsXG4gIGNoYXQtZGlzYWJsZWQtYmc6IGNvbG9yLWRpc2FibGVkLFxuICBjaGF0LWRpc2FibGVkLWZnOiBjb2xvci1mZyxcbiAgY2hhdC1wcmltYXJ5LWJnOiBjb2xvci1wcmltYXJ5LFxuICBjaGF0LWluZm8tYmc6IGNvbG9yLWluZm8sXG4gIGNoYXQtc3VjY2Vzcy1iZzogY29sb3Itc3VjY2VzcyxcbiAgY2hhdC13YXJuaW5nLWJnOiBjb2xvci13YXJuaW5nLFxuICBjaGF0LWRhbmdlci1iZzogY29sb3ItZGFuZ2VyLFxuXG4gIHNwaW5uZXItYmc6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44MyksXG4gIHNwaW5uZXItY2lyY2xlLWJnOiBjb2xvci1iZy1hY3RpdmUsXG4gIHNwaW5uZXItZmc6IGNvbG9yLWZnLXRleHQsXG4gIHNwaW5uZXItYWN0aXZlLWJnOiBjb2xvci1mZyxcbiAgc3Bpbm5lci1kaXNhYmxlZC1iZzogY29sb3ItZGlzYWJsZWQsXG4gIHNwaW5uZXItZGlzYWJsZWQtZmc6IGNvbG9yLWZnLFxuICBzcGlubmVyLXByaW1hcnktYmc6IGNvbG9yLXByaW1hcnksXG4gIHNwaW5uZXItaW5mby1iZzogY29sb3ItaW5mbyxcbiAgc3Bpbm5lci1zdWNjZXNzLWJnOiBjb2xvci1zdWNjZXNzLFxuICBzcGlubmVyLXdhcm5pbmctYmc6IGNvbG9yLXdhcm5pbmcsXG4gIHNwaW5uZXItZGFuZ2VyLWJnOiBjb2xvci1kYW5nZXIsXG4gIHNwaW5uZXIteHhzbWFsbDogMS4yNXJlbSxcbiAgc3Bpbm5lci14c21hbGw6IDEuNXJlbSxcbiAgc3Bpbm5lci1zbWFsbDogMS43NXJlbSxcbiAgc3Bpbm5lci1tZWRpdW06IDJyZW0sXG4gIHNwaW5uZXItbGFyZ2U6IDIuMjVyZW0sXG4gIHNwaW5uZXIteGxhcmdlOiAyLjVyZW0sXG4gIHNwaW5uZXIteHhsYXJnZTogM3JlbSxcblxuICBzdGVwcGVyLWluZGV4LXNpemU6IDJyZW0sXG4gIHN0ZXBwZXItbGFiZWwtZm9udC1zaXplOiBmb250LXNpemUtc20sXG4gIHN0ZXBwZXItbGFiZWwtZm9udC13ZWlnaHQ6IGZvbnQtd2VpZ2h0LWJvbGRlcixcbiAgc3RlcHBlci1hY2NlbnQtY29sb3I6IGNvbG9yLXByaW1hcnksXG4gIHN0ZXBwZXItY29tcGxldGVkLWZnOiBjb2xvci13aGl0ZSxcbiAgc3RlcHBlci1mZzogY29sb3ItZmcsXG4gIHN0ZXBwZXItY29tcGxldGVkLWljb24tc2l6ZTogMS41cmVtLFxuICBzdGVwcGVyLWNvbXBsZXRlZC1pY29uLXdlaWdodDogZm9udC13ZWlnaHQtdWx0cmEtYm9sZCxcbiAgc3RlcHBlci1zdGVwLXBhZGRpbmc6IHBhZGRpbmcsXG5cbiAgYWNjb3JkaW9uLXBhZGRpbmc6IHBhZGRpbmcsXG4gIGFjY29yZGlvbi1zZXBhcmF0b3I6IHNlcGFyYXRvcixcbiAgYWNjb3JkaW9uLWhlYWRlci1mb250LWZhbWlseTogZm9udC1zZWNvbmRhcnksXG4gIGFjY29yZGlvbi1oZWFkZXItZm9udC1zaXplOiBmb250LXNpemUtbGcsXG4gIGFjY29yZGlvbi1oZWFkZXItZm9udC13ZWlnaHQ6IGZvbnQtd2VpZ2h0LW5vcm1hbCxcbiAgYWNjb3JkaW9uLWhlYWRlci1mZy1oZWFkaW5nOiBjb2xvci1mZy1oZWFkaW5nLFxuICBhY2NvcmRpb24taGVhZGVyLWRpc2FibGVkLWZnOiBjb2xvci1mZyxcbiAgYWNjb3JkaW9uLWhlYWRlci1ib3JkZXItd2lkdGg6IDFweCxcbiAgYWNjb3JkaW9uLWhlYWRlci1ib3JkZXItdHlwZTogc29saWQsXG4gIGFjY29yZGlvbi1oZWFkZXItYm9yZGVyLWNvbG9yOiBhY2NvcmRpb24tc2VwYXJhdG9yLFxuICBhY2NvcmRpb24tYm9yZGVyLXJhZGl1czogcmFkaXVzLFxuICBhY2NvcmRpb24taXRlbS1iZzogY29sb3ItYmcsXG4gIGFjY29yZGlvbi1pdGVtLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBhY2NvcmRpb24taXRlbS1mb250LXdlaWdodDogZm9udC13ZWlnaHQtbm9ybWFsLFxuICBhY2NvcmRpb24taXRlbS1mb250LWZhbWlseTogZm9udC1tYWluLFxuICBhY2NvcmRpb24taXRlbS1mZy10ZXh0OiBjb2xvci1mZy10ZXh0LFxuICBhY2NvcmRpb24taXRlbS1zaGFkb3c6IHNoYWRvdyxcblxuICBsaXN0LWl0ZW0tYm9yZGVyLWNvbG9yOiB0YWJzLXNlcGFyYXRvcixcbiAgbGlzdC1pdGVtLXBhZGRpbmc6IDFyZW0sXG5cbiAgY2FsZW5kYXItd2lkdGg6IDIxLjg3NXJlbSxcbiAgY2FsZW5kYXItYm9keS1oZWlnaHQ6IDI1LjYyNXJlbSxcbiAgY2FsZW5kYXItaGVhZGVyLXRpdGxlLWZvbnQtc2l6ZTogZm9udC1zaXplLXhsZyxcbiAgY2FsZW5kYXItaGVhZGVyLXRpdGxlLWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC1ib2xkLFxuICBjYWxlbmRhci1oZWFkZXItc3ViLXRpdGxlLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuICBjYWxlbmRhci1oZWFkZXItc3ViLXRpdGxlLWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC10aGluLFxuICBjYWxlbmRhci1uYXZpZ2F0aW9uLWJ1dHRvbi13aWR0aDogMTByZW0sXG4gIGNhbGVuZGFyLXNlbGVjdGVkLWl0ZW0tYmc6IGNvbG9yLXN1Y2Nlc3MsXG4gIGNhbGVuZGFyLWhvdmVyLWl0ZW0tYmc6IGNhbGVuZGFyLXNlbGVjdGVkLWl0ZW0tYmcsXG4gIGNhbGVuZGFyLXRvZGF5LWl0ZW0tYmc6IGNvbG9yLWJnLWFjdGl2ZSxcbiAgY2FsZW5kYXItYWN0aXZlLWl0ZW0tYmc6IGNvbG9yLXN1Y2Nlc3MsXG4gIGNhbGVuZGFyLWZnOiBjb2xvci1mZy10ZXh0LFxuICBjYWxlbmRhci1zZWxlY3RlZC1mZzogY29sb3Itd2hpdGUsXG4gIGNhbGVuZGFyLXRvZGF5LWZnOiBjYWxlbmRhci1mZyxcbiAgY2FsZW5kYXItZGF5LWNlbGwtd2lkdGg6IDIuNjI1cmVtLFxuICBjYWxlbmRhci1kYXktY2VsbC1oZWlnaHQ6IDIuNjI1cmVtLFxuICBjYWxlbmRhci1tb250aC1jZWxsLXdpZHRoOiA0LjI1cmVtLFxuICBjYWxlbmRhci1tb250aC1jZWxsLWhlaWdodDogMi4zNzVyZW0sXG4gIGNhbGVuZGFyLXllYXItY2VsbC13aWR0aDogY2FsZW5kYXItbW9udGgtY2VsbC13aWR0aCxcbiAgY2FsZW5kYXIteWVhci1jZWxsLWhlaWdodDogY2FsZW5kYXItbW9udGgtY2VsbC1oZWlnaHQsXG4gIGNhbGVuZGFyLWluYWN0aXZlLW9wYWNpdHk6IDAuNSxcbiAgY2FsZW5kYXItZGlzYWJsZWQtb3BhY2l0eTogMC4zLFxuICBjYWxlbmRhci1ib3JkZXItcmFkaXVzOiByYWRpdXMsXG4gIGNhbGVuZGFyLXdlZWtkYXktd2lkdGg6IGNhbGVuZGFyLWRheS1jZWxsLXdpZHRoLFxuICBjYWxlbmRhci13ZWVrZGF5LWhlaWdodDogMS43NXJlbSxcbiAgY2FsZW5kYXItd2Vla2RheS1mb250LXNpemU6IGZvbnQtc2l6ZS14cyxcbiAgY2FsZW5kYXItd2Vla2RheS1mb250LXdlaWdodDogZm9udC13ZWlnaHQtbm9ybWFsLFxuICBjYWxlbmRhci13ZWVrZGF5LWZnOiBjb2xvci1mZyxcbiAgY2FsZW5kYXItd2Vla2RheS1ob2xpZGF5LWZnOiBjb2xvci1kYW5nZXIsXG4gIGNhbGVuZGFyLXJhbmdlLWJnLWluLXJhbmdlOiAjZWJmYmYyLFxuXG4gIGNhbGVuZGFyLWxhcmdlLXdpZHRoOiAyNC4zNzVyZW0sXG4gIGNhbGVuZGFyLWxhcmdlLWJvZHktaGVpZ2h0OiAyNy43NXJlbSxcbiAgY2FsZW5kYXItZGF5LWNlbGwtbGFyZ2Utd2lkdGg6IDNyZW0sXG4gIGNhbGVuZGFyLWRheS1jZWxsLWxhcmdlLWhlaWdodDogM3JlbSxcbiAgY2FsZW5kYXItbW9udGgtY2VsbC1sYXJnZS13aWR0aDogNC4yNXJlbSxcbiAgY2FsZW5kYXItbW9udGgtY2VsbC1sYXJnZS1oZWlnaHQ6IDIuMzc1cmVtLFxuICBjYWxlbmRhci15ZWFyLWNlbGwtbGFyZ2Utd2lkdGg6IGNhbGVuZGFyLW1vbnRoLWNlbGwtd2lkdGgsXG4gIGNhbGVuZGFyLXllYXItY2VsbC1sYXJnZS1oZWlnaHQ6IGNhbGVuZGFyLW1vbnRoLWNlbGwtaGVpZ2h0LFxuXG4gIG92ZXJsYXktYmFja2Ryb3AtYmc6IHJnYmEoMCwgMCwgMCwgMC4yODgpLFxuXG4gIHRvb2x0aXAtYmc6IGNvbG9yLWZnLXRleHQsXG4gIHRvb2x0aXAtcHJpbWFyeS1iZzogY29sb3ItcHJpbWFyeSxcbiAgdG9vbHRpcC1pbmZvLWJnOiBjb2xvci1pbmZvLFxuICB0b29sdGlwLXN1Y2Nlc3MtYmc6IGNvbG9yLXN1Y2Nlc3MsXG4gIHRvb2x0aXAtd2FybmluZy1iZzogY29sb3Itd2FybmluZyxcbiAgdG9vbHRpcC1kYW5nZXItYmc6IGNvbG9yLWRhbmdlcixcbiAgdG9vbHRpcC1mZzogY29sb3ItYmctYWN0aXZlLFxuICB0b29sdGlwLXN0YXR1cy1mZzogY29sb3ItYmctYWN0aXZlLFxuICB0b29sdGlwLXNoYWRvdzogc2hhZG93LFxuICB0b29sdGlwLWZvbnQtc2l6ZTogZm9udC1zaXplLFxuXG4gIHNlbGVjdC1ib3JkZXItd2lkdGg6IDJweCxcbiAgc2VsZWN0LW1heC1oZWlnaHQ6IDIwcmVtLFxuICBzZWxlY3QtYmc6IGNvbG9yLWJnLFxuXG4gIHNlbGVjdC1jaGVja2JveC1jb2xvcjogY2hlY2tib3gtYm9yZGVyLWNvbG9yLFxuICBzZWxlY3QtY2hlY2ttYXJrLWNvbG9yOiBjaGVja2JveC1ib3JkZXItY29sb3IsXG5cbiAgc2VsZWN0LW9wdGlvbi1kaXNhYmxlZC1iZzogI2YyZjRmNyxcbiAgc2VsZWN0LW9wdGlvbi1kaXNhYmxlZC1vcGFjaXR5OiAwLjMsXG4gIHNlbGVjdC1vcHRpb24tcGFkZGluZzogMC43NXJlbSAxLjVyZW0sXG5cbiAgZGF0ZXBpY2tlci1mZzogY29sb3ItZmctaGVhZGluZyxcbiAgZGF0ZXBpY2tlci1iZzogY29sb3ItYmcsXG4gIGRhdGVwaWNrZXItYm9yZGVyOiBjb2xvci1zdWNjZXNzLFxuICBkYXRlcGlja2VyLWJvcmRlci1yYWRpdXM6IHJhZGl1cyxcbiAgZGF0ZXBpY2tlci1zaGFkb3c6IG5vbmUsXG4gIGRhdGVwaWNrZXItYXJyb3ctc2l6ZTogMTFweCxcblxuICByYWRpby1iZzogdHJhbnNwYXJlbnQsXG4gIHJhZGlvLWZnOiBjb2xvci1mZy10ZXh0LFxuICByYWRpby1zaXplOiAxLjI1cmVtLFxuICByYWRpby1ib3JkZXItc2l6ZTogMnB4LFxuICByYWRpby1ib3JkZXItY29sb3I6IGZvcm0tY29udHJvbC1ib3JkZXItY29sb3IsXG4gIHJhZGlvLWNoZWNrbWFyazogdHJhbnNwYXJlbnQsXG4gIHJhZGlvLWNoZWNrZWQtYmc6IHRyYW5zcGFyZW50LFxuICByYWRpby1jaGVja2VkLXNpemU6IDEuMjVyZW0sXG4gIHJhZGlvLWNoZWNrZWQtYm9yZGVyLXNpemU6IDJweCxcbiAgcmFkaW8tY2hlY2tlZC1ib3JkZXItY29sb3I6IGNvbG9yLXN1Y2Nlc3MsXG4gIHJhZGlvLWNoZWNrZWQtY2hlY2ttYXJrOiBjb2xvci1zdWNjZXNzLFxuICByYWRpby1kaXNhYmxlZC1iZzogdHJhbnNwYXJlbnQsXG4gIHJhZGlvLWRpc2FibGVkLXNpemU6IDEuMjVyZW0sXG4gIHJhZGlvLWRpc2FibGVkLWJvcmRlci1zaXplOiAycHgsXG4gIHJhZGlvLWRpc2FibGVkLWJvcmRlci1jb2xvcjogcmFkaW8tYm9yZGVyLWNvbG9yLFxuICByYWRpby1kaXNhYmxlZC1jaGVja21hcms6IHJhZGlvLWNoZWNrbWFyayxcbik7XG5cbi8vIHJlZ2lzdGVyIHRoZSB0aGVtZVxuJG5iLXRoZW1lczogbmItcmVnaXN0ZXItdGhlbWUoJHRoZW1lLCBkZWZhdWx0KTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuQGltcG9ydCAnLi4vY29yZS9mdW5jdGlvbnMnO1xuQGltcG9ydCAnLi4vY29yZS9taXhpbnMnO1xuQGltcG9ydCAnZGVmYXVsdCc7XG5cbi8vIGRlZmF1bHQgdGhlIGJhc2UgdGhlbWVcbiR0aGVtZTogKFxuICByYWRpdXM6IDAuNXJlbSxcblxuICBjb2xvci1iZzogIzNkMzc4MCxcbiAgY29sb3ItYmctYWN0aXZlOiAjNDk0Mjk5LFxuICBjb2xvci1mZzogI2ExYTFlNSxcbiAgY29sb3ItZmctaGVhZGluZzogI2ZmZmZmZixcbiAgY29sb3ItZmctdGV4dDogI2QxZDFmZixcbiAgY29sb3ItZmctaGlnaGxpZ2h0OiAjMDBmOWE2LFxuXG4gIGNvbG9yLWdyYXk6IHJnYmEoODEsIDExMywgMTY1LCAwLjE1KSxcbiAgY29sb3ItbmV1dHJhbDogdHJhbnNwYXJlbnQsXG4gIGNvbG9yLXdoaXRlOiAjZmZmZmZmLFxuICBjb2xvci1kaXNhYmxlZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpLFxuXG4gIGNvbG9yLXByaW1hcnk6ICM3NjU5ZmYsXG4gIGNvbG9yLXN1Y2Nlc3M6ICMwMGQ5NzcsXG4gIGNvbG9yLWluZm86ICMwMDg4ZmYsXG4gIGNvbG9yLXdhcm5pbmc6ICNmZmExMDAsXG4gIGNvbG9yLWRhbmdlcjogI2ZmMzg2YSxcblxuICBsaW5rLWNvbG9yOiAjMDBmOWE2LFxuICBsaW5rLWNvbG9yLWhvdmVyOiAjMTRmZmJlLFxuXG4gIHNlcGFyYXRvcjogIzM0MmU3MyxcbiAgc2hhZG93OiAwIDhweCAyMHB4IDAgcmdiYSg0MCwgMzcsIDg5LCAwLjYpLFxuXG4gIGNhcmQtaGVhZGVyLWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC1ib2xkZXIsXG5cbiAgbGF5b3V0LWJnOiAjMmYyOTZiLFxuXG4gIHNjcm9sbGJhci1mZzogIzU1NGRiMyxcbiAgc2Nyb2xsYmFyLWJnOiAjMzMyZTczLFxuXG4gIHJhZGlhbC1ncmFkaWVudDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA1MCUgNTAlLCAjNDIzZjhjLCAjMzAyYzZlKSxcbiAgbGluZWFyLWdyYWRpZW50OiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICMxNzE3NDksICM0MTM3ODkpLFxuXG4gIHNpZGViYXItZmc6IGNvbG9yLXNlY29uZGFyeSxcbiAgc2lkZWJhci1iZzogY29sb3ItYmcsXG5cbiAgaGVhZGVyLWZnOiBjb2xvci13aGl0ZSxcbiAgaGVhZGVyLWJnOiBjb2xvci1iZyxcblxuICBmb290ZXItZmc6IGNvbG9yLWZnLFxuICBmb290ZXItYmc6IGNvbG9yLWJnLFxuXG4gIGFjdGlvbnMtZmc6IGNvbG9yLWZnLFxuICBhY3Rpb25zLWJnOiBjb2xvci1iZyxcblxuICB1c2VyLWZnOiBjb2xvci1iZyxcbiAgdXNlci1iZzogY29sb3ItZmcsXG4gIHVzZXItZmctaGlnaGxpZ2h0OiBjb2xvci1mZy1oaWdobGlnaHQsXG5cbiAgcG9wb3Zlci1ib3JkZXI6IGNvbG9yLXByaW1hcnksXG4gIHBvcG92ZXItc2hhZG93OiBzaGFkb3csXG5cbiAgY29udGV4dC1tZW51LWFjdGl2ZS1iZzogY29sb3ItcHJpbWFyeSxcbiAgY29udGV4dC1tZW51LWJvcmRlcjogY29sb3ItcHJpbWFyeSxcblxuICBmb290ZXItaGVpZ2h0OiBoZWFkZXItaGVpZ2h0LFxuXG4gIHNpZGViYXItd2lkdGg6IDE2LjI1cmVtLFxuICBzaWRlYmFyLXdpZHRoLWNvbXBhY3Q6IDMuNDVyZW0sXG5cbiAgbWVudS1mZzogY29sb3ItZmcsXG4gIG1lbnUtYmc6IGNvbG9yLWJnLFxuICBtZW51LWFjdGl2ZS1mZzogY29sb3Itd2hpdGUsXG4gIG1lbnUtZ3JvdXAtZmc6IGNvbG9yLXdoaXRlLFxuICBtZW51LWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC1ub3JtYWwsXG4gIG1lbnUtYWN0aXZlLWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC1ib2xkZXIsXG4gIG1lbnUtc3VibWVudS1iZzogbGF5b3V0LWJnLFxuICBtZW51LXN1Ym1lbnUtZmc6IGNvbG9yLWZnLFxuICBtZW51LXN1Ym1lbnUtYWN0aXZlLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBtZW51LXN1Ym1lbnUtYWN0aXZlLWJnOiByZ2JhKDAsIDI1NSwgMTcwLCAwLjI1KSxcbiAgbWVudS1zdWJtZW51LWFjdGl2ZS1ib3JkZXItY29sb3I6IGNvbG9yLWZnLWhpZ2hsaWdodCxcbiAgbWVudS1zdWJtZW51LWFjdGl2ZS1zaGFkb3c6IDAgMnB4IDEycHggMCByZ2JhKDAsIDI1NSwgMTcwLCAwLjI1KSxcbiAgbWVudS1pdGVtLXBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbSxcbiAgbWVudS1pdGVtLXNlcGFyYXRvcjogdHJhbnNwYXJlbnQsXG5cbiAgYnRuLWhlcm8tc2hhZG93OiAwIDRweCAxMHB4IDAgcmdiYSgzMywgNywgNzcsIDAuNSksXG4gIGJ0bi1oZXJvLXRleHQtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpLFxuICBidG4taGVyby1iZXZlbC1zaXplOiAwIDNweCAwIDAsXG4gIGJ0bi1oZXJvLWdsb3ctc2l6ZTogMCAycHggOHB4IDAsXG4gIGJ0bi1oZXJvLXByaW1hcnktZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLXN1Y2Nlc3MtZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLXdhcm5pbmctZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLWluZm8tZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLWRhbmdlci1nbG93LXNpemU6IGJ0bi1oZXJvLWdsb3ctc2l6ZSxcbiAgYnRuLWhlcm8tc2Vjb25kYXJ5LWdsb3ctc2l6ZTogYnRuLWhlcm8tZ2xvdy1zaXplLFxuICBidG4tc2Vjb25kYXJ5LWJvcmRlcjogY29sb3ItcHJpbWFyeSxcbiAgYnRuLW91dGxpbmUtZmc6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIGJ0bi1vdXRsaW5lLWhvdmVyLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBidG4tb3V0bGluZS1mb2N1cy1mZzogY29sb3ItZmctaGVhZGluZyxcbiAgYnRuLWdyb3VwLWJnOiAjMzczMjczLFxuICBidG4tZ3JvdXAtc2VwYXJhdG9yOiAjMzEyYzY2LFxuXG4gIGZvcm0tY29udHJvbC1iZzogIzM3MzE3YSxcbiAgZm9ybS1jb250cm9sLWZvY3VzLWJnOiBzZXBhcmF0b3IsXG4gIGZvcm0tY29udHJvbC1ib3JkZXItY29sb3I6IHNlcGFyYXRvcixcbiAgZm9ybS1jb250cm9sLXNlbGVjdGVkLWJvcmRlci1jb2xvcjogY29sb3ItcHJpbWFyeSxcblxuICBjaGVja2JveC1iZzogdHJhbnNwYXJlbnQsXG4gIGNoZWNrYm94LXNpemU6IDEuMjVyZW0sXG4gIGNoZWNrYm94LWJvcmRlci1zaXplOiAycHgsXG4gIGNoZWNrYm94LWJvcmRlci1jb2xvcjogY29sb3ItZmcsXG4gIGNoZWNrYm94LWNoZWNrbWFyazogdHJhbnNwYXJlbnQsXG5cbiAgY2hlY2tib3gtY2hlY2tlZC1iZzogdHJhbnNwYXJlbnQsXG4gIGNoZWNrYm94LWNoZWNrZWQtc2l6ZTogMS4yNXJlbSxcbiAgY2hlY2tib3gtY2hlY2tlZC1ib3JkZXItc2l6ZTogMnB4LFxuICBjaGVja2JveC1jaGVja2VkLWJvcmRlci1jb2xvcjogY29sb3Itc3VjY2VzcyxcbiAgY2hlY2tib3gtY2hlY2tlZC1jaGVja21hcms6IGNvbG9yLWZnLWhlYWRpbmcsXG5cbiAgY2hlY2tib3gtZGlzYWJsZWQtYmc6IHRyYW5zcGFyZW50LFxuICBjaGVja2JveC1kaXNhYmxlZC1zaXplOiAxLjI1cmVtLFxuICBjaGVja2JveC1kaXNhYmxlZC1ib3JkZXItc2l6ZTogMnB4LFxuICBjaGVja2JveC1kaXNhYmxlZC1ib3JkZXItY29sb3I6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIGNoZWNrYm94LWRpc2FibGVkLWNoZWNrbWFyazogY29sb3ItZmctaGVhZGluZyxcblxuICBzZWFyY2gtYmc6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzE3MTc0OSwgIzQxMzc4OSksXG5cbiAgc21hcnQtdGFibGUtaGVhZGVyLWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC1ub3JtYWwsXG4gIHNtYXJ0LXRhYmxlLWhlYWRlci1iZzogY29sb3ItYmctYWN0aXZlLFxuICBzbWFydC10YWJsZS1iZy1ldmVuOiAjM2EzNDdhLFxuICBzbWFydC10YWJsZS1iZy1hY3RpdmU6IGNvbG9yLWJnLWFjdGl2ZSxcblxuICBzbWFydC10YWJsZS1wYWdpbmctYm9yZGVyLWNvbG9yOiBjb2xvci1wcmltYXJ5LFxuICBzbWFydC10YWJsZS1wYWdpbmctYm9yZGVyLXdpZHRoOiAycHgsXG4gIHNtYXJ0LXRhYmxlLXBhZ2luZy1mZy1hY3RpdmU6IGNvbG9yLWZnLWhlYWRpbmcsXG4gIHNtYXJ0LXRhYmxlLXBhZ2luZy1iZy1hY3RpdmU6IGNvbG9yLXByaW1hcnksXG4gIHNtYXJ0LXRhYmxlLXBhZ2luZy1ob3ZlcjogcmdiYSgwLCAwLCAwLCAwLjIpLFxuXG4gIGJhZGdlLWZnLXRleHQ6IGNvbG9yLXdoaXRlLFxuICBiYWRnZS1wcmltYXJ5LWJnLWNvbG9yOiBjb2xvci1wcmltYXJ5LFxuICBiYWRnZS1zdWNjZXNzLWJnLWNvbG9yOiBjb2xvci1zdWNjZXNzLFxuICBiYWRnZS1pbmZvLWJnLWNvbG9yOiBjb2xvci1pbmZvLFxuICBiYWRnZS13YXJuaW5nLWJnLWNvbG9yOiBjb2xvci13YXJuaW5nLFxuICBiYWRnZS1kYW5nZXItYmctY29sb3I6IGNvbG9yLWRhbmdlcixcblxuICBzcGlubmVyLWJnOiByZ2JhKDYxLCA1NSwgMTI4LCAwLjkpLFxuICBzdGVwcGVyLWFjY2VudC1jb2xvcjogY29sb3Itc3VjY2VzcyxcblxuICB0YWJzLXNlbGVjdGVkLXNlY29uZC1jb2xvcjogY29sb3Itc3VjY2VzcyxcbiAgdGFicy1zZWxlY3RlZC1kZWdyZWVzOiAyMGRlZyxcblxuICBjYWxlbmRhci1hY3RpdmUtaXRlbS1iZzogY29sb3ItcHJpbWFyeSxcbiAgY2FsZW5kYXItc2VsZWN0ZWQtaXRlbS1iZzogY29sb3ItcHJpbWFyeSxcbiAgY2FsZW5kYXItcmFuZ2UtYmctaW4tcmFuZ2U6ICM0ZTQwOTUsXG4gIGNhbGVuZGFyLXRvZGF5LWl0ZW0tYmc6ICMzNTJmNmUsXG5cbiAgc2VsZWN0LW9wdGlvbi1kaXNhYmxlZC1iZzogIzMxMmU3NSxcblxuICB0b2FzdHItY29sb3ItZmc6IGNvbG9yLXdoaXRlLFxuICB0b2FzdHItcGFkZGluZzogMS4yNXJlbSxcbiAgdG9hc3RyLWJvcmRlcjogMCxcbiAgdG9hc3RyLWRlZmF1bHQtYmFja2dyb3VuZDogI2JjYzNjYyxcblxuICB0b29sdGlwLWZnOiBjb2xvci1iZyxcbiAgdG9vbHRpcC1zdGF0dXMtZmc6IGNvbG9yLXdoaXRlLFxuXG4gIGRhdGVwaWNrZXItYm9yZGVyOiBjb2xvci1wcmltYXJ5LFxuICBkYXRlcGlja2VyLXNoYWRvdzogc2hhZG93LFxuXG4gIHJhZGlvLWNoZWNrZWQtYm9yZGVyLWNvbG9yOiBjb2xvci1wcmltYXJ5LFxuICByYWRpby1jaGVja2VkLWNoZWNrbWFyazogY29sb3ItcHJpbWFyeSxcbik7XG5cbi8vIHJlZ2lzdGVyIHRoZSB0aGVtZVxuJG5iLXRoZW1lczogbmItcmVnaXN0ZXItdGhlbWUoJHRoZW1lLCBjb3NtaWMsIGRlZmF1bHQpO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5AaW1wb3J0ICcuLi9jb3JlL2Z1bmN0aW9ucyc7XG5AaW1wb3J0ICcuLi9jb3JlL21peGlucyc7XG5AaW1wb3J0ICdkZWZhdWx0JztcblxuLy8gZGVmYXVsdCB0aGUgYmFzZSB0aGVtZVxuJHRoZW1lOiAoXG4gIGhlYWRlci1mZzogI2Y3ZmFmYixcbiAgaGVhZGVyLWJnOiAjMTExMjE4LFxuXG4gIGxheW91dC1iZzogI2YxZjVmOCxcblxuICBjb2xvci1mZy1oZWFkaW5nOiAjMTgxODE4LFxuICBjb2xvci1mZy10ZXh0OiAjNGI0YjRiLFxuICBjb2xvci1mZy1oaWdobGlnaHQ6IGNvbG9yLWZnLFxuXG4gIHNlcGFyYXRvcjogI2NkZDVkYyxcblxuICByYWRpdXM6IDAuMTdyZW0sXG5cbiAgc2Nyb2xsYmFyLWJnOiAjZTNlOWVlLFxuXG4gIGNvbG9yLXByaW1hcnk6ICM3M2ExZmYsXG4gIGNvbG9yLXN1Y2Nlc3M6ICM1ZGNmZTMsXG4gIGNvbG9yLWluZm86ICNiYTdmZWMsXG4gIGNvbG9yLXdhcm5pbmc6ICNmZmEzNmIsXG4gIGNvbG9yLWRhbmdlcjogI2ZmNmI4MyxcblxuICBidG4tc2Vjb25kYXJ5LWJnOiAjZWRmMmY1LFxuICBidG4tc2Vjb25kYXJ5LWJvcmRlcjogI2VkZjJmNSxcblxuICBhY3Rpb25zLWZnOiAjZDNkYmU1LFxuICBhY3Rpb25zLWJnOiBjb2xvci1iZyxcblxuICBzaWRlYmFyLWJnOiAjZTNlOWVlLFxuXG4gIGJvcmRlci1jb2xvcjogI2Q1ZGJlMCxcblxuICBtZW51LWZvbnQtd2VpZ2h0OiBmb250LXdlaWdodC1ib2xkZXIsXG4gIG1lbnUtZmc6IGNvbG9yLWZnLXRleHQsXG4gIG1lbnUtYmc6ICNlM2U5ZWUsXG4gIG1lbnUtYWN0aXZlLWZnOiBjb2xvci1mZy1oZWFkaW5nLFxuICBtZW51LWFjdGl2ZS1iZzogbWVudS1iZyxcblxuICBtZW51LXN1Ym1lbnUtYmc6IG1lbnUtYmcsXG4gIG1lbnUtc3VibWVudS1mZzogY29sb3ItZmctdGV4dCxcbiAgbWVudS1zdWJtZW51LWFjdGl2ZS1mZzogY29sb3ItZmctaGVhZGluZyxcbiAgbWVudS1zdWJtZW51LWFjdGl2ZS1iZzogI2NkZDVkYyxcbiAgbWVudS1zdWJtZW51LWFjdGl2ZS1ib3JkZXItY29sb3I6IG1lbnUtc3VibWVudS1hY3RpdmUtYmcsXG4gIG1lbnUtc3VibWVudS1hY3RpdmUtc2hhZG93OiBub25lLFxuICBtZW51LXN1Ym1lbnUtaG92ZXItZmc6IG1lbnUtc3VibWVudS1hY3RpdmUtZmcsXG4gIG1lbnUtc3VibWVudS1ob3Zlci1iZzogbWVudS1iZyxcbiAgbWVudS1zdWJtZW51LWl0ZW0tYm9yZGVyLXdpZHRoOiAwLjEyNXJlbSxcbiAgbWVudS1zdWJtZW51LWl0ZW0tYm9yZGVyLXJhZGl1czogcmFkaXVzLFxuICBtZW51LXN1Ym1lbnUtaXRlbS1wYWRkaW5nOiAwLjVyZW0gMXJlbSxcbiAgbWVudS1zdWJtZW51LWl0ZW0tY29udGFpbmVyLXBhZGRpbmc6IDAgMS4yNXJlbSxcbiAgbWVudS1zdWJtZW51LXBhZGRpbmc6IDAuNXJlbSxcblxuICBidG4tYm9yZGVyLXJhZGl1czogYnRuLXNlbWktcm91bmQtYm9yZGVyLXJhZGl1cyxcblxuICBidG4taGVyby1kZWdyZWU6IDBkZWcsXG4gIGJ0bi1oZXJvLXByaW1hcnktZGVncmVlOiBidG4taGVyby1kZWdyZWUsXG4gIGJ0bi1oZXJvLXN1Y2Nlc3MtZGVncmVlOiBidG4taGVyby1kZWdyZWUsXG4gIGJ0bi1oZXJvLXdhcm5pbmctZGVncmVlOiBidG4taGVyby1kZWdyZWUsXG4gIGJ0bi1oZXJvLWluZm8tZGVncmVlOiBidG4taGVyby1kZWdyZWUsXG4gIGJ0bi1oZXJvLWRhbmdlci1kZWdyZWU6IGJ0bi1oZXJvLWRlZ3JlZSxcbiAgYnRuLWhlcm8tc2Vjb25kYXJ5LWRlZ3JlZTogYnRuLWhlcm8tZGVncmVlLFxuICBidG4taGVyby1nbG93LXNpemU6IDAgMCAyMHB4IDAsXG4gIGJ0bi1oZXJvLXByaW1hcnktZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLXN1Y2Nlc3MtZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLXdhcm5pbmctZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLWluZm8tZ2xvdy1zaXplOiBidG4taGVyby1nbG93LXNpemUsXG4gIGJ0bi1oZXJvLWRhbmdlci1nbG93LXNpemU6IGJ0bi1oZXJvLWdsb3ctc2l6ZSxcbiAgYnRuLWhlcm8tc2Vjb25kYXJ5LWdsb3ctc2l6ZTogMCAwIDAgMCxcbiAgYnRuLWhlcm8tYm9yZGVyLXJhZGl1czogYnRuLWJvcmRlci1yYWRpdXMsXG5cbiAgY2FyZC1zaGFkb3c6IG5vbmUsXG4gIGNhcmQtYm9yZGVyLXdpZHRoOiAxcHgsXG4gIGNhcmQtYm9yZGVyLWNvbG9yOiBib3JkZXItY29sb3IsXG4gIGNhcmQtaGVhZGVyLWJvcmRlci13aWR0aDogMCxcblxuICBsaW5rLWNvbG9yOiAjNWRjZmUzLFxuICBsaW5rLWNvbG9yLWhvdmVyOiAjN2RjZmUzLFxuICBsaW5rLWNvbG9yLXZpc2l0ZWQ6IGxpbmstY29sb3IsXG5cbiAgYWN0aW9ucy1zZXBhcmF0b3I6ICNmMWY0ZjUsXG5cbiAgbW9kYWwtc2VwYXJhdG9yOiBib3JkZXItY29sb3IsXG5cbiAgdGFicy1zZWxlY3RlZDogY29sb3ItcHJpbWFyeSxcbiAgdGFicy1zZWxlY3RlZC1zZWNvbmQtY29sb3I6IGNvbG9yLXByaW1hcnksXG4gIHRhYnMtc2VwYXJhdG9yOiAjZWJlY2VlLFxuXG4gIHNtYXJ0LXRhYmxlLXBhZ2luZy1iZy1hY3RpdmU6IGNvbG9yLXByaW1hcnksXG5cbiAgcm91dGUtdGFicy1zZWxlY3RlZDogY29sb3ItcHJpbWFyeSxcblxuICBwb3BvdmVyLWJvcmRlcjogY29sb3ItcHJpbWFyeSxcblxuICBmb290ZXItc2hhZG93OiBub25lLFxuICBmb290ZXItc2VwYXJhdG9yOiBib3JkZXItY29sb3IsXG4gIGZvb3Rlci1mZy1oaWdobGlnaHQ6ICMyYTJhMmEsXG5cbiAgY2FsZW5kYXItdG9kYXktaXRlbS1iZzogI2EyYjJjNyxcbiAgY2FsZW5kYXItYWN0aXZlLWl0ZW0tYmc6IGNvbG9yLXByaW1hcnksXG4gIGNhbGVuZGFyLXJhbmdlLWJnLWluLXJhbmdlOiAjZTNlY2ZlLFxuICBjYWxlbmRhci10b2RheS1mZzogY29sb3Itd2hpdGUsXG5cbiAgdG9hc3RyLWljb24tcmFkaXVzOiByYWRpdXMsXG5cbiAgZGF0ZXBpY2tlci1ib3JkZXI6IGNvbG9yLXByaW1hcnksXG4pO1xuXG4vLyByZWdpc3RlciB0aGUgdGhlbWVcbiRuYi10aGVtZXM6IG5iLXJlZ2lzdGVyLXRoZW1lKCR0aGVtZSwgY29ycG9yYXRlLCBkZWZhdWx0KTtcbiIsIkBpbXBvcnQgJy4uLy4uLy4uL0B0aGVtZS9zdHlsZXMvdGhlbWVzJztcblxuXG5AaW5jbHVkZSBuYi1pbnN0YWxsLWNvbXBvbmVudCgpIHtcblxuICBuYi1jYXJkLWJvZHkge1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICB9XG5cbiAgLmlucHV0LWdyb3VwIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICB9XG5cbiAgLmVycm9yLW1lc3NhZ2Uge1xuICAgIGNvbG9yOiAjZmY0YzZhXG4gIH1cbiAgXG4vLyAgIGJ1dHRvbi5idG4uYnRuLWxpbmsubmctc3Rhci1pbnNlcnRlZCB7XG4vLyAgICAgY29sb3I6IGZpcmVicmljaztcbi8vIH1cblxuICAuYnRuIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4uc2l6ZXtcbiAgaGVpZ2h0OiAyMDBweDtcbn1cbiAgL2RlZXAvIGFnbS1tYXAge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogbmItdGhlbWUoY2FyZC1oZWlnaHQtbGFyZ2UpO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/pages/appusers/add/add.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/appusers/add/add.component.ts ***!
  \*****************************************************/
/*! exports provided: AddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddComponent", function() { return AddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nebular/theme/components/toastr/model */ "./node_modules/@nebular/theme/components/toastr/model.js");
/* harmony import */ var _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../helpers/toaster.service */ "./src/app/helpers/toaster.service.ts");
/* harmony import */ var _pages_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages-menu */ "./src/app/pages/pages-menu.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Location } from '../../maps/search-map/entity/Location';







var AddComponent = /** @class */ (function () {
    function AddComponent(formBuilder, dateService, http, toast) {
        this.formBuilder = formBuilder;
        this.dateService = dateService;
        this.http = http;
        this.toast = toast;
        this.positionChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.UNameError = "";
        this.phoneError = "";
        this.dropdownList = [];
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl;
        this.spinner = false;
        this.fileData = null;
        this.submitted = false;
        this.endMinDate = new Date();
    }
    AddComponent.prototype.ngOnInit = function () {
        this.emailError = '';
        var data = [];
        for (var i = 0; i < _pages_menu__WEBPACK_IMPORTED_MODULE_7__["MENU_ITEMS"].length; i++) {
            if (i == 0) {
            }
            else if (i == 1) {
            }
            else if (i == 2) {
            }
            else {
                data.push(_pages_menu__WEBPACK_IMPORTED_MODULE_7__["MENU_ITEMS"][i]);
            }
        }
        this.menu = data;
        this.eventForm = this.formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(4)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            dob: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            hireAvailable: ['1'],
            about: [''],
            location: [''],
            occupation: [],
            company: [''],
            experience: [''],
            country: ['United States', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8)]],
            work: [''],
            additional: [''],
            image: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
        });
        this.getCountries();
    };
    AddComponent.prototype.getCountries = function () {
        var _this = this;
        this.getCountryList().subscribe(function (response) {
            console.log(response);
            _this.citiesList = response;
        }, function (error) {
        });
    };
    AddComponent.prototype.preview = function (files) {
        var _this = this;
        if (files.length === 0) {
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only images are supported.';
            return;
        }
        this.f['image'].setValue(files[0].name ? files[0].name : '');
        var reader = new FileReader();
        this.imagePath = files;
        this.fileData = files[0];
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
        };
    };
    Object.defineProperty(AddComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.eventForm.controls; },
        enumerable: true,
        configurable: true
    });
    ////// ========================== super admin login function =========================== //////
    AddComponent.prototype.addEvent = function () {
        var _this = this;
        this.submitted = true;
        if (this.eventForm.invalid) {
            return;
        }
        // --------------------------------------------------------------          
        this.spinner = true;
        // this.formError=""
        var formData = new FormData();
        formData.append('name', this.f.name.value);
        formData.append('email', this.f.email.value);
        formData.append('country', this.f.country.value);
        formData.append('location', this.f.location.value);
        formData.append('about', this.f.about.value);
        formData.append('hireAvailable', this.f.hireAvailable.value);
        formData.append('occupation', this.f.occupation.value);
        formData.append('company', this.f.company.value);
        formData.append('experience', this.f.experience.value);
        formData.append('dob', this.f.dob.value);
        formData.append('work', this.f.work.value);
        formData.append('image', this.fileData);
        formData.append('additional', this.f.additional.value);
        formData.append('password', this.f.password.value);
        formData.append('deviceType', '0');
        formData.append('deviceToken', 'deviceToken');
        this.spinner = false;
        this.http.post(this.baseUrl + 'api/adduser', formData).subscribe(function (response) {
            _this.spinner = false;
            _this.submitted = false;
            if (response.message === 'Exists' || response.message === 'Error') {
                _this.toast.showToast(_nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_5__["NbToastStatus"].DANGER, 'Error', response.body);
            }
            else if (response.message === 'Users Added Successfully!') {
                _this.toast.showToast(_nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_5__["NbToastStatus"].SUCCESS, 'User', response.message);
                _this.form.nativeElement.reset();
                _this.imgURL = "";
                _this.fileData = null;
            }
        }, function (error) {
            console.log(error);
            _this.toast.showToast(_nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_5__["NbToastStatus"].DANGER, 'Error', error.message);
        });
    };
    AddComponent.prototype.getCountryList = function () {
        return this.http.get("./assets/countries.json");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddComponent.prototype, "positionChanged", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('search'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AddComponent.prototype, "search", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", Object)
    ], AddComponent.prototype, "form", void 0);
    AddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-adsAdd',
            styles: [__webpack_require__(/*! ./add.component.scss */ "./src/app/pages/appusers/add/add.component.scss")],
            template: __webpack_require__(/*! ./add.component.html */ "./src/app/pages/appusers/add/add.component.html"),
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbDateService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_6__["ToastrMessages"]])
    ], AddComponent);
    return AddComponent;
}());



/***/ }),

/***/ "./src/app/pages/appusers/appusers-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/appusers/appusers-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: AppUsersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppUsersRoutingModule", function() { return AppUsersRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _appusers_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appusers.component */ "./src/app/pages/appusers/appusers.component.ts");
/* harmony import */ var _view_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/view.component */ "./src/app/pages/appusers/view/view.component.ts");
/* harmony import */ var _add_add_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add/add.component */ "./src/app/pages/appusers/add/add.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [{
        path: '',
        component: _appusers_component__WEBPACK_IMPORTED_MODULE_2__["AppUsersComponents"],
        children: [
            {
                path: 'add',
                component: _add_add_component__WEBPACK_IMPORTED_MODULE_4__["AddComponent"],
            }, {
                path: 'view',
                component: _view_view_component__WEBPACK_IMPORTED_MODULE_3__["ViewComponent"],
            }
        ],
    }];
var AppUsersRoutingModule = /** @class */ (function () {
    function AppUsersRoutingModule() {
    }
    AppUsersRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], AppUsersRoutingModule);
    return AppUsersRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/appusers/appusers.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/appusers/appusers.component.ts ***!
  \******************************************************/
/*! exports provided: AppUsersComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppUsersComponents", function() { return AppUsersComponents; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppUsersComponents = /** @class */ (function () {
    function AppUsersComponents() {
    }
    AppUsersComponents = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-users',
            template: "\n    <router-outlet></router-outlet>\n  ",
        })
    ], AppUsersComponents);
    return AppUsersComponents;
}());



/***/ }),

/***/ "./src/app/pages/appusers/appusers.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/appusers/appusers.module.ts ***!
  \***************************************************/
/*! exports provided: AppUsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppUsersModule", function() { return AppUsersModule; });
/* harmony import */ var _add_add_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add/add.component */ "./src/app/pages/appusers/add/add.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var _appusers_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./appusers-routing.module */ "./src/app/pages/appusers/appusers-routing.module.ts");
/* harmony import */ var _view_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/view.component */ "./src/app/pages/appusers/view/view.component.ts");
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-smart-table */ "./node_modules/ng2-smart-table/index.js");
/* harmony import */ var _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../helpers/toaster.service */ "./src/app/helpers/toaster.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../interceptor/auth.interceptor */ "./src/app/interceptor/auth.interceptor.ts");
/* harmony import */ var _appusers_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./appusers.component */ "./src/app/pages/appusers/appusers.component.ts");
/* harmony import */ var ngx_ui_switch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-ui-switch */ "./node_modules/ngx-ui-switch/ui-switch.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// import { MapsModule } from '../../pages/maps/maps.module';


// import{SearchComponent} from '../maps/search-map/search/search.component';



var components = [
    _appusers_component__WEBPACK_IMPORTED_MODULE_9__["AppUsersComponents"],
    _view_view_component__WEBPACK_IMPORTED_MODULE_4__["ButtonViewComponent"],
    _view_view_component__WEBPACK_IMPORTED_MODULE_4__["ViewComponent"],
    _add_add_component__WEBPACK_IMPORTED_MODULE_0__["AddComponent"]
];
var AppUsersModule = /** @class */ (function () {
    function AppUsersModule() {
    }
    AppUsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_2__["ThemeModule"],
                _appusers_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppUsersRoutingModule"],
                ng2_smart_table__WEBPACK_IMPORTED_MODULE_5__["Ng2SmartTableModule"],
                ngx_ui_switch__WEBPACK_IMPORTED_MODULE_10__["UiSwitchModule"].forRoot({})
            ],
            declarations: components.slice(),
            providers: [
                _helpers_toaster_service__WEBPACK_IMPORTED_MODULE_6__["ToastrMessages"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"], useClass: _interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_8__["AuthInterceptor"], multi: true }
            ],
            entryComponents: [_view_view_component__WEBPACK_IMPORTED_MODULE_4__["ButtonViewComponent"]]
        })
    ], AppUsersModule);
    return AppUsersModule;
}());



/***/ }),

/***/ "./src/app/pages/appusers/view/view.component.html":
/*!*********************************************************!*\
  !*** ./src/app/pages/appusers/view/view.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nb-card>\n  <nb-card-header>\n    App Users\n  </nb-card-header>\n  <nb-card-body>\n    <ng2-smart-table [settings]=\"settings\" [source]=\"source\" (edit)=\"viewDetails($event,groupsModel)\"\n      (delete)=\"onDelete($event)\">\n    </ng2-smart-table>\n  </nb-card-body>\n</nb-card>\n\n<ng-template #groupsModel let-c=\"close\" let-d=\"dismiss\">\n <div class=\"modal-header\">\n    <h4 class=\"modal-title\">{{selectedItems.name}}</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div> \n  <div class=\"modal-body\" style=\"overflow-y: scroll;height: 450px\">\n    <div class=\"modal-title\"><b>Occupation:</b><span>{{selectedItems.occupation}}</span></div>\n    <div class=\"modal-title\"><b>Company:</b><span>{{selectedItems.company}}</span></div>\n    <div class=\"modal-title\"><b>Experience:</b><span>{{selectedItems.experience}}</span></div>\n    <br>\n    <div style=\"text-align: center;\"><h4>Groups</h4></div>\n    <br>\n    <h5>PLS5</h5>\n    <ul class=\"list-group\" style=\"list-style-type:none;\" *ngIf=\"userGroups.length>0\">\n     <li *ngFor=\"let item of userGroups; let i = index\">\n      <div class=\"list-group-item d-flex justify-content-between align-items-center\" *ngIf=\"item.group.category=='PLS5'\">\n     <img src=\"{{imagesUrl+item.group.image}}\" width=\"30\" height=\"30\"  alt=\"\">\n     {{item.group.name}}\n      <div class=\"image-parent\" >\n        </div>\n    </div>  \n      </li>\n    </ul>\n    \n    <br>\n    <h5>ROBOT</h5>\n    <ul class=\"list-group\" style=\"list-style-type:none;\" *ngIf=\"userGroups.length>0\">\n     <li *ngFor=\"let item of userGroups; let i = index\">\n      <div class=\"list-group-item d-flex justify-content-between align-items-center\" *ngIf=\"item.group.category=='ROBOT'\">\n     <img src=\"{{imagesUrl+item.group.image}}\" width=\"30\" height=\"30\"  alt=\"\">\n     {{item.group.name}}\n      <div class=\"image-parent\" >\n        </div>\n    </div>  \n      </li>\n    </ul>\n\n   \n\n\n  </div>\n \n</ng-template>"

/***/ }),

/***/ "./src/app/pages/appusers/view/view.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/appusers/view/view.component.ts ***!
  \*******************************************************/
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
        this.allGroups = [];
        this.userGroups = [];
        this.dropdownList = [];
        this.selectedUserName = "";
        this.settings = {
            mode: 'external',
            actions: {
                columnTitle: "Details/Delete",
                position: 'right',
                edit: true,
                add: false
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
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
                name: {
                    title: 'Name',
                    type: 'string',
                },
                email: {
                    title: 'Email',
                    type: 'string'
                },
                dob: {
                    title: 'Date of birth',
                    type: 'string'
                },
                // about:{
                //   title: 'About',
                //   type: 'string'
                // }
                // ,
                // work:{
                //   title: 'Work',
                //   type: 'string'
                // },
                // ,
                //       additional:{
                //         title: 'Additional',
                //         type: 'string'
                //       },
                hireAvailable: {
                    title: 'Hiring Availibility',
                    type: 'string'
                },
                country: {
                    title: 'Country',
                    type: 'string'
                },
                status: {
                    title: 'status',
                    type: 'custom',
                    renderComponent: ButtonViewComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (row) {
                        });
                    }
                },
                image: {
                    title: 'Image',
                    type: 'html',
                    filter: false,
                    valuePrepareFunction: function (image) { return "<img width=\"30px\" src=\"" + _this.imagesUrl + image + "\" />"; },
                }
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
        this.http.get(this.baseUrl + 'api/appusers').subscribe(function (response) {
            console.log(response);
            response.body.forEach(function (element) {
                if (element['hireAvailable'] == '0') {
                    element['hireAvailable'] = "No";
                }
                else {
                    element['hireAvailable'] = "Yes";
                }
                element['dob'] = new Date(element.dob).toDateString();
            });
            var userList = response.body;
            _this.source.load(userList);
        }, function (error) {
        });
    };
    ViewComponent.prototype.onDelete = function (event) {
        var _this = this;
        if (confirm('Are you sure to delete this user?')) {
            this.http.delete(this.baseUrl + 'api/appusers/' + event.data.id)
                .subscribe(function (response) {
                if (response.message == 'Users Successfully Deleted!') {
                    _this.toast.showToast(_nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_7__["NbToastStatus"].SUCCESS, 'Users', response.message);
                    _this.getAllUsers();
                }
            });
        }
    };
    ViewComponent.prototype.getAllGroups = function () {
        //   this.http.get(this.baseUrl + 'categories').subscribe(
        //   (response: any) => {
        //   response.body.map(item=> {
        //     item.id = item.id;
        //     item.name = item.name;
        //     item.image = item.image;
        //     item['status']=false;
        //   }) 
        //   this.allGroups = response.body;
        //  // console.log(this.getAllGroups);
        //   },
        //   (error) => {
        //   });
    };
    ViewComponent.prototype.modifyGroupAccess = function (item, event) {
        //   let status='0';
        //   if(event){
        //     status='2'
        //   }
        //  let data= {
        //    groupId:item.id,
        //    userId:this.selectedUserId,
        //    status:status
        //  }
        //  this.http.put(this.baseUrl + 'updateUserGroupAccess',data).subscribe(
        //   (response: any) => {
        //     console.log(response);
        //   },
        //   (error) => {
        //   });
    };
    ViewComponent.prototype.getGroupStatus = function () {
        return true;
    };
    ViewComponent.prototype.statusChange = function (data) {
        var _this = this;
        console.log(data);
        var itemStatus = 0;
        var itemId = data.id;
        if (data.status == 0) {
            itemStatus = 1;
        }
        else {
            itemStatus = 0;
        }
        data = {
            "status": itemStatus,
            "userId": itemId
        };
        this.http.put(this.baseUrl + 'api/statusupdate', data).subscribe(function (response) {
            if (response.message == 'Status updated Successfully!') {
                _this.toast.showToast(_nebular_theme_components_toastr_model__WEBPACK_IMPORTED_MODULE_7__["NbToastStatus"].SUCCESS, 'Users', response.message);
                _this.getAllUsers();
            }
        }, function (error) {
        });
    };
    ViewComponent.prototype.viewDetails = function (item, model) {
        this.selectedItems = item.data;
        this.userGroups = item.data.groupaccesses;
        this.modalService.open(model, { size: 'lg', backdrop: 'static' });
    };
    ViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-sponsersview',
            template: __webpack_require__(/*! ./view.component.html */ "./src/app/pages/appusers/view/view.component.html"),
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
            template: "\n    <button (click)=\"onClick()\" *ngIf=\"renderValue==0\">Activate</button>\n    <button (click)=\"onClick()\" *ngIf=\"renderValue==1\">Deactivate</button>\n\n  ",
        }),
        __metadata("design:paramtypes", [ViewComponent])
    ], ButtonViewComponent);
    return ButtonViewComponent;
}());



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
//# sourceMappingURL=appusers-appusers-module.js.map