const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const appusers = db.models.appusers;
const reportedTable = db.models.reportedfeed;
const feedsTable =  db.models.feed;

const groupaccessTable = db.models.groupaccess;
const groups = db.models.groups;

const likeDeslikeTable = db.models.feedlikedeslike
const feedCommentTable = db.models.feedcomment;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const responseHelper = require('../helpers/responseHelper');
const hashPassword = require('../helpers/hashPassword');
const fs = require('fs');


appusers.hasMany(groupaccessTable, { foreignKey: 'userId'});

groupaccessTable.belongsTo(groups, { foreignKey: 'groupId'});

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
                       console.log(e);
                    return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
                }
            },

 appUserListAdmin: async (req, res) => {
         try {
                const users = await appusers.findAll({
                   attributes: ['id', 'name','email','dob','status', 'image','about','work','occupation','company','experience','additional','hireAvailable','location','country','createdAt','updatedAt'],
                   order :   [
                   ['id', 'DESC']
                   ],

                   include: [
                        {
                          model: groupaccessTable,
                          attributes: ['id','userId','groupId','status','createdAt','updatedAt'],
                          include: [
                            {
                              model: groups,
                              attributes: ['id','name','category','image','status','createdAt','updatedAt'],
                            }
                          ]
                        }
                      ]
                
          });
                
            if (users) {
               
                 return apiResponseHelper.post(res, true, 'users list',users);
                } else {
                    return apiResponseHelper.post(res, true, 'users list',{});
        }
           } catch (e) {

            console.log(e);
              
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



