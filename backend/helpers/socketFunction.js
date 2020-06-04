const db = require('../db/models');
const sequelize = require('sequelize');
const crypto = require('crypto');
const fs = require('fs');
var nodemailer = require('nodemailer');
var path = require('path');
var uuid = require('uuid');
var moment = require('moment');
const socket_user = db.socketUser
const chatConstants = db.chatConstants
const newDb = require('../db/db');
const users = newDb.models.appUsers;
const messages = db.messages
const chatBlock = db.chatBlock
const chatReport = db.chatReport
const Op = sequelize.Op;
const database = require('../db/db.js');
const FCM = require('fcm-node');
const common = require('../helpers/common');

const groupAccess = newDb.models.accessRequest;
const Groups = newDb.models.categories;
const groupMessage = newDb.models.groupMessages
//const abc = require('../certificate/')
groupAccess.belongsTo(Groups, { foreignKey: 'groupId'})
groupMessage.belongsTo(users, { foreignKey: 'senderId'})



 module.exports = {
  create_time_stamp: async function () {
    let current_time = Math.round(new Date().getTime() / 1000)
    return current_time;
  },

  single_image_upload: function (data, folder) {
    let image = data;
    image.mv(process.cwd() + '/public/' + folder + '/' + image.name, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

    });
    return image.name;
  },

  send_push_notification: function (get_message, device_token, device_type, title, data_to_send) {
    if (device_token != '' && device_token != null) {
      var serverKey = 'AAAAgzsU80Q:APA91bF9T0aoGqguys6dbGxxSzEp5qRV7f6DD7qX0ZKrSq3yOBY5G3eUhKvNAWWV_cQOsTc9lsy07uSjaONMKDGDUg2Wx0UvxPXbcjn9Ccsm9JCOZdhGjIwQR55V66s5WvwYqALHRdym'; //put your server key here
      var fcm = new FCM(serverKey);

      var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: device_token,
        // collapse_key: 'your_collapse_key',

        notification: {
          title: title,
          body: get_message
        },

        data: {  //you can send only notification or only data(or include both)
          body: get_message,
          receiver_data: data_to_send,
        }
      };
      fcm.send(message, function (err, response) {
        if (err) {
          //////console.log("Something has gone wrong!", message);
        } else {
          //////console.log("Successfully sent with response: ", response);
        }
      });
      return fcm;
    } else {
      return;
    }

  },
  check_socket_id: async function (connect_listener, socket_id) {
    let check_user = await socket_user.findOne({
      where: {
        userId: connect_listener.userId
      }
    });

    /* //////console.log(check_user, "check_user"); */

    if (check_user) {

      create_socket_user = await socket_user.update({
        isOnline: 1,
        socketId: socket_id,
      },
        {
          where: {
            userId: connect_listener.userId
          }
        }
      );

    } else {
      create_socket_user = await socket_user.create({
        userId: connect_listener.userId,
        socketId: socket_id,
        isOnline: 1,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp()
      })
    }
    return create_socket_user;

  },

  getRoomList : async function (connect_listener, socket_id) {

    let connectedRoom = await groupAccess.findAll({
      attributes:['groupId'],
       where: {
        userId: connect_listener.userId
      },

      include: [
        {
          model: Groups,
          attributes: ['name'],
          required: true
        },
      ],
      raw:true
      
    });
    // //////console.log(connectedRoom);

    if(connectedRoom){
       
      connectedRoom.map(element=>{
          element.groupName = element['category.name']
          return element;
      })
    
      return connectedRoom;
    }else{
      return [];
    }
   

  },
  
  


  socket_disconnect: async function (socket_id) {
    /* ////console.log(socket_id,"socket_id") */
    let disconnect_socket_user = await socket_user.update({
      isOnline: 0,
      updated: await this.create_time_stamp()
    },
      {
        where: {
          socketId: socket_id
        }
      }
    );
    return disconnect_socket_user
  },
  send_message: async function (get_data) {
    var user_data = await chatConstants.findOne({
      where: {
        [Op.or]: [
          { senderId: get_data.senderId, receiverId: get_data.receiverId },
          { receiverId: get_data.senderId, senderId: get_data.receiverId }
        ]
      }
    });
    if (user_data) {
      create_message = await messages.create({
        senderId: get_data.senderId,
        receiverId: get_data.receiverId,
        messageType: get_data.messageType,
        message: get_data.message,
        chatConstantId: user_data.dataValues.id,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp(),
      });

      let update_last_message = await chatConstants.update({
        lastMessageId: create_message.dataValues.id,
        created : create_message.dataValues.created,
        deletedId:0
      },
        {
          where: {
            id: user_data.dataValues.id
          }
        }
      );
      if(get_data.senderId==user_data.dataValues.senderId){
        let  chatconstupdate = await database.query("UPDATE chat_constants SET receiverUnreadCount = receiverUnreadCount+1 WHERE id="+user_data.dataValues.id, {
          model: messages,
          mapToModel: true,
          type: database.QueryTypes.UPDATE
        });
       }else if(get_data.senderId==user_data.dataValues.receiverId){
        let  chatconstupdate = await database.query("UPDATE chat_constants SET senderUnreadCount = senderUnreadCount+1 WHERE id="+user_data.dataValues.id, {
          model: messages,
          mapToModel: true,
          type: database.QueryTypes.UPDATE
        });

      }

    } else {

      let create_last_message = await chatConstants.create({
        senderId: get_data.senderId,
        receiverId: get_data.receiverId,
        lastMessageId: 0,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp(),
      });

      create_message = await messages.create({
        senderId: get_data.senderId,
        receiverId: get_data.receiverId,
        messageType: get_data.messageType,
        message: get_data.message,
        chatConstantId: create_last_message.dataValues.id,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp(),
      });

      let update_last_message = await chatConstants.update({
        lastMessageId: create_message.dataValues.id,
        created : create_message.dataValues.created,
      },
        {
          where: {
            id: create_last_message.dataValues.id
          }
        }
      );

      const  groupAccessUpdate = await database.query("UPDATE chat_constants SET receiverUnreadCount = receiverUnreadCount+1 WHERE id="+create_last_message.dataValues.id, {
        model: messages,
        mapToModel: true,
        type: database.QueryTypes.UPDATE
      });
    
      return create_message;
    }
  },

  get_reciever_data: async function (get_data) {

    ////console.log(get_data);

    get_reciever_data = await socket_user.findOne({

      where: {
        userId: get_data.receiverId
      }

    });

    ////console.log(get_reciever_data);
    return get_reciever_data

  },
  get_reciever_device_token: async function (get_data) {
    
    get_reciever_token = await users.findOne({
      atrributes: ['id', 'deviceToken','phone', 'deviceType','authkey','p256dh'],
      where: {
        id: get_data.receiverId,       
      }
    });
    
    return get_reciever_token

  },

  getReceverAllUnreadCount :async function (get_data){

    try {
      let  category = await Groups.findAll({
        attributes: ['id', 'status', 'name', 'image','lastMessageType',"lastMessage",'lastMessageTime'],
        raw:true
      });
      let  accessRequestData = await groupAccess.findAll({
        attributes: ['id','userId' ,'groupId','requestStatus','unreadCount'],
        raw :true
      });
   
      if (category) {
        category.forEach(item=>{
            item.status=0;
            let index = accessRequestData.findIndex(element=>{
              if(element.groupId==item.id && element.userId==get_data.receiverId){
                return element;
              }
            })
            
            if(index!=-1){
             // ////console.log(accessRequestData[index].unreadCount);
              item.status=Number(accessRequestData[index].requestStatus);
              item['unreadCount']=accessRequestData[index].unreadCount;
            }
        })
       const recentchat = await database.query('select *,(select name from appUsers where id=tt.userid) as username,(select image from appUsers where id=tt.userid) as userimage,(SELECT count(*) as unreadcount FROM `messages` WHERE ((`senderId`='+get_data.receiverId+' and `receiverId`=tt.userid) or (`senderId`=tt.userid and `receiverId`='+get_data.receiverId+')) and `readStatus`=0) as unreadcount  from (SELECT  *,(SELECT  `message` FROM `messages` WHERE `id`=`lastMessageId`) as msg,(SELECT `messageType` FROM `messages` WHERE `id`=`lastMessageId`) as messageType, (SELECT `senderId` FROM `messages` WHERE `id`=`lastMessageId`) as messagesSenderId,(SELECT `receiverId` FROM `messages` WHERE `id`=`lastMessageId`) as messagesReceiverId,case when `senderId`='+get_data.receiverId+' then `receiverId` when `receiverId`='+get_data.receiverId+' then `senderId` end as userid FROM chat_constants where `senderId`='+get_data.receiverId+' or `receiverId`='+get_data.receiverId+')tt', {
       type: database.QueryTypes.SELECT
      });
    
      recentchat.forEach(element=>{
          let obj = {};
          obj.id = element.userid;
          obj.name = element.username;
          obj.image = element.userimage;
          obj.lastMessageType = String(element.messageType);
          obj.lastMessage = element.msg;
          obj.lastMessageTime = element.created;
          obj.unreadCount = element.unreadcount;
          category.unshift(obj);
       })
       
      let unreadCount = 0;
      category.forEach(element=>{
          if(element.unreadCount){
            unreadCount +=element.unreadCount 
          }
      })
        ////console.log("unread data =",category)
       console.log("unread count =",unreadCount)
       return unreadCount;
      } else {
        ////console.log("i came in else group chat")
        return 1
      }
    } catch (e) {
      // return apiResponseHelper.onError(res, false,{},'Something Went Wrong.Please Try Again');
      throw e;
    }
  } 
  ,
  data_to_send: async function (get_data) {
    final_array = [];
    final_array = {
      senderId: get_data.senderId,
      receiverId: get_data.receiverId,
      messageType: get_data.messageType,
      message: get_data.message,
      senderName: get_data.senderName,
      senderImage: get_data.senderProfileImage,
      receiverName: get_data.receiverName,
      groupImage : get_data.groupImage,
      RecieverProfileImage: get_data.RecieverProfileImage,
      created: await this.create_time_stamp(),

    }
    return final_array;
  },
  group_data_to_send: async function (get_data) {
    final_array = [];
    final_array = {
      senderId: get_data.senderId,
      messageType: get_data.messageType,
      message: get_data.message,
      senderName: get_data.senderName,
      senderImage: get_data.senderProfileImage,
      senderNumber: get_data.senderNumber,
      groupName : get_data.groupName,
      groupId :get_data.groupId,
      created: await this.create_time_stamp(),
    }
    return final_array;

  },

  getGroupMessages: async function (get_data) {

    ////console.log("gettttt",get_data);

    try{
    var getGroupMessages = await groupMessage.findAll({
      attributes: ['id','senderId','message', 'messageType','created'],
      where:{
        groupId:get_data.groupId,
      },
      include : {
        attributes:['name','image','phone'],
        model : users,
      },
      raw:true
    })
    
    accessGiven = await groupAccess.findOne({
      atrributes: ['updated'],
      where: {
        groupId:get_data.groupId,
        userId:get_data.userId
      },
      raw:true
    });

    //////console.log("given",getGroupMessages.length)
   
    if(accessGiven){
      getGroupMessages.map(element=>{
        element['senderName'] = element['appUser.name'];
        element['senderImage'] = element['appUser.image'];
        element['senderNumber'] = element['appUser.phone'];
        delete element['appUser.name'];
        delete element['appUser.image'];
        delete element['appUser.phone'];
       // if(element.created>accessGiven.updated){
          return element;
        //}
    })
  }
  getGroupMessages  = getGroupMessages.filter(element=>element.created>accessGiven.updated)

  if(getGroupMessages.length>0){
    return getGroupMessages;
  }else{
    return 0;
  }
  
  } catch (error) {
    throw error
  }

  },


  getGroupMessagesPart: async function (get_data) {

    ////console.log("gettttt",get_data);

    try{

      if(get_data.offset==undefined){
        get_data.offset=null;
      }

      if(get_data.limit==undefined){
        get_data.limit=null;
      }
    
      var getGroupMessages = await groupMessage.findAll({
      attributes: ['id','senderId','message', 'messageType','created'],
      where:{
        groupId:get_data.groupId,
      },
      include : {
        attributes:['name','image','phone'],
        model : users,
      },
      offset:get_data.offset ,
      limit: get_data.limit,
      order: [
        ['id', 'DESC']],
      raw:true
    })
    
    accessGiven = await groupAccess.findOne({
      atrributes: ['updated'],
      where: {
        groupId:get_data.groupId,
        userId:get_data.userId
      },
      raw:true
    });

    //////console.log("given",getGroupMessages.length)
    
    if(accessGiven){
      getGroupMessages.map(element=>{
        element['senderName'] = element['appUser.name'];
        element['senderImage'] = element['appUser.image'];
        element['senderNumber'] = element['appUser.phone'];
        delete element['appUser.name'];
        delete element['appUser.image'];
        delete element['appUser.phone'];
       // if(element.created>accessGiven.updated){
          return element;
        //}
    })
  }
  getGroupMessages  = getGroupMessages.filter(element=>element.created>accessGiven.updated)

  if(getGroupMessages.length>0){
    return getGroupMessages;
  }else{
    return 0;
  }
  
  } catch (error) {
    throw error
  }

  },






  
  getGroupDeviceTokens: async function (get_data) {
   
    try{ 
    const getUserDeviceTokeData = await groupAccess.findAll({
      attributes: ['userId', 'groupId'],
      where: {
        groupId: get_data.groupId,
        requestStatus:'2'
      },
      include: [
        {
        model: users,
        attributes: ['id','deviceToken','deviceType','p256dh','authkey'],
        raw:true,
       
        },
       
      ],
      raw:true,
    });

    if(getUserDeviceTokeData){
      return getUserDeviceTokeData;
    }

  }catch (error) {
    throw error
  }

  },




  get_block_status_users: async function (get_data) {

    get_user_block_status = await chatBlock.findOne({
      atrributes: ['id'],
      where: {
        [Op.or]: [
          { userBy: get_data.senderId, UserTo: get_data.receiverId },
          { UserTo: get_data.senderId, userBy: get_data.receiverId }
        ]
      }
    });
    /*  ////console.log(get_user_block_status,"get_user_block_status"); */
    return get_user_block_status;
  },
  get_message: async function (get_msg_data) {

    var get_messages_data = await database.query(`SELECT *,(select name from appUsers where id =${get_msg_data.receiverId})as recieverName, ifnull((select image from appUsers where id =${get_msg_data.receiverId}),'')as senderImage,(select name from appUsers where id =${get_msg_data.senderId})as senderName,ifnull((select image from appUsers where id =${get_msg_data.senderId}),'')as recieverImage FROM messages WHERE ((senderId=${get_msg_data.senderId} AND receiverId=${get_msg_data.receiverId}) OR (senderId=${get_msg_data.receiverId} AND receiverId=${get_msg_data.senderId})) and  deletedId!=${get_msg_data.senderId} order by id desc`, {

      model: messages,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });
    if (get_messages_data) {
      get_messages_data = get_messages_data.map(value => {
        return value.toJSON();
      });
    }

    return get_messages_data;

  },


  get_message_part: async function (get_msg_data) {


    if(get_msg_data.offset==undefined){
      get_msg_data.offset=null;
    }

    if(get_msg_data.limit==undefined){
      get_msg_data.limit=null;
    }

    var get_messages_data = await database.query(`SELECT *,(select name from appUsers where id =${get_msg_data.receiverId})as recieverName, ifnull((select image from appUsers where id =${get_msg_data.receiverId}),'')as senderImage,(select name from appUsers where id =${get_msg_data.senderId})as senderName,ifnull((select image from appUsers where id =${get_msg_data.senderId}),'')as recieverImage FROM messages WHERE ((senderId=${get_msg_data.senderId} AND receiverId=${get_msg_data.receiverId}) OR (senderId=${get_msg_data.receiverId} AND receiverId=${get_msg_data.senderId})) and  deletedId!=${get_msg_data.senderId}  order by id desc limit ${get_msg_data.limit}  offset ${get_msg_data.offset} `, {
      model: messages,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });
    if (get_messages_data) {
      get_messages_data = get_messages_data.map(value => {
        return value.toJSON();
      });
    }

    return get_messages_data;

  },









  get_chat_listing: async function (get_chat_data) {

    // var chat_data = await database.query(`SELECT *,CASE WHEN senderId = ${get_chat_data.userId} THEN receiverId WHEN receiverId = ${get_chat_data.userId} THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId) as lastMessage ,(SELECT name FROM users where id=user_id) as userName, ifnull((SELECT image FROM users where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at , (SELECT  count(readStatus)  FROM messages where senderId=user_id or receiverId= user_id ) as readStatus,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType,ifnull((SELECT  status  FROM chat_block where userBy=user_id or UserTo=user_id),0) as block_status from chat_constants where (senderId=${get_chat_data.userId} or receiverId=${get_chat_data.userId})`, {

    //   model: messages,
    //   model: chatConstants,
    //   mapToModel: true,
    //   type: database.QueryTypes.SELECT
    // });

    // select *,(select Count(*) from messages where (senderId=10 and receiverId=23) and (readStatus=0) ) as unreadcount  from (SELECT *,CASE WHEN senderId = 23 THEN receiverId WHEN receiverId = 23 THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId) as lastMessage ,(SELECT name FROM users where id=user_id) as userName, ifnull((SELECT image FROM users where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at ,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType,ifnull((SELECT  status  FROM chat_block where userBy=user_id or UserTo=user_id),0) as block_status from chat_constants where (senderId=23 or receiverId=23))tt

    var chat_data = await database.query(`select *,(select Count(*) from messages where (receiverId=${get_chat_data.userId} and senderId=user_id) and (readStatus=0) ) as unreadcount  from (SELECT *,CASE WHEN senderId = ${get_chat_data.userId} THEN receiverId WHEN receiverId = ${get_chat_data.userId} THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId and deletedId!=${get_chat_data.userId}) as lastMessage ,(SELECT name FROM users where id=user_id) as userName, ifnull((SELECT image FROM users where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at ,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType,ifnull((SELECT  status  FROM chat_block where userBy=user_id or UserTo=user_id),0) as block_status from chat_constants where (senderId=${get_chat_data.userId} or receiverId=${get_chat_data.userId}))tt where deletedId!=${get_chat_data.userId}`, {
        model: messages,
        model: chatConstants,
        mapToModel: true,
        type: database.QueryTypes.SELECT
      })
    if (chat_data) {
      chat_data = chat_data.map(value => {
        return value.toJSON();
      });
    }
    return chat_data;
  },
  block_user: async function (get_block_data) {

    get_block_user = await chatBlock.findOne({
      where: {
        userBy: get_block_data.userId,
        userTo: get_block_data.user2Id,
        status: 1
      }
    });
    if (get_block_user) {
      /*  ////console.log(get_block_user,"get_block_user") */
      /*     return get_block_user; */
      if (get_block_data.status == 1) {
        /*    ////console.log() */
        return false;
      } else {
        /*  ////console.log("imnnnnnnnnnn ") */
        delete_block_user = await chatBlock.destroy({
          where: {
            userBy: get_block_data.userId,
            userTo: get_block_data.user2Id,
            status: 1
          }
        });

        return delete_block_user;

      }
    } else {
      create_block_user = await chatBlock.create({
        userBy: get_block_data.userId,
        userTo: get_block_data.user2Id,
        status: 1,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp()
      });

      return create_block_user;
    }

  },
  delete_chat_users: async function (get_delete_data) {
    get_delete_status = await messages.findAll({
      where: {
        deletedId: 0,
        [Op.or]: [
          { senderId: get_delete_data.userId, receiverId: get_delete_data.user2Id },
          { receiverId: get_delete_data.userId, senderId: get_delete_data.user2Id },
        ]
      }
    });
    if (get_delete_status) {
      get_delete_status = get_delete_status.map(value => {
        return value.toJSON();
      });
    }
    /* ////console.log(get_delete_status);return; */

    if (get_delete_status.length > 0) {

      delete_all_chat = await messages.update({
        deletedId: get_delete_data.userId
      },
        {
          where: {
            [Op.or]: [
              { senderId: get_delete_data.userId, receiverId: get_delete_data.user2Id },
              { receiverId: get_delete_data.userId, senderId: get_delete_data.user2Id }

            ]
          }
        }
      );

      /*    ////console.log(update_delete_id, "update_delete_id") */
    } else {
      delete_all_chat = await messages.destroy({
        where: {
          [Op.or]: [
            { senderId: get_delete_data.userId, receiverId: get_delete_data.user2Id },
            { receiverId: get_delete_data.userId, senderId: get_delete_data.user2Id }
          ]
        }
      })
    }
    return delete_all_chat;
  },
  report_user: async function (get_report_data) {
    create_report = await chatReport.create({
      userBy: get_report_data.userId,
      userTo: get_report_data.user2Id,
      comment: get_report_data.comment,
      created: await this.create_time_stamp(),
      updated: await this.create_time_stamp()
    });

    return create_report;
  },

  clearMyGroupCount : async function (data) {
      update_read_status = await groupAccess.update({
        unreadCount: 0
       },
       {
        where: {
          userId:data.userId,
          groupId:data.groupId
        }
      }
    );
   
    if(update_read_status){
      return {status:"done"}
    } 

  },  

  clearSingleChatUnread : async function(data){
     const clearMyUnreadMsg = await messages.update({
      readStatus: 1
     },
     {
      where: {
        receiverId:data.userId,
        senderId :data.user2Id
      }
    }
  );
 
  if(clearMyUnreadMsg){
    return {status:"done"}
  } 
},



  get_block_status: async function (get_block_status) {

    get_block_status_data = await chatBlock.findOne({
        where: {
          
        userBy:get_block_status.userId,
        userTo:get_block_status.user2Id
      }
    });

     /* ////console.log(get_block_status_data,"get_block_status_data"); */
    return get_block_status_data;
  },
  get_read_unread_status: async function (get_read_status) {

    update_read_status = await messages.update({
      readStatus: 1
    },
      {
        where: {
          senderId:get_read_status.user2Id,
          receiverId:get_read_status.userId
        }
      }
    );

     return update_read_status;

  },
  get_blocked_user_status:async function(get_data){

    get_block_status_data = await chatBlock.findOne({
      where: {

      [Op.or]: [
        { userBy: get_data.senderId, userTo: get_data.receiverId },
        { userTo: get_data.senderId, userBy: get_data.receiverId }

      ]
    }
  });
   return get_block_status_data

  },
  delete_chat_list_data:async function(get_data){

    get_block_status_data = await chatConstants.findOne({
      where: {

      [Op.or]: [
        { senderId: get_data.userId, receiverId: get_data.user2Id },
        { receiverId: get_data.userId, senderId: get_data.user2Id }

      ]
    }
  });
    // ////console.log(get_block_status_data,"get_block_status_data");return;

    if(get_block_status_data.dataValues.deletedId!=0){
      // ////console.log("innnnnnnnnnnnnn")
      delete_chat_list_data_user= await chatConstants.destroy({
        where:{
           id:get_block_status_data.dataValues.id
        }
      });

      delete_all_messages= await messages.destroy({

        where:{
          [Op.or]: [
            { senderId: get_data.userId, receiverId: get_data.user2Id },
            { receiverId: get_data.userId, senderId: get_data.user2Id }
    
          ]
        }
      });

    }else{

      delete_chat_list_data_user = await chatConstants.update({
        deletedId:get_data.userId
      },
        {
          where: {
            [Op.or]: [
              { senderId: get_data.userId, receiverId: get_data.user2Id },
              { receiverId: get_data.userId, senderId: get_data.user2Id }
      
            ]
          }
        }
      );

      delete_all_messages = await messages.update({
        deletedId:get_data.userId
      },
        {
          where: {

            [Op.or]: [
              { senderId: get_data.userId, receiverId: get_data.user2Id },
              { receiverId: get_data.userId, senderId: get_data.user2Id }
      
            ]
          }
        }
      );
      
    }

    return delete_chat_list_data_user;
  },
  image_base_64: async function (get_message, extension_data) {
    var image = get_message
    var data = image.replace(/^data:image\/\w+;base64,/, '');
    var extension = extension_data;
    var filename = Math.floor(Date.now() / 1000) + '.' + extension;
    var base64Str = data;
    upload_path = path.join(__dirname, '../public/chatimages/' + filename);
    if (extension) {
      fs.writeFile(upload_path, base64Str, {
        encoding: 'base64'
      }, function (err) {
        if (err) {
          //////console.log(err)
        }
      })
    }
    return 'public/chatimages/'+filename;
  }
  ,

  saveGroupMessage : async function (get_data) {

    try{
    //////console.log("create group entry ")
    var user_data = await users.findOne({
      attributes: ['id','name'],
      where: {
        id : get_data.senderId
      }
    });

    if (user_data) {
        create_message = await groupMessage.create({
        senderId: get_data.senderId,
        messageType: get_data.messageType,
        message: get_data.message,
        groupId:get_data.groupId,
        chatConstantId: user_data.dataValues.id,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp(),
         },
      );

      if(create_message){
     
      const updateGroupDetails = await Groups.update(
         {
          lastMessage: get_data.message,
          lastMessageTime : create_message.dataValues.created,
          lastMessageType : String(create_message.dataValues.messageType),
        }, {
          where: {
            id: get_data.groupId
          }
        }
        )
      }
    
      const  groupAccessUpdate = await database.query("UPDATE accessRequest SET unreadCount = unreadCount+1 WHERE userId!="+get_data.senderId+" AND requestStatus ='2' AND groupId="+get_data.groupId, {
        model: messages,
        mapToModel: true,
        type: database.QueryTypes.UPDATE
      });
    
      //////console.log("testomg",groupAccessUpdate.dataValues);
    
     if(create_message){
        return create_message;
      }
    } 
  }
  catch (error) {
    throw error
  }
  }
}
