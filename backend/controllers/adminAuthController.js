const config = require('config');
const db = require('../db/db');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const admin = db.models.admin;
const hashPassword = require('../helpers/hashPassword');
const apiResponseHelper = require('../helpers/apiResponseHelper');

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


}





