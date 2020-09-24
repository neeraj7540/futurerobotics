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

const messages=db.models.messages;

const socket_group=db.models.socket_group;

const groupMessages=db.models.group_messages;

const updateMessages=db.models.update_messages;

appUsersTable.hasMany(groupMessages, { foreignKey: 'senderId' });

//const feedCommentTable1 = db.models.feedcomment;

const commentLikedeslike=db.models.comment_likedeslike;
console.log(commentLikedeslike);

reportedFeedsTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
reportedFeedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });
feedsTable.belongsTo(feeCatTable, { foreignKey: 'feedCatId' });
//feedsTable.belongsTo(feeCatTable, { foreignKey: 'id' });



feedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });
//reportedFeedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });

//feedsTable.belongsTo(feedCommentTable, { foreignKey: 'id' });hasOne
//feedsTable.hasOne(feedCommentTable, { foreignKey: 'id' }); //test
//feedsTable.hasOne(feedCommentTable1, { foreignKey: 'feedId' });//correct

feedsTable.hasMany(feedCommentTable, { foreignKey: 'feedId' });

//feedCommentTable.hasOne(feedsTable, { foreignKey: 'id' });
feedCommentTable.belongsTo(appUsersTable, { foreignKey: 'userId' });

feedCommentTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
//feedCommentTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


//likeDeslikeTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
likeDeslikeTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


//--------------
appUsersTable.hasMany(messages, { foreignKey: 'receiverId' });


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

          {
            model: feedCommentTable,
            attributes: ['id','feedId','userId','comment','status','createdAt','updatedAt'],
            // include: [
            //   {
            //     model: appUsersTable,
            //     attributes: ['id','name','email','image','status']
               
            //   }
            // ]
           
          },


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


    const reporteTable =  await reportedFeedsTable.update(
      data,
      {
          where: {
            feedId: req.body.feedId,
  
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
      attributes:['id','feedId','userId','status'],
      group:['feedId'],
      where: {
        status: '1'
    },
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

,

updateCommentStatus:  async (req, res) => {


    try{

    const item = await feedCommentTable.findOne({
    attributes:['id','status'],
    where: {
        id: req.body.commentId
    }

   });

   
  
   if(item){
    let data = {
      status:req.body.status
    }
       

    const updateEntry =  await feedCommentTable.update(
      data,
      {
          where: {
          id: req.body.commentId,
  
          }
      }); 


      if(updateEntry){

        return apiResponseHelper.post(res, true, 'Status has been updated!',{});
      }else{
        return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
      }


   }else{

    return apiResponseHelper.onError(res, false, 'Comment not found',{});


   }
   

    }
    catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}


} ,
getAllFeeds_data:  async (req, res) => {


  try{

    const itemList = await feedsTable.findAll({
     attributes: ['id','feedCatId','userId','feed_id','title','Date','like','comment_count','deslike','description','image','status','createdAt','updatedAt'],
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
            model: feedCommentTable,
            attributes: ['id','commentId','feedId','userId','comment','comment_image','status','like','deslike','createdAt','updatedAt'],
            include: [
              {
                model: appUsersTable,
                attributes: ['id','name','email','image','status']
               
              }
            ],

        limit: 1,
          
           order :   [
              ['id', 'DESC']
               ]
           },


      ],
      //limit: 1,
      
   
});

var testdata=itemList;
console.log(testdata);


 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Feeds List',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Feeds List',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,


getAllLikes_List:  async (req, res) => {

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

getAllComments_list:  async (req, res) => {

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

like_deslike :  async (req, res) => {
  try{
    const id=req.params.id;
    const feed_id=req.params.feed_id;
  

    const likedeslike = await likeDeslikeTable.findOne({
   
      where:{
        feedId:req.params.feed_id,
        userId:req.params.id,
     
      },
    }) 
   // console.log(likedeslike)

    if(!likedeslike){
      const data1 = req.body;
      data1.feedId = req.params.feed_id;
      data1.userId=req.params.id;
      data1.likeDeslike=req.body.likeDeslike;
      data1.status = '1'
    
      const itemAdded = await likeDeslikeTable.create(data1);


      const get_available_data1 = await likeDeslikeTable.count({
        where:{
            feedId:req.params.feed_id,
          likeDeslike:'1'
         },
          }) 
       var test1=get_available_data1;
       console.log(test1);
        const get_available_data2 = await likeDeslikeTable.count({
         where:{
             feedId:req.params.feed_id,
           likeDeslike:'0'
          },
           }) 
         var test2=get_available_data2;
         console.log(test2)
//---------------------------------------------------------------

let data2 = {
  like:test1,
  deslike:test2

}

 const updateEntry =  await feedsTable.update(
  data2,
  {
      where: {
        feed_id:req.params.feed_id,

      }
  });






//----------------------------------------------------------------------

         let data = {
          like_count:test1,
          deslike_count:test2

        }

         const updateEntry12345 =  await likeDeslikeTable.update(
          data,
          {
              where: {
                feedId:req.params.feed_id,
      
              }
          });

          const countdata = await likeDeslikeTable.findOne({
            attributes: ['id','feedId','like_count','deslike_count'],
              where:{
                feedId:req.params.feed_id,
                //userId:req.params.id,
             
              },
            }) 


      if (itemAdded) {
                      
        return apiResponseHelper.post(res, true, 'New Like/Deslike Add', countdata);
      } else {
       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
}


    }
   
      const data1 = req.body;
      data1.feedId = req.params.feed_id;
      data1.userId=req.params.id;
      data1.likeDeslike=req.body.likeDeslike;
      const updateEntry =  await likeDeslikeTable.update(
        data1,
        {
            where: {
            id:likedeslike.id,
    
            }
        });

        const get_available_data1 = await likeDeslikeTable.count({
          where:{
              feedId:req.params.feed_id,
            likeDeslike:'1'
           },
            }) 
         var test1=get_available_data1;
         console.log(test1);
          const get_available_data2 = await likeDeslikeTable.count({
           where:{
               feedId:req.params.feed_id,
             likeDeslike:'0'
            },
             }) 
           var test2=get_available_data2;
           console.log(test2)
  
           let data = {
            like_count:test1,
            deslike_count:test2
  
          }
//---------------------------------------------------------------------
let data3= {
  like:test1,
  deslike:test2

}

 const updateEntry12 =  await feedsTable.update(
  data3,
  {
      where: {
        feed_id:req.params.feed_id,

      }
  });





//----------------------------------------------------------------------------------------------  
          const updateEntry1 =  await likeDeslikeTable.update(
            data,
            {
                where: {
                  feedId:req.params.feed_id,
        
                }
            });

            const countdata = await likeDeslikeTable.findOne({
             attributes: ['id','feedId','like_count','deslike_count'],
               where:{
                 feedId:req.params.feed_id,
                 //userId:req.params.id,
              
               },
             }) 
  

        
        if (updateEntry) {
                      
          return apiResponseHelper.post(res, true, 'New Like/Deslike Update', countdata);
        } else {
         return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
  }

    
  }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}

},



get_cat_data:  async (req, res) => {


  try{

    const title=req.params.title;
    console.log(title)
    if(title !=='All Post'){
      //console.log('Neeraj kumar')
 const itemList = await feedsTable.findAll({
     attributes: ['id','feedCatId','userId','feed_id','title','Date','like','comment_count','deslike','description','image','status','createdAt','updatedAt'],
     where:{
      title:req.params.title
    },
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
            model: feedCommentTable,
            attributes: ['id','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
            include: [
              {
                model: appUsersTable,
                attributes: ['id','name','email','image','status']
               
              }
            ]
           
          },

],
      order :   [
      ['id', 'DESC']
       ]
   
});
if (itemList) {
            
  return apiResponseHelper.post(res, true, 'Feeds Category Wise List',itemList);
} else {
    return apiResponseHelper.post(res, true, 'Feeds Category Wise List',{});
}
    
    }
    else{
      const itemList = await feedsTable.findAll({
        attributes: ['id','feedCatId','userId','feed_id','title','Date','like','comment_count','deslike','description','image','status','createdAt','updatedAt'],
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
               model: feedCommentTable,
               attributes: ['id','commentId','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
               include: [
                 {
                   model: appUsersTable,
                   attributes: ['id','name','email','image','status']
                   }
               ],
   
          
              },
   
   
         ],
         order :   [
          ['id', 'DESC']
           ]
         
         
      
   });
  
   if (itemList) {
            
    return apiResponseHelper.post(res, true, 'Feeds Category Wise List',itemList);
  } else {
      return apiResponseHelper.post(res, true, 'Feeds Category Wise List',{});
  }

    }


 


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,

feed_comment_data :  async (req, res) => {
  try{

 
    const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
    const data = req.body;
    data.image = uploadFile[0].imageName;
    var data2=data.image

    if (req.body.image== "") {
      var image="";
    }
    
    else if(data2=="public/images/default/main.png"){
      var image=""
    }
    else{
      
      var image='http://34.232.2.249:4100/'+data2;
    }




     const data1 = req.body;
      data1.feedId = req.params.feed_id;
      data1.userId=req.params.id;
      data1.comment_image =image;
     // data1.comment_image = 'http://34.232.2.249:4100/'+uploadFile[0].imageName;
      data1.comment=req.body.comment;
      data1.status = '1'
    
      const itemAdded = await feedCommentTable.create(data1);
     // console.log(itemAdded.dataValues.id)

      
      const upadete=await feedCommentTable.update(
        {
        commentId:itemAdded.dataValues.id,
        },
        {
        where:{
          id:itemAdded.dataValues.id
        }
      
    })
     const dataget1=await feedCommentTable.findOne({
      attributes:['id','commentId','feedId','userId','comment','comment_image','createdAt','updatedAt'],
        
      where:{
        id:itemAdded.dataValues.id
      }

    })

     
      //console.log(itemAdded)
      if (itemAdded) {
                      
        return apiResponseHelper.post(res, true, 'New Comment Add', dataget1);
      } else {
       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
}

 }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}

},


get_id_data:  async (req, res) => {


  try{
const feed_id=req.params.feed_id;
    const itemList = await feedsTable.findOne({
     attributes: ['id','feedCatId','userId','feed_id','title','Date','like','comment_count','deslike','description','image','status','createdAt','updatedAt'],
     where:{
      feed_id:req.params.feed_id
    },
      include: [ 
          {
            model: appUsersTable,
            attributes: ['id','name','email','image','status']
            
          },
         
          //  {
          //   model: feedCommentTable,
          //   attributes: ['id','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
          //   include: [
          //     {
          //       model: appUsersTable,
          //       attributes: ['id','name','email','image','status']
               
          //     }
          //   ]
           
          // },


      ],
      
      // include: [ 
      //    {
      //       model: feedCommentTable,
      //       attributes: ['id','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
      //       where:{
      //         feedId:1
      //       },
      //       include: [
      //         {
      //           model: appUsersTable,
      //           attributes: ['id','name','email','image','status']
               
      //         }
      //       ]
           
      //     },

      // ],
     
      order :   [
      ['id', 'DESC']
       ]
   
});

//var testdata=itemList;
//console.log(testdata);


 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Feeds Profile Data',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Feeds Profile Data',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,


get_coment_data:  async (req, res) => {
 try{
const feed_id=req.params.feed_id;
    const itemList = await feedCommentTable.findAll ({
      attributes: ['id','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
      where:{
        feedId:req.params.feed_id
    },
      include: [ 
          {
            model: appUsersTable,
            attributes: ['id','name','email','image','status']
            
          },
         
    ],
      
     order :   [
      ['id', 'DESC']
       ]
   
});




 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Feeds Comment Data',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Feeds Comment Data',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,


community_feed_details:  async (req, res) => {


  try{
const feed_id=req.params.feed_id;
    const itemList = await feedsTable.findOne({
     attributes: ['feedCatId','userId','feed_id','title','Date','like','comment_count','deslike','description','image','status','createdAt','updatedAt'],
    include: [ 
          {
            model: appUsersTable,
            attributes: ['id','name','email','image','status']
            
          },
         
           {
            model: feedCommentTable,
            attributes: ['commentId','feedId','userId','comment','comment_image','status','like','deslike','createdAt','updatedAt'],
            required: false,
            include: [ 
              {
                model: appUsersTable,
                attributes: ['id','name','email','image','status']
               
              }
            ]
           
          },


      ],
      where:{
        feed_id:req.params.feed_id
      },
    order :   [
      ['id', 'DESC']
       ]
   
});




 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Feeds Profile Data',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Feeds Profile Data',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,



//---------------------Comment Like or deslike-----------------------------------------------
comment_like_deslike :  async (req, res) => {
  try{
    const id=req.params.id;
    const commentId=req.params.commentId;
    

    const likedeslike = await commentLikedeslike.findOne({
     
      where:{
        commentId:req.params.commentId,
        userId:req.params.id,
     
      },
    }) 
   // console.log(likedeslike)

    if(!likedeslike){
      const data1 = req.body;
      data1.commentId = req.params.commentId;
      data1.userId=req.params.id;
      data1.likeDeslike=req.body.likeDeslike;
      data1.status = '1'
    
      const itemAdded = await commentLikedeslike.create(data1);


      const get_available_data1 = await commentLikedeslike.count({
        where:{
          commentId:req.params.commentId,
          likeDeslike:'1'
         },
          }) 
       var test1=get_available_data1;
       console.log(test1);
        const get_available_data2 = await commentLikedeslike.count({
         where:{
          commentId:req.params.commentId,
           likeDeslike:'0'
          },
           }) 
         var test2=get_available_data2;
         console.log(test2)

         let data = {
          like_count:test1,
          deslike_count:test2

        }
//-----------------------------------------------------
let data2 = {
  like:test1,
  deslike:test2

}


const updateEntry2 =  await feedCommentTable.update(
  data2,
  {
      where: {
        commentId:req.params.commentId,

      }
  });



//-------------------------------------------------------
         const updateEntry =  await commentLikedeslike.update(
          data,
          {
              where: {
                commentId:req.params.commentId,
      
              }
          });

          const countdata = await commentLikedeslike.findOne({
            attributes: ['id','commentId','like_count','deslike_count'],
              where:{
                commentId:req.params.commentId,
                //userId:req.params.id,
             
              },
            }) 


      if (itemAdded) {
                      
        return apiResponseHelper.post(res, true, 'New Like/Deslike Add', countdata);
      } else {
       return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
}


    }
   
      const data1 = req.body;
      data1.commentId = req.params.commentId;
      data1.userId=req.params.id;
      data1.likeDeslike=req.body.likeDeslike;
      const updateEntry =  await commentLikedeslike.update(
        data1,
        {
            where: {
            id:likedeslike.id,
    
            }
        });

        const get_available_data1 = await commentLikedeslike.count({
          where:{
            commentId:req.params.commentId,
            likeDeslike:'1'
           },
            }) 
         var test1=get_available_data1;
         console.log(test1);
          const get_available_data2 = await commentLikedeslike.count({
           where:{
            commentId:req.params.commentId,
             likeDeslike:'0'
            },
             }) 
           var test2=get_available_data2;
           console.log(test2)
  
           let data = {
            like_count:test1,
            deslike_count:test2
  
          }
          let data3 = {
            like:test1,
            deslike:test2
  
          }


//--------------------------------------
const updateEntry2 =  await feedCommentTable.update(
  data3,
  {
      where: {
        commentId:req.params.commentId,

      }
  });







 //----------------------------------------------------- 
          const updateEntry1 =  await commentLikedeslike.update(
            data,
            {
                where: {
                  commentId:req.params.commentId,
        
                }
            });

            const countdata = await commentLikedeslike.findOne({
             attributes: ['id','commentId','like_count','deslike_count'],
               where:{
                commentId:req.params.commentId,
                 //userId:req.params.id,
              
               },
             }) 
  

        
        if (updateEntry) {
                      
          return apiResponseHelper.post(res, true, 'New Like/Deslike Update', countdata);
        } else {
         return apiResponseHelper.onError(res, false,  'Something Went Wrong.Please Try Again',{});
  }

    
  }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}

},


delete_post :  async (req, res) => {
  try{
     req.checkBody('userId', 'userId is required in body').notEmpty();
      req.checkBody('feed_id', 'feed_id is required in body').notEmpty();

      const error = req.validationErrors();
      const userId=req.body.userId;
      const feed_id=req.body.feed_id;
  if (error) {
    
    return apiResponseHelper.onError(res, false, error[0].msg, {});
    
  }
  const updateEntrys=  await feedsTable.findOne(
    {
       where: {
         userId:req.body.userId,
         feed_id:req.body.feed_id
    }
   });

   if(updateEntrys){

const updateEntry=  await feedsTable.destroy(
       {
          where: {
            userId:req.body.userId,
            feed_id:req.body.feed_id
       }
      });

      const updateEntry1=  await feedCommentTable.destroy(
        {
           where: {
             //userId:req.body.userId,
             feedId:req.body.feed_id
        }
       });

       const updateEntry2=  await likeDeslikeTable.destroy(
        {
           where: {
             //userId:req.body.userId,
             feedId:req.body.feed_id
        }
       });

       return apiResponseHelper.post(res, true, 'Post Delete successfully', updateEntry);

      }
      else{

        return apiResponseHelper.onError(res, false, 'Data Not Found',{});

      }
      




 
    

     
 

 }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}

},


delete_comment :  async (req, res) => {
  try{
     req.checkBody('userId', 'userId is required in body').notEmpty();
      req.checkBody('commentId', 'commentId is required in body').notEmpty();

      const error = req.validationErrors();
      const userId=req.body.userId;
      const commentId=req.body.commentId;
  if (error) {
    
    return apiResponseHelper.onError(res, false, error[0].msg, {});
    
  }
  const updateEntrys=  await feedCommentTable.findOne(
    {
       where: {
        userId:req.body.userId,
        commentId:req.body.commentId
    }
   });

   if(updateEntrys){



      const updateEntry1=  await feedCommentTable.destroy(
        {
           where: {
            
             commentId:req.body.commentId
        }
       });

       const updateEntry2=  await commentLikedeslike.destroy(
        {
           where: {
            
             commentId:req.body.commentId
        }
       });

       return apiResponseHelper.post(res, true, 'Comment Delete successfully', updateEntry1);

      }
      else{

        return apiResponseHelper.onError(res, false, 'Data Not Found',{});

      }
      




 
    

     
 

 }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}

},


edit_post :  async (req, res) => {
  try{
    // const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
    // const data = req.body;
    // data.image = uploadFile[0].imageName;
    // var data1=data.image
    //data.userId=req.body.userId;
    //data.feed_id=req.body.feed_id;
    //data.title=req.body.title;
    //data.description=req.body.description;
    
   // console.log(data1)
      
 
  const updateEntrys=  await feedsTable.findOne(
    {
       where: {
         userId:req.body.userId,
         feed_id:req.body.feed_id
    }
   });

   //console.log(updateEntrys.title);
      if(updateEntrys){

        if (req.body.title== "") {
          var title=updateEntrys.title;
        }
        else{
          var title=req.body.title;
        }
        //console.log(title)
        if (req.body.description== "") {
          var description=updateEntrys.description;
        }
        else{
          var description=req.body.description;
        }

        // if (req.body.image== "") {
        //   var image=updateEntrys.image;
        // }
        
        // else if(data1=="public/images/default/main.png"){
        //   var image=updateEntrys.image
        // }
        // else{
          
        //   var image='http://34.232.2.249:4100/'+data1;
        // }

        //console.log(image)
        const feedupdate =await feedsTable.update(
          {
            title:title,
            description:description,
            //image:image
          },{
            where: {
                    userId:req.body.userId,
                    feed_id:req.body.feed_id
                      }
 }
)


if(feedupdate){
  const Entrys=  await feedsTable.findOne(
    {
       where: {
         userId:req.body.userId,
         feed_id:req.body.feed_id
    }
   });

 return apiResponseHelper.post(res, true, 'Post Updated Successfully', Entrys);
}
else{
  return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
}

     }
      else{

        return apiResponseHelper.onError(res, false, 'Data Not Found',{});

       }
      




 
    

     
 

 }

catch (e) {
 console.log(e);

return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
  
}

},


search_feed:  async (req, res) => {
try{
  req.checkBody('title', 'title is required in body').notEmpty();
  

  const error = req.validationErrors();
  const title = req.body.title;
  

if (error) {

return apiResponseHelper.onError(res, false, error[0].msg, {});

}

var Sequelize=require('sequelize');
const Op = Sequelize.Op

 const itemList = await feedsTable.findAll({
    where: {
      title: {
        [Op.like]: '%' + req.body.title + '%'
      }
    },

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
            model: feedCommentTable,
            attributes: ['id','commentId','feedId','userId','comment','comment_image','status','like','deslike','createdAt','updatedAt'],
            include: [
              {
                model: appUsersTable,
                attributes: ['id','name','email','image','status']
               
              }
            ],

        limit: 1,
          
           order :   [
              ['id', 'DESC']
               ]
           },


      ],
      //limit: 1,
      
   
});

var testdata=itemList;
console.log(testdata);


 if (itemList) {
            
        return apiResponseHelper.post(res, true, ' Search Feeds List',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Search Feeds List',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,




userlist:  async (req, res) => {


  try{

    const itemList = await appUsersTable.findAll({
      include: [
          {
            model: groupMessages,
           // attributes: ['id','name','email','image','status']
          //  where: {
          //   receiverId:req.params.id
          // },
            
            limit: 1,
          
           order :   [
             ['id', 'DESC']
               ]
      
          },
        ]
     
      
      
   
});

var testdata=itemList;
console.log(testdata);


 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'User List',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'User List',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,


massagelist:  async (req, res) => {


  try{

    const itemList = await socket_group.findAll({
      
     where:{
      userId:req.params.id
     }  
});

if(!itemList){

  return apiResponseHelper.post(res, true, 'User List',{});
}

var testdata=itemList;


var data = testdata.map(user=>user.groupId)

var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var arrayofTaskId = data;
const itemList1 = await updateMessages.findAll({
  where: {
    groupId: {
      [Op.in]: arrayofTaskId
      },
      senderId:{
        [Op.not]:req.params.id
      }

    
  }
 })//.then(function(result) {
//   return res.json(result)
// })

//console.log(itemList1)









 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'User List',itemList1);
      } else {
          return apiResponseHelper.post(res, true, 'User List',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,







}