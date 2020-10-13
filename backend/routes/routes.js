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
routes.post('/logout', passport.authenticate('admin', { session: false }), adminAuthCtrl.logout);
routes.get('/user', passport.authenticate('admin', { session: false }), adminAuthCtrl.viewUser);
routes.put('/updateuser', passport.authenticate('admin', { session: false }), adminAuthCtrl.updateUser);

routes.get('/dashboarddata', passport.authenticate('admin', { session: false }), feedsCtrl.getDashBoardData);



routes.post('/adduser', passport.authenticate('admin', { session: false }), appUsersCtrl.addUserByAdmin);
routes.get('/appusers', passport.authenticate('admin', { session: false }), appUsersCtrl.appUserListAdmin);
routes.delete('/appusers/:id', passport.authenticate('admin', { session: false }), appUsersCtrl.deleteAppUserByAdmin);
routes.put('/statusupdate', passport.authenticate('admin', { session: false }), appUsersCtrl.userStatusUpdteByAdmin);

routes.put('/statusupdate1', appUsersCtrl.userStatusUpdteByAdmin);

routes.delete('/appusers1/:id', appUsersCtrl.deleteAppUserByAdmin);


// groups

routes.post('/addgroup', passport.authenticate('admin', { session: false }), groupCtrl.addGroupByAdmin);
routes.get('/grouplist', passport.authenticate('admin', { session: false }), groupCtrl.groupListAdmin);
routes.delete('/group/:id', passport.authenticate('admin', { session: false }), groupCtrl.deleteGroupByAdmin);
routes.put('/groupedit/:id', passport.authenticate('admin', { session: false }), groupCtrl.groupEditByAdmin);
routes.put('/groupstatusupdate', passport.authenticate('admin', { session: false }), groupCtrl.groupStatusUpdteByAdmin);


//feeds category 

routes.post('/addfeedscategory', passport.authenticate('admin', { session: false }), feedCatCtrl.addFeedsCategoryAdmin);
routes.get('/feedscategorylist', passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryListAdmin);
routes.delete('/feedscategory/:id', passport.authenticate('admin', { session: false }), feedCatCtrl.deleteFeedsCategoryAdmin);
routes.put('/feedscategoryedit/:id', passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryEditAdmin);
routes.put('/feedsCategorystatusupdate', passport.authenticate('admin', { session: false }), feedCatCtrl.feedsCategoryStatusUpdteByAdmin);

//----------------------Testing
//routes.put('/feedscategoryedit1/:id', feedCatCtrl.feedsCategoryEditAdmin);

routes.put('/feedsCategorystatusupdate1', feedCatCtrl.feedsCategoryStatusUpdteByAdmin);


//otherAppCtrl 

routes.post('/addapp', passport.authenticate('admin', { session: false }), otherAppCtrl.addAppByAdmin);
routes.get('/applist', passport.authenticate('admin', { session: false }), otherAppCtrl.appListAdmin);
routes.delete('/app/:id', passport.authenticate('admin', { session: false }), otherAppCtrl.deleteAppAdmin);
routes.put('/appedit/:id', passport.authenticate('admin', { session: false }), otherAppCtrl.appEditAdmin);

//crm pages


routes.post('/addpage', passport.authenticate('admin', { session: false }), crmPagesCtrl.addPageAdmin);
routes.get('/pageslist', passport.authenticate('admin', { session: false }), crmPagesCtrl.pageListAdmin);
routes.delete('/page/:id', passport.authenticate('admin', { session: false }), crmPagesCtrl.deletePageAdmin);
routes.put('/pageedit/:id', passport.authenticate('admin', { session: false }), crmPagesCtrl.pageEditAdmin);


//feeds  controller

//routes.post('/addpage',passport.authenticate('admin', { session: false }), crmPagesCtrl.addPageAdmin);
routes.get('/reportedfeeds', passport.authenticate('admin', { session: false }), feedsCtrl.getAllreportedFeeds);
routes.put('/feedstatuschange', passport.authenticate('admin', { session: false }), feedsCtrl.updateFeedStatus);
routes.get('/allfeeds', passport.authenticate('admin', { session: false }), feedsCtrl.getAllFeeds);
routes.get('/allcomments/:id', passport.authenticate('admin', { session: false }), feedsCtrl.getAllComments);
routes.get('/allikes/:id', passport.authenticate('admin', { session: false }), feedsCtrl.getAllLikes);
routes.get('/feedreporterlist/:id', passport.authenticate('admin', { session: false }), feedsCtrl.feedReporterList);

routes.put('/commentstatusupdate', passport.authenticate('admin', { session: false }), feedsCtrl.updateCommentStatus);




//routes.delete('/page/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.deletePageAdmin);
//routes.put('/pageedit/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.pageEditAdmin);


//post

routes.post('/addpost', passport.authenticate('admin', { session: false }), postCtrl.addPostAdmin);
routes.get('/postlist', passport.authenticate('admin', { session: false }), postCtrl.postListAdmin);
routes.delete('/post/:id', passport.authenticate('admin', { session: false }), postCtrl.deletePostAdmin);
routes.put('/postedit/:id', passport.authenticate('admin', { session: false }), postCtrl.postEditAdmin);
routes.put('/poststatusupdate', passport.authenticate('admin', { session: false }), postCtrl.postStatusUpdteByAdmin);



// adds

routes.post('/addadd', passport.authenticate('admin', { session: false }), addsCtrl.addAddAdmin);
routes.get('/addslist', passport.authenticate('admin', { session: false }), addsCtrl.addListAdmin);
routes.delete('/add/:id', passport.authenticate('admin', { session: false }), addsCtrl.deleteAddAdmin);
routes.put('/addedit/:id', passport.authenticate('admin', { session: false }), addsCtrl.addEditAdmin);
routes.put('/addstatusupdate', passport.authenticate('admin', { session: false }), addsCtrl.addStatusUpdteByAdmin);


//---New User--31-07-2020---------------------------------------------------------------------------
routes.post('/sign_up', appUsersCtrl.sign_up_data);
//routes.post('/sign_up', appUsersCtrl.sign_up);//Testing
routes.get('/profile/:id', appUsersCtrl.profile);
routes.post('/userlogin', appUsersCtrl.login);
routes.post('/userlogout/:id', appUsersCtrl.logout);
//routes.get('/get_all_post/:id', appUsersCtrl.get_all_post);// issue
routes.get('/get_all_post', appUsersCtrl.get_all_post)
//routes.get('/post_detail/:id/:post_id',appUsersCtrl.post_detail);// issue
routes.get('/post_detail/:id', appUsersCtrl.post_detail);
routes.get('/other_app/:id', otherAppCtrl.other_app);
//routes.post('/add_post/:id', postCtrl.add_post1);

routes.put('/edit_profile/:id', appUsersCtrl.edit_profile);


//----------------------------------------
routes.put('/forgot-password', appUsersCtrl.forgotPassword);
routes.get('/reset-password/:resetLink', appUsersCtrl.resetPassword);

routes.post('/reset-password/:resetLink', appUsersCtrl.setpasswordResponsemail);

//---Email Verification---------------------------------------------------------------------------------------------------
routes.post('/sendOtp', appUsersCtrl.sendOtp);
routes.post('/emailVerification', appUsersCtrl.emailVerification);


//-----Feed category-------------------------------------------
//routes.get('/community_feed_category_list',feedsCtrl.getAllFeeds);
//routes.get('/community_feed_post/:id',feedsCtrl.getAllComments);



//-------------------------Group-----------------------------------------------------

routes.get('/get_all_groups', groupCtrl.get_all_groups);
routes.get('/get_group_messages/:groupId', groupCtrl.get_group_messages);

//--
routes.post('/add_social_links', addsCtrl.add_social_links);



//----------------robots---------------------------------------------------
//routes.get('/get_all_robots/:id',appUsersCtrl.get_all_robots);

//routes.get('/get_all_plc/:id',appUsersCtrl.get_all_plc);

//----------------notification----------------------------
routes.get('/notification_listing/:id', addsCtrl.notification);

//-----------------S_login-------------------- socialLogin_final
routes.post('/socialLogin', appUsersCtrl.socialLogin);//old

//routes.post('/socialLogin',appUsersCtrl.socialLogin_final);

//----------------socketio-------------------------------------------
//routes.get('/testings',socketFunction.get_typing_list);



//---------------------social link
routes.post('/social_links/:id', appUsersCtrl.add_social_url);


//----------------All Robot list--------------------------

//routes.get('/all_robots',appUsersCtrl.get_all_robots_admin);
//routes.get('/all_plc',appUsersCtrl.get_all_plc_admin);
//routes.get('/all_general',appUsersCtrl.get_all_general_admin);

//----------------Feed Data New-----------------------------------------------------------------
//--------------New Data------------------------




//------------------------Feed category-------------------------------------------No neeed


//routes.get('/allikes_list/:id', feedsCtrl.getAllLikes_List);
//routes.get('/allcomments_list/:id', feedsCtrl.getAllComments_list);

//routes.post('/addlike_dislike/:id')


//-----------------------28-08-2020--------------------------Correct----

routes.get('/all_robots_list', appUsersCtrl.get_all_robots_admim_list);

routes.get('/robots_list/:id', appUsersCtrl.get_all_robots_admim_list1); //new 24-09-2020

routes.get('/all_plc_list', appUsersCtrl.get_all_plc_admin_list);

routes.get('/plc_list/:id', appUsersCtrl.get_all_plc_admin_list1);//new api

routes.get('/all_general_list', appUsersCtrl.get_all_general_admin_list);

//-------------------------31-08-2020-------------------------need---

routes.get('/all_robots_list/:id', appUsersCtrl.get_user_robots);
routes.get('/all_plc_list/:id', appUsersCtrl.get_user_plc);

routes.get('/all_adds', appUsersCtrl.all_add_list);



//----------------------------Feed Module----------------------------------------------------------  
routes.post('/add_feed/:id', postCtrl.add_feed);
routes.get('/all_feed_catg', appUsersCtrl.all_feed_cat_list);
routes.get('/community_feed_category_list/:id', feedsCtrl.getAllFeeds_data);

routes.get('/community_feed_wise_list/:title/:id', feedsCtrl.get_cat_data);

//-----------------Profile data-----------------------------
//routes.get('/community_id_wise_list/:feed_id',feedsCtrl.get_id_data);
//--------------Comment data---------------------------------------

//routes.get('/community_comment_list/:feed_id',feedsCtrl.get_coment_data);

//-----------------------Feed Like Or Deslike-------------------------------

// routes.post('/feed_like_deslike/:id/:feed_id',feedsCtrl.like_deslike);
routes.post('/feed_like_deslike/:id/:feed_id', feedsCtrl.like_dislike_new);



//--------------------------Feed Details Id Wise------------------------------------

routes.get('/community_feed_details/:feed_id/:id', feedsCtrl.community_feed_details);



//-----------------------------10-09-2020-------------------------------------
routes.post('/feed_comment/:id/:feed_id', feedsCtrl.feed_comment_data);

// routes.post('/comment_like_deslike/:id/:commentId',feedsCtrl.comment_like_deslike);
routes.post('/comment_like_deslike/:id/:commentId', feedsCtrl.comment_like_deslike_new);


//-----------------------------11-09-2020-------------------------------------------------search Community Feed Post 

routes.post('/delete_post', feedsCtrl.delete_post);

routes.post('/delete_comment', feedsCtrl.delete_comment);

routes.post('/edit_post', feedsCtrl.edit_post);

routes.post('/search_feed', feedsCtrl.search_feed);


//-------------------------15-09-2020--------------------------------------------------------------------------Additional API required
routes.post('/general_profile_edit/:id', appUsersCtrl.general_profile_edit);

routes.post('/Work_profile/:id', appUsersCtrl.Work_profile);

routes.post('/additional_profile/:id', appUsersCtrl.additional_profile);


//--------------------------------17-09-2020---------------------------------------------------

//routes.get('/GetChat',socketFunction.GetChat);

//-----------------------------------21-09-2020------------------------------------------------------------

routes.get('/notification_list/:id', feedsCtrl.userlist);
routes.post('/readSingleNotification', feedsCtrl.readSingleNotification);
routes.post('/readAllNotifications', feedsCtrl.readAllNotifications);
routes.post('/clearAllNotifications', feedsCtrl.clearAllNotifications);

//routes.get('/massagelist/:id',feedsCtrl.massagelist2);

routes.get('/massagelist/:id', feedsCtrl.massageDataliist);


//--------------------------------29-09-2020--------------------------------------------------

routes.post('/massage_count_user', feedsCtrl.massagelist_count);
routes.post('/massageCountUser', feedsCtrl.massageCountUser);


routes.post('/notification_count_user', feedsCtrl.notificationcountdata);

















module.exports = routes;