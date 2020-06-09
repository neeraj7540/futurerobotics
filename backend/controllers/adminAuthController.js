const config = require('config');
const db = require('../db/db');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const admin = db.models.admin;
const hashPassword = require('../helpers/hashPassword');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const filesUpload = require('../helpers/uploadFiles').uploadFile;

module.exports = {

    adminLogin: async (req, res) => {

        try {
            req.checkBody('email', 'email is required in body').notEmpty();
            req.checkBody('password', 'password is required in body').notEmpty();

            const error = req.validationErrors();
            const password = req.body.password;
            const email = req.body.email;
        if (error) {
          
          return apiResponseHelper.onError(res, false, error[0].msg, {});
          
        }


            const user = await admin.findOne({
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

logout: async (req, res) => {
  try {
    console.log(req);
    const data = req.params;
    const logout = await admin.findOne({
      attributes: ['id', 'email', 'password', 'image', 'name'],
      where: {
        id: req.user.id,
      }
    });

    if (logout) {
    
      return apiResponseHelper.post(res, true, 'logout sucessfull', {});

    }
  } catch (e) {
    return apiResponseHelper.onError(res, false, 'Error', e);
  }
}
,
viewUser: async (req, res) => {
  try {
   
    const userDetails = await admin.findOne({
      attributes: ['id', 'email', 'image', 'name'],
      where: {
        id: req.user.id,
      }
    });

    if (userDetails) {
    
      return apiResponseHelper.post(res, true, 'userDetails', userDetails);

    }
  } catch (e) {
    return apiResponseHelper.onError(res, false, 'Error', e);
  }
}
,
updateUser :async (req, res) => {


  try {
    const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
   
    if (uploadFile) {
        const item = await admin.findOne({
            attributes:['id','image','password'],
            where: {
                id: req.user.id
            }
        });

        let password;
        if (item) {
          const data = req.body;
          if(req.body.isImage=="false"){
            data.image = item.dataValues.image;
         }else{
             data.image = uploadFile[0].imageName;
         }


         if(req.body.isPassword=="false"){
          password = item.dataValues.password
         }else{
          password = await hashPassword.generatePass(req.body.password);
         } 
         const updateUser = await admin.update(
               {
                password: password,
                name:req.body.name,
                image:data.image
                }, {
                where: {
                id: req.user.id
                }
          });
          
                 if(updateUser){
                    return apiResponseHelper.post(res, true, 'details updated Successfully!', {name:req.body.name,image:data.image});

                 }else{

                    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

                 }
        } else {
             fs.unlinkSync(uploadFile[0].imageName);
            return apiResponseHelper.onError(res, false,  'User not found', {});
        
        }
    }
    else {
        return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{} );
           
    }

}
catch (e) {
  console.log(e);
  return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!', {});
   }

}



}





