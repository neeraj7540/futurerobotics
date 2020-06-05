const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const addsTable = db.models.adds;
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');
module.exports = {

    addAddAdmin: async (req, res) => {
    
    try {
        const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
        if (uploadFile) {
        const item = await addsTable.findOne({
                where: {
                    title: req.body.title,
                }
            });
            if (!item) {
                const data = req.body;
                data.image = uploadFile[0].imageName;
                data.status = '1'
                const itemAdded = await addsTable.create(data);
                if (itemAdded) {
                    return apiResponseHelper.post(res, true, 'ADD Added Successfully!', {});
                } else {
                     return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
                }
            } else {
                return apiResponseHelper.onError(res, false,  'Add with same title already exists', {});
            }
        }
            else{
                return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{} );

            }

    } catch (e) {

        return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
    
    }
  },

  addListAdmin: async (req, res) => {
    try {
           const itemList = await addsTable.findAll({
              attributes: ['id', 'title','status','image','url','createdAt','updatedAt'],
                 raw:true,
             order :   [
                   ['id', 'DESC']
            ]
           
     });
           
       if (itemList) {
          
            return apiResponseHelper.post(res, true, 'Add list',itemList);
           } else {
               return apiResponseHelper.post(res, true, 'Add list',{});
   }
      } catch (e) {
         
       return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
           
      }
},




deleteAddAdmin: async (req, res) => {
    try {
        const item = await addsTable.findOne({
            attributes: ['id','image'],
            where: {
                id: req.params.id
            }
        });
        if (item) {

            const deleteItem = await addsTable.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (deleteItem) {
                fs.unlinkSync(item.dataValues.image);
           
                return apiResponseHelper.post(res, true, 'Add Successfully Deleted!',{});

            } else {
               return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});

            }
        } else {
            return apiResponseHelper.onError(res, false, 'Add Not Exists', {});
        

        }
    } catch (e) {
        return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
        
    }
},



addEditAdmin : async (req, res) => {

    try {
        const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
       
        if (uploadFile) {
            const item = await addsTable.findOne({
                attributes:['id','image'],
                where: {
                    id: req.params.id
                }
            });
            if (item) {
                const checkItem = await addsTable.findOne({
                    attributes:['id','image'],
                   where: {
                       title: req.body.title,
                    },
                    raw:true
                });
           
              
                if(checkItem  &&  checkItem.id!=req.params.id){
                  
                    return apiResponseHelper.onError(res, false,  'Add with same title already exists', {});

                }else{
                    const data = req.body;
                    if(req.body.isImage=="false"){
                       data.image = item.dataValues.image;
                    }else{
                        data.image = uploadFile[0].imageName;
                    }

                      const updateItem =  await addsTable.update(
                        data,
                        {
                            where: {
                            id: req.params.id,
        
                            }
                        });  

                     if(updateItem){
                        return apiResponseHelper.post(res, true, 'Add updated Successfully!', {});

                     }else{

                        return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');

                     }

                }

            } else {
                 fs.unlinkSync(uploadFile[0].imageName);
                return apiResponseHelper.onError(res, false,  'Add not exists', {});
            
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
