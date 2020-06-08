const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const postTable = db.models.post;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');

module.exports = {

addPostAdmin: async (req, res) => {
    
    try {
        const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
        if (uploadFile) {
        const item = await postTable.findOne({
                where: {
                    title: req.body.title,
                }
            });
            if (!item) {
                const data = req.body;
                data.image = uploadFile[0].imageName;
                data.status = '1'
                const itemAdded = await postTable.create(data);
                if (itemAdded) {
                    return apiResponseHelper.post(res, true, 'Post added Successfully!', {});
                } else {
                     return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                }
            } else {
                return apiResponseHelper.onError(res, false,  'Post with same title already exists', {});
            }
        }
            else{
                return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{} );

            }

    } catch (e) {

        console.log(e);

        return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
    
    }
  },

  postListAdmin: async (req, res) => {
    try {
           const itemList = await postTable.findAll({
              attributes: ['id', 'title','status','image','description','createdAt','updatedAt'],
                 raw:true,
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




deletePostAdmin: async (req, res) => {
    try {
        const item = await postTable.findOne({
            attributes: ['id','image'],
            where: {
                id: req.params.id
            }
        });
        if (item) {

            const deleteItem = await postTable.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (deleteItem) {
                fs.unlinkSync(item.dataValues.image);
           
                return apiResponseHelper.post(res, true, 'Post Successfully Deleted!',{});

            } else {
               return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});

            }
        } else {
            return apiResponseHelper.onError(res, false, 'Post Not Exists', {});
        

        }
    } catch (e) {
        console.log(e);
        return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        
    }
},



postEditAdmin : async (req, res) => {

    try {
        const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
       
        if (uploadFile) {
            const item = await postTable.findOne({
                attributes:['id','image'],
                where: {
                    id: req.params.id
                }
            });
            if (item) {
                const checkItem = await postTable.findOne({
                    attributes:['id','image'],
                   where: {
                    title: req.body.title,
                    },
                    raw:true
                });
           
              
                if(checkItem  &&  checkItem.id!=req.params.id){
                  
                    return apiResponseHelper.onError(res, false,  'Post with same title already exists', {});

                }else{
                    const data = req.body;
                    if(req.body.isImage=="false"){
                       data.image = item.dataValues.image;
                    }else{
                        data.image = uploadFile[0].imageName;
                    }

                      const updateItem =  await postTable.update(
                        data,
                        {
                            where: {
                            id: req.params.id,
        
                            }
                        });  

                     if(updateItem){
                        return apiResponseHelper.post(res, true, 'Post updated Successfully!', {});

                     }else{

                        return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');

                     }

                }

            } else {
                 fs.unlinkSync(uploadFile[0].imageName);
                return apiResponseHelper.onError(res, false,  'Post not exists', {});
            
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
