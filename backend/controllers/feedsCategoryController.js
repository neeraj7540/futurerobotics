const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const feedsCategory = db.models.feedscategory;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');

module.exports = {

  addFeedsCategoryAdmin: async (req, res) => {
    
                try {
                    console.log(req.body);
                    
                    const feedsCategoryItem = await feedsCategory.findOne({
                            where: {
                                name: req.body.name,
                            }
                        });
                        if (!feedsCategoryItem) {
                            const data = req.body;
                            data.status = '1'
                            const feedsCategoryAdded = await feedsCategory.create(data);
                            if (feedsCategoryAdded) {
                                  
                                    return apiResponseHelper.post(res, true, 'Feeds Category Added Successfully!', {});
                            } else {
                                   return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                            }
                        } else {
                            return apiResponseHelper.onError(res, false,  'Feeds category with  same name already exists', {});
                        }
            
                } catch (e) {

                    console.log(e);
        
                    return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
                }
            }
            ,

 feedsCategoryListAdmin: async (req, res) => {
         try {
                const feedsCategoryList = await feedsCategory.findAll({
                   attributes: ['id', 'name', 'description','status','createdAt','updatedAt'],
                      raw:true,
                    order :   [
                            ['id', 'DESC']
                    ]
                
          });
                
            if (feedsCategoryList) {
               
                 return apiResponseHelper.post(res, true, 'Feeds category list',feedsCategoryList);
                } else {
                    return apiResponseHelper.post(res, true, 'Feeds category list',{});
        }
           } catch (e) {
              
            return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
                
           }
 },




 deleteFeedsCategoryAdmin: async (req, res) => {
            try {
                const feedsCategoryItem = await feedsCategory.findOne({
                    attributes: ['id','name'],
                    where: {
                        id: req.params.id
                    }
                });
                if (feedsCategoryItem) {
    
                    const deleteFeedsCategory = await feedsCategory.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    if (deleteFeedsCategory) {
                        return apiResponseHelper.post(res, true, 'Feeds Category Successfully Deleted!',{});
    
                    } else {
                       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        
                    }
                } else {
                    return apiResponseHelper.onError(res, false, 'Feeds Category Not Exists', {});
                
    
                }
            } catch (e) {
                return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                
            }
        },



feedsCategoryEditAdmin : async (req, res) => {

    try {
       
      
            const feedsCategoryItem = await feedsCategory.findOne({
                attributes:['id','name'],
                where: {
                    id: req.params.id
                }
            });
            if (feedsCategoryItem) {
                const feedsCategoryCheck = await feedsCategory.findOne({
                   where: {
                        name: req.body.name,
                    },
                    raw:true
                });
           
                if(feedsCategoryCheck  &&  feedsCategoryCheck.id!=req.params.id){
                  
                    return apiResponseHelper.onError(res, false,  'Feeds Category same name already exists', {});

                }else{
                    const data = req.body;
                    
                      const updateEntry =  await feedsCategory.update(
                        data,
                        {
                            where: {
                            id: req.params.id,
        
                            }
                        });  

                     if(updateEntry){
                        return apiResponseHelper.post(res, true, 'Feeds Category updated Successfully!', {});

                     }else{

                        return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');

                     }

                }

            } else {
             
                return apiResponseHelper.onError(res, false,  'Feeds Category not exists', {});
            
            }
       

    }
    catch (e) {

      return apiResponseHelper.onError(res, false,'Something Went Wrong.Please Try Again!',e);
       }

  }


 }

