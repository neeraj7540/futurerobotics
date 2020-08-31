const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const groups = db.models.groups;
const groupaccessTable = db.models.groupaccess;
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
                            data.image ='http://34.232.2.249:4100/'+uploadFile[0].imageName;
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




                    const allEntry = await groupaccessTable.findAll({
                        attributes: ['id'],
                        where: {
                            groupId: req.params.id
                        }
                        ,raw:true
                    })
                    
                    if(allEntry.length>0){
                    
                    const deleteItems = await groupaccessTable.destroy({
                        where: {
                            groupId: req.params.id
                        }
                    })
                   }

    
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
                        data.image ='http://34.232.2.249:4100/'+uploadFile[0].imageName;
                    }

                      const updateEntry =  await groups.update(
                        data,
                        {
                            where: {
                            id: req.params.id,
        
                            }
                        });  

                     if(updateEntry){
                        return apiResponseHelper.post(res, true, 'Group Updated Successfully!', {});

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

  },

  groupStatusUpdteByAdmin : async (req, res) => {

    try {

     
      req.checkBody('groupId', 'groupId required').notEmpty();
      req.checkBody('status', 'status required').notEmpty();

      const error = req.validationErrors();

      if (error) {
         return apiResponseHelper.onError(res, false, 'Error', error[0].msg);
           
        }
       
        const getGroup = await groups.findOne({
                  where: {
                    id: req.body.groupId,
                  },
                  raw:true
       });
        
       if (getGroup) {
        const updateEntry =    await groups.update(
              {
              status:req.body.status,
              
            },
              {
                  where: {
                  id: req.body.groupId,

                  }
              });  
      if (updateEntry) {
        return apiResponseHelper.post(res, true, 'Status updated Successfully!',{});
      } else {
       
          return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again!',{});
      }
    }else{
      return apiResponseHelper.onError(res, false, 'Group Not Exists', {});
    }

    }
    catch (e) {
      return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!', {});
       }

  },

  //------------------------------31-07-2020
  get_all_groups: async (req, res) => {
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


get_group_messages:async(req,res)=>{
    try{
        const groupId=req.params.groupId;

        const allEntry = await groupaccessTable.findAll({
           // attributes: ['id'],
            where: {
                groupId:req.params.groupId
            }
            ,raw:true
        })

        console.log(allEntry[0].id)
        if (allEntry) {
               
            const groupList = await groups.findAll({
                attributes: ['id', 'name','status','image','category', 'description','createdAt','updatedAt'],
                where: {
                id:allEntry[0].id
            },
            raw:true,  
       });

       //console.log(groupList);
       if(groupList){
        return apiResponseHelper.post(res, true, 'Group Messages List',groupList);

       }

       else{
        return apiResponseHelper.post(res, true, 'Group list',{});


       }
        } else {
               return apiResponseHelper.post(res, true, 'Id Not Found');
   }





    }

    catch (e) {
         
        return apiResponseHelper.onError(res, false, 'Group id not found', 'Something Went Wrong.Please Try Again');
            
       }





}


 }

