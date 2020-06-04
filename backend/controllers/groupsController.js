const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const groups = db.models.groups;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');

module.exports = {

  addGroupByAdmin: async (req, res) => {
    
                try {
                    const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
                    if (uploadFile) {
                        const group = await groups.findOne({
                            where: {
                                name: req.body.name,
                                category:req.body.category
                            }
                        });
                        if (!group) {
                            const data = req.body;
                            data.image = uploadFile[0].imageName;
                            data.status = '1'
                            const groupAdded = await groups.create(data);
                            if (groupAdded) {
                                  
                                    return apiResponseHelper.post(res, true, 'Group Added Successfully!', {});
                            } else {
                                   return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                            }
                        } else {
                             fs.unlinkSync(uploadFile[0].imageName);
                           
                            return apiResponseHelper.onError(res, false,  'Group with same name already exists', {});
                        
                        }
                    }
                    else {
                        return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{} );
                           
                    }
        
                } catch (e) {

                    console.log(e);
        
                    return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
                }
            },

 groupListAdmin: async (req, res) => {
         try {
                const groupList = await groups.findAll({
                   attributes: ['id', 'name','status','image','category', 'description','createdAt','updatedAt'],
                      raw:true,
                  order :   [
                        ['id', 'DESC']
                 ]
                
          });
                
            if (groupList) {
               
                 return apiResponseHelper.post(res, true, 'Group list',groupList);
                } else {
                    return apiResponseHelper.post(res, true, 'Group list',{});
        }
           } catch (e) {
              
            return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
           }
 },




deleteGroupByAdmin: async (req, res) => {
            try {
                const group = await groups.findOne({
                    attributes: ['id','image'],
                    where: {
                        id: req.params.id
                    }
                });
                if (group) {
    
                    const deleteGroup = await group.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    if (deleteGroup) {
                        fs.unlinkSync(group.dataValues.image);
                   
                        return apiResponseHelper.post(res, true, 'Group Successfully Deleted!',{});
    
                    } else {
                       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        
                    }
                } else {
                    return apiResponseHelper.onError(res, false, 'Group Not Exists', {});
                
    
                }
            } catch (e) {
                return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
            }
        },



groupEditByAdmin : async (req, res) => {

    try {
        const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
       
        if (uploadFile) {
            const group = await groups.findOne({
                attributes:['id','image'],
                where: {
                    id: req.params.id
                }
            });
            if (group) {
                const checkGroupName = await groups.findOne({
                   where: {
                        name: req.body.name,
                        category:req.body.category
                    },
                    raw:true
                });
           
                console.log(checkGroupName);


                if(checkGroupName  &&  checkGroupName.id!=req.params.id){
                  
                    return apiResponseHelper.onError(res, false,  'Group with same name & category already exists', {});

                }else{
                    const data = req.body;
                    if(req.body.isImage=="false"){
                       data.image = group.dataValues.image;
                    }else{
                        data.image = uploadFile[0].imageName;
                    }

                      const updateEntry =  await groups.update(
                        data,
                        {
                            where: {
                            id: req.params.id,
        
                            }
                        });  

                     if(updateEntry){
                        return apiResponseHelper.post(res, true, 'Group Added Successfully!', {});

                     }else{

                        return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');

                     }

                }

            } else {
                 fs.unlinkSync(uploadFile[0].imageName);
                return apiResponseHelper.onError(res, false,  'Group not exists', {});
            
            }
        }
        else {
            return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{} );
               
        }

    }
    catch (e) {
      return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!', {});
       }

  }


 }

