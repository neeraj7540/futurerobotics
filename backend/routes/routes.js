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

routes.post('/addfeedscategory',passport.authenticate('admin', { session: false }), crmPagesCtrl.addPageAdmin);
routes.get('/feedscategorylist',passport.authenticate('admin', { session: false }), crmPagesCtrl.pageListAdmin);
routes.delete('/feedscategory/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.deletePageAdmin);
routes.put('/feedscategoryedit/:id',passport.authenticate('admin', { session: false }), crmPagesCtrl.pageEditAdmin);



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





/*
  Post Routes
*/
// routes.post('/bandos', passport.authenticate('jwt', { session: false }), bandosCtrl.add);

// routes.post('/category', passport.authenticate('admin', { session: false }), catCtrl.add);

// routes.post('/adduser', passport.authenticate('admin', { session: false }), usersCtrl.add);




// /*
//   Get Routes
// */
// routes.get('/bandos/:id', passport.authenticate('admin', { session: false }), bandosCtrl.viewById);
// routes.get('/bandos', passport.authenticate('jwt', { session: false }), bandosCtrl.view);
// routes.get('/todayappusers', passport.authenticate('admin', { session: false }), appUsersCtrl.usersToday);
// routes.get('/usersByDate', passport.authenticate('admin', { session: false }), appUsersCtrl.usersByDate);

// // api's by me

// routes.post('/addappuser',passport.authenticate('admin', { session: false }), appUsersCtrl.add);
// routes.post('/updateUserStatus',passport.authenticate('admin', { session: false }), appUsersCtrl.statusUpdte);
// routes.post('/userSignUp', appUsersCtrl.apiSignUp);
// routes.post('/userLogin', appUsersCtrl.apiLogin);
// routes.post('/contactUs',passport.authenticate('appUser', { session: false }), appUsersCtrl.apiContactUs);
// routes.get('/getContactUs',passport.authenticate('admin', { session: false }), appUsersCtrl.getContactUs);
// routes.put('/userPasswordUpdate', passport.authenticate('appUser', { session: false }),appUsersCtrl.apiChangePassword);
// routes.post('/userForgetPassword',appUsersCtrl.apiForgetPassword)
// routes.post('/userLogout',passport.authenticate('appUser', { session: false }), appUsersCtrl.apiLogout);
// routes.post('/updateProfile',passport.authenticate('appUser', { session: false }), appUsersCtrl.apiUpdateProfile);
// routes.get('/aboutUs',passport.authenticate('appUser', { session: false }),appUsersCtrl.apiAboutUs);
// routes.get('/privacyPolicy',passport.authenticate('appUser', { session: false }),appUsersCtrl.apiPrivacyPolicy)
// routes.get('/termsAndConditions',passport.authenticate('appUser', { session: false }),appUsersCtrl.apiTermsAndConditions);
// routes.get('/pages/:id',passport.authenticate('appUser', { session: false }),appUsersCtrl.apiPages)
// routes.post('/groupAccess', passport.authenticate('appUser', { session: false }), appUsersCtrl.apiGroupAccessRequest);
// routes.get('/groupsList', passport.authenticate('appUser', { session: false }), catCtrl.apiGroupsList);
// routes.get('/groupsDetails/:id', passport.authenticate('appUser', { session: false }), catCtrl.ApiGroupViewById);
// routes.get('/getRequestList', passport.authenticate('admin', { session: false }), requestCtrl.getRequestList);
// routes.post('/requestStatusUpdate', passport.authenticate('admin', { session: false }), requestCtrl.updateAccessRequest);
// routes.put('/updateUserGroupAccess', passport.authenticate('admin', { session: false }), requestCtrl.addUpdateUserGroups);
// routes.delete('/deleteContactUsMsg/:id',passport.authenticate('admin', { session: false }), appUsersCtrl.deleteContactUsMsg)
// routes.get('/userGoupsList/:id', passport.authenticate('admin', { session: false }), catCtrl.apiUserGroupsList);
// routes.post('/updateWebPushToken', passport.authenticate('appUser', { session: false }), appUsersCtrl.updateWebPush);


// routes.get('/getrole/:id', passport.authenticate('admin', { session: false }), authCtrl.role);
// routes.get('/getUserList', passport.authenticate('admin', { session: false }), usersCtrl.view);
// routes.get('/chaeckMail/:email', passport.authenticate('jwt', { session: false }), usersCtrl.email);
// routes.get('/chaeckUName/:uName', passport.authenticate('jwt', { session: false }), usersCtrl.uName);
// routes.get('/users/:id', passport.authenticate('admin', { session: false }), usersCtrl.viewById);
// routes.get('/categories', passport.authenticate('admin', { session: false }), catCtrl.view);
// routes.get('/getUsersList', passport.authenticate('admin', { session: false }), appUsersCtrl.getUsersList);
// routes.post('/changePassword',appUsersCtrl.changeUserPassword)
// routes.get('/category/:id', passport.authenticate('admin', { session: false }), catCtrl.viewById);
// routes.get('/categorystatus/:status', passport.authenticate('admin', { session: false }), catCtrl.viewByStatus);
// routes.get('/getEvents', passport.authenticate('jwt', { session: false }), eventCtrl.view);
// routes.get('/totalEvents', passport.authenticate('jwt', { session: false }), eventCtrl.totalevents);
// routes.get('/totalServices', passport.authenticate('jwt', { session: false }), serviceCtrl.totalServices);
// routes.get('/totalParties', passport.authenticate('jwt', { session: false }), partyCtrl.totalParties);

// routes.get('/viewEvent/:id', passport.authenticate('jwt', { session: false }), eventCtrl.viewById);
// routes.get('/getParties', passport.authenticate('jwt', { session: false }), partyCtrl.view);
// routes.get('/viewParty/:id', passport.authenticate('jwt', { session: false }), partyCtrl.viewById);
// routes.get('/getServices', passport.authenticate('jwt', { session: false }), serviceCtrl.view);
// routes.get('/viewServices/:id', passport.authenticate('jwt', { session: false }), serviceCtrl.viewById);
// routes.get('/getSponsers', passport.authenticate('jwt', { session: false }), sponserCtrl.view);
// routes.get('/viewSponsers/:id', passport.authenticate('jwt', { session: false }), sponserCtrl.viewById);
// routes.get('/totalSponsers', passport.authenticate('jwt', { session: false }), sponserCtrl.totalSponsers);

// routes.get('/getAds', passport.authenticate('jwt', { session: false }), adCtrl.view);
// routes.get('/viewAds/:id', passport.authenticate('jwt', { session: false }), adCtrl.viewById);
// routes.get('/getDeaths', passport.authenticate('jwt', { session: false }), deathCtrl.view);
// routes.get('/totalDeaths', passport.authenticate('jwt', { session: false }), deathCtrl.totalDeaths);

// routes.get('/viewDeaths/:id', passport.authenticate('jwt', { session: false }), deathCtrl.viewById);
// routes.get('/getPhones', passport.authenticate('jwt', { session: false }), phoneCtrl.view);
// routes.get('/viewPhones/:id', passport.authenticate('jwt', { session: false }), phoneCtrl.viewById);
// routes.get('/getFestivities', passport.authenticate('jwt', { session: false }), festivitiesCtrl.view);
// routes.get('/totalFestivities', passport.authenticate('jwt', { session: false }), festivitiesCtrl.totalFestivities);

// routes.get('/viewFestivities/:id', passport.authenticate('jwt', { session: false }), festivitiesCtrl.viewById);
// routes.get('/incidents', passport.authenticate('jwt', { session: false }), incidentsCtrl.view);
// routes.get('/incident/:id', passport.authenticate('jwt', { session: false }), incidentsCtrl.viewById);
// routes.get('/news', passport.authenticate('jwt', { session: false }), newsCtrl.view);
// routes.get('/news/:id', passport.authenticate('jwt', { session: false }), newsCtrl.viewById);
// routes.get('/todaynews', passport.authenticate('admin', { session: false }), newsCtrl.totalnews);

// routes.get('/gallery', passport.authenticate('jwt', { session: false }), galleryCtrl.view);
// routes.get('/gallery/:id', passport.authenticate('jwt', { session: false }), galleryCtrl.viewById);
// routes.get('/links', passport.authenticate('jwt', { session: false }), linksCtrl.view);
// routes.get('/links/:id', passport.authenticate('jwt', { session: false }), linksCtrl.viewById);

// routes.get('/cLinks', passport.authenticate('jwt', { session: false }), cLinksCtrl.view);
// routes.get('/cLinks/:id', passport.authenticate('jwt', { session: false }), cLinksCtrl.viewById);
// routes.get('/tourist', passport.authenticate('jwt', { session: false }), touristCtrl.view);
// routes.get('/tourist/:id', passport.authenticate('jwt', { session: false }), touristCtrl.viewById);
// routes.get('/pharmacy', passport.authenticate('jwt', { session: false }), pharmacyCtrl.view);
// routes.get('/pharmacy/:id', passport.authenticate('jwt', { session: false }), pharmacyCtrl.viewById);
// /*
//   Put Routes
// */
// routes.put('/categoryStatus', passport.authenticate('admin', { session: false }), catCtrl.status);
// routes.put('/category', passport.authenticate('admin', { session: false }), catCtrl.update);
// routes.put('/bandos', passport.authenticate('jwt', { session: false }), bandosCtrl.update);

// routes.put('/updateEvent', passport.authenticate('jwt', { session: false }), eventCtrl.update);
// routes.put('/eventStatus', passport.authenticate('jwt', { session: false }), eventCtrl.status);
// routes.put('/updateParty', passport.authenticate('jwt', { session: false }), partyCtrl.update);
// routes.put('/partyStatus', passport.authenticate('jwt', { session: false }), partyCtrl.status);
// routes.put('/updateService', passport.authenticate('jwt', { session: false }), serviceCtrl.update);
// routes.put('/serviceStatus', passport.authenticate('jwt', { session: false }), partyCtrl.status);
// routes.put('/updateSponser', passport.authenticate('jwt', { session: false }), sponserCtrl.update);
// routes.put('/sponserStatus', passport.authenticate('jwt', { session: false }), sponserCtrl.status);
// routes.put('/updateAd', passport.authenticate('jwt', { session: false }), adCtrl.update);
// routes.put('/updateDeath', passport.authenticate('jwt', { session: false }), deathCtrl.update);

// routes.put('/updatePhone', passport.authenticate('jwt', { session: false }), phoneCtrl.update);

// routes.put('/updateFestivities', passport.authenticate('jwt', { session: false }), festivitiesCtrl.update);
// routes.put('/festivitiesStatus', passport.authenticate('jwt', { session: false }), festivitiesCtrl.status);
// routes.put('/incidentStatus', passport.authenticate('jwt', { session: false }), incidentsCtrl.status);
// routes.put('/incident', passport.authenticate('jwt', { session: false }), incidentsCtrl.update);
// routes.put('/news', passport.authenticate('jwt', { session: false }), newsCtrl.update);
// routes.put('/gallery', passport.authenticate('jwt', { session: false }), galleryCtrl.update);
// routes.put('/links', passport.authenticate('jwt', { session: false }), linksCtrl.update);
// routes.put('/cLinks', passport.authenticate('jwt', { session: false }), cLinksCtrl.update);
// routes.put('/tourist', passport.authenticate('jwt', { session: false }), touristCtrl.update);
// routes.put('/pharmacy', passport.authenticate('jwt', { session: false }), pharmacyCtrl.update);
// routes.put('/users', passport.authenticate('admin', { session: false }), usersCtrl.update);


// routes.delete('/bandos/:id', passport.authenticate('jwt', { session: false }), bandosCtrl.delete);

// routes.delete('/category/:id', passport.authenticate('admin', { session: false }), catCtrl.delete);
// routes.delete('/event/:id', passport.authenticate('jwt', { session: false }), eventCtrl.delete);
// routes.delete('/party/:id', passport.authenticate('jwt', { session: false }), partyCtrl.delete);
// routes.delete('/service/:id', passport.authenticate('jwt', { session: false }), serviceCtrl.delete);
// routes.delete('/sponser/:id', passport.authenticate('jwt', { session: false }), sponserCtrl.delete);
// routes.delete('/ad/:id', passport.authenticate('jwt', { session: false }), adCtrl.delete);
// routes.delete('/death/:id', passport.authenticate('jwt', { session: false }), deathCtrl.delete);
// routes.delete('/phone/:id', passport.authenticate('jwt', { session: false }), phoneCtrl.delete);
// routes.delete('/festivities/:id', passport.authenticate('jwt', { session: false }), festivitiesCtrl.delete);
// routes.delete('/incident/:id', passport.authenticate('jwt', { session: false }), incidentsCtrl.delete);
// routes.delete('/news/:id', passport.authenticate('jwt', { session: false }), newsCtrl.delete);
// routes.delete('/gallery/:id', passport.authenticate('jwt', { session: false }), galleryCtrl.delete);
// routes.delete('/links/:id', passport.authenticate('jwt', { session: false }), linksCtrl.delete);
// routes.delete('/cLinks/:id', passport.authenticate('jwt', { session: false }), cLinksCtrl.delete);
// routes.delete('/tourist/:id', passport.authenticate('jwt', { session: false }), touristCtrl.delete);
// routes.delete('/pharmacy/:id', passport.authenticate('jwt', { session: false }), pharmacyCtrl.delete);
// routes.delete('/users/:id', passport.authenticate('admin', { session: false }), usersCtrl.delete);
// routes.delete('/appusers/:id', passport.authenticate('admin', { session: false }), appUsersCtrl.delete);

module.exports = routes;