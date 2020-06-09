const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const appusers = db.models.appusers;
const reportedTable = db.models.reportedfeed;
const feedsTable =  db.models.feed;

const likeDeslikeTable = db.models.feedlikedeslike
const feedCommentTable = db.models.feedcomment;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const responseHelper = require('../helpers/responseHelper');
const hashPassword = require('../helpers/hashPassword');
const fs = require('fs');

module.exports = {

  addUserByAdmin: async (req, res) => {
    
                try {
                    const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
                    if (uploadFile) {
                        const users = await appusers.findOne({
                            where: {
                                email: req.body.email
                            }
                        });
                        if (!users) {
                            const data = req.body;
                            data.image = uploadFile[0].imageName;
                            data.status = '1'
                            data.dateCreated = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
                            const pswd = await hashPassword.generatePass(req.body.password);
                            data.password = pswd;
                            const addSponser = await appusers.create(data);
                            if (addSponser) {
                                  
                                    return apiResponseHelper.post(res, true, 'Users Added Successfully!', {});
                            } else {
                                   return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                            }
                        } else {
                            fs.unlinkSync(uploadFile[0].imageName);
                           
                            return apiResponseHelper.onError(res, false, 'Exists', 'Users With same email Already Exists');
                        
                        }
                    }
                    else {
                        return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                           
                    }
        
                } catch (e) {
        
                    return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
                }
            },

 appUserListAdmin: async (req, res) => {
         try {
                const users = await appusers.findAll({
                   attributes: ['id', 'name','email','dob','status', 'image','about','work','additional','location','country','createdAt','updatedAt'],
                      raw:true,
                  order :   [
                        ['id', 'DESC']
                 ]
                
          });
                
            if (users) {
               
                 return apiResponseHelper.post(res, true, 'users list',users);
                } else {
                    return apiResponseHelper.post(res, true, 'users list',{});
        }
           } catch (e) {
              
            return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
           }
 },




deleteAppUserByAdmin: async (req, res) => {
            try {
                const users = await appusers.findOne({
                    attributes: ['id','image'],
                    where: {
                        id: req.params.id
                    }
                    
                });




                if (users) {
    
                    const allReports = await reportedTable.findAll({
                        attributes: ['id'],
                        where: {
                            userId: req.params.id
                        }
                        ,raw:true
                    })
                    
                    if(allReports.length>0){
                    
                    const deleteReports = await reportedTable.destroy({
                        where: {
                            userId: req.params.id
                        }
                    })
                   }




                const allFeeds = await feedsTable.findAll({
                    attributes: ['id'],
                    where: {
                        userId: req.params.id
                    }
                    ,raw:true
                })
                
                if(allFeeds.length>0){
                
                const deleteFeeds = await feedsTable.destroy({
                    where: {
                        userId: req.params.id
                    }
                })
               }

            
             




               const alllikedeslike = await likeDeslikeTable.findAll({
                attributes: ['id'],
                where: {
                    userId: req.params.id
                }
                ,raw:true
            })
            
            if(alllikedeslike.length>0){
            
            const deletelikedislike = await likeDeslikeTable.destroy({
                where: {
                    userId: req.params.id
                }
            })
           }
                       const allcomment = await feedCommentTable.findAll({
                        attributes: ['id'],
                        where: {
                            userId: req.params.id
                        }
                        ,raw:true
                    })
                    
                    if(allcomment.length>0){
                    
                    const deletecmments = await feedCommentTable.destroy({
                        where: {
                            userId: req.params.id
                        }
                    })
                }


                const deleteUser = await appusers.destroy({

                    where: {
                        id: req.params.id
                    }
                })


                    if (deleteUser) {
                        fs.unlinkSync(users.dataValues.image);
                    return apiResponseHelper.post(res, true, 'Users Successfully Deleted!',{});
    
                    } else {
                       return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
        
                    }
                } else {
                    return apiResponseHelper.onError(res, false, 'Users Not Exists', 'Something Went Wrong.Please Try Again');
                
    
                }
            } catch (e) {
                console.log(e);
                return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
            }
        },




    userStatusUpdteByAdmin : async (req, res) => {

      try {

       
        req.checkBody('userId', 'userId required').notEmpty();
        req.checkBody('status', 'status required').notEmpty();

        const error = req.validationErrors();

        if (error) {
           return apiResponseHelper.onError(res, false, 'Error', error[0].msg);
             
          }
         
          const user = await appusers.findOne({
                 attributes: ['id', 'name','email', 'status'],
                    where: {
                      id: req.body.userId,
                    },
                    raw:true
         });
          
         if (user) {
          const updateEntry =    await appusers.update(
                {
                status:req.body.status,
                
              },
                {
                    where: {
                    id: req.body.userId,

                    }
                });  
        if (updateEntry) {
          return apiResponseHelper.post(res, true, 'Status updated Successfully!',{});
        } else {
         
            return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again!',{});
        }
      }else{
        return apiResponseHelper.onError(res, false, 'Users Not Exists', {});
      }

      }
      catch (e) {
        return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!', {});
         }

    }
,

 }










// const config = require('config');
// const db = require('../db/db');
// const fs = require('fs');
// const common = require('../helpers/common');
// const responseHelper = require('../helpers/responseHelper');
// const apiResponseHelper = require('../helpers/apiResponseHelper');
// const filesUpload = require('../helpers/uploadFiles').uploadFile;
// const Users = db.models.appUsers;
// //const groupUsers = db.models.groupUsers;
// const hashPassword = require('../helpers/hashPassword');
// const AppUsersData = db.models.appUsersData;
// let Sequelize = require('sequelize');
// const jwt = require('jsonwebtoken');
// const Categories = db.models.categories;
// const mailer = require('../helpers/mailer');
// const Contents = db.models.contents; 
// const groupUsers = db.models.groupUsers;
// const groupAcess = db.models.accessRequest;
// const randomstring = require("randomstring");
// const forgotPass = db.models.forgotPassword;
// const groupMessageTable =  db.models.groupMessages;
// const personalMessageTable = db.models.messages;
// const chatConstantTable = db.models.chatConstants;
// const userqueries = db.models.userqueries;
// const developConfig = require('../config/development')



// // const Users = db.models.users;
// AppUsersData.belongsTo(Users, { foreignKey: 'userId' });
// groupAcess.belongsTo(Categories, { foreignKey: 'userId'})
// groupAcess.belongsTo(Users, { foreignKey: 'userId'})
// userqueries.belongsTo(Users, { foreignKey: 'userId'})

// module.exports = {
//     //////============================= add Users Function ===============================//////
//     add: async (req, res) => {
//         try {
//             const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
//             if (uploadFile) {
//                 const users = await Users.findOne({
//                     where: {
//                         email: req.body.email
//                     }
//                 });
//                 if (!users) {
//                     console.log(req.body.groups);
//                     const data = {};
//                     data.name = req.body.name;
//                     data.email = req.body.email;
//                     data.phone = req.body.phone;
//                     data.image = uploadFile[0].imageName;
//                     data.groups = req.body.groups;
//                     data.deviceToken=req.body.deviceToken;
//                     data.devicetype=req.body.devicetype;
//                     if(req.body.authkey!="" || req.body.authkey!=null){
//                       data.authkey=req.body.authkey;
                    
//                     }else{
//                       data.authkey="";
//                     }
           
//                     if(req.body.p256dh!="" || req.body.p256dh!=null){
//                       data.p256dh=req.body.p256dh;
                   
//                     }else{
//                       data.p256dh="";
//                     }
//                     data.dateCreated = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
//                     const pswd = await hashPassword.generatePass(req.body.password);
//                     data.password = pswd;
//                     const addSponser = await Users.create(data);
//                     if (addSponser) {
//                         let groupsInfo = []
//                         if(req.body.groups!=""){
//                            groupsInfo = req.body.groups.split(',');
//                         }
//                         let groupsData=[];
//                         if(groupsInfo.length>0){
//                             groupsInfo.forEach(item =>{
//                                 let groupObj = {};
//                                 groupObj.userId = addSponser.dataValues.id;
//                                 groupObj.groupId = item;
//                                 groupObj.requestStatus = '2';
//                                 groupObj.created = parseInt(Date.now()/1000);
//                                 groupObj.updated = parseInt(Date.now()/1000);
//                                 groupsData.push(groupObj);
//                             })
//                          const gaveAccess = await groupAcess.bulkCreate(groupsData);
//                          if(gaveAccess){
//                             responseHelper.post(res, 'Added', 'Users Added Successfully');
//                          }
//                          }else{
//                             responseHelper.post(res, 'Added', 'Users Added Successfully');
//                         }

//                     } else {
//                         responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
//                     }
//                 } else {
//                     fs.unlinkSync(uploadFile[0].imageName);
//                     responseHelper.post(res, 'Exists', 'Users With same email Already Exists');
//                 }
//             }
//             else {
//                 responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
//             }

//         } catch (e) {

//             return responseHelper.onError(res, 'Error', e);
//         }
//     },


//     statusUpdte : async (req, res) => {

//       try {

//         console.log(req.body);
//         req.checkBody('userId', 'userId required').notEmpty();
//         req.checkBody('status', 'status required').notEmpty();

//         const error = req.validationErrors();

//         if (error) {
//            responseHelper.onError(res, 'Error', error[0].msg);
//            return;
//           }
         
//           const user = await Users.findOne({
//                  attributes: ['id', 'name','email', 'status'],
//                     where: {
//                       id: req.body.userId,
//                     },
//                     raw:true
//          });
          
//          if (user) {
//           const updateEntry =    await Users.update(
//                 {
//                 status:req.body.status,
                
//               },
//                 {
//                     where: {
//                     id: req.body.userId,

//                     }
//                 });  

//                 let subject="";
//                 let content = "";
//                 const  from = "admin@Hilitemd.com";
//                 const to = user.email;
//                 if(req.body.status=="0"){
//                   subject = "Hilitemd - Account deactivate.";
//                   content ="<p>Your account has been deactivated by admin, please contact admin.</p><p>Thanks</p><p>Admin-HiliteMD</p>"

//                 }else  if(req.body.status=="1"){

//                   subject = "Hilitemd - Account activated.";
//                   content ="<p>Your account has been activated by admin, please login to mobile app or website.</p><p>Thanks</p><p>Admin-HiliteMD</p>"

//                 }  

//               //  const  subject = "Hilitemd - Account Registration.";
//                 content = `<p>Hi ${user.name},`+ content;
//                 attachments = "";
//                 mailer.sendMail(from, to, subject, content, attachments);      


         

       
//         if (updateEntry) {
//             responseHelper.post(res, 'Updated', 'Status updated Successfully!');
//         } else {
//             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again!')
//         }
//       }

//       }
//       catch (e) {
//             return responseHelper.onError(res, 'Error', e);
//          }

//     }
// ,


//    //============App Logins ==================//

// //    apiLogin: async (req, res) => {
// //     try {
// //       req.checkBody('email', 'email is required in body').notEmpty();
// //       req.checkBody('password', 'password is required in body').notEmpty();
// //       req.checkBody('deviceToken', 'device token is required in body').notEmpty();
// //       req.checkBody('deviceType', 'device type is required in body').notEmpty();
      
// //       const error = req.validationErrors();

// //       if (error) {
// //         responseHelper.onError(res, '', error[0].msg);
// //         return;
// //       }

// //       const password = req.body.password;
// //       const email = req.body.email;

// //       const user = await Users.findOne({
// //         attributes: ['id', 'email', 'password', 'phone', 'image', 'name'],
// //         where: {
// //           email: email,
// //         }
// //       });
    
     
// //       if (user) {
// //         // await Users.update({
// //         //   deviceToken: req.body.deviceToken,
// //         //   deviceType: req.body.deviceType,
// //         // }, {
// //         //   where: {
// //         //     email: email
// //         //   }
// //         // });

// //         const getUser = user.toJSON();
// //         const match = await hashPassword.comparePass(password, getUser.password);

// //         // compare pwd
// //         if (!match) {
// //           return responseHelper.onError(res, {}, 'Invalid Password');
// //         }

// //         const credentials = {
// //           id: getUser.id,
// //           email: getUser.email,
// //         };
        
// //         const token = common.createToken(credentials);
// //         getUser.token = token.token;
// //         getUser.refreshToken = token.refreshToken;
// //         delete getUser.password;
// //         return responseHelper.post(res, 'User Found', getUser);
// //       }

// //       return responseHelper.onError(res, {}, 'User Not Found');
// //     } catch (e) {
// //       return responseHelper.onError(res, 'Error', e);
// //     }
// //   },

//   // 
//   /// new login 
    
//   apiLogin: async (req, res) => {
//     try {
//         req.checkBody('email', 'email is required in body').notEmpty();
//         req.checkBody('password', 'password is required in body').notEmpty();
//         req.checkBody('deviceToken', 'device token is required in body').notEmpty();
//         req.checkBody('deviceType', 'device type is required in body').notEmpty();
        
//         const error = req.validationErrors();
//         var  authkey="";
//         var p256dh="";
        
//         const password = req.body.password;
//         const email = req.body.email;
     
//         if (error) {
//           responseHelper.onError(res, '', error[0].msg);
//           return;
//         }
//         const user = await Users.findOne({
//         attributes: ['id', 'email', 'password', 'phone', 'image', 'name','status'],
//         where: {
//           email: email,
//         }
//       });
       
      
//       if (user) {
//         const getUser = user.toJSON();
       
//         if(getUser.status==1){
//         const match = await hashPassword.comparePass(password, getUser.password);
         
//         if (!match) {
//           return apiResponseHelper.onError(res, false, 'Invalid Password', {});
//         }    


//         const credentials = {
//           id: getUser.id,
//           // password: getUser.password,
//           email: getUser.email,
//           time: (new Date()).getTime()
//         };

//         const token = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256'});

//         getUser.token = token;
//         // remove password,email and roleId from response
//         delete getUser.password;
//        // delete getUser.email;
//         delete getUser.roleId;
        
//          if(req.body.authkey!="" || req.body.authkey!=null){
//            authkey=req.body.authkey;
         
//          }

//          if(req.body.p256dh!="" || req.body.p256dh!=null){
//           p256dh=req.body.p256dh;
        
//         }
         
//            const deviceTokenUpdate = await Users.update(
//             {
//              deviceToken:req.body.deviceToken,
//              deviceType:req.body.deviceType,
//              authkey:authkey,
//              p256dh:p256dh,
//            },
//              {
//                  where: {
//                  email: req.body.email,

//                 }
//             });  
    
//         if(deviceTokenUpdate){
//             return apiResponseHelper.post(res, true, 'User Detail', getUser);
//         }else{
//             return apiResponseHelper.post(res, true, 'User Detail', getUser);
//         }
//       }else{
//         return apiResponseHelper.onError(res, false, 'Account not activated, please contact to adminstrator.', {});
//       }
//       }
//       return apiResponseHelper.onError(res, false, 'Invalid User', {});
//     } catch (e) {
//       console.log('Error => ', e);
//       return apiResponseHelper.onError(res, false, 'Error', e);
//     }
//   },


//   apiSignUp: async (req, res) => {
//       const data = req.body;
//       try {
       
//            const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
//             if (uploadFile) {
//                 const users = await Users.findOne({
//                 where: {
//                     email: req.body.email
//                 }
//             });
//             if (!users) {
//                 const data = {};
//                 data.name = req.body.name;
//                 data.status = 0;
//                 data.email = req.body.email;
//                 data.phone = req.body.phone;
//                 data.image = uploadFile[0].imageName;
//                 data.deviceToken =req.body.deviceToken;
//                 data.deviceType=req.body.deviceType;

//                 if(req.body.authkey!="" || req.body.authkey!=null){
//                   data.authkey=req.body.authkey;
                
//                 }else{
//                   data.authkey="";
//                 }
       
//                 if(req.body.p256dh!="" || req.body.p256dh!=null){
//                   data.p256dh=req.body.p256dh;
               
//                 }else{
//                   data.p256dh="";
//                 }

//                 data.dateCreated = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
//                 const pswd = await hashPassword.generatePass(req.body.password);
//                 data.password = pswd;
//                 const users = await Users.create(data);

//                 if (users) {
//                     // const userId = users.dataValues.id;
//                     // data.userId = userId;
//                     // const credentials = {
//                     //   id: userId,
//                     //   email: users.dataValues.email
//                     // };
//                     // const token = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256' });
//                     // const userdetails = {};
//                     // userdetails.email = users.dataValues.email;
//                     // userdetails.token = token;
//                     // userdetails.id = userId;
//                     // userdetails.image = uploadFile[0].imageName;
//                     // userdetails.name = data.name;
//                     // userdetails.phone = data.phone;
//                     // return apiResponseHelper.post(res, true,'Success', userdetails);
//                     const  from = "admin@Hilitemd.com";
//                     const to = req.body.email;
//                     const  subject = "Hilitemd - Account Registration.";
//                     let  content = `<p>Hi ${req.body.name}, </p><p>Thanks a lot for registration with hiliteMd, admin will review your account activiation request.</p><p>Thanks</p><p>Admin-HiliteMD</p>`;
//                     attachments = "";
//                     mailer.sendMail(from, to, subject, content, attachments);
//                     return apiResponseHelper.post(res, true,'You have been successfully register with hiliteMd, please check your email for further instructions', {});
                   
//                 }
    
//             } else {
//                 fs.unlinkSync(uploadFile[0].imageName);
//                 apiResponseHelper.onError(res, false, 'Users With same email Already Exists',{});
//             }
//         }
//         else {
//             apiResponseHelper.onError(res,false, 'Something Went Wrong.Please Try Again', {});
//         }

//     } catch (e) {

//         return apiResponseHelper.onError(res, false, 'Error', e);
//     }
// },


//   apiGroupsList: async (req, res) => {
//     try {
//       const category = await Categories.findAll({
//         attributes: ['id', 'status', 'name', 'image', 'updatedAt'],
//         raw: true
//       });
//       if (category) {
//         responseHelper.get(res, 'Groups list', category)
//       } else {
//         responseHelper.get(res, 'Groups list', {})
//       }
//     } catch (e) {
//       return responseHelper.onError(res, 'Something Went Wrong.Please Try Again', {});
//     }
//   },





//     //////============================= view Sponsers Function ===============================//////


//     view: async (req, res) => {
//         try {
//             const users = await Users.findAll({

//                 attributes: ['id', 'email'], where: {
//                     id: {
//                         $ne: 1
//                     }
//                 }
//             });
//             if (users) {
//                 responseHelper.get(res, 'users list', users)
//             } else {
//                 responseHelper.get(res, 'users list', [])
//             }
//         } catch (e) {
//             console.log(e)
//             return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
//         }
//     },
//     //////============================= get specific Users Function ===============================//////
//     viewById: async (req, res) => {
//         try {
//             const catId = req.params.id;
//             const users = await Users.findByPk(catId,
//                 {
//                     attributes: ['id', 'email'], where: {
//                         id: {
//                             $ne: 1
//                         }
//                     }
//                 }
//             );
//             if (users) {
//                 responseHelper.get(res, 'users Detail', users)
//             } else {
//                 responseHelper.onError(res, 'users Detail', 'Invalid users Id')
//             }
//         } catch (e) {
//             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
//         }
//     },
//     //////============================= update Users Status Function ===============================//////
//     status: async (req, res) => {
//         try {
//             req.checkBody('id', 'Users id is required').notEmpty();
//             req.checkBody('status', 'status is required').notEmpty();
//             req.checkBody('id', 'Users id should be integer').isInt();
//             const error = req.validationErrors();
//             if (error) {
//                 responseHelper.onError(res, 'Error', error[0].msg);
//                 return;
//             }
//             const data = req.body;
//             data.status = data.status;

//             const catStatus = await Users.update(
//                 data,
//                 {
//                     where: {
//                         id: data.id
//                         // id: {
//                         //     [Op.ne]: 1
//                         //   }
//                     }
//                 });
//             if (catStatus) {
//                 responseHelper.put(res, 'Status', 'Successfully Updated!')
//             } else {
//                 responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again!')
//             }
//         } catch (e) {
//             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again!');
//         }
//     },

//     //////============================= update Users  Function ===============================//////
//     // update: async (req, res) => {
//     //     try {

//     //         const uploadFile = await filesUpload(req, res, [{ name: 'image' }, { name: 'thumb' }], config.userFilePath);
//     //         if (uploadFile) {
//     //             const data = {};
//     //             data.email = req.body.email;
//     //             if(req.body.password){
//     //                 const pswd = await hashPassword.generatePass(req.body.password);
//     //                 data.password = pswd;
//     //             }
//     //                //if pwd chnaged 
//     //                if(req.body.roleId){
//     //                 const roleId = await hashPassword.generatePass(req.body.roleId);
//     //                 data.roleId = roleId;

//     //             }
//     //                 data.addedBy = common.userId(req.token);
//     //                 data.userName =  req.body.userName;
//     //             if (req.body.imagechnaged == "yes") {
//     //                 data.image = uploadFile[0].imageName;
//     //                 const users = await Users.findOne({
//     //                     attributes: ['image'],
//     //                     where: {
//     //                         id: req.body.id
//     //                     }
//     //                 });
//     //                 if (users) {
//     //                     fs.unlinkSync(users.dataValues.image);
//     //                 }
//     //             }
//     //             else {
//     //             }
//     //             data.addedBy = common.userId(req.token);

//     //             if (uploadFile === true) {
//     //             }
//     //             else {
//     //             }
//     //             const updateSponser = await Users.update(
//     //                 data,
//     //                 {
//     //                     where: {
//     //                         id: req.body.id
//     //                     }
//     //                 });
//     //             if (updateSponser) {
//     //                 responseHelper.post(res, 'Updated', 'Users Updated Successfully');
//     //             } else {
//     //                 responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
//     //             }
//     //         }
//     //         else {
//     //             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
//     //         }

//     //     } catch (e) {
//     //         if (e.errors[0].message === 'Users must be unique') {
//     //             responseHelper.onError(res, 'Error', 'Users with same name already exists');
//     //             return;
//     //         }
//     //         responseHelper.onError(res, 'Error', e.errors[0].message);
//     //     }
//     // },

//     //////=================================== delete Users Function ====================================//////

//     delete: async (req, res) => {
//         try {
//             const users = await Users.findOne({
//                 attributes: ['image'],
//                 where: {
//                     id: req.params.id
//                 }
//             });
//             if (users) {

//            const inqueryFound = await  userqueries.findAll({
//                 attributes: ['id'],
//                 where: {
//                   userId: req.params.id
//                 }
//              })

//            if(inqueryFound){       
//             const deleteQueries =  userqueries.destroy({ where: { 
//               userId: req.params.id 
//             }})
//           }
         
   

//           const inqueryAccessRequest = await  groupAcess.findAll({
//             attributes: ['id'],
//             where: {
//               userId: req.params.id
//             }
//          })

//            if(inqueryAccessRequest){
//             const accessRequest =  groupAcess.destroy({ where: { 
//               userId: req.params.id 
//             }})
//            }  


//            const inqueryForgot = await  forgotPass.findAll({
//             attributes: ['id'],
//             where: {
//               userId: req.params.id
//             }
//          })


//            if(inqueryForgot){
//             const forgotPasswordRequest = await forgotPass.destroy({ where: { 
//               userId: req.params.id 
//             }})
//            }  



//            const inqueryGroupChat = await  groupMessageTable.findAll({
//             attributes: ['id'],
//             where: {
//               senderId: req.params.id
//             }
//          })
              


//            if(inqueryGroupChat){
//             const groupMessageRequest =  groupMessageTable.destroy({ where: { 
//               senderId: req.params.id 
//             }})

//           }


//            const inqueryPersonalChat = personalMessageTable.findAll({

//             where: { 
//               $or: [
//                    {'senderId': req.params.id },
//                    {'receiverId': req.params.id }
//                 ]
//               }

//            });


//            if(inqueryPersonalChat){

//             const deletePersonalChat = personalMessageTable.destroy({
//                where: { 
//                 $or: [
//                      {'senderId': req.params.id },
//                      {'receiverId': req.params.id }
//                   ]
//                 }
//              })
//             }
        

//             const inqueryChatConstant = chatConstantTable.findAll({

//               where: { 
//                 $or: [
//                      {'senderId': req.params.id },
//                      {'receiverId': req.params.id }
//                   ]
//                 }
  
//              });



//             if(inqueryChatConstant){
//              const deleteChatConstant = chatConstantTable.destroy({
//               where: { 
//                $or: [
//                     {'senderId': req.params.id },
//                     {'receiverId': req.params.id }
//                  ]
//                }
//             })
//           }  

         
//                 const deleteSponser = await Users.destroy({
//                     where: {
//                         id: req.params.id
//                     }
//                 })
//                 if (deleteSponser) {
//                     fs.unlinkSync(users.dataValues.image);
//                     responseHelper.del(res, 'Deleted', 'Users Successfully Deleted!');

//                 } else {
//                     responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');

//                 }
//             } else {
//                 responseHelper.onError(res, 'Error', 'Users Not Exists');

//             }
//         } catch (e) {
//              console.log(e);
//             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');

//         }
//     },

//     email: async (req, res) => {
//         try {
//             const users = await Users.findOne({
//                 attributes: ['email'],
//                 where: {
//                     email: req.params.email
//                 }
//             });
//             if (users) {

//                 responseHelper.get(res, 'Status', 'Email already exists');


//             } else {
//                 responseHelper.get(res, 'Success', 'Valid email');

//             }
//         } catch (e) {
//             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');

//         }
//     },
//     uName: async (req, res) => {
//         try {
//             const users = await Users.findOne({
//                 attributes: ['userName'],
//                 where: {
//                     userName: req.params.uName
//                 }
//             });
//             if (users) {

//                 responseHelper.get(res, 'Status', 'userName already exists');


//             } else {
//                 responseHelper.get(res, 'Success', 'Valid userName');

//             }
//         } catch (e) {
//             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');

//         }
//     },
//     // ---------------------------------------------------------------
//     usersToday: async (req, res) => {
//         var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
//         // console.log(new Date(utc,YYYY));
//         // var res = utc.replace("T", " ");
//         var startDate = "";
//         var endDate = "";
//         try {
//             const users = await Users.findAndCountAll({
//                 where: {
//                     dateCreated: utc
//                     //  {
//                     //     $between: [startDate, endDate]
//                     // }
//                 }
//             })
//             if (users) {
//                 responseHelper.get(res, 'Success', users);


//             } else {
//                 responseHelper.get(res, 'Error', 'No Count');

//             }
//         } catch (e) {
//             console.log(e)
//             responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');

//         }
//     },
//     // =================================== get the list of last five users============================================
//     getUsersList: async (req, res) => {
//         try {
//             const users = await Users.findAll({
//                  attributes: ['id', 'name','email','status', 'image', 'groups','timeStamp','dateCreated'],
//                  raw:true,
//                  order :   [
//                   ['id', 'DESC']
//               ]

//             });

//             const groupAccessData = await groupAcess.findAll({
//                 attributes: ['userId', 'groupId','requestStatus'],
//                 include: [
//                     {
//                       model: Categories,
//                       attributes: ['name','image','id'],
//                       required: true
//                     },
//                   ],
//                 raw:true             

//             });
             
//             users.forEach(element=>{
//                    element.groups=[];
//                     groupAccessData.forEach(item=>{
//                         if(element.id==item.userId){
//                            let obj = {};
//                            obj.id  =  item['category.id'];                           
//                            obj.name  =  item['category.name'];
//                            obj.image  = item['category.image']
//                            element.groups.push(obj);

//                         }
//                     })
//                     return element
//              })

//             if (users) {
//                 responseHelper.get(res, 'users list', users)
//             } else {
//                 responseHelper.get(res, 'users list', {})
//             }
//         } catch (e) {
//             //console.log(e)
//             //throw e
//             return responseHelper.onError(res, 'Error',e);
//         }
//     },
//     usersByDate: async (req, res) => {
//         try {
//             var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
//             var today = new Date()
//             var priorDate = new Date().setDate(today.getDate() - 30)
//             var prevdate = new Date(priorDate).toJSON().slice(0, 10).replace(/-/g, '-');
//             const users = await Users.findAll({
//                 // Select count(`dateCreated`) as counted_leads, `dateCreated` as count_date from appUsers WHERE `dateCreated` BETWEEN '2019-03-13' AND '2019-04-8 ' group by `dateCreated`
//                 // SELECT `dateCreated`, `dateCreated` FROM `appUsers` AS `appUsers` WHERE `appUsers`.`dateCreated` BETWEEN '2019-03-13' AND '2019-04-12' GROUP BY `dateCreated`
//                 attributes: ['dateCreated', [Sequelize.fn('COUNT', Sequelize.col('dateCreated')), 'counted_leads']],
//                 where: {
//                     dateCreated: {
//                         $between: [prevdate, utc]
//                     }
//                 },
//                 group: Sequelize.literal(`dateCreated`),
//             });
//             if (users) {
//                 responseHelper.get(res, 'users list', users)
//             } else {
//                 responseHelper.get(res, 'users list', [])
//             }
//         } catch (e) {
//             console.log(e)
//             return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
//         }
//     },


//     apiChangePassword: async (req, res) => {
//         try {
//           req.checkBody('oldPassword', 'password is required').notEmpty();
//           req.checkBody('newPassword', 'new password is required').notEmpty();
//           const error = req.validationErrors();
//          if (error) {
//             responseHelper.onError(res, false,'', error[0].msg);
//             return;
//           }
//           const userId = req.user.id;
//           const data = req.body;
//           const user = await Users.findOne({
//             where: {
//               id: userId
//             }
//           });
//           if (user) {
//             const getUser = user.toJSON();

//             console.log(getUser);
//             const match = await hashPassword.comparePass(data.oldPassword, getUser.password);
//             if (match) {
//               const pswd = await hashPassword.generatePass(data.newPassword);
//               const changePassword = await Users.update(
//                 {
//                   password: pswd
//                 }, {
//                   where: {
//                     id: userId
//                   }
//                 }
//               );
//               if(changePassword){
//                 return apiResponseHelper.post(res,true,'password changed successfully',{});
//               }
               
//             } else {
//                 return apiResponseHelper.onError(res, false, 'your old password did not matched','your old password did not matched');
//             }
//           } else {
//             return aetpiResponseHelper.onError(res, false, 'User not exists');
//           }
//         } catch (e) {
//           console.log(e);
//           return apiResponseHelper.onError(res,false, 'Error', 'Something Went Wrong');
//         }
//       },  


//       apiForgetPassword: async (req, res) => {
//         try {
//           const data = req.body;
//           req.checkBody('email', 'email is required').notEmpty();
//           const error = req.validationErrors();
    
//           if (error) {
//             return apiResponseHelper.onError(res, false, '', error[0].msg);
//           }
    
//           const user = await Users.findOne({
//             attributes: ['id', 'email','name','status'],
//             where: {
//               email: data.email,
//             },
//             raw:true,
//           });
    
//           if (!user) {
//             return apiResponseHelper.onError(res,false, 'Email Does Not Exists', 'Account Does Not Exists');
//           }
//           // Send Email
         
                    
//           if(user.status==0){
//              return apiResponseHelper.onError(res, false, 'Account not activated, please contact to adminstrator.', {});
            
//            }
   
         
//          const randomStr  =  randomstring.generate();
//          const  entry={}
//          entry.userId = user.id;
//          entry.token = randomStr;
        
//          const found = await forgotPass.findOne({
//             attributes: ['id', 'userId','token'],
//             where: {
//               userId: user.id,
//             },
//             raw:true,
//           })
            

//         if(found){
//             const updateEntry  = await forgotPass.update({ token: randomStr }, {
//                 where: {
//                     userId: user.id
//                 }
//             })

//             if(updateEntry){
//                 const  from = "admin@Hilitemd.com";
//                 const to = data.email;
//                 const  subject = "Hilitemd Forget Password";
//                 let  content = `<p>Hi, ${user.name}</p><p> Click on the <a href=${developConfig.baseUrl}changepassword.html?token=${randomStr}>link</a> to reset your password</p>`;
//                 attachments = "";
//                 mailer.sendMail(from, to, subject, content, attachments);
//                 return apiResponseHelper.post(res,true, 'success', 'Reset Password  instructions  Sent to Email');
//             }
       
//         }else{    

//          const addEntry  = await forgotPass.create(entry);
//          if(addEntry){
//          const  from = "admin@Hilitemd.com";
//           const to = data.email;
//           const  subject = "Hilitemd Forget Password";
//           let  content = `<p>Hello, ${user.name}</p><p> Click on the <a href=${developConfig.baseUrl}/changepassword.html?token=${randomStr}>link</a> to reset your password</p>`;
//           attachments = "";
//           mailer.sendMail(from, to, subject, content, attachments);
//           return apiResponseHelper.post(res,true, 'success', 'Reset Password  instructions  Sent to Email');
//         }

//      }
//         } catch (e) {
//           console.log(e);
//           return apiResponseHelper.onError(res,false, 'Error', e);
//         }
//       },


//       apiAboutUs: async (req, res) => {
//         try {
//               const about_us = await Contents.findOne({
//                 attributes : ['title','description','slug','createdAt'],
//                   where: {
//                       id : 1
//                   },
//               });
//               if(!about_us){
//                  return apiResponseHelper.Error(res,false, 'About us data not found',[]);
//               }
//               return apiResponseHelper.get(res,true, 'About us data',about_us);
          
//         } catch (err) {
//             return apiResponseHelper.onError(res, false, err, 'Error in getting about us data');
//         }
//        },
//        apiPrivacyPolicy: async (req, res) => {
//         try {
            
//               const privacy_policy = await Contents.findOne({
//                 attributes : ['title','description','slug','createdAt'],
//                   where: {
//                       id : 3
//                   },
//               });
//               if(!privacy_policy){
//                  return apiResponseHelper.Error(res, {}, 'Privacy policy data not found');
//               }
//               return apiResponseHelper.get(res, privacy_policy , 'Privacy policy data');
//         } catch (err) {
//             return apiResponseHelper.onError(res, err, 'Error in getting privacy policy data');
//         }
//        },
//        apiTermsAndConditions: async (req, res) => {
//         try {
//               const terms_and_conditions = await Contents.findOne({
//                 attributes : ['title','description','slug','createdAt'],
//                   where: {
//                       id : 2
//                   },
//               });
//               if(!terms_and_conditions){
//                  return apiResponseHelper.Error(res, false, {}, 'Terms and Conditions data not found');
//               }
//               return apiResponseHelper.get(res, true, terms_and_conditions , 'Terms and Conditions data');
//           } catch (err) {
//             return apiResponseHelper.onError(res, false, err, 'Error in getting Terms and Conditions data');
//           }
//        },

//        apiPages: async (req, res) => {
//         try {
//               console.log(req.params.id);
//               const terms_and_conditions = await Contents.findOne({
//                 attributes : ['title','description','slug','createdAt'],
//                   where: {
//                       id : req.params.id,
//                   },
//               });
//               if(!terms_and_conditions){
//                  return apiResponseHelper.Error(res, false,'Data not found', {});
//               }
//               return apiResponseHelper.get(res, true, 'Pages data received' ,terms_and_conditions);
//           } catch (err) {
//             return apiResponseHelper.onError(res, false, err, {});
//           }
//        },

//        apiGroupAccessRequest: async (req, res) => {
//         try {
//             req.checkBody('groupId', 'groupId is required').notEmpty();
//             const error = req.validationErrors();
      
//             if (error) {
//               return apiResponseHelper.onError(res, false, '', error[0].msg);
//             }
                  
//               const category = await Categories.findOne({
//                where : {
//                    id:req.body.groupId
//                }
//               });

//               if(category){

//                const findRequest = await groupAcess.findOne({
//                     where : {
//                         userId:req.user.id,
//                         groupId:req.body.groupId
//                     },
//                     raw:true
//                    });

//                 console.log(findRequest);
                
//                if(!findRequest){
//                 let groupObj = {};
//                 groupObj.userId = req.user.id;
//                 groupObj.groupId = req.body.groupId;
//                 groupObj.requestStatus = '1';
//                 groupObj.created = parseInt(Date.now()/1000);
//                 groupObj.updated = parseInt(Date.now()/1000);
//                 const createGroupAccessRequest = await groupAcess.create(groupObj);
//                 if (createGroupAccessRequest) {
//                     return apiResponseHelper.get(res, true, "Your request has been sent to the admin. Manager will be assigned to you soon." ,[]);
//                 }

//                }else{
//                      return apiResponseHelper.get(res, false, "Access request already sent for this group",[]);
//                }    



//               }else{
//                 return apiResponseHelper.get(res, false, "Group is not available" , []);

//               }
//            } 
//            catch (err) {
//             return apiResponseHelper.onError(res, false,'Error in submitting your request', err);
//           }
//        }, 



//   apiLogout: async (req, res) => {
//         try {


//           const user = await Users.findOne({
//             attributes: ['id', 'email', 'phone', 'image', 'name'],
//              where: {
//                id: req.user.id
//              },
//              raw:true
//          }); 

//         if(user){
//           const logout = await Users.update({ deviceToken: '' }, {
//             where: {
//                 id: req.user.id
//             }
//           });

//           if (logout) {
//             return apiResponseHelper.get(res, true, 'logout sucessfull', {})
//           }

//         }else{
//           return apiResponseHelper.get(res, true, 'logout sucessfull', {})

//         }

//         } catch (e) {
//           return apiResponseHelper.onError(res,false, e, 'Error while logout');
//         }
//       },


//       apiUpdateProfile: async (req, res) => {
//         try {
//                 const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
//                 if (uploadFile) {
//                     req.checkBody('name', 'name is required').notEmpty();
//                     req.checkBody('phone', 'phpne required').isInt();
//                     const error = req.validationErrors();
//                      if (error) {
//                         apiResponseHelper.onError(res,false,"Error", error[0].msg);
//                         return;
//                      }
                     
//                       const user = await Users.findOne({
//                         attributes: ['id', 'email', 'phone', 'image', 'name'],
//                          where: {
//                            id: req.user.id
//                          }
//                      }); 
             
//                      if(user){
//                     console.log("inside file update",uploadFile);
                  
//                     let data={}
//                     if(req.body.imagePresent=='0'){
//                         data = {  
//                             name: req.body.name,
//                             phone:req.body.phone
//                         };
                        
//                     }else{
//                         data = {  
//                             name: req.body.name,
//                             phone:req.body.phone,
//                             image :uploadFile[0].imageName
//                         };
//                     }
                    
//                     const updateProfile = await Users.update(
//                         data,
//                         {
//                         where: {
//                             id: req.user.id
//                         }
//                       });


//                       const credentials = {
//                         id: user.id,
//                         email: user.email
//                       };
              
//                       if(updateProfile){
//                         let userObj = new Object();
//                         userObj.id = req.user.id;  
//                         userObj.email = user.email;
//                         userObj.name = req.body.name;
//                         userObj.phone = req.body.phone;
                      
//                         if(req.body.imagePresent=='1'){
//                             userObj.image = uploadFile[0].imageName
//                         }else{
//                             userObj.image = user.image
//                         }
//                         userObj.token = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256'});
//                         //const getUser = user.toJSON(); 
                      
//                         return apiResponseHelper.get(res, true, 'Profile update sucessfully',userObj)
//                     }else{
//                         return apiResponseHelper.get(res, false, 'Profile update failed',{})

//                     }
//                 }else{
//                     return apiResponseHelper.onError(res,false, "error", 'User not found');

//                 }
//              }else{
//           return apiResponseHelper.onError(res,false, e, 'Error while updating profile');
                
//              }
//                 } catch (e) {
//           return apiResponseHelper.onError(res,false, e, 'Error while updating profile');
//         }
//       }, 


//       changeUserPassword : async (req, res) => {
//         try {
             
//               console.log(req.body.token);
//             // req.checkBody('password', 'password is required').notEmpty();
//             // req.checkBody('token', 'token required').notEmpty();
//             // const error = req.validationErrors();
//             //  if (error) {
//             //     apiResponseHelper.onError(res,false,"Error", error[0].msg);
//             //     return;
//             //  }
//              const findUser  = await forgotPass.findOne( {
//                 attributes: ['id', 'userId'], 
//                 where: {
//                     token: req.body.token
//                 },
//                 raw:true,
//             })
            

//             if(findUser){
//                 const pswd = await hashPassword.generatePass(req.body.password);
//                 const changePassword = await Users.update(
//                   {
//                     password: pswd
//                   }, {
//                     where: {
//                       id: findUser.userId
//                     }
//                   }
//                 );
//                 if(changePassword){
//                     const updateEntry  = await forgotPass.update({ token: "it was done" }, {
//                         where: {
//                             userId: findUser.userId
//                         }
//                     })
//                   return apiResponseHelper.post(res,'success', 'password changed successfully');
//                 }

//             }else{
//                 return apiResponseHelper.post(res,'Invalid or expired link', "Invalid or expired link");
//             }

           
//         }catch{
//             return apiResponseHelper.post(res,'Error', 'somthing went wrong please try again');
//         }   
//     },
    
//     apiContactUs : async (req, res) => {
//         try {
            
//              req.checkBody('message', 'message required').notEmpty();
//              const error = req.validationErrors();
//               if (error) {
//                  apiResponseHelper.onError(res,false,"Error", error[0].msg);
//                  return;
//               }
         
            
//               const findUser = await Users.findOne({
//                 attributes: ['id', 'email',  'name'],
//                 where: {
//                   email: req.user.email,
//                 }
//                 ,
//                 raw:true
//               });

//               if(findUser){
//               var obj = {}
//               obj.userId =  req.user.id;
//               obj.message =  req.body.message;
//               const sendUserMsg = await userqueries.create(obj);

//               console.log(sendUserMsg);

//               if(sendUserMsg){

//                 return apiResponseHelper.post(res, true, 'Success',"Your message has been successfully send to administrator")
//               }else{

//               }
             
//             }else{
//                 return apiResponseHelper.post(res, false, 'Error',"Unable to find the User")
//          }
           
//         }catch (e){
//             return apiResponseHelper.post(res, false, 'Error',e)
//     }    
//     }
   
//      ,

//     getContactUs : async (req, res) => {
//         try {
//             const contactUsData = await userqueries.findAll({
//                 attributes: ['id', 'message',],
//                 include: [
//                     {
//                       model: Users,
//                       attributes: ['name','image'],
//                       required: true
//                     },
//                   ],
//                 raw: true,
//               });

//             if(contactUsData){  
//             responseHelper.post(res, 'Success', contactUsData);
//             }
//             else{
//                 responseHelper.post(res, 'error', 'Unable to find any contact request');
//             } 
//         }
//         catch (e){
//             return apiResponseHelper.post(res, false, 'Error',e)
//       }    
//     },
    
//     deleteContactUsMsg : async (req, res) =>{

//      // console.log("pp",req.params.id);

//       try {
//         const usersMsg = await userqueries.findOne({
//           where: {
//               id: req.params.id
//           }
//         });
        
//         if(usersMsg){

//         const deleteMsg = await userqueries.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })

//         if(deleteMsg){
//           responseHelper.post(res, 'Message has been deleted', {});
//         }

//         }else{

//           responseHelper.post(res, 'error', 'Unable to find such message');

//         }
//     }
//     catch (e){
//       return responseHelper.post(res,'Error',e)
//        }    
    
//   },

//   updateWebPush :  async (req, res) =>{
//           try {
//                 const user = await Users.findOne({
//                  attributes: ['id', 'email', 'password', 'phone', 'image', 'name','deviceToken','authkey','p256dh'],
//                  where: {
//                   id: req.user.id,
//                 }
//          });

//       if(user){
        
//         const updateEntry  = await Users.update({ deviceToken: req.body.deviceToken,authkey:req.body.authkey, p256dh:req.body.p256dh}, {
//           where: {
//               id: req.user.id
//           }
//       })

//        if(updateEntry){
//         return apiResponseHelper.post(res, true, 'Success',"data updted successfully")
         
//        }else{
//         return apiResponseHelper.post(res, false, 'Error',"Unable to update the User")
//        }

//       }else{
//         return apiResponseHelper.post(res, false, 'Error',"User not found ")
//       }
     
//   }


//       catch (e){
//         return apiResponseHelper.post(res, false, 'Error',e)
//      }  

//     }  


// }