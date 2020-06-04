const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const crmpagestable = db.models.crmpages;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');

module.exports = {

    addPageAdmin: async (req, res) => {
    
                try {
                    const item = await crmpagestable.findOne({
                            where: {
                                title: req.body.title,
                            }
                        });
                        if (!item) {
                            const data = req.body;
                            data.status = '1'
                            const itemAdded = await crmpagestable.create(data);
                            if (itemAdded) {
                                  
                                    return apiResponseHelper.post(res, true, 'Page Added Successfully!', {});
                            } else {
                                   return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                            }
                        } else {
                            return apiResponseHelper.onError(res, false,  'Page same name already exists', {});
                        }
            
                } catch (e) {

                    console.log(e);
        
                    return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
                }
            },

 pageListAdmin: async (req, res) => {
         try {
                const itemList = await crmpagestable.findAll({
                   attributes: ['id', 'title', 'content','status','createdAt','updatedAt'],
                      raw:true,
                    order :   [
                            ['id', 'DESC']
                    ]
                
          });
                
            if (itemList) {
               
                 return apiResponseHelper.post(res, true, 'Page list',itemList);
                } else {
                    return apiResponseHelper.post(res, true, 'Page list',{});
        }
           } catch (e) {
              
            return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
           }
 },




 deletePageAdmin: async (req, res) => {
            try {
                const item = await crmpagestable.findOne({
                    attributes: ['id','title'],
                    where: {
                        id: req.params.id
                    }
                });
                if (item) {
    
                    const deleteItem = await crmpagestable.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    if (deleteItem) {
                        return apiResponseHelper.post(res, true, 'Page Successfully Deleted!',{});
    
                    } else {
                       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        
                    }
                } else {
                    return apiResponseHelper.onError(res, false, 'Page Not Exists', {});
                
    
                }
            } catch (e) {
                return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
            }
        },



        pageEditAdmin : async (req, res) => {

    try {
       
      
            const item = await crmpagestable.findOne({
                attributes:['id','title'],
                where: {
                    id: req.params.id
                }
            });
            if (item) {
                const itemCheck = await crmpagestable.findOne({
                   where: {
                    title: req.body.title,
                    },
                    raw:true
                });
           
                if(itemCheck  &&  itemCheck.id!=req.params.id){
                  
                    return apiResponseHelper.onError(res, false,  'Page with same title already exists', {});

                }else{
                    const data = req.body;
                    
                      const updateEntry =  await crmpagestable.update(
                        data,
                        {
                            where: {
                            id: req.params.id,
        
                            }
                        });  

                     if(updateEntry){
                        return apiResponseHelper.post(res, true, 'Page updated Successfully!', {});

                     }else{

                        return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');

                     }

                }

            } else {
             
                return apiResponseHelper.onError(res, false,  'Page not exists', {});
            
            }
       

    }
    catch (e) {

      return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!',e);
       }

  }


 }

