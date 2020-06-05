(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

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
//# sourceMappingURL=common.js.map