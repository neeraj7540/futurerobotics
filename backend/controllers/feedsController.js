const config = require('config');
const db = require('../db/db');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const reportedFeedsTable = db.models.reportedfeed;
const feedsTable =  db.models.feed;
const appUsersTable = db.models.appusers;
const feeCatTable = db.models.feedscategory;
const groupsTable = db.models.groups;
const reportedTable = db.models.reportedfeed;

const postTable = db.models.post;

const likeDeslikeTable = db.models.feedlikedeslike

const feedCommentTable = db.models.feedcomment;

reportedFeedsTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
reportedFeedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });
feedsTable.belongsTo(feeCatTable, { foreignKey: 'feedCatId' });
feedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });

feedCommentTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
feedCommentTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


//likeDeslikeTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
likeDeslikeTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');

module.exports = {

getAllreportedFeeds:  async (req, res) => {
    try {
        const itemList = await reportedFeedsTable.findAll({
           attributes: ['id', 'feedId', 'userId','status','reason','createdAt','updatedAt'],
           group: ['feedId'],
           include: [
            {
              model: feedsTable,
              attributes: ['id','description','feedCatId','image','status','createdAt','updatedAt'],
              include: [
                {
                  attributes: ['id','name'],
                   model: feeCatTable
                }
              ]  
            }
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

          // {
          //   model: likeDeslikeTable,
          //   attributes: ['id','feedId','userId','likeDeslike','status','createdAt','updatedAt'],
          //   include: [
          //     {
          //       model: appUsersTable,
          //       attributes: ['id','name','email','image','status']
               
          //     }
          //   ]
           
          // },

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
,

getDashBoardData :  async (req, res) => {

  try{
   
     const users = await appUsersTable.findAll({
       attributes:['id'],
       raw:true,
     })

     const groups = await groupsTable.findAll({
      attributes:['id'],
      raw:true,
    })

    const posts = await postTable.findAll({
      attributes:['id'],
      raw:true,
    })

    const reports = await reportedTable.findAll({
      attributes:['id','feedId','userId'],
      group:['feedId'],
      raw:true,
    })
    
    return apiResponseHelper.post(res, true, 'Dashboard Items',{totalUsers:users.length,totalGroups:groups.length,totalPost:posts.length,totalReport:reports.length});

  }
 catch (e) {
  console.log(e);
 
return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
   
}


}
,


getAllLikes:  async (req, res) => {

  try{

    const likedeslike = await likeDeslikeTable.findAll({
      attributes: ['id','feedId','userId','likeDeslike','status','createdAt','updatedAt'],
      where:{
        feedId:req.params.id
      },
      include: [
            {
              model: appUsersTable,
              attributes: ['id','name','email','image','status']
             
            }
          ]

    })

    if(likedeslike.length>0){
      return apiResponseHelper.post(res, true, 'details',likedeslike);

    }else{
      return apiResponseHelper.post(res, true, 'details',{});
    }

  }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}


},


getAllComments:  async (req, res) => {

  try{

    const item = await feedCommentTable.findAll({
      attributes: ['id','feedId','userId','comment','status','createdAt','like','deslike','updatedAt'],
      where:{
        feedId:req.params.id
      },
      include: [
            {
              model: appUsersTable,
              attributes: ['id','name','email','image','status']
             
            }
          ]

    })

    if(item.length>0){
      return apiResponseHelper.post(res, true, 'details',item);

    }else{
      return apiResponseHelper.post(res, true, 'details',{});
    }

  }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}


}
,

feedReporterList:  async (req, res) => {

  try{

    const item = await reportedFeedsTable.findAll({
      attributes: ['id', 'feedId', 'userId','reason'],
      group:'userId',
      where:{
        feedId:req.params.id
      },
      include: [
            {
              model: appUsersTable,
              attributes: ['id','name','email','image','status']
             
            }
          ]
    })

    if(item.length>0){
      return apiResponseHelper.post(res, true, 'details',item);

    }else{
      return apiResponseHelper.post(res, true, 'details',{});
    }

  }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}




}

}