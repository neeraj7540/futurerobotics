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
const postCtrl = require('../controllers/postController');
const addsCtrl = require('../controllers/addController');


const responseHelper = require('../helpers/responseHelper');


const socketFunction = require('../controllers/socketFunction.js');
//console.log(socketFunction);



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
  routes.put('/updateuser',passport.authenticate('admin', { session: false }), adminAuthCtrl.updateUser);
  
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
  routes.put('/groupstatusupdate',passport.authenticate('admin', { session: false }), groupCtrl.groupStatusUpdteByAdmin);


//feeds category 

routes.post('/addfeedscategory',passport.authenticate('admin', { session: false }), feedCatCtrl.addFeedsCategoryAdmin);
routes.get('/feedscategorylist',passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryListAdmin);
routes.delete('/feedscategory/:id',passport.authenticate('admin', { session: false }), feedCatCtrl.deleteFeedsCategoryAdmin);
routes.put('/feedscategoryedit/:id',passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryEditAdmin);
routes.put('/feedsCategorystatusupdate',passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryStatusUpdteByAdmin);



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
routes.get('/allcomments/:id',passport.authenticate('admin', { session: false }), feedsCtrl.getAllComments);
routes.get('/allikes/:id',passport.authenticate('admin', { session: false }), feedsCtrl.getAllLikes);
routes.get('/feedreporterlist/:id',passport.authenticate('admin', { session: false }), feedsCtrl.feedReporterList);

routes.put('/commentstatusupdate',passport.authenticate('admin', { session: false }), feedsCtrl.updateCommentStatus);




//routes.delete('/page/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.deletePageAdmin);
//routes.put('/pageedit/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.pageEditAdmin);


//post

routes.post('/addpost',passport.authenticate('admin', { session: false }), postCtrl.addPostAdmin);
routes.get('/postlist',passport.authenticate('admin', { session: false }), postCtrl.postListAdmin);
routes.delete('/post/:id',passport.authenticate('admin', { session: false }), postCtrl.deletePostAdmin);
routes.put('/postedit/:id',passport.authenticate('admin', { session: false }), postCtrl.postEditAdmin);
routes.put('/poststatusupdate',passport.authenticate('admin', { session: false }), postCtrl.postStatusUpdteByAdmin);



// adds

routes.post('/addadd',passport.authenticate('admin', { session: false }), addsCtrl.addAddAdmin);
routes.get('/addslist',passport.authenticate('admin', { session: false }), addsCtrl.addListAdmin);
routes.delete('/add/:id',passport.authenticate('admin', { session: false }), addsCtrl.deleteAddAdmin);
routes.put('/addedit/:id',passport.authenticate('admin', { session: false }), addsCtrl.addEditAdmin);
routes.put('/addstatusupdate',passport.authenticate('admin', { session: false }), addsCtrl.addStatusUpdteByAdmin);


//---New User--31-07-2020---------------------------------------------------------------------------

routes.post('/sign_up', appUsersCtrl.sign_up);
routes.get('/profile/:id',appUsersCtrl.profile);
routes.post('/userlogin',appUsersCtrl.login);
routes.post('/userlogout/:id', appUsersCtrl.logout);  
routes.get('/get_all_post/:id', appUsersCtrl.get_all_post);
routes.get('/post_detail/:id/:post_id',appUsersCtrl.post_detail);
routes.get('/other_app/:id', otherAppCtrl.other_app);
routes.post('/add_post/:id', postCtrl.add_post1);

routes.put('/edit_profile/:id',appUsersCtrl.edit_profile);

//------------------Forgot Password------------------------------------------------------------------------- ----

routes.put('/forgot-password',appUsersCtrl.forgotPassword);
routes.get('/reset-password/:resetLink',appUsersCtrl.resetPassword);

routes.post('/reset-password/:resetLink',appUsersCtrl.setpasswordResponsemail);

//---Email Verification---------------------------------------------------------------------------------------------------
routes.post('/sendOtp',appUsersCtrl.sendOtp);
routes.post('/emailVerification',appUsersCtrl.emailVerification);


//-----Feed category-------------------------------------------
routes.get('/community_feed_category_list',feedsCtrl.getAllFeeds);
routes.get('/community_feed_post/:id',feedsCtrl.getAllComments);



//-------------------------Group-----------------------------------------------------

routes.get('/get_all_groups', groupCtrl.get_all_groups); 
routes.get('/get_group_messages/:groupId',groupCtrl.get_group_messages);

//--
routes.post('/add_social_links',addsCtrl.add_social_links);



//----------------robots---------------------------------------------------
routes.get('/get_all_robots/:id',appUsersCtrl.get_all_robots);

routes.get('/get_all_plc/:id',appUsersCtrl.get_all_plc);

//----------------notification----------------------------
routes.get('/notification_listing/:id',addsCtrl.notification);

//-----------------S_login--------------------
routes.post('/socialLogin',appUsersCtrl.socialLogin);

//----------------socketio-------------------------------------------
routes.get('/testings',socketFunction.get_typing_list);



//---------------------social link
routes.post('/social_links/:id',appUsersCtrl.add_social_url);


//----------------All Robot list--------------------------

routes.get('/all_robots',appUsersCtrl.get_all_robots_admin);

//-----------All PLC list---------------------------------------
routes.get('/all_plc',appUsersCtrl.get_all_plc_admin);
//---------General List--------------------------------
routes.get('/all_general',appUsersCtrl.get_all_general_admin);

//----------------Feed Data-----------------------------------------------------------------

routes.post('/add_feed/:id', postCtrl.add_feed);





module.exports = routes;