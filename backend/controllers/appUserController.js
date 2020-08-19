const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const mail = require('../helpers/mailer');
const appusers = db.models.appusers;
const reportedTable = db.models.reportedfeed;
const feedsTable =  db.models.feed;
const postTable = db.models.post;

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



//-----------------------------------31-07-2020-----------------------------------------------------

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
         //   password:req.body.password,
            age:req.body.age,
            location:req.body.location,
            country:req.body.country,
            lat:req.body.lat,
            long:req.body.long,


                where: {
                    email: req.body.email,
                }
            });
            if (!item) {
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
            } else {
                return apiResponseHelper.onError(res, false,  'User already exists', {});
            }

    } catch (e) {

        console.log(e);

        return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
    
    }
},


profile: async (req, res) => {
    try {
        const id=req.params.id;
    
      const userDetails = await appusers.findOne({
     
        attributes: ['id', 'email', 'name','image','country','about','work','additional','location','status','deviceType','deviceToken','experience','hireAvailable','occupation','company','lat','long'],
        where: {
          id: req.params.id,
        }
      });
  
      if (userDetails) {
      
        return apiResponseHelper.post(res, true, 'userDetails', userDetails);
  
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
            attributes: ['id', 'email', 'password', 'image', 'name'],
            where: {
              email: email,
            }
          });

          if (user) {
            const getUser = user.toJSON();
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
              delete getUser.password;
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
      const id=req.params.id;
           const itemList = await postTable.findAll({
              attributes: ['id','post_id' ,'title','status','image','description','createdAt','updatedAt'],
                 raw:true,
                 where:{
                   id:req.params.id
                 },
             order :   [
                   ['id', 'DESC']
            ]
           
     });
           
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
        const post_id=req.params.post_id;
           const itemList = await postTable.findOne({
             // attributes: ['id','post_id','title','status','image','description','createdAt','updatedAt'],
               // raw:true,
                 where: {
                    id: req.params.id,
                    post_id:req.params.post_id,

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
             attributes: ['id', 'name','email', 'status','age','location','country','occupation','company','experience','hireAvailable','select_robots','select_plc','about_me'],
                where: {
                  id: req.params.id
                
                },
                raw:true
     });
     if (req.body.name== "") {
      var name=user.name;
    }
    else{
      var name=req.body.name;
    }

    if (req.body.age== "") {
      var age=user.age;
    }
    else{
      var age=req.body.age;
    }

    if (req.body.location== "") {
      var location=user.location;
    }
    else{
      var location=req.body.location;
    }

    if (req.body.country== "") {
      var country=user.country;
    }
    else{
      var country=req.body.country;
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
    }

      
    if (req.body.hireAvailable== "") {
      var hireAvailable=user.hireAvailable;
    }
    else{
      var hireAvailable=req.body.hireAvailable;
    }
    if (req.body.select_robots== "") {
      var select_robots=user.select_robots;
    }
    else{
      var select_robots=req.body.select_robots;
    }

    if (req.body.select_plc== "") {
      var select_plc=user.select_plc;
    }
    else{
      var select_plc=req.body.select_plc;
    }
    if (req.body.about_me== "") {
      var about_me=user.about_me;
    }
    else{
      var about_me=req.body.about_me;
    }

      console.log(user.id);
     if (user) {
      const updateEntry =await appusers.update(
            {
            name:name,
            age:age,
            location:location,
            country:country,
            occupation:occupation,
            company:company,
            experience:experience,
            hireAvailable:hireAvailable,
            select_robots:select_robots,
            select_plc:select_plc,
            about_me:about_me

            
          },
            {
                where: {
                id:user.id,

                }
            });  
            console.log(updateEntry);
    if (updateEntry) {
      return apiResponseHelper.post(res, true, 'Profile updated Successfully!',{updateEntry});
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
             attributes: ['id', 'name','email', 'status'],
                where: {
                  email: req.body.email
                 },
              
     });
     console.log(user.id);
     const token=jwt.sign({_id:user._id},config.jwtToken,{expiresIn:'2m'});
     console.log(token);
     
     if (user) {
      const updateEntry =await appusers.update({resetLink:token },
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
     <a href="http://${config.baseUrl}/api/reset-password/${token }">http://${config.baseUrl}/api/reset-password/${token }</a><br>
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
    return apiResponseHelper.onError(res, false, 'Users Not Exists', {});
  }

  }
  catch (e) {
    return apiResponseHelper.onError(res, false,'User Not Created', {});
     }

},
resetPassword: async (req, res) => {
  const resetLink=req.params.resetLink

 
  //G:\CompanyProject\JustInMind\justinmind\backend\public\changepassword1.html


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




},

setpasswordResponsemail: async (req, res) => {
 
  
  try {

    console.log(req.body.Password)
    const pswd= await hashPassword.generatePass(req.body.Password);
    const password=pswd;
  const resetLink=req.params.resetLink;
  const user = await appusers.findOne({
    attributes: ['id', 'name','email', 'status'],
       where: {
        resetLink: req.params.resetLink
        },
     
});


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
    },
    {
        where: {
          resetLink:req.params.resetLink,

        }
    });  
   
   console.log(updateEntry);
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
if(user.emailStatus =="Y"){
  return apiResponseHelper.post(res, true, 'your email is already verified.');

}
else{
var otp=Math.floor((Math.random() * 100) + 5400);

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

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again!',{});


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


//----------------------------Social Login-------------------
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

const item = await appusers.findOne({
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
              // const pswd = await hashPassword.generatePass(req.body.password);
              //             data.password = pswd;
              const itemAdded = await appusers.create(data1);
              const data = await appusers.findOne({
                attributes:['id','social_id','name','email','deviceType','deviceToken','status'],
              
                   where: {
                     id: itemAdded.id,
                   }
               });

               console.log(data);
              if (itemAdded) {
                    
                      return apiResponseHelper.post(res, true, 'Log in successfully', {data});
              } else {
                     return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
              }
          } else {
              return apiResponseHelper.onError(res, false,  'User already exists', {});
          }

  } catch (e) {

      console.log(e);

      return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
  
  }
},






//----------------------------------------------------









 }



 