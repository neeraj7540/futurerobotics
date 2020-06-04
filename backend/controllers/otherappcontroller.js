const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const otherApptable = db.models.otherapps;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');

module.exports = {

  addAppByAdmin: async (req, res) => {
    
                try {
                    console.log(req.body);
                    
                    const item = await otherApptable.findOne({
                            where: {
                                name: req.body.name,
                                platform:req.body.platform
                            }
                        });
                        if (!item) {
                            const data = req.body;
                            data.status = '1'
                            const itemAdded = await otherApptable.create(data);
                            if (itemAdded) {
                                  
                                    return apiResponseHelper.post(res, true, 'App Added Successfully!', {});
                            } else {
                                   return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                            }
                        } else {
                            return apiResponseHelper.onError(res, false,  'App with same name already exists', {});
                        }
            
                } catch (e) {

                    console.log(e);
        
                    return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
                }
            },

 appListAdmin: async (req, res) => {
         try {
                const itemList = await otherApptable.findAll({
                   attributes: ['id', 'name', 'platform','url','status','createdAt','updatedAt'],
                      raw:true,
                    order :   [
                            ['id', 'DESC']
                    ]
                
          });
                
            if (itemList) {
               
                 return apiResponseHelper.post(res, true, 'App list',itemList);
                } else {
                    return apiResponseHelper.post(res, true, 'App list',{});
        }
           } catch (e) {
              
            return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
           }
 },




 deleteAppAdmin: async (req, res) => {
            try {
                const item = await otherApptable.findOne({
                    attributes: ['id','name'],
                    where: {
                        id: req.params.id
                    }
                });
                if (item) {
    
                    const deleteItem = await otherApptable.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    if (deleteItem) {
                        return apiResponseHelper.post(res, true, 'App Successfully Deleted!',{});
    
                    } else {
                       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        
                    }
                } else {
                    return apiResponseHelper.onError(res, false, 'App Not Exists', {});
                
    
                }
            } catch (e) {
                return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
            }
        },



appEditAdmin : async (req, res) => {

    try {
       
      
            const item = await otherApptable.findOne({
                attributes:['id','name'],
                where: {
                    id: req.params.id
                }
            });
            if (item) {
                const itemCheck = await otherApptable.findOne({
                   where: {
                        name: req.body.name,
                        platform:req.body.platform
                    },
                    raw:true
                });
           
                if(itemCheck  &&  itemCheck.id!=req.params.id){
                  
                    return apiResponseHelper.onError(res, false,  'App same name already exists', {});

                }else{
                    const data = req.body;
                    
                      const updateEntry =  await otherApptable.update(
                        data,
                        {
                            where: {
                            id: req.params.id,
        
                            }
                        });  

                     if(updateEntry){
                        return apiResponseHelper.post(res, true, 'App updated Successfully!', {});

                     }else{

                        return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');

                     }

                }

            } else {
             
                return apiResponseHelper.onError(res, false,  'App not exists', {});
            
            }
       

    }
    catch (e) {

      return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!',e);
       }

  }


 }

