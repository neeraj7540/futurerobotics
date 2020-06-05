const config = require('config');
const routes = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const adminAuthCtrl = require('../controllers/adminAuthController');
const appUsersCtrl = require('../controllers/appUserController');
const groupCtrl = require('../controllers/groupsController');
const feedCatCtrl = require('../controllers/feedsCategoryController');
const otherAppCtrl = require('../controllers/otherappcontroller');
const crmPagesCtrl = require('../controllers/crmPagesController');
const feedsCtrl = require('../controllers/feedsController');
const responseHelper = require('../helpers/responseHelper');



////// ================== middleware to set custom message on unauthorized token ================//////

routes.use(function (req, res, next) {
  var token = req.token;
  if (token) {
    jwt.verify(token, config.jwtToken, function (err) {
      if (err) {
        responseHelper.unauthorized(res, err);
      } else {
        next();
      }
    });
  } else {
    next();
  }
});


// Authentication Routes

  routes.post('/login', adminAuthCtrl.adminLogin);
  routes.post('/logout',passport.authenticate('admin', { session: false }), adminAuthCtrl.logout);
  routes.get('/user',passport.authenticate('admin', { session: false }), adminAuthCtrl.viewUser);


  routes.get('/dashboarddata',passport.authenticate('admin', { session: false }), feedsCtrl.getDashBoardData);

 
 
  routes.post('/adduser',passport.authenticate('admin', { session: false }), appUsersCtrl.addUserByAdmin);
  routes.get('/appusers',passport.authenticate('admin', { session: false }), appUsersCtrl.appUserListAdmin);
  routes.delete('/appusers/:id',passport.authenticate('admin', { session: false }), appUsersCtrl.deleteAppUserByAdmin);
  routes.put('/statusupdate',passport.authenticate('admin', { session: false }), appUsersCtrl.userStatusUpdteByAdmin);


   // groups
   
  routes.post('/addgroup',passport.authenticate('admin', { session: false }), groupCtrl.addGroupByAdmin);
  routes.get('/grouplist',passport.authenticate('admin', { session: false }), groupCtrl.groupListAdmin);
  routes.delete('/group/:id',passport.authenticate('admin', { session: false }), groupCtrl.deleteGroupByAdmin);
  routes.put('/groupedit/:id',passport.authenticate('admin', { session: false }), groupCtrl.groupEditByAdmin);


//feeds category 

routes.post('/addfeedscategory',passport.authenticate('admin', { session: false }), feedCatCtrl.addFeedsCategoryAdmin);
routes.get('/feedscategorylist',passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryListAdmin);
routes.delete('/feedscategory/:id',passport.authenticate('admin', { session: false }), feedCatCtrl.deleteFeedsCategoryAdmin);
routes.put('/feedscategoryedit/:id',passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryEditAdmin);



//otherAppCtrl 

routes.post('/addapp',passport.authenticate('admin', { session: false }), otherAppCtrl.addAppByAdmin);
routes.get('/applist',passport.authenticate('admin', { session: false }), otherAppCtrl.appListAdmin);
routes.delete('/app/:id',passport.authenticate('admin', { session: false }), otherAppCtrl.deleteAppAdmin);
routes.put('/appedit/:id',passport.authenticate('admin', { session: false }), otherAppCtrl.appEditAdmin);

//crm pages


routes.post('/addpage',passport.authenticate('admin', { session: false }), crmPagesCtrl.addPageAdmin);
routes.get('/pageslist',passport.authenticate('admin', { session: false }), crmPagesCtrl.pageListAdmin);
routes.delete('/page/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.deletePageAdmin);
routes.put('/pageedit/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.pageEditAdmin);


//feeds  controller

//routes.post('/addpage',passport.authenticate('admin', { session: false }), crmPagesCtrl.addPageAdmin);
routes.get('/reportedfeeds',passport.authenticate('admin', { session: false }), feedsCtrl.getAllreportedFeeds);
routes.put('/feedstatuschange',passport.authenticate('admin', { session: false }), feedsCtrl.updateFeedStatus);
routes.get('/allfeeds',passport.authenticate('admin', { session: false }), feedsCtrl.getAllFeeds);

//routes.delete('/page/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.deletePageAdmin);
//routes.put('/pageedit/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.pageEditAdmin);







module.exports = routes;