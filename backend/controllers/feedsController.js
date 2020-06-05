const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const reportedFeedsTable = db.models.reportedfeed;
const feedsTable =  db.models.feed;
const appUsersTable = db.models.appusers;
const feeCatTable = db.models.feedscategory;

const likeDeslikeTable = db.models.feedlikedeslike

const feedCommentTable = db.models.feedcomment;

reportedFeedsTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
reportedFeedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });
feedsTable.belongsTo(feeCatTable, { foreignKey: 'feedCatId' });
feedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });

feedCommentTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
feedCommentTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


likeDeslikeTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
//likeDeslikeTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');

module.exports = {

getAllreportedFeeds:  async (req, res) => {
    try {
        const itemList = await reportedFeedsTable.findAll({
           attributes: ['id', 'feedId', 'userId','status','reason','createdAt','updatedAt'],
           include: [
            {
              model: feedsTable,
              attributes: ['id','description','image','status','createdAt','updatedAt'],
              required: true
            },


            {
                model: appUsersTable,
                attributes: ['id','name','email','image'],
                required: true
              },
          ],



           order :   [
           ['id', 'DESC']
            ]
        
  });
        
    if (itemList) {
       
         return apiResponseHelper.post(res, true, 'Reported Feeds List',itemList);
        } else {
            return apiResponseHelper.post(res, true, 'Reported Feeds List',{});
}
   } catch (e) {
       console.log(e);
      
    return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');
        
   }


}    
,

getAllFeeds:  async (req, res) => {


  try{

    const itemList = await feedsTable.findAll({
      attributes: ['id','feedCatId','userId','description','image','status','createdAt','updatedAt'],
      include: [
          {
            model: appUsersTable,
            attributes: ['id','name','email','image','status']
            
          },

          {
            model: feeCatTable,
            attributes: ['id','name','description','status','createdAt','updatedAt']
           
          },

          {
            model: likeDeslikeTable,
            attributes: ['id','feedId','userId','likeDeslike','status','createdAt','updatedAt'],
            // include: [
            //   {
            //     model: appUsersTable,
            //     attributes: ['id','name','email','image','status']
               
            //   }
            // ]
           
          },

          // {
          //   model: feedCommentTable,
          //   attributes: ['id','feedId','userId','comment','status','createdAt','updatedAt'],
          //   include: [
          //     {
          //       model: appUsersTable,
          //       attributes: ['id','name','email','image','status']
               
          //     }
          //   ]
           
          // },


      ],
      order :   [
      ['id', 'DESC']
       ]
   
});

      if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Feeds List',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Feeds List',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }






}  






,
updateFeedStatus :  async (req, res) => {
try{
  const item = await feedsTable.findOne({
    attributes:['id','status'],
    where: {
        id: req.body.feedId
    }

   });

   let data = {
     status:req.body.status
   }

  if(item){
   const updateEntry =  await feedsTable.update(
    data,
    {
        where: {
        id: req.body.feedId,

        }
    }); 


    if(updateEntry){

      return apiResponseHelper.post(res, true, 'Status has been updated!',{});
    }else{
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
    }

  }
  
  
} catch (e) {
  console.log(e);
 
return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
   
}


}

}