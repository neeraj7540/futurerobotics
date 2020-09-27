const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const mail = require('../helpers/mailer');
const appusers = db.models.appusers;
const reportedTable = db.models.reportedfeed;
const feedsTable =  db.models.feed;
const postTable = db.models.post;
const addTable=db.models.ads;
console.log(addTable);
const robotList=db.models.robotlist;
const plcList=db.models.plclist;
const generalList=db.models.general;
const feedsCategory=db.models.feedscategory;
console.log(feedsCategory)

const commentLikedeslike=db.models.comment_likedeslike;

const groupaccessTable = db.models.groupaccess;
const groups = db.models.groups;
const jwt = require('jsonwebtoken');

const likeDeslikeTable = db.models.feedlikedeslike
const feedCommentTable = db.models.feedcomment;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const responseHelper = require('../helpers/responseHelper');
const hashPassword = require('../helpers/hashPassword');
const fs = require('fs');
const  path = require('path');
const nodeMailer = require('nodemailer');
var waterfall = require('async-waterfall');
const e = require('express');








appusers.hasMany(groupaccessTable, { foreignKey: 'userId'});

groupaccessTable.belongsTo(groups, { foreignKey: 'groupId'});

module.exports = {

  // addUserByAdmin: async (req, res) => {
    
  //               try {
  //                   const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
  //                   if (uploadFile) {
  //                       const users = await appusers.findOne({
  //                           where: {
  //                               email: req.body.email
  //                           }
  //                       });
  //                       if (!users) {
  //                           const data = req.body;
  //                           data.image =uploadFile[0].imageName;
  //                           data.status = '1'
  //                           data.dateCreated = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  //                           const pswd = await hashPassword.generatePass(req.body.password);
  //                           data.password = pswd;
  //                           data.emailStatus="Y"
  //                           const addSponser = await appusers.create(data);
  //                           if (addSponser) {
                                  
  //                                   return apiResponseHelper.post(res, true, 'Users Added Successfully!', {});
  //                           } else {
  //                                  return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
  //                           }
  //                       } else {
  //                           fs.unlinkSync(uploadFile[0].imageName);
                           
  //                           return apiResponseHelper.onError(res, false, 'Exists', 'Users With same email Already Exists');
                        
  //                       }
  //                   }
  //                   else {
  //                       return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                           
  //                   }
        
  //               } catch (e) {
  //                      console.log(e);
  //                   return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
  //               }
  //           },

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
                data.image = 'http://34.232.2.249:4100/'+uploadFile[0].imageName;
                data.status = '1'
                data.dateCreated = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
                const pswd = await hashPassword.generatePass(req.body.password);
                data.password = pswd;
                data.emailStatus="Y"
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

                //-----------------------------------------------------------
                const comment_like = await commentLikedeslike.findAll({
                  attributes: ['id'],
                  where: {
                    userId: req.params.id
                  }
                  ,raw:true
              })
              
              if(comment_like.length>0){
              
              const deletecmments = await commentLikedeslike.destroy({
                  where: {
                      userId: req.params.id
                  }
              })
          }


                //---------------------------------------------------------

                //commentLikedeslike

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
//----------------------Test=================================
const updateEntry1 =  await feedsTable.update(
  {
      status:req.body.status
  },
  
  {
      where: {
        userId: req.body.userId,

      }
  }); 

  const updateEntry2 =  await likeDeslikeTable.update(
    {
        status:req.body.status
    },
    
    {
        where: {
          userId: req.body.userId,
  
        }
    });

    const updateEntry3 =  await commentLikedeslike.update(
      {
          status:req.body.status
      },
      
      {
          where: {
            userId: req.body.userId,
    
          }
      });

      const updateEntry4 =  await feedCommentTable.update(
        {
            status:req.body.status
        },
        
        {
            where: {
              userId: req.body.userId,
      
            }
        });


  
  





//--------------------------------------------


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



//-----------------------------------31-07-2020-----------------------------------------------------

sign_up_data: async (req, res) => {
    
  try {

      req.checkBody('email', 'email is required in body').notEmpty();
      req.checkBody('password', 'password is required in body').notEmpty();

      const error = req.validationErrors();
      const password = req.body.password;
      const email = req.body.email;
  if (error) {
    
    return apiResponseHelper.onError(res, false, error[0].msg, {});
    
  }



      const item = await appusers.findOne({
          name:req.body.name,
          email:req.body.email,
         
          age:req.body.age,
          dob:req.body.dob,
          location:req.body.location,
          country:req.body.country,
         


              where: {
                  email: req.body.email,
                 }
          });


          if(item !==null){
            
            if(item.social_id.length>3){

              return apiResponseHelper.onError(res, false,  'This email is already registered with socialId', {});
}

}
     
if(item !==null){
          if(item.emailStatus !==0){
            if(item.emailStatus =='Y'){

              if(req.body.email){
                get_data = await appusers.findOne({
                  attributes: ['id','email'],
                  where: {
                    email: req.body.email,
                  }
                })
                if (get_data) {
                  return apiResponseHelper.onError(res, false,  'This email is already registered', {});
                }
              }
 }
 }
}


var udate= await appusers.findOne({
  attributes: ['id'],
  where: {
    email: req.body.email,
   
  }

 });

 

 if(udate){
  const pswd = await hashPassword.generatePass(req.body.password);
  const password = pswd;
  create_signup_user1 = await appusers.update({ 
    name:req.body.name,
    email:req.body.email,
   
    age:req.body.age,
    dob:req.body.dob,
    location:req.body.location,
    country:req.body.country,
    status:'1',
    password:password
},
  {
    where: {
  id:udate.id
 }
  });
  data = await appusers.findOne({
    attributes:['name','email','password','location','country','age','status'],
where: {
    id:udate.id
    }
  });
 return apiResponseHelper.post(res, true, 'Sign_up Successfully!',{data});
}
else{
  var today = new Date();
  const data = req.body;
       data.status = '1'
      
       const pswd = await hashPassword.generatePass(req.body.password);
                   data.password = pswd;
       const itemAdded = await appusers.create(data);
       if (itemAdded) {
             
               return apiResponseHelper.post(res, true, 'Sign_up Successfully!', {data});
       } else {
              return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
       }
}

            //   if (!item) {
        //   var today = new Date();
        //  const data = req.body;
        //       data.status = '1'
             
        //       const pswd = await hashPassword.generatePass(req.body.password);
        //                   data.password = pswd;
        //       const itemAdded = await appusers.create(data);
        //       if (itemAdded) {
                    
        //               return apiResponseHelper.post(res, true, 'Sign_up Successfully!', {data});
        //       } else {
        //              return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        //       }
        //   } else {
        //       return apiResponseHelper.onError(res, false,  'This email is already registered', {});
        //   }

  } catch (e) {

      console.log(e);

      return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
  
  }
},

















sign_up: async (req, res) => {
    
    try {

        req.checkBody('email', 'email is required in body').notEmpty();
        req.checkBody('password', 'password is required in body').notEmpty();

        const error = req.validationErrors();
        const password = req.body.password;
        const email = req.body.email;
    if (error) {
      
      return apiResponseHelper.onError(res, false, error[0].msg, {});
      
    }



        const item = await appusers.findOne({
            name:req.body.name,
            email:req.body.email,
           
            age:req.body.age,
            dob:req.body.dob,
            location:req.body.location,
            country:req.body.country,
           


                where: {
                    email: req.body.email,
                   }
            });


            



            if (!item) {
            var today = new Date();

       


                
                const data = req.body;
                data.status = '1'
               // data.joined_date=date;
                const pswd = await hashPassword.generatePass(req.body.password);
                            data.password = pswd;
                const itemAdded = await appusers.create(data);
                if (itemAdded) {
                      
                        return apiResponseHelper.post(res, true, 'Sign_up Successfully!', {data});
                } else {
                       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                }
            } else {
                return apiResponseHelper.onError(res, false,  'This email is already registered', {});
            }

    } catch (e) {

        console.log(e);

        return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
    
    }
},


profile: async (req, res) => {
    try {
        const id=req.params.id;


        const userDetails11 = await feedsTable.findAll({
           where:{
         userId: req.params.id,
         
        }
       })



        var sequelize=require('sequelize');
        const userDetails1 = await feedsTable.findAll({
         attributes: [[sequelize.fn('sum', sequelize.col('like')), 'total']],
       where:{
        userId: req.params.id,
        
       }
      })
if(userDetails1[0].dataValues.total !==null){
var feedcount1=userDetails1[0].dataValues.total

var feedcount2=parseInt(feedcount1)
}
else{
  var feedcount2=0
}

const userDetails2 = await feedCommentTable.findAll({
  attributes: [[sequelize.fn('sum', sequelize.col('like')), 'total']],
where:{
  userId: req.params.id,
}
})

if(userDetails2[0].dataValues.total !==null){
var coumentcount1=userDetails2[0].dataValues.total
var coumentcount2=parseInt(coumentcount1)


}
else{
  var coumentcount1=userDetails2[0].dataValues.total
  var coumentcount2=0
}

var total_like_count=feedcount2+coumentcount2

console.log(total_like_count)


const feeddeslike = await feedsTable.findAll({
  attributes: [[sequelize.fn('sum', sequelize.col('deslike')), 'total']],
where:{
 userId: req.params.id,
 
}
})
if(feeddeslike[0].dataValues.total !==null){
var feeddeslike1=feeddeslike[0].dataValues.total

var feeddesdeslike2=parseInt(feeddeslike1)
}
else{
var feeddesdeslike2=0
}


const feedcoment_deslike = await feedCommentTable.findAll({
  attributes: [[sequelize.fn('sum', sequelize.col('deslike')), 'total']],
where:{
  userId: req.params.id,
}
})

if(feedcoment_deslike[0].dataValues.total !==null){
var feedcoment_deslike1=feedcoment_deslike[0].dataValues.total
var feedcoment_deslike23=parseInt(feedcoment_deslike1)

}
else{
  var feedcoment_deslike23=0
}
        

var total_des_like=feeddesdeslike2+feedcoment_deslike23

console.log(total_des_like)
console.log(total_like_count)

const userDataUpdate=await appusers.update({
  like:total_like_count,
  deslike:total_des_like
},{
  where:{
    id:req.params.id
  }
}
)

const testdata = await appusers.findOne({
     where: {
    id: req.params.id,
  }
});

var finallike=testdata.dataValues.like
var finallike1=parseInt(finallike)

var finaldeslike=testdata.dataValues.deslike

var finaldeslike1=parseInt(finaldeslike)

var totallike=finallike1-finaldeslike1



if(totallike <0){

  var ranking='New User'
}

//console.log(ranking)
if(totallike ==0){

  var ranking='New User'
}

if (totallike >= 1 && totallike <= 10) {
  var ranking='Reular User'
}

if (totallike >= 11 && totallike <= 25) {
  var ranking='Junior member'
}

if (totallike >= 26 && totallike <= 50) {
  var ranking='Helping hand'
}

if (totallike >= 50 && totallike <= 100) {
  var ranking='Senior Member'
}

if (totallike >= 101 && totallike <= 200) {
  var ranking='Programmer'
}

if (totallike >= 201 && totallike <= 500) {
  var ranking='Senior Programmer'
}

if (totallike >= 501 && totallike <= 1000) {
  var ranking='PRO Programmer'
}

if (totallike >= 1001 && totallike <= 2500) {
  var ranking='Programming Expert'
}

if (totallike >= 2501 && totallike <= 5000) {
  var ranking='Programming Freak'
}

if (totallike >= 5001 && totallike <= 7500) {
  var ranking='Programming Veteran'
}

if (totallike >= 7501 && totallike <= 7500000000) {
  var ranking='Programming Master'
}

if(totallike <0){

  var totallike=0
}


const rankingupdate=await appusers.update({
  
  ranking_name:ranking,
  ranking:totallike
  //deslike:total_des_like
},{
  where:{
    id:req.params.id
  }
}
)


//console.log(ranking)





console.log(userDataUpdate)



      const userDetails = await appusers.findOne({
     
        attributes:['id','name','biodesc','image','age','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url','ranking_name','ranking'],


        where: {
          id: req.params.id,
        }
      });

   

      //-----------Test-----------------------------------------------
      // function  isJson(item) {
      //   item = typeof item !== "string" ? JSON.stringify(item) : item;
    
      //   try {
      //     item = JSON.parse(item);
      //   } catch (e) {
      //     return false;
      //   }
    
      //   if (typeof item === "object" && item !== null) {
      //     return true;
      //   }
    
      //   return false;
      // }

      // var sonu=isJson(userDetails.select_robots);

      var select_robots1=userDetails.select_robots
      if(select_robots1){
      var select_robots2=JSON.parse(select_robots1)
      }
      else{
        var select_robots2=[]
      }
     // console.log(test12345)

      var select_plc1=userDetails.select_plc
      if(select_plc1){
      var select_plc2=JSON.parse(select_plc1)
      }
      else{
        var select_plc2=[]
      }
     // console.log(test12345)

      var userdatas={
        "id" :userDetails.id,
        "name":userDetails.name,
        "biodesc":userDetails.biodesc,
        "image":userDetails.image,
        "age":userDetails.age,
        "location":userDetails.location,
        "country":userDetails.country,
        "joined_date":userDetails.joined_date,
        "occupation":userDetails.occupation,
        "company":userDetails.company,
        "experience":userDetails.experience,
        "hireAvailable":userDetails.hireAvailable,
        "select_robots":select_robots2,
        "select_plc":select_plc2,
        "about_me":userDetails.about_me,
        "facebook_url":userDetails.facebook_url,
        "linkedin_url":userDetails.linkedin_url,
        "instagram_url":userDetails.instagram_url,
        "ranking_name":userDetails.ranking_name,
        "ranking":userDetails.ranking




        
      }








  
      if (userDetails) {
      
        return apiResponseHelper.post(res, true, 'User Details', userdatas);
  
      }
      else {
        return apiResponseHelper.onError(res, false, 'Users Not Exists', 'Something Went Wrong.Please Try Again');
    

    }
    } catch (e) {
      return apiResponseHelper.onError(res, false, 'Error', e);
    }
  },

  logout: async (req, res) => {
    try {
      console.log(req);
      const id = req.params.id;
      const logout = await appusers.findOne({
        attributes: ['id', 'email', 'password', 'image', 'name'],
        where: {
          id: req.params.id,
        }
      });
  
      if (logout) {
      
        return apiResponseHelper.post(res, true, 'logout sucessfull', logout);
  
      }
      else {
        return apiResponseHelper.onError(res, false, 'Users Not Exists', 'Something Went Wrong.Please Try Again');
    

    }
    } catch (e) {
      return apiResponseHelper.onError(res, false, 'Error', e);
    }
  }
  ,


  login: async (req, res) => {

    try {
        req.checkBody('email', 'email is required in body').notEmpty();
        req.checkBody('password', 'password is required in body').notEmpty();

        const error = req.validationErrors();
        const password = req.body.password;
        const email = req.body.email;
        const device_type=req.body.device_type;
        const device_token=req.body.device_token;
        const social_type=req.body.social_type;
        const social_id=req.body.social_id;

    if (error) {
      
      return apiResponseHelper.onError(res, false, error[0].msg, {});
      
    }


        const user = await appusers.findOne({
            attributes: ['id', 'email', 'password', 'image', 'name','status','emailStatus'],
            where: {
              email: email,
            }
          });

         // console.log(user.status)
          if (user) {
            if(user.status==1){
              if(user.emailStatus=="Y"){
            const getUser = user.toJSON();
            console.log(getUser)
            const match = await hashPassword.comparePass(password, getUser.password);

              if (!match) {
                return apiResponseHelper.onError(res, false, 'Invalid Password', {});
              }    


              const credentials = {
                id: getUser.id,
                email: getUser.email,
                time: (new Date()).getTime()
              };
      
              const token = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256'});

              getUser.token = token;
             // delete getUser.password;
              delete getUser.role;

              const updateEntry =await appusers.update(
                {
               
                  device_type:req.body.device_type,
                  device_token:req.body.device_token,
                  social_type:req.body.social_type,
                  social_id:req.body.social_id
 },
                {
                    where: {
                    id:user.id,
    
                    }
                }); 




              return apiResponseHelper.post(res, true, 'Login successfully', getUser);
              }
              else{
                return apiResponseHelper.onError(res, false, 'Email Verification pending', {});

              }
              }
 else{
              return apiResponseHelper.onError(res, false, 'Your account is deactivated', {});
            }

          }else{
              return apiResponseHelper.onError(res, false, 'Invalid User', {});
          }
 
    }  

   catch (e) {
    console.log('Error => ', e);
    return apiResponseHelper.onError(res, false, 'Error', e);
  }

}    
,




get_all_post: async (req, res) => {
    try {
      //const id=req.params.id;
           const itemList = await postTable.findAll({
              attributes: ['id' ,'title','status','image','description','createdAt','updatedAt'],
                raw:true,
                 where:{
                  status:1
                 },
             order :   [
                   ['id', 'DESC']
            ]
           
     });
     //console.log(itemList);
           
       if (itemList) {
          
            return apiResponseHelper.post(res, true, 'Post list',itemList);
           } else {
               return apiResponseHelper.post(res, true, 'Post list',{});
   }
      } catch (e) {
         
       return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
           
      }
},


post_detail: async (req, res) => {
    try {
        const id=req.params.id;
        //const post_id=req.params.post_id;
           const itemList = await postTable.findOne({
             // attributes: ['id','post_id','title','status','image','description','createdAt','updatedAt'],
               // raw:true,
                 where: {
                    id: req.params.id,
                   // post_id:req.params.post_id,

                  }
           
     });
   // console.log(itemList);
   
           
      if (itemList) {
          
            return apiResponseHelper.post(res, true, 'Post list',itemList);
           } else {
               return apiResponseHelper.post(res, true, 'Post list',{});
   }
      } catch (e) {
         
       return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
           
      }
},


edit_profile : async (req, res) => {

  try {
    
      const user = await appusers.findOne({
        attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],

                where: {
                  id: req.params.id
                
                },
                raw:true
     });
     const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
     const data = req.body;
     data.image = uploadFile[0].imageName;
     var data1=data.image
     console.log(data1)

     if (req.body.name== "") {
      var name=user.name;
    }
    else{
      var name=req.body.name;
    }
    var userimage=user.image

    

  
   // console.log(userimage.length())biodesc
   if (req.body.biodesc== "") {
    var biodesc=user.biodesc;
  }
  else{
    var biodesc=req.body.biodesc;
  }
  var userimage=user.image



if (req.body.image== "") {
      var image=user.image;
    }
    
    else if(data1=="public/images/default/main.png"){
      var image=user.image
    }
    else{
      
      var image='http://34.232.2.249:4100/'+data1;
    }



 if (req.body.age== "") {
      var age=user.age;
    }
    else{
      var age=req.body.age;
    }
    if (req.body.dob== "") {
      var dob=user.dob;
    }
    else{
      var dob=req.body.dob;
    }
 if (req.body.location== "") {
      var location=user.location;
    }
    else{
      var location=req.body.location;
    }
 if (req.body.joined_date== "") {
      var joined_date=user.joined_date;
    }
    else{
      var joined_date=user.joined_date;
    }
 if (req.body.occupation== "") {
      var occupation=user.occupation;
    }
    else{
      var occupation=req.body.occupation;
    }
if (req.body.company== "") {
      var company=user.company;
    }
    else{
      var company=req.body.company;
    }
  if (req.body.experience== "") {
      var experience=user.experience;
    }
    else{
      var experience=req.body.experience;
    } if (req.body.hireAvailable== "") {
      var hireAvailable=user.hireAvailable;
    }
    else{
      var hireAvailable=req.body.hireAvailable;
    }

    var test12=req.body.select_robots.split(',');
    console.log(test12);

    var array = test12.map(function (el) {
      return el.trim();
    });

    console.log(array);

    var test123=JSON.stringify(array);

   
    console.log(test123)
     
 if (req.body.select_robots== "") {
      var select_robots=user.select_robots;
    //  var select_robots=test123;
      
    }
    else{
      var select_robots=test123;
    }

    var test123=req.body.select_plc.split(',');

    var array = test123.map(function (el) {
      return el.trim();
    });

    console.log(array);
    

    var test1234=JSON.stringify(array);
   

 if (req.body.select_plc== "") {
      var select_plc=user.select_plc;
    }
    else{
      var select_plc=test1234;
    }  if (req.body.about_me== "") {
      var about_me=user.about_me;
    }
    else{
      var about_me=req.body.about_me;
    }if (req.body.facebook_url== "") {
      var facebook_url=user.facebook_url;
    }
    else{
      var facebook_url=req.body.facebook_url;
    }
if (req.body.linkedin_url== "") {
      var linkedin_url=user.linkedin_url;
    }
    else{
      var linkedin_url=req.body.linkedin_url;
    }
if (req.body.instagram_url== "") {
      var instagram_url=user.instagram_url;
    }
    else{
      var instagram_url=req.body.instagram_url;
    }

if (req.body.country== "") {
      var country=user.country;
    }
    else{
      var country=req.body.country;
    }



      console.log(user.id);
     if (user) {
      const updateEntry =await appusers.update(
            {
         name:name,
         biodesc:biodesc,
         image:image,
         age:age,
         dob:dob,
          location:location,
          joined_date:joined_date,
          occupation:occupation,
          company:company,
          experience:experience,
          hireAvailable:hireAvailable,
          select_robots:select_robots,
          select_plc:select_plc,
          about_me:about_me,
          facebook_url:facebook_url,
          linkedin_url:linkedin_url,
          instagram_url:instagram_url,
          country:country
          

           },
            {
                where: {
                id:user.id,

                }
            });  
            const userdata1 = await appusers.findOne({
              attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],

                      where: {
                        id: user.id
                      
                      },
                     // raw:true
           });

            
    if (updateEntry) {
      return apiResponseHelper.post(res, true, 'Profile updated Successfully!',userdata1);
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

},




forgotPassword: async (req, res) => {

  try {
    req.checkBody('email', 'email is required in body').notEmpty();
       
        const error = req.validationErrors();
         const email = req.body.email;
    if (error) {
      return apiResponseHelper.onError(res, false, error[0].msg, {});
      
    }


     const user = await appusers.findOne({
             attributes: ['id', 'name','email', 'status','social_id'],
                where: {
                  email: req.body.email
                 },
              
     });
     console.log(user.social_id);
     if(user.social_id){
      return apiResponseHelper.onError(res, false,'Please use Social login', {});
     }
     else{
     
     const token=jwt.sign({_id:user._id},config.jwtToken,{expiresIn:'2m'});
     console.log(token);
     
     if (user) {
      const updateEntry =await appusers.update({resetLink:token,email_check:'Y'},
            {
                where: {
                id:user.id,

                }
            });  


            let transporter = nodeMailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                 user: 'yadavneerajsonu97@gmail.com',
                  pass: '7056330417'
              }
          });
          //  <p>${config.baseUrl}/resetpassword/${token} </p> 
          // <a href=' ${ config.baseUrl }+ 'reset/' + ${user.id }+ '/' + ${token }+ '">  ${ config.baseUrl }/api/reset-password/${token }</a>
          let mailOptions = {
            
            to: req.body.email,
            subject: 'Future Robotics Password Reset',
            body: '' ,
            html:`
      <h2>Please click on given link to reset your password </h2>
      You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>
      Please click on the following link, or paste this into your browser to complete the process:<br>
     <a href="http://${config.baseUrl1}/api/reset-password/${token }">http://${config.baseUrl1}/api/reset-password/${token }</a><br>
     If you did not request this, please ignore this email and your password will remain unchanged.
       `
        };

       
   //console.log(updateEntry);
    if (updateEntry) {
      transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
        console.log('Message %s sent: %s', info.messageId, info.response);
        
       
        
            });
            return apiResponseHelper.post(res, true, 'Check your mail to reset your password.');

            res.end();
            
            } else {
             
                return apiResponseHelper.onError(res, false, 'User Not Created',{});
            }
  
  }else{
    return apiResponseHelper.onError(res, false, 'This email is not registered', {});
  }

     }

  }
  catch (e) {
    return apiResponseHelper.onError(res, false,'This email is not registereds', {});
     }

},
resetPassword: async (req, res) => {
try{
const resetLink=req.params.resetLink;
  const user = await appusers.findOne({
    attributes: ['id', 'name','email','social_id'],
       where: {
        resetLink:req.params.resetLink
        },
     
});
 
//console.log(user)
if(user){
  fs.readFile("../backend/public/changepassword1.html", function (error, data) {  
    console.log("its working");  
    if (error) {  
        console.log(error);  
        res.writeHead(404);  
        res.write('Contents you are looking are Not Found');  
    } else {  
        //res.writeHead(200, { 'Content-Type': 'text/html' });  
        res.write(data);  
    }  
    res.end();  
}); 

}
else{
  return apiResponseHelper.onError(res,'The link you followed has expired.');

}
 


 



}
catch (e) {
  //return  res.write('Contents you are looking are Not Found'); 
  return apiResponseHelper.onError(res,'The link you followed has expired.');
 // return res.JSON('The link you followed has expired.')
   }


},

setpasswordResponsemail: async (req, res) => {
 
  
  try {

    console.log(req.body.Password)
    const pswd= await hashPassword.generatePass(req.body.Password);
    const password=pswd;
  const resetLink=req.params.resetLink;
  const user = await appusers.findOne({
    attributes: ['id', 'name','email', 'status','email_check'],
       where: {
        resetLink: req.params.resetLink
        },
     
});
//console.log(user.email_check);
if(user.email_check =='N'){
  const updateEntry =await appusers.update(
    {
      resetLink:'12345675'
    },
    {
        where: {
          resetLink:req.params.resetLink,

        }
    });  
  return apiResponseHelper.post(res, true, 'You already update the password.');

 

}
else{
let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      // should be replaced with real sender's account
      user: 'yadavneerajsonu97@gmail.com',
      pass: '7056330417'
  }
});


let mailOptions = {
  // should be replaced with real recipient's account
  to:user.email,
  subject: 'Your password has been changed',  
                text: 'Hello,\n\n' +  
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n' 
};

console.log(password);
  const updateEntry =await appusers.update(
    {
      password:password,
      email_check:'N',
     // resetLink:'12345675'
    },
    {
        where: {
          resetLink:req.params.resetLink,

        }
    });  
   
   // console.log(updateEntry);
   const test=req.body.Password;
   
      if (test.length>5) {
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
console.log('Message %s sent: %s', info.messageId, info.response);



  });
  return apiResponseHelper.post(res, true, 'Success! Your password has been changed.');

  res.end();



    } else {
     
        return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again!Sonu',{});
    }

  }

  }




  catch (e) {
    return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!Neeraj', {});
     }
   
},


sendOtp: async (req, res) => {
try {
   req.checkBody('email', 'email is required in body').notEmpty();
  const error = req.validationErrors();
  const email = req.body.email;
if (error) {
return apiResponseHelper.onError(res, false, error[0].msg, {});

}
const user = await appusers.findOne({
    attributes: ['id', 'name','email', 'status','otp','emailStatus'],
       where: {
         email: req.body.email
        },
     
});
if(!user){
  return apiResponseHelper.post(res, true, 'Email address not exist.');

}


if(user.emailStatus =="Y"){
  return apiResponseHelper.post(res, true, 'your email is already verified.');

}
else{
var otp=Math.floor((Math.random() * 100) + 5000);

let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      // should be replaced with real sender's account
      user: 'yadavneerajsonu97@gmail.com',
      pass: '7056330417'
  }
});

let mailOptions = {
  // should be replaced with real recipient's account
  to:user.email,
  subject: 'Future Robotics Email Verification',  
  
  text: 'Hello,\n\n' +  
  'Your Email Verification Code :' + otp + '.\n' 
 
   
};

if(user){
  const updateEntry =await appusers.update({otp:otp},{
    where: {
        id:user.id,
         }
    }); 
    console.log(updateEntry);
    if(updateEntry){
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
  console.log('Message %s sent: %s', info.messageId, info.response);
  
  
  
    });
    return apiResponseHelper.post(res, true, 'Check your mail otp send.');
  
    res.end();




    }
    else{

      return apiResponseHelper.onError(res, false, 'Email ID is not registered!',{});


    }






}
else{

  return apiResponseHelper.onError(res, false, 'Users Not Exists', {});

}
  }

}
catch (e) {
  return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!', {});
   }

},

emailVerification: async (req, res) => {
  
  try {
  

    req.checkBody('otp', 'otp is required in body').notEmpty();
    const error = req.validationErrors();
    const otp = req.body.otp;
  if (error) {
  return apiResponseHelper.onError(res, false, error[0].msg, {});
  
  }

  
  const user = await appusers.findOne({
    attributes: ['id', 'name','email', 'status','otp','emailStatus'],
       where: {
         otp: req.body.otp
        },
     
});
if(user){
  const updateEntry =await appusers.update({emailStatus:'Y'},
    {
        where: {
        id:user.id,

        }
    }
    
    
    ); 
    return apiResponseHelper.post(res, true, 'Email Verification Success!'); 
  
}
else{
return apiResponseHelper.onError(res, false, "OTP doesn't match");
}




}
catch (e) {
  return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!');
   }


},



//-----------------------------07-08-2020----------------------------------



get_all_robots: async (req, res) => {
  try {
      const id=req.params.id;
         const itemList = await appusers.findAll({
            attributes: ['id', 'select_robots'],
               raw:true,
               where: {
                  id: req.params.id,
                }
         
   });
   console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'Robots list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'Robots list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},

get_all_plc: async (req, res) => {
  try {
      const id=req.params.id;
         const itemList = await appusers.findAll({
            attributes: ['id', 'select_plc'],
               raw:true,
               where: {
                  id: req.params.id,
                }
         
   });
  // console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'PLC list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'PLC list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},



// socialLogin: async (req, res) => {
    
//   try {

//       req.checkBody('social_id', 'social_id is required in body').notEmpty();
//       req.checkBody('social_type', 'social_type is required in body').notEmpty();

//       const error = req.validationErrors();
//       const social_id = req.body.social_id;
//       const social_type = req.body.social_type;
//   if (error) {
    
//     return apiResponseHelper.onError(res, false, error[0].msg, {});
    
//   }

// const item = await appusers.findOne({
//          attributes:['id','social_id','name','email','deviceType','deviceToken','status'],
//            name: req.body.name,
//            email: req.body.email,
//            phone: req.body.phone,
//            deviceType: req.body.deviceType,
//            deviceToken: req.body.deviceToken,

//               where: {
//                 social_id: req.body.social_id,
//               }
//           });
//           if (!item) {
//               const data1 = req.body;
//               data1.status = '1'
//               // const pswd = await hashPassword.generatePass(req.body.password);
//               //             data.password = pswd;
//               const itemAdded = await appusers.create(data1);
//               const data = await appusers.findOne({
//                 attributes:['id','social_id','name','email','deviceType','deviceToken','status'],
              
//                    where: {
//                      id: itemAdded.id,
//                    }
//                });

//               // console.log(data);
//               if (itemAdded) {
                    
//                       return apiResponseHelper.post(res, true, 'Log in successfully', data);
//               } else {
//                      return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
//               }
          
//              } else if(item){
//               const data1 = await appusers.findOne({
//                 attributes:['id','social_id','name','email','deviceType','deviceToken','status'],
              
//                    where: {
//                      id: item.id,
//                    }
//                });
//                if(data1.status ==0){

//                 return apiResponseHelper.onError(res, false, 'Deactivate Your Account ', {});
//                }

//                if (data1) {
                    
//                 return apiResponseHelper.post(res, true, 'Log in successfully', data1);
//         } else {
//                return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
//         }

//               return apiResponseHelper.post(res, true, 'Log in successfully', item);

//           }

//   } catch (e) {

//       console.log(e);

//       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
  
//   }
// },





//----------------------------Social Login-------------------Correct
socialLogin: async (req, res) => {
    
  try {

      req.checkBody('social_id', 'social_id is required in body').notEmpty();
      req.checkBody('social_type', 'social_type is required in body').notEmpty();

      const error = req.validationErrors();
      const social_id = req.body.social_id;
      const social_type = req.body.social_type;
  if (error) {
    
    return apiResponseHelper.onError(res, false, error[0].msg, {});
    
  }


  const logincheck= await appusers.findOne({
    attributes:['id','social_id','image','name','email','deviceType','deviceToken','status','password'],
      where: {
          email: req.body.email,
         }
     });

     if(!logincheck){
       const item = await appusers.findOne({
               attributes:['id','social_id','name','email','deviceType','deviceToken','status'],
                 image:req.body.image,
                 name: req.body.name,
                 email: req.body.email,
                 phone: req.body.phone,
                 deviceType: req.body.deviceType,
                 deviceToken: req.body.deviceToken,
      
                    where: {
                      social_id: req.body.social_id,
                    }
                });

      
               
      
                if (!item) {
                    const data1 = req.body;
                    data1.status = '1'
                   
                    const itemAdded = await appusers.create(data1);
                    const data = await appusers.findOne({
                      attributes:['id','social_id','image','name','email','deviceType','deviceToken','status'],
                    
                         where: {
                           id: itemAdded.id,
                         }
                     });
      
                    // console.log(data);
                    if (itemAdded) {
                          
                            return apiResponseHelper.post(res, true, 'Log in successfully', data);
                    } else {
                           return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                    }
                
                   } else if(item){
                    const data1 = await appusers.findOne({
                      attributes:['id','social_id','name','email','deviceType','deviceToken','status'],
                    
                         where: {
                           id: item.id,
                         }
                     });
                     if(data1.status ==0){
      
                      return apiResponseHelper.onError(res, false, 'Deactivate Your Account ', {});
                     }
      
                     if (data1) {
                          
                      return apiResponseHelper.post(res, true, 'Log in successfully', data1);
              } else {
                     return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
              }
      
                    return apiResponseHelper.post(res, true, 'Log in successfully', item);
      
                }
               }
              console.log(logincheck.password.length)
   
    if(logincheck.password.length !==0){
      return apiResponseHelper.onError(res, false, 'This email is already registered', {});
       
     }
     else{

const item = await appusers.findOne({
         attributes:['id','social_id','name','email','deviceType','deviceToken','status'],
           image:req.body.image,
           name: req.body.name,
           email: req.body.email,
           phone: req.body.phone,
           deviceType: req.body.deviceType,
           deviceToken: req.body.deviceToken,

              where: {
                social_id: req.body.social_id,
              }
          });

          
          const item1 = await appusers.update({
            
              image:req.body.image,
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              deviceType: req.body.deviceType,
              deviceToken: req.body.deviceToken,
          },{
                 where: {
                   social_id: req.body.social_id,
                 }
                }
             );
             console.log("hjscvsdjkvdjkasfll"+item1)

         

          if (!item) {
              const data1 = req.body;
              data1.status = '1'
             
              const itemAdded = await appusers.create(data1);
              const data = await appusers.findOne({
                attributes:['id','social_id','image','name','email','deviceType','deviceToken','status'],
              
                   where: {
                     id: itemAdded.id,
                   }
               });

              // console.log(data);
              if (itemAdded) {
                    
                      return apiResponseHelper.post(res, true, 'Log in successfully', data);
              } else {
                     return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
              }
          
             } else if(item){
              const data1 = await appusers.findOne({
                attributes:['id','social_id','image','name','email','deviceType','deviceToken','status'],
              
                   where: {
                     id: item.id,
                   }
               });
               if(data1.status ==0){

                return apiResponseHelper.onError(res, false, 'Deactivate Your Account ', {});
               }

               if (data1) {
                    
                return apiResponseHelper.post(res, true, 'Log in successfully', data1);
        } else {
               return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        }

              return apiResponseHelper.post(res, true, 'Log in successfully', item);

          }
        }

  } catch (e) {

      console.log(e);

      return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
  
  }
},















//----------------------------------------------------url save--

add_social_url : async (req, res) => {

  try {
 const user = await appusers.findOne({
             attributes: ['id', 'facebook_url','linkedin_url', 'instagram_url'],
                where: {
                  id: req.params.id
                
                },
                raw:true
     });
    //  if (req.body.facebook_url== "") {
    //   var facebook_url=user.facebook_url;
    // }
    // else{
    //   var facebook_url=req.body.facebook_url;
    // }

    // if (req.body.linkedin_url== "") {
    //   var linkedin_url=user.linkedin_url;
    // }
    // else{
    //   var linkedin_url=req.body.linkedin_url;
    // }

    // if (req.body.instagram_url== "") {
    //   var instagram_url=user.instagram_url;
    // }
    // else{
    //   var instagram_url=req.body.instagram_url;
    // }    
if (user) {
      const updateEntry =await appusers.update(
            {
              facebook_url:req.body.facebook_url,
              linkedin_url:req.body.linkedin_url,
              instagram_url:req.body.instagram_url  
          },
            {
                where: {
                id:user.id,

                }
            });  
            const userdata = await appusers.findOne({
              attributes: ['id', 'facebook_url','linkedin_url', 'instagram_url'],
                 where: {
                   id: user.id
                 
                 },
                 raw:true
      });


    if (updateEntry) {
      return apiResponseHelper.post(res, true, 'links saved successfully!',userdata);
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

},

get_all_robots_admin: async (req, res) => {
  try {
     // const id=req.params.id;
         const itemList = await robotList.findAll({
            attributes: ['robot_id', 'name','image','count'],
              // raw:true,
                // where: {
                //   id: 1,
                // }
         
   });
  // console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'Robots list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'Robots list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},

get_all_plc_admin: async (req, res) => {
  try {
      const id=req.params.id;
         const itemList = await plcList.findAll({
            attributes: ['plc_id', 'name','image','count'],
              //  raw:true,
              //  where: {
              //     id: req.params.id,
              //   }
         
   });
  // console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'PLC list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'PLC list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},

get_all_general_admin: async (req, res) => {
  try {
      const id=req.params.id;
         const itemList = await generalList.findAll({
            attributes: ['general_id', 'name','image','count'],
              //  raw:true,
              //  where: {
              //     id: req.params.id,
              //   }
         
   });
  // console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'General list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'General list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},


//----------------------------------28-08-2020--------------

get_all_robots_admim_list: async (req, res) => {
  try {
     const itemList = await groups.findAll({
           
                where: {
                  category:'ROBOT',
                  status:'1'
                 }
         
   });
  
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'Robots list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'Robots list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},

get_all_robots_admim_list1: async (req, res) => {
  try {
     const itemList = await appusers.findAll({
           
                where: {
                  id:req.params.id
                 }
         
   });
   if(!itemList[0].select_robots){

    return apiResponseHelper.post(res, true, 'Robots list',[]);
  }

   var listdata1=itemList[0].select_robots
   var listdata2=JSON.parse(listdata1)
  
   console.log(listdata2)
   var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var arrayofTaskId = listdata2;
const itemList1 = await groups.findAll({
  where: {
    name: {
      [Op.in]: arrayofTaskId
      },
      status:'1'

    
  }
 })

 console.log(itemList1)
  
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'Robots list',itemList1);
         } else {
             return apiResponseHelper.post(res, true, 'Robots list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},


get_all_plc_admin_list1: async (req, res) => {
  try {
    const itemList = await appusers.findAll({
           
      where: {
        id:req.params.id
       }

});
if(!itemList[0].select_plc){

return apiResponseHelper.post(res, true, 'PLC list',[]);
}


var listdata1=itemList[0].select_plc
var listdata2=JSON.parse(listdata1)

console.log(listdata2)
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var arrayofTaskId = listdata2;
const itemList1 = await groups.findAll({
where: {
 name: {
   [Op.in]: arrayofTaskId
   },
   status:'1'

 
}
})
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'PLC list',itemList1);
         } else {
             return apiResponseHelper.post(res, true, 'PLC list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},





get_all_plc_admin_list: async (req, res) => {
  try {
      //const id=req.params.id;
         const itemList = await groups.findAll({
            //attributes: ['plc_id', 'name','image','count'],
              //  raw:true,
                where: {
                  category:'PLS5',
                  status:'1'

                }
         
   });
  // console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'PLC list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'PLC list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},

get_all_general_admin_list: async (req, res) => {
  try {
     // const id=req.params.id;
         const itemList = await groups.findAll({
            //attributes: ['general_id', 'name','image','count'],
              //  raw:true,
               where: {
                category:'GENERAL',
                status:'1'
                }
         
   });
  // console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'General list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'General list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},



//------------------------------------------User Robot List----------------------------------
get_user_robots: async (req, res) => {
  try {
  const id=req.params.id;
  const userrobotlist=await appusers.findOne({
    attributes:['id','select_robots'],
    where: {
      id:req.params.id
     }

  })
  if(!userrobotlist){
    return apiResponseHelper.post(res, true, 'User Not Exits',{});

  }
if(!userrobotlist.select_robots){
  const itemList1 = await groups.findAll({
    attributes:['id','name','isChecked'],
         
              where: {
                category:'ROBOT',
                status:'1'
               }
       
 });
 if (itemList1) {
        
  return apiResponseHelper.post(res, true, 'Robots list',itemList1);
 } else {
     return apiResponseHelper.post(res, true, 'Robots list',{});
}
 

}

else{
  var test1=userrobotlist.select_robots


//  var array= test1.map(function (el) {
//     return el.trim();
//   });
  var myArrData = JSON.parse(test1)
  //var myArrData = JSON.parse(test1)

}


    const itemList = await groups.findAll({
      attributes:['id','name','isChecked'],
           
                where: {
                  category:'ROBOT',
                  status:'1'

                 }
         
   });

   var output1 = itemList.map(user => user.name);
  
  
   

//-------------------------Testing

function intersect1(a, b) {
  var t;
  if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
 return a.filter(function (e) {
      return b.indexOf(e) > -1;
  });
}


 var neerajTest=intersect1(output1, myArrData);

 //------------True Data---------------------------------
 if(neerajTest[0]){
  var truedata1=[{
     "id": 11,
    "name": neerajTest[0],
    "isChecked": true
  }

  ]
}
else{
var truedata1=[]
}

if(neerajTest[1]){
  var truedata2=[{
     "id": 12,
    "name": neerajTest[1],
    "isChecked": true
  }

  ]
}
else{
var truedata2=[]
}

if(neerajTest[2]){
  var truedata3=[{
     "id": 13,
    "name": neerajTest[2],
    "isChecked": true
  }

  ]
}
else{
var truedata3=[]
}

if(neerajTest[3]){
  var truedata4=[{
     "id": 14,
    "name": neerajTest[3],
    "isChecked": true
  }

  ]
}
else{
var truedata4=[]
}
if(neerajTest[4]){
  var truedata5=[{
     "id": 15,
    "name": neerajTest[4],
    "isChecked": true
  }

  ]
}
else{
var truedata5=[]
}

if(neerajTest[5]){
  var truedata6=[{
     "id": 16,
    "name": neerajTest[5],
    "isChecked": true
  }

  ]
}
else{
var truedata6=[]
}

if(neerajTest[6]){
  var truedata7=[{
     "id": 17,
    "name": neerajTest[6],
    "isChecked": true
  }

  ]
}
else{
var truedata7=[]
}

if(neerajTest[7]){
  var truedata8=[{
     "id": 18,
    "name": neerajTest[7],
    "isChecked": true
  }

  ]
}
else{
var truedata8=[]
}

if(neerajTest[8]){
  var truedata9=[{
     "id": 19,
    "name": neerajTest[8],
    "isChecked": true
  }

  ]
}
else{
var truedata9=[]
}

if(neerajTest[9]){
  var truedata10=[{
     "id": 20,
    "name": neerajTest[9],
    "isChecked": true
  }

  ]
}
else{
var truedata10=[]
}


 


 //--------------True Data--------------------------------
 function arr_diff (a1, a2) {

  var a = [], diff = [];

  for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
          delete a[a2[i]];
      } else {
          a[a2[i]] = true;
      }
  }

  for (var k in a) {
      diff.push(k);
  }

  return diff;
}

//var  myArr=arr_diff(output,myArrData)
//----------False Data------------------------------neerajTest
//var myArr=arr_diff(output1, myArrData);//correct
var myArr=arr_diff(output1, neerajTest);


console.log(myArr)
if(myArr[0]){
  var new1=[{
     "id": 1,
    "name": myArr[0],
    "isChecked": false
  }

  ]
}
else{
var new1=[]
}

if(myArr[1]){
  var new2=[{
     "id": 2,
    "name": myArr[1],
    "isChecked": false
  }

  ]
}
else{
var new2=[]
}

if(myArr[2]){
  var new3=[{
     "id": 3,
    "name": myArr[2],
    "isChecked": false
  }

  ]
}
else{
var new3=[]
}

if(myArr[3]){
  var new4=[{
     "id": 4,
    "name": myArr[3],
    "isChecked": false
  }

  ]
}
else{
var new4=[]
}
if(myArr[4]){
  var new5=[{
     "id": 5,
    "name": myArr[4],
    "isChecked": false
  }

  ]
}
else{
var new5=[]
}

if(myArr[5]){
  var new6=[{
     "id": 6,
    "name": myArr[5],
    "isChecked": false
  }

  ]
}
else{
var new6=[]
}

if(myArr[6]){
  var new7=[{
     "id": 7,
    "name": myArr[6],
    "isChecked": false
  }

  ]
}
else{
var new7=[]
}

if(myArr[7]){
  var new8=[{
     "id": 8,
    "name": myArr[7],
    "isChecked": false
  }

  ]
}
else{
var new8=[]
}

if(myArr[8]){
  var new9=[{
     "id": 9,
    "name": myArr[8],
    "isChecked": false
  }

  ]
}
else{
var new9=[]
}

if(myArr[9]){
  var new10=[{
     "id": 10,
    "name": myArr[9],
    "isChecked": false
  }

  ]
}
else{
var new10=[]
}

//---------------------------------
var alldata=new1.concat(new2,new3,new4,new5,new6,new7,new8,new9,new10,truedata1,truedata2,truedata3,truedata4,truedata5,truedata6,truedata7,truedata8,truedata9,truedata10);
console.log(alldata);
   if (itemList) {
        
          return apiResponseHelper.post(res, true, 'Robots list',alldata);
         } else {
             return apiResponseHelper.post(res, true, 'Robots list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},

get_user_plc: async (req, res) => {
  try {
  const id=req.params.id;
  const userrobotlist=await appusers.findOne({
    attributes:['id','select_plc'],
    where: {
      id:req.params.id
     }

  })

  if(!userrobotlist){
    return apiResponseHelper.post(res, true, 'User Not Exits',{});

  }
 
if(!userrobotlist.select_plc){
  const itemList1 = await groups.findAll({
    attributes:['id','name','isChecked'],
         
              where: {
                category:'PLS5',
                status:'1'
               }
       
 });
 if (itemList1) {
        
  return apiResponseHelper.post(res, true, 'PLC list',itemList1);
 } else {
     return apiResponseHelper.post(res, true, 'PLC list',{});
}
 

}

else{
  var test1=userrobotlist.select_plc
//   var array= test1.map(function (el) {
//     return el.trim();
//   });

// console.log(array)
  var myArrData = JSON.parse(test1)

}


    const itemList = await groups.findAll({
      attributes:['id','name','isChecked'],
           
                where: {
                  category:'PLS5',
                  status:'1'
                 }
         
   });

   var output1 = itemList.map(user => user.name);
  
  
   

//-------------------------Testing

function intersect1(a, b) {
  var t;
  if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
 return a.filter(function (e) {
      return b.indexOf(e) > -1;
  });
}


 var neerajTest=intersect1(output1, myArrData);

 //------------True Data---------------------------------
 if(neerajTest[0]){
  var truedata1=[{
     "id": 11,
    "name": neerajTest[0],
    "isChecked": true
  }

  ]
}
else{
var truedata1=[]
}

if(neerajTest[1]){
  var truedata2=[{
     "id": 12,
    "name": neerajTest[1],
    "isChecked": true
  }

  ]
}
else{
var truedata2=[]
}

if(neerajTest[2]){
  var truedata3=[{
     "id": 13,
    "name": neerajTest[2],
    "isChecked": true
  }

  ]
}
else{
var truedata3=[]
}

if(neerajTest[3]){
  var truedata4=[{
     "id": 14,
    "name": neerajTest[3],
    "isChecked": true
  }

  ]
}
else{
var truedata4=[]
}
if(neerajTest[4]){
  var truedata5=[{
     "id": 15,
    "name": neerajTest[4],
    "isChecked": true
  }

  ]
}
else{
var truedata5=[]
}

if(neerajTest[5]){
  var truedata6=[{
     "id": 16,
    "name": neerajTest[5],
    "isChecked": true
  }

  ]
}
else{
var truedata6=[]
}

if(neerajTest[6]){
  var truedata7=[{
     "id": 17,
    "name": neerajTest[6],
    "isChecked": true
  }

  ]
}
else{
var truedata7=[]
}

if(neerajTest[7]){
  var truedata8=[{
     "id": 18,
    "name": neerajTest[7],
    "isChecked": true
  }

  ]
}
else{
var truedata8=[]
}

if(neerajTest[8]){
  var truedata9=[{
     "id": 19,
    "name": neerajTest[8],
    "isChecked": true
  }

  ]
}
else{
var truedata9=[]
}

if(neerajTest[9]){
  var truedata10=[{
     "id": 20,
    "name": neerajTest[9],
    "isChecked": true
  }

  ]
}
else{
var truedata10=[]
}


 


 //--------------True Data--------------------------------
 function arr_diff (a1, a2) {

  var a = [], diff = [];

  for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
          delete a[a2[i]];
      } else {
          a[a2[i]] = true;
      }
  }

  for (var k in a) {
      diff.push(k);
  }

  return diff;
}

//var  myArr=arr_diff(output,myArrData)
//----------False Data------------------------------neerajTest
//var myArr=arr_diff(output1, myArrData);//correct
var myArr=arr_diff(output1, neerajTest);

if(myArr[0]){
  var new1=[{
     "id": 1,
    "name": myArr[0],
    "isChecked": false
  }

  ]
}
else{
var new1=[]
}

if(myArr[1]){
  var new2=[{
     "id": 2,
    "name": myArr[1],
    "isChecked": false
  }

  ]
}
else{
var new2=[]
}

if(myArr[2]){
  var new3=[{
     "id": 3,
    "name": myArr[2],
    "isChecked": false
  }

  ]
}
else{
var new3=[]
}

if(myArr[3]){
  var new4=[{
     "id": 4,
    "name": myArr[3],
    "isChecked": false
  }

  ]
}
else{
var new4=[]
}
if(myArr[4]){
  var new5=[{
     "id": 5,
    "name": myArr[4],
    "isChecked": false
  }

  ]
}
else{
var new5=[]
}

if(myArr[5]){
  var new6=[{
     "id": 6,
    "name": myArr[5],
    "isChecked": false
  }

  ]
}
else{
var new6=[]
}

if(myArr[6]){
  var new7=[{
     "id": 7,
    "name": myArr[6],
    "isChecked": false
  }

  ]
}
else{
var new7=[]
}

if(myArr[7]){
  var new8=[{
     "id": 8,
    "name": myArr[7],
    "isChecked": false
  }

  ]
}
else{
var new8=[]
}

if(myArr[8]){
  var new9=[{
     "id": 9,
    "name": myArr[8],
    "isChecked": false
  }

  ]
}
else{
var new9=[]
}

if(myArr[9]){
  var new10=[{
     "id": 10,
    "name": myArr[9],
    "isChecked": false
  }

  ]
}
else{
var new10=[]
}

//---------------------------------
var alldata=new1.concat(new2,new3,new4,new5,new6,new7,new8,new9,new10,truedata1,truedata2,truedata3,truedata4,truedata5,truedata6,truedata7,truedata8,truedata9,truedata10);
console.log(alldata);
   if (itemList) {
        
          return apiResponseHelper.post(res, true, 'PLC list',alldata);
         } else {
             return apiResponseHelper.post(res, true, 'PLC list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},



all_add_list: async (req, res) => {
  try {
     
         const itemList = await addTable.findAll({
            
              //  raw:true,
                where: {
                  status:1
                }
         
   });
  // console.log(itemList);
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'Add list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'Add list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},


all_feed_cat_list: async (req, res) => {
  try {
     
         const itemList = await feedsCategory.findAll({
            where: {
                  status:1
                }
         
   });
  
         
     if (itemList) {
        
          return apiResponseHelper.post(res, true, 'FeedsCategory list',itemList);
         } else {
             return apiResponseHelper.post(res, true, 'FeedsCategory list',{});
 }
    } catch (e) {
       
     return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
         
    }
},
 
//----------------Final Data--------------------------------
  socialLogin_final: async (req, res) => {
    
    try {
      const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
  
        req.checkBody('social_id', 'social_id is required in body').notEmpty();
        req.checkBody('social_type', 'social_type is required in body').notEmpty();
  
        const error = req.validationErrors();
        const social_id = req.body.social_id;
        const social_type = req.body.social_type;
    if (error) {
      
      return apiResponseHelper.onError(res, false, error[0].msg, {});
      
    }
  
  
    const logincheck= await appusers.findOne({
      attributes:['id','social_id','name','image','email','deviceType','deviceToken','status','password'],
        where: {
            email: req.body.email,
           }
       });
  
       if(!logincheck){
         const item = await appusers.findOne({
                 attributes:['id','social_id','name','image','email','deviceType','deviceToken','status'],
                   name: req.body.name,
                   email: req.body.email,
                   phone: req.body.phone,
                   deviceType: req.body.deviceType,
                   deviceToken: req.body.deviceToken,
        
                      where: {
                        social_id: req.body.social_id,
                      }
                  });
        
                 
        
                  if (!item) {
                      const data1 = req.body;
                      data1.status = '1'
                      data1.image = 'http://34.232.2.249:4100/'+uploadFile[0].imageName;
                     
                      const itemAdded = await appusers.create(data1);
                      const data = await appusers.findOne({
                        attributes:['id','social_id','name','image','email','deviceType','deviceToken','status'],
                      
                           where: {
                             id: itemAdded.id,
                           }
                       });
        
                      // console.log(data);
                      if (itemAdded) {
                            
                              return apiResponseHelper.post(res, true, 'Log in successfully', data);
                      } else {
                             return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                      }
                  
                     } else if(item){
                      const data1 = await appusers.findOne({
                        attributes:['id','social_id','name','image','email','deviceType','deviceToken','status'],
                      
                           where: {
                             id: item.id,
                           }
                       });
                       if(data1.status ==0){
        
                        return apiResponseHelper.onError(res, false, 'Deactivate Your Account ', {});
                       }
        
                       if (data1) {
                            
                        return apiResponseHelper.post(res, true, 'Log in successfully', data1);
                } else {
                       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                }
        
                      return apiResponseHelper.post(res, true, 'Log in successfully', item);
        
                  }
                 }
                console.log(logincheck.password.length)
     
      if(logincheck.password.length !==0){
        return apiResponseHelper.onError(res, false, 'This email is already registered', {});
         
       }
       else{
  
  const item = await appusers.findOne({
           attributes:['id','social_id','name','image','email','deviceType','deviceToken','status'],
             name: req.body.name,
             email: req.body.email,
             phone: req.body.phone,
             deviceType: req.body.deviceType,
             deviceToken: req.body.deviceToken,
  
                where: {
                  social_id: req.body.social_id,
                }
            });
  
           
  
            if (!item) {
                const data1 = req.body;
                data1.status = '1'
                data1.image = 'http://34.232.2.249:4100/'+uploadFile[0].imageName;
                const itemAdded = await appusers.create(data1);
                const data = await appusers.findOne({
                  attributes:['id','social_id','name','image','email','deviceType','deviceToken','status'],
                
                     where: {
                       id: itemAdded.id,
                     }
                 });
  
                // console.log(data);
                if (itemAdded) {
                      
                        return apiResponseHelper.post(res, true, 'Log in successfully', data);
                } else {
                       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                }
            
               } else if(item){
                const data1 = await appusers.findOne({
                  attributes:['id','social_id','name','image','email','deviceType','deviceToken','status'],
                
                     where: {
                       id: item.id,
                     }
                 });
                 if(data1.status ==0){
  
                  return apiResponseHelper.onError(res, false, 'Deactivate Your Account ', {});
                 }
  
                 if (data1) {
                      
                  return apiResponseHelper.post(res, true, 'Log in successfully', data1);
          } else {
                 return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
          }
  
                return apiResponseHelper.post(res, true, 'Log in successfully', item);
  
            }
          }
  
    } catch (e) {
  
        console.log(e);
  
        return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
    
    }
  },

   

  general_profile_edit : async (req, res) => {

    try {
      
        const user = await appusers.findOne({
          attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],
  
                  where: {
                    id: req.params.id
                  
                  },
                  raw:true
       });
       const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
       const data = req.body;
       data.image = uploadFile[0].imageName;
       var data1=data.image
       console.log(data1)
  
       if (req.body.name== "") {
        var name=user.name;
      }
      else{
        var name=req.body.name;
      }
      var userimage=user.image
  
       if (req.body.biodesc== "") {
      var biodesc=user.biodesc;
    }
    else{
      var biodesc=req.body.biodesc;
    }
    var userimage=user.image
  
  
  
  if (req.body.image== "") {
        var image=user.image;
      }
      
      else if(data1=="public/images/default/main.png"){
        var image=user.image
      }
      else{
        
        var image='http://34.232.2.249:4100/'+data1;
      }
  
  
  
   if (req.body.age== "") {
        var age=user.age;
      }
      else{
        var age=req.body.age;
      }
      if (req.body.dob== "") {
        var dob=user.dob;
      }
      else{
        var dob=req.body.dob;
      }
   if (req.body.location== "") {
        var location=user.location;
      }
      else{
        var location=req.body.location;
      }
   if (req.body.joined_date== "") {
        var joined_date=user.joined_date;
      }
      else{
        var joined_date=user.joined_date;
      }
  
   if (req.body.country== "") {
        var country=user.country;
      }
      else{
        var country=req.body.country;
      }
  
  
  
       // console.log(user.id);
       if (user) {
        const updateEntry =await appusers.update(
              {
           name:name,
           biodesc:biodesc,
           image:image,
           age:age,
           dob:dob,
          location:location,
          joined_date:joined_date,
          country:country
            
  
             },
              {
                  where: {
                  id:user.id,
  
                  }
              });  
              const userdata1 = await appusers.findOne({
                attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],
  
                        where: {
                          id: user.id
                        
                        },
                       // raw:true
             });
  
              
      if (updateEntry) {
        return apiResponseHelper.post(res, true, 'Profile updated Successfully!',userdata1);
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
  
  },


  //-------------------------------------------
  Work_profile : async (req, res) => {

    try {
      
        const user = await appusers.findOne({
          attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],
  
                  where: {
                    id: req.params.id
                  
                  },
                  raw:true
       });
       const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
       const data = req.body;
       data.image = uploadFile[0].imageName;
       var data1=data.image
       console.log(data1)
  
       if (req.body.name== "") {
        var name=user.name;
      }
      else{
        var name=req.body.name;
      }
      var userimage=user.image
  
      
  if (req.body.biodesc== "") {
      var biodesc=user.biodesc;
    }
    else{
      var biodesc=req.body.biodesc;
    }
    var userimage=user.image
  
  
  
  if (req.body.image== "") {
        var image=user.image;
      }
      
      else if(data1=="public/images/default/main.png"){
        var image=user.image
      }
      else{
        
        var image='http://34.232.2.249:4100/'+data1;
      }
  
     if (req.body.occupation== "") {
        var occupation=user.occupation;
      }
      else{
        var occupation=req.body.occupation;
      }
  if (req.body.company== "") {
        var company=user.company;
      }
      else{
        var company=req.body.company;
      }
    if (req.body.experience== "") {
        var experience=user.experience;
      }
      else{
        var experience=req.body.experience;
      } if (req.body.hireAvailable== "") {
        var hireAvailable=user.hireAvailable;
      }
      else{
        var hireAvailable=req.body.hireAvailable;
      }
  
      var test12=req.body.select_robots.split(',');
      console.log(test12);
  
      var array = test12.map(function (el) {
        return el.trim();
      });
  
      console.log(array);
  
      var test123=JSON.stringify(array);
  
     
      console.log(test123)
       
   if (req.body.select_robots== "") {
        var select_robots=user.select_robots;
      //  var select_robots=test123;
        
      }
      else{
        var select_robots=test123;
      }
  
      var test123=req.body.select_plc.split(',');
  
      var array = test123.map(function (el) {
        return el.trim();
      });
  
      console.log(array);
      
  
      var test1234=JSON.stringify(array);
     
  
   if (req.body.select_plc== "") {
        var select_plc=user.select_plc;
      }
      else{
        var select_plc=test1234;
       }
       console.log(user.id);
       if (user) {
        const updateEntry =await appusers.update(
              {
           name:name,
           biodesc:biodesc,
           occupation:occupation,
            company:company,
            experience:experience,
            hireAvailable:hireAvailable,
            select_robots:select_robots,
            select_plc:select_plc,
            },
              {
                  where: {
                  id:user.id,
  
                  }
              });  
              const userdata1 = await appusers.findOne({
                attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],
  
                        where: {
                          id: user.id
                        
                        },
                       // raw:true
             });
  
              
      if (updateEntry) {
        return apiResponseHelper.post(res, true, 'Profile updated Successfully!',userdata1);
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
  
  },

 additional_profile : async (req, res) => {

    try {
      
        const user = await appusers.findOne({
          attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],
  
                  where: {
                    id: req.params.id
                  
                  },
                  raw:true
       });
       const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
       const data = req.body;
       data.image = uploadFile[0].imageName;
       var data1=data.image
       console.log(data1)
  
       if (req.body.name== "") {
        var name=user.name;
      }
      else{
        var name=req.body.name;
      }
      var userimage=user.image
  
      
  
    
     // console.log(userimage.length())biodesc
     if (req.body.biodesc== "") {
      var biodesc=user.biodesc;
    }
    else{
      var biodesc=req.body.biodesc;
    }
    var userimage=user.image
  
  
  
  if (req.body.image== "") {
        var image=user.image;
      }
      
      else if(data1=="public/images/default/main.png"){
        var image=user.image
      }
      else{
        
        var image='http://34.232.2.249:4100/'+data1;
      }
   if (req.body.about_me== "") {
        var about_me=user.about_me;
      }
      else{
        var about_me=req.body.about_me;
      }
     
 if (user) {
        const updateEntry =await appusers.update(
              {
           name:name,
           biodesc:biodesc,
           image:image,
           about_me:about_me,
            },
              {
                  where: {
                  id:user.id,
  
                  }
              });  
              const userdata1 = await appusers.findOne({
                attributes:['id','name','biodesc','image','age','dob','location','country','joined_date','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me','facebook_url','linkedin_url','instagram_url'],
  
                        where: {
                          id: user.id
                        
                        },
                       // raw:true
             });
  
              
      if (updateEntry) {
        return apiResponseHelper.post(res, true, 'Profile updated Successfully!',userdata1);
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
  
  },


 }



 