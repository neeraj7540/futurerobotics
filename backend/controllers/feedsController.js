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
const FCM = require('fcm-node');

const likeDeslikeTable = db.models.feedlikedeslike

const feedCommentTable = db.models.feedcomment;

const messages=db.models.messages;

const socket_group=db.models.socket_group;

const notificationData=db.models.notification_data;

console.log(notificationData)

const groupMessages=db.models.group_messages;

const updateMessages=db.models.update_messages;

//------------------------
//const socket_group=db.models.socket_group;

//const updateMessages=db.models.update_messages;




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
const appusers = require('../db/models/appusers');

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
     where:{
      status:'1'
    },
    order :   [
      ['id', 'DESC']
       ],
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

            where:{
              status:'1'
            },

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
  

    console.log('-----------------------------------------Test1')


    const likedeslike = await likeDeslikeTable.findOne({
   
      where:{
        feedId:req.params.feed_id,
        userId:req.params.id,
     
      },
    }) 
   //-------------------------------------------------------------------- Test For Notification-----------------




   const dataget = await feedsTable.findOne({
   
    where:{
      id:req.params.feed_id,
      
   
    },
  }) 

 // console.log(dataget.dataValues.userId)

  const getdevice_token = await appUsersTable.findOne({
   
    where:{
      id:dataget.dataValues.userId,
       },
  }) 

  const senderuser = await appUsersTable.findOne({
   
    where:{
      id:req.params.id,
       },
  })

  if(!likedeslike){
if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==1){
//----------------------------------------DataStore


console.log('-----------------------------------------------------Test2--------------------')

recors_upate = await notificationData.create({
  sender_id:req.params.id,
  receiver_id:dataget.dataValues.userId,
  senderName:senderuser.dataValues.name,
  senderImage:senderuser.dataValues.image,
  notification:'liked your post'
})


//---------------------------------

  var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  var fcm = new FCM(serverKey);
  var device_token=getdevice_token.dataValues.deviceToken
  var title = 'Future Robotics'
  var get_message=senderuser.dataValues.name  +" liked your post"  


  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: device_token,
    // collapse_key: 'your_collapse_key',

    notification: {
      title: title,
      body: get_message
    },

    data: {  //you can send only notification or only data(or include both)
      body: get_message,
     // receiver_data: data_to_send,
    }
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!", message);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });

 // return fcm;

}

if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==0){


  console.log("------------------------------------------------------------Test3-------------------------")
//----------------------------Update data-------------------------
recors_upate = await notificationData.create({
  sender_id:req.params.id,
  receiver_id:dataget.dataValues.userId,
  senderName:senderuser.dataValues.name,
  senderImage:senderuser.dataValues.image,
  notification:'disliked your post'
})






//-------------------------------------------------

  var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  var fcm = new FCM(serverKey);
  var device_token=getdevice_token.dataValues.deviceToken
  var title = 'Future Robotics'
  var get_message=senderuser.dataValues.name  +" disliked your post"  


  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: device_token,
    // collapse_key: 'your_collapse_key',

    notification: {
      title: title,
      body: get_message
    },

    data: {  //you can send only notification or only data(or include both)
      body: get_message,
     // receiver_data: data_to_send,
    }
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!", message);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });

 // return fcm;

}
  }

else{
  //-------------------------Update data information------------------------------------------

  console.log("----------------------------------------------------Test5")

  var information =await likeDeslikeTable.findOne({
    where:{
      feedId:req.params.feed_id,
      userId:req.params.id,

    }

  })

  var test=information.dataValues.likeDeslike;

  if(req.body.likeDeslike !==test){
    if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==1){
    //----------------------------------------DataStore

    console.log('------------------------------------------------Test6------------------')
    
    
    recors_upate = await notificationData.create({
      sender_id:req.params.id,
      receiver_id:dataget.dataValues.userId,
      senderName:senderuser.dataValues.name,
      senderImage:senderuser.dataValues.image,
      notification:'liked your post'
    })
    
    
    //---------------------------------
    
      var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
      var fcm = new FCM(serverKey);
      var device_token=getdevice_token.dataValues.deviceToken
      var title = 'Future Robotics'
      var get_message=senderuser.dataValues.name  +" liked your post"  
    
    
      var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: device_token,
        // collapse_key: 'your_collapse_key',
    
        notification: {
          title: title,
          body: get_message
        },
    
        data: {  //you can send only notification or only data(or include both)
          body: get_message,
         // receiver_data: data_to_send,
        }
      };
    
      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", message);
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
    
     // return fcm;
    
    }
    
    if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==0){
    //----------------------------Update data-------------------------
    recors_upate = await notificationData.create({
      sender_id:req.params.id,
      receiver_id:dataget.dataValues.userId,
      senderName:senderuser.dataValues.name,
      senderImage:senderuser.dataValues.image,
      notification:'disliked your post'
    })
    
    
    
    
    
    
    //-------------------------------------------------
    
      var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
      var fcm = new FCM(serverKey);
      var device_token=getdevice_token.dataValues.deviceToken
      var title = 'Future Robotics'
      var get_message=senderuser.dataValues.name  +" dislike your post"  
    
    
      var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: device_token,
        // collapse_key: 'your_collapse_key',
    
        notification: {
          title: title,
          body: get_message
        },
    
        data: {  //you can send only notification or only data(or include both)
          body: get_message,
         // receiver_data: data_to_send,
        }
      };
    
      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", message);
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
    
     // return fcm;
    
    }
      }

    }


  

//--------------------------------------------------------------------------
    if(!likedeslike){
      const data1 = req.body;
      data1.feedId = req.params.feed_id;
      data1.userId=req.params.id;
      data1.likeDeslike=req.body.likeDeslike;
      data1.status = '1' 
    
      const itemAdded = await likeDeslikeTable.create(data1);


      const get_available_data1 = await likeDeslikeTable.count({
        where:{
             status:'1',
            feedId:req.params.feed_id,
          likeDeslike:'1',
         // status:'1'
         },
          }) 
       var test1=get_available_data1;
       console.log("----------------------------------------------Test7")
       console.log("Total like count"+  test1);
        const get_available_data2 = await likeDeslikeTable.count({
         where:{
             
             feedId:req.params.feed_id,
           likeDeslike:'0',
         
          },
           }) 
         var test2=get_available_data2;
         console.log("Total deslike count"+ test2)
         console.log("--------------------------------------------------------Test8")
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
            attributes: ['id','feedId','userId','like_count','deslike_count'],
              where:{
                feedId:req.params.feed_id,
                userId:req.params.id,
             
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
            status:'1',
              feedId:req.params.feed_id,
            likeDeslike:'1'
           },
            }) 
         var test1=get_available_data1;
         console.log(test1);
          const get_available_data2 = await likeDeslikeTable.count({
           where:{
            status:'1',
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
             attributes: ['id','feedId','userId','like_count','deslike_count'],
               where:{
                 feedId:req.params.feed_id,
                 userId:req.params.id,
              
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
      title:req.params.title,
      status:'1'
    },
    order :   [
      ['id', 'DESC']
       ],
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
            where:{
              status:'1'
            },
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
        where:{
          status:'1'
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
               attributes: ['id','commentId','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
               where:{
                status:'1'
              },
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

      //----------------------------feed Comment Count---------------------------------------

     const countdata = await feedCommentTable.count({
       where:{
        feedId:req.params.feed_id,
        status:'1'
       }
 })

    // console.log(countdata)

     const dataupdate=await feedsTable.update({
      comment_count:countdata
     },{
       where:{
        id:req.params.feed_id
      }
    }
     )




//----------------------------------------------------------------------------------------------
      const upadete=await feedCommentTable.update(
        {
        commentId:itemAdded.dataValues.id,
        },
        {
        where:{
          id:itemAdded.dataValues.id
        }
      
    })
//----------------------------------------------------------------------------------------Firebase Notification--------------------


const dataget = await feedsTable.findOne({
   
  where:{
    id:req.params.feed_id,
    
 
  },
}) 

// console.log(dataget.dataValues.userId)

const getdevice_token = await appUsersTable.findOne({
 
  where:{
    id:dataget.dataValues.userId,
     },
}) 

const senderuser = await appUsersTable.findOne({
 
  where:{
    id:req.params.id,
     },
})


if(getdevice_token.dataValues.deviceToken){

  recors_upate = await notificationData.create({
    sender_id:req.params.id,
    receiver_id:dataget.dataValues.userId,
    senderName:senderuser.dataValues.name,
    senderImage:senderuser.dataValues.image,
    notification:'commented on your post'
  })

  
  var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  var fcm = new FCM(serverKey);
  var device_token=getdevice_token.dataValues.deviceToken
  var title = 'Future Robotics'
  var get_message=senderuser.dataValues.name  +" commented on your post"  


  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: device_token,
    // collapse_key: 'your_collapse_key',

    notification: {
      title: title,
      body: get_message
    },

    data: {  //you can send only notification or only data(or include both)
      body: get_message,
     // receiver_data: data_to_send,
    }
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!", message);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });

  



}







//-----------------------------------------------------------------------------------

     // console.log(itemAdded.dataValues.id)

      
   
     const dataget1=await feedCommentTable.findOne({
      attributes:['id','commentId','feedId','userId','comment','comment_image','createdAt','updatedAt'],

        
      where:{
        id:itemAdded.dataValues.id
      },
      include: [
        {
          model: feedsTable,
          attributes: ['comment_count']
          
        }

      ]

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
            where:{
              status:'1'
            },
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
        feed_id:req.params.feed_id,
        status:'1'
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

//-------------------------------Firebase ------------------

const dataget = await feedCommentTable.findOne({
   
  where:{
    commentId:req.params.commentId,
    
 
  },
}) 

// console.log(dataget.dataValues.userId)

const getdevice_token = await appUsersTable.findOne({
 
  where:{
    id:dataget.dataValues.userId,
     },
}) 

const senderuser = await appUsersTable.findOne({
 
  where:{
    id:req.params.id,
     },
})


if(!likedeslike){
  if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==1){
  //----------------------------------------DataStore
  
  
  recors_upate = await notificationData.create({
    sender_id:req.params.id,
    receiver_id:dataget.dataValues.userId,
    senderName:senderuser.dataValues.name,
    senderImage:senderuser.dataValues.image,
    notification:'liked your comment'
  })
  
  
  //---------------------------------
  
    var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
    var fcm = new FCM(serverKey);
    var device_token=getdevice_token.dataValues.deviceToken
    var title = 'Future Robotics'
    var get_message=senderuser.dataValues.name  +" liked your comment"  
  
  
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: device_token,
      // collapse_key: 'your_collapse_key',
  
      notification: {
        title: title,
        body: get_message
      },
  
      data: {  //you can send only notification or only data(or include both)
        body: get_message,
       // receiver_data: data_to_send,
      }
    };
  
    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!", message);
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  
   // return fcm;
  
  }
  
  if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==0){
  //----------------------------Update data-------------------------
  recors_upate = await notificationData.create({
    sender_id:req.params.id,
    receiver_id:dataget.dataValues.userId,
    senderName:senderuser.dataValues.name,
    senderImage:senderuser.dataValues.image,
    notification:'disliked your comment'
  })
  
  
  
  
  
  
  //-------------------------------------------------
  
    var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
    var fcm = new FCM(serverKey);
    var device_token=getdevice_token.dataValues.deviceToken
    var title = 'Future Robotics'
    var get_message=senderuser.dataValues.name  +" dislike your comment"  
  
  
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: device_token,
      // collapse_key: 'your_collapse_key',
  
      notification: {
        title: title,
        body: get_message
      },
  
      data: {  //you can send only notification or only data(or include both)
        body: get_message,
       // receiver_data: data_to_send,
      }
    };
  
    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!", message);
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  
   // return fcm;
  
  }
    }
    else{
      //-------------------------Update data information------------------------------------------
    
      const information = await commentLikedeslike.findOne({
     
        where:{
          commentId:req.params.commentId,
          userId:req.params.id,
       
        },
      }) 
    
      var test=information.dataValues.likeDeslike;
    
      if(req.body.likeDeslike !==test){
        if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==1){
        //----------------------------------------DataStore
        
        
        recors_upate = await notificationData.create({
          sender_id:req.params.id,
          receiver_id:dataget.dataValues.userId,
          senderName:senderuser.dataValues.name,
          senderImage:senderuser.dataValues.image,
          notification:'liked your comment'
        })
        
        
        //---------------------------------
        
          var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
          var fcm = new FCM(serverKey);
          var device_token=getdevice_token.dataValues.deviceToken
          var title = 'Future Robotics'
          var get_message=senderuser.dataValues.name  +" liked your comment"  
        
        
          var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: device_token,
            // collapse_key: 'your_collapse_key',
        
            notification: {
              title: title,
              body: get_message
            },
        
            data: {  //you can send only notification or only data(or include both)
              body: get_message,
             // receiver_data: data_to_send,
            }
          };
        
          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!", message);
            } else {
              console.log("Successfully sent with response: ", response);
            }
          });
        
         // return fcm;
        
        }
        
        if(getdevice_token.dataValues.deviceToken && req.body.likeDeslike==0){
        //----------------------------Update data-------------------------
        recors_upate = await notificationData.create({
          sender_id:req.params.id,
          receiver_id:dataget.dataValues.userId,
          senderName:senderuser.dataValues.name,
          senderImage:senderuser.dataValues.image,
          notification:'disliked your comment'
        })
        
        
        
        
        
        
        //-------------------------------------------------
        
          var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
          var fcm = new FCM(serverKey);
          var device_token=getdevice_token.dataValues.deviceToken
          var title = 'Future Robotics'
          var get_message=senderuser.dataValues.name  +" dislike your comment"  
        
        
          var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: device_token,
            // collapse_key: 'your_collapse_key',
        
            notification: {
              title: title,
              body: get_message
            },
        
            data: {  //you can send only notification or only data(or include both)
              body: get_message,
             // receiver_data: data_to_send,
            }
          };
        
          fcm.send(message, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!", message);
            } else {
              console.log("Successfully sent with response: ", response);
            }
          });
        
         // return fcm;
        
        }
          }
    
        }





//---------------------------------------------------------
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
          status:'1',
          commentId:req.params.commentId,
          likeDeslike:'1'
         },
          }) 
       var test1=get_available_data1;
       console.log(test1);
        const get_available_data2 = await commentLikedeslike.count({
         where:{
          status:'1',
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
            status:'1',
            commentId:req.params.commentId,
            likeDeslike:'1'
           },
            }) 
         var test1=get_available_data1;
         console.log(test1);
          const get_available_data2 = await commentLikedeslike.count({
           where:{
            status:'1',
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

    const datacount=  await feedCommentTable.count(
      {
         where: {
          feedId:updateEntrys.dataValues.feedId,
          status:'1'
      }
     });





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

       const datacount1=  await feedCommentTable.count(
        {
           where: {
            feedId:updateEntrys.dataValues.feedId,
            status:'1'
        }
       });

       const dataupdate=await feedsTable.update({
        comment_count:datacount1
       },{
         where:{
          id:updateEntrys.dataValues.feedId
        }
      }
       )

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
    const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
    const data = req.body;
    data.image = uploadFile[0].imageName;
    var data1=data.image
    //data.userId=req.body.userId;
    //data.feed_id=req.body.feed_id;
    //data.title=req.body.title;
    //data.description=req.body.description;
    
   // console.log(data1)
 //  userId:req.body.userId,
  // feed_id:req.body.feed_id
 
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

        if (req.body.image== "") {
          var image=updateEntrys.image;
        }
        
        else if(data1=="public/images/default/main.png"){
          var image=updateEntrys.image
        }
        else{
          
          var image='http://34.232.2.249:4100/'+data1;
        }

        console.log(image)
        const feedupdate =await feedsTable.update(
          {
            title:title,
            description:description,
            image:image
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
      },
      status:'1'
    },
 order :   [
      ['id', 'DESC']
       ],

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
            where:{
              status:'1'
            },
           
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

    const itemList = await notificationData.findAll({
      
      where: {
        receiver_id:req.params.id,
        status:'1'
       },
        
       order :   [
         ['id', 'DESC']
           ]
     
      
      
   
});

var testdata=itemList;
console.log(testdata);


 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Notification List',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Notification List',{});
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


massagelist1:  async (req, res) => {


  try{

    const itemList = await updateMessages.findAll({
      
     where:{
      senderId:req.params.id
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













massagelist_count:  async (req, res) => {


  try{

    const itemList = await socket_group.findAll({
      
     where:{
      userId:req.body.id
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
const itemList1 = await updateMessages.count({
  where: {
    groupId: {
      [Op.in]: arrayofTaskId
      },
      senderId:{
        [Op.not]:req.body.id
      }

    
  }
 })








 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Massage List Count',itemList1);
      } else {
          return apiResponseHelper.post(res, true, 'Massage List Count',{});
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,

//----------------------------------------------------------------

notificationcountdata:  async (req, res) => {


  try{

    const itemList = await notificationData.count({
      
      where: {
        receiver_id:req.body.id,
        status:'1'
       },
        
       order :   [
         ['id', 'DESC']
           ]
     
      
      
   
});

var testdata=itemList;
console.log(testdata);


 if (itemList) {
            
        return apiResponseHelper.post(res, true, 'Notification Count',itemList);
      } else {
          return apiResponseHelper.post(res, true, 'Notification Count',itemList);
      }


  }catch(e){


    console.log(e);
    return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again',{});
       
  }










}  ,











}