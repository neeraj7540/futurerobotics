const config = require('config');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const db = require('./db/db');
var base64Img = require('base64-img');

const socket_user = db.models.socket_user;

const userblocks = db.models.userblocks;

const chatConstants = db.models.chatConstants;

const messages = db.models.messages;
const appusers = db.models.appusers;
const database = require('./db/db');
const chatBlock = db.models.chatBlock;

const roomList = db.models.roomlist;

const updateMessages = db.models.update_messages;
const notificationData = db.models.notification_data;

const oneUpdateMessages = db.models.one_update_messages;

console.log(oneUpdateMessages)

const groupMessages = db.models.group_messages;

const socket_group = db.models.socket_group;
const groups = db.models.groups;

console.log(groups)

const FCM = require('fcm-node');

//messages

console.log(chatBlock)
//console.log(db)
const apiResponseHelper = require('./helpers/apiResponseHelper');


const fs = require('fs');
const path = require('path');




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
      var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
      var fcm = new FCM(serverKey);
      if (device_type == 1) {
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
      } else {
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: device_token,
          // collapse_key: 'your_collapse_key',

          /* notification: {
            title: title,
            body: get_message
          }, */

          data: {  //you can send only notification or only data(or include both)
            body: get_message,
            receiver_data: data_to_send,
          }
        };
      }

      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", message);
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });

      return fcm;

    } else {
      return;
    }

  },
  check_socket_id: async function (connect_listener, socket_id) {

    console.log(connect_listener, '=======>connect_listener');
    // return;

    let check_user = await socket_user.findOne({

      where: {
        userId: connect_listener.userId,
        receiverId: connect_listener.receiverId
      }
    });

    /* console.log(check_user, "check_user"); */

    if (check_user) {

      create_socket_user = await socket_user.update({
        isOnline: 1,
        socketId: socket_id,
      },
        {
          where: {
            userId: connect_listener.userId,
            receiverId: connect_listener.receiverId
          }
        }
      );

    } else {

      console.log(connect_listener.receiverId)
      create_socket_user = await socket_user.create({
        userId: connect_listener.userId,
        receiverId: connect_listener.receiverId,
        socketId: socket_id,
        isOnline: 1,
        createdAt: await this.create_time_stamp(),
        updatedAt: await this.create_time_stamp()
      })
    }
    return create_socket_user;

  },
  socket_disconnect: async function (socket_id) {
    /* console.log(socket_id,"socket_id") */
    let disconnect_socket_user = await socket_user.update({
      isOnline: 0,
      updatedAt: await this.create_time_stamp()
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

    console.log("----------------------------------Test-----------------------")

    if (user_data) {
      console.log("//-------------------------------------------------------------------------")

      const dataget = await oneUpdateMessages.findOne({
        where: {
          senderId: get_data.senderId,
          receiverId: get_data.receiverId
        }
      })
      if (!dataget) {
        create_message = await oneUpdateMessages.create({
          senderId: get_data.senderId,
          receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          chatConstantId: 1,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
        });
      }
      else {

        create_message1 = await oneUpdateMessages.update({
          senderId: get_data.senderId,
          receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          chatConstantId: 1,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
        }, {
          where: {
            senderId: get_data.senderId,
            receiverId: get_data.receiverId
          }

        }


        );

      }



      //------------------------------------------
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
        deletedId: 0
      },
        {
          where: {
            id: user_data.dataValues.id
          }
        }
      );

      var senduserdata = await appusers.findOne({
        where: {
          id: get_data.senderId,
        }
      });



    } else {

      console.log("//----------------------Test1-------------------------")
      const dataget1 = await oneUpdateMessages.findOne({
        where: {
          senderId: get_data.senderId,
          receiverId: get_data.receiverId
        }
      })
      if (!dataget1) {

        console.log("//----------------------Test2-------------------------")

        create_message = await oneUpdateMessages.create({
          senderId: get_data.senderId,
          receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          chatConstantId: 1,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
        });
      }
      else {

        create_message1 = await oneUpdateMessages.update({
          senderId: get_data.senderId,
          receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          chatConstantId: 1,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
        }, {
          where: {
            senderId: get_data.senderId,
            receiverId: get_data.receiverId
          }

        }


        );

      }








      //-----------------------------------------------------
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

        lastMessageId: create_message.dataValues.id
      },
        {
          where: {
            id: create_last_message.dataValues.id
          }
        }
      );




      return create_message;
    }
  },

  get_reciever_data: async function (get_data) {

    get_reciever_data = await socket_user.findOne({
      where: {
        receiverId: get_data.senderId,
        userId: get_data.receiverId,
      }
    });

    return get_reciever_data

  },

  get_reciever_data_call: async function (get_data) {

    get_reciever_data = await socket_user.findOne({

      where: {
        userId: get_data.userId,
        // [Op.or]: [
        //   { userId: get_data.senderId},
        //   { userId: get_data.receiverId }    
        // ]
      }

    });
    return get_reciever_data

  },
  get_reciever_device_token: async function (get_data) {
    // console.log(get_data,"=======check data")
    get_reciever_token = await appusers.findOne({
      // atrributes: ['id', 'deviceToken', 'deviceType', 'isNotification'],
      atrributes: ['id', 'deviceToken', 'deviceType'],//, 'isNotification'],
      where: {
        id: get_data.receiverId,
        // role: 2,
        //isNotification: 1
      }
    });



    //---------------------------For Notification--------------------------------
    get_reciever = await appusers.findOne({


      where: {
        id: get_data.senderId,

      }
    });

    // console.log(get_reciever.name)
    // console.log(get_reciever.image)
    // console.log(get_data.message)

    recors_upate = await notificationData.create({
      sender_id: get_data.senderId,
      receiver_id: get_data.receiverId,
      senderName: get_reciever.name,
      senderImage: get_reciever.image,
      notification: 'has sent you a message'
    })





    //-------------------------------------------


    //console.log(get_reciever_token)
    return get_reciever_token


  },
  data_to_send: async function (get_data) {
    final_array = [];
    final_array = {
      senderId: get_data.senderId,
      receiverId: get_data.receiverId,
      messageType: get_data.messageType,
      message: get_data.message,
      senderName: get_data.senderName,
      senderProfileImage: get_data.senderProfileImage,
      receiverName: get_data.receiverName,
      RecieverProfileImage: get_data.RecieverProfileImage,
      created: await this.create_time_stamp(),

    }
    return final_array;

  },
  get_block_status_users: async function (get_data) {

    get_user_block_status = await userblocks.findOne({
      atrributes: ['id'],
      where: {
        [Op.or]: [
          { userId: get_data.senderId, blockUserId: get_data.receiverId },
          { blockUserId: get_data.senderId, userId: get_data.receiverId }

        ]
      }
    });

    /*  console.log(get_user_block_status,"get_user_block_status"); */

    return get_user_block_status;
  },
  get_message: async function (get_msg_data) {

    get_user_status = await socket_user.findOne({
      where: {
        userId: get_msg_data.senderId,
        receiverId: get_msg_data.receiverId,
      }
    });

    // console.log(get_user_status.dataValues.msg_status)


    if (get_user_status.dataValues.msg_status == 0) {


      get_user_status = await appusers.findOne({
        where: {
          id: get_msg_data.senderId
        }
      });

      if (get_user_status.dataValues.status = 1) {
        var get_messages_data = await database.query(`SELECT *,(select name from appusers where id =${get_msg_data.receiverId})as recieverName, ifnull((select image from appusers where id =${get_msg_data.receiverId}),'')as recieverImage,(select name from appusers where id =${get_msg_data.senderId})as senderName,ifnull((select image from appusers where id =${get_msg_data.senderId}),'')as senderImage FROM messages WHERE ((senderId=${get_msg_data.senderId} AND receiverId=${get_msg_data.receiverId}) OR (senderId=${get_msg_data.receiverId} AND receiverId=${get_msg_data.senderId})) and  deletedId!=${get_msg_data.senderId} order by id ASC LIMIT 200 OFFSET ${get_msg_data.offset}`, {

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
      }

    }

    else {


      get_user_status1 = await socket_user.findOne({
        where: {
          userId: get_msg_data.senderId,
          receiverId: get_msg_data.receiverId,
        }

      })

      get_user_status = await appusers.findOne({
        where: {
          id: get_msg_data.senderId
        }
      });

      if (get_user_status.dataValues.status = 1) {
        var get_messages_data = await database.query(`SELECT *,(select name from appusers where id =${get_msg_data.receiverId})as recieverName, ifnull((select image from appusers where id =${get_msg_data.receiverId}),'')as recieverImage,(select name from appusers where id =${get_msg_data.senderId})as senderName,ifnull((select image from appusers where id =${get_msg_data.senderId}),'')as senderImage FROM messages WHERE ((id>${get_user_status1.dataValues.msg_status} AND senderId=${get_msg_data.senderId} AND receiverId=${get_msg_data.receiverId}) OR (senderId=${get_msg_data.receiverId} AND receiverId=${get_msg_data.senderId})) and  deletedId!=${get_msg_data.senderId} order by id ASC LIMIT 20 OFFSET ${get_msg_data.offset}`, {

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
      }




    }





  },
  get_chat_listing: async function (get_chat_data) {

    // var chat_data = await database.query(`SELECT *,CASE WHEN senderId = ${get_chat_data.userId} THEN receiverId WHEN receiverId = ${get_chat_data.userId} THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId) as lastMessage ,(SELECT name FROM users where id=user_id) as userName, ifnull((SELECT image FROM users where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at , (SELECT  count(readStatus)  FROM messages where senderId=user_id or receiverId= user_id ) as readStatus,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType,ifnull((SELECT  status  FROM chat_block where userBy=user_id or UserTo=user_id),0) as block_status from chat_constants where (senderId=${get_chat_data.userId} or receiverId=${get_chat_data.userId})`, {

    //   model: messages,
    //   model: chatConstants,
    //   mapToModel: true,
    //   type: database.QueryTypes.SELECT
    // });

    // select *,(select Count(*) from messages where (senderId=10 and receiverId=23) and (readStatus=0) ) as unreadcount  from (SELECT *,CASE WHEN senderId = 23 THEN receiverId WHEN receiverId = 23 THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId) as lastMessage ,(SELECT name FROM users where id=user_id) as userName, ifnull((SELECT image FROM users where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at ,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType,ifnull((SELECT  status  FROM chat_block where userBy=user_id or UserTo=user_id),0) as block_status from chat_constants where (senderId=23 or receiverId=23))tt
    get_user_status = await appusers.findOne({
      where: {
        id: get_chat_data.userId
      }
    });
    // if (get_user_status.dataValues.status == 1) {
    if (get_user_status) {

      // var chat_data = await database.query(`select *,(select Count(*) from messages where (receiverId=${get_chat_data.userId} and senderId=user_id) and (readStatus=0) ) as unreadcount  from (SELECT *,CASE WHEN senderId = ${get_chat_data.userId} THEN receiverId WHEN receiverId = ${get_chat_data.userId} THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId and deletedId!=${get_chat_data.userId}) as lastMessage ,(SELECT name FROM appusers where id=user_id) as userName, ifnull((SELECT image FROM appusers where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at ,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType,ifnull((SELECT  status  FROM userblocks where userId=user_id or blockUserId=user_id),0) as block_status from chat_constants where (senderId=${get_chat_data.userId} or receiverId=${get_chat_data.userId}))tt where deletedId!=${get_chat_data.userId}`, {

      //   model: messages,
      //   model: chatConstants,
      //   mapToModel: true,
      //   type: database.QueryTypes.SELECT
      // })
      var chat_data = await database.query(`select *,(select Count(*) from messages where (receiverId=${get_chat_data.userId} and senderId=user_id) and (readStatus=0) ) as unreadcount  from (SELECT *,CASE WHEN senderId = ${get_chat_data.userId} THEN receiverId WHEN receiverId = ${get_chat_data.userId} THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId ) as lastMessage ,(SELECT name FROM appusers where id=user_id) as userName, ifnull((SELECT image FROM appusers where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at ,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType, ifnull((SELECT  isOnline  FROM socket_user where userId=user_id),0) as onlineStatus, ifnull((SELECT  status  FROM userblocks where (userId=user_id and blockUserId=${get_chat_data.userId}) or (blockUserId=user_id and userId=${get_chat_data.userId})),0) as block_status from chat_constants where (senderId=${get_chat_data.userId} or receiverId=${get_chat_data.userId}))tt where deletedId!=${get_chat_data.userId} order by created_at desc`, {

        model: messages,
        model: chatConstants,
        mapToModel: true,
        type: database.QueryTypes.SELECT
      })
      if (chat_data) {
        chat_data = chat_data.map(value => {
          value = value.toJSON();
          // value.block_status = 0;
          return value;
        });
      }
      return chat_data;
    }
  },
  block_user: async function (get_block_data) {

    get_block_user = await chatBlock.findOne({
      where: {
        userBy: get_block_data.userId,
        userTo: get_block_data.user2Id,
        status: 1
      }
    });
    console.log(get_block_user)
    if (get_block_user) {
      /*  console.log(get_block_user,"get_block_user") */
      /*     return get_block_user; */
      if (get_block_data.status == 1) {
        /*    console.log() */
        return false;
      } else {
        /*  console.log("imnnnnnnnnnn ") */
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
    /* console.log(get_delete_status);return; */

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

      /*    console.log(update_delete_id, "update_delete_id") */
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

  get_block_status: async function (get_block_status) {

    get_block_status_data = await chatBlock.findOne({
      where: {

        userBy: get_block_status.userId,
        userTo: get_block_status.user2Id
      }
    });

    /* console.log(get_block_status_data,"get_block_status_data"); */
    return get_block_status_data;
  },
  get_read_unread_status: async function (get_read_status) {

    update_read_status = await messages.update({
      readStatus: 1
    },
      {
        where: {
          senderId: get_read_status.user2Id,
          receiverId: get_read_status.userId
        }
      }
    );

    return update_read_status;

  },
  get_blocked_user_status: async function (get_data) {

    //---------------------Testing-------------Dump
    // get_data.senderId=1
    // get_data.receiverId=1

    //----------------------------------------
    // console.log('============================>here');
    // return;
    get_block_status_data = await userblocks.findOne({
      where: {

        [Op.or]: [
          { userId: get_data.senderId, blockUserId: get_data.receiverId },
          { blockUserId: get_data.senderId, userId: get_data.receiverId }

        ]
      }
    });
    return get_block_status_data

  },
  delete_chat_list_data: async function (get_data) {

    get_block_status_data = await chatConstants.findOne({
      where: {

        [Op.or]: [
          { senderId: get_data.userId, receiverId: get_data.user2Id },
          { receiverId: get_data.userId, senderId: get_data.user2Id }

        ]
      }
    });
    // console.log(get_block_status_data,"get_block_status_data");return;

    if (get_block_status_data.dataValues.deletedId != 0) {
      // console.log("innnnnnnnnnnnnn")
      delete_chat_list_data_user = await chatConstants.destroy({
        where: {
          id: get_block_status_data.dataValues.id
        }
      });

      delete_all_messages = await messages.destroy({

        where: {
          [Op.or]: [
            { senderId: get_data.userId, receiverId: get_data.user2Id },
            { receiverId: get_data.userId, senderId: get_data.user2Id }

          ]
        }
      });

    } else {

      delete_chat_list_data_user = await chatConstants.update({
        deletedId: get_data.userId
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
        deletedId: get_data.userId
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
    upload_path = path.join(__dirname, '../backend/public/images/chat/' + filename);
    console.log("djgvcajabkj" + upload_path)
    if (extension) {
      fs.writeFile(upload_path, base64Str, {
        encoding: 'base64'
      }, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }
    return filename;
  },

  call_connect: async function (get_call_status_data) {

    get_call_status = await callHistory.findOne({
      where: {
        senderId: get_call_status_data.senderId,
        receiverId: get_call_status_data.receiverId,
        // callStatus: 0,
        // [Op.or]: [
        //   { senderId: get_call_status_data.senderId, receiverId: get_call_status_data.receiverId },
        //   { receiverId: get_call_status_data.senderId, senderId: get_call_status_data.receiverId }    
        // ]
      },
      order: [
        ['id', 'DESC'],
      ],
      raw: true
    });
    console.log(get_call_status, "=========check");
    if (get_call_status) {
      // console.log(get_call_status,"get_call_status")
      // return;
      /*     return get_call_status; */
      // if (get_call_status_data.callStatus == 1) {
      //     /*    console.log() */
      //     return false;
      // } else {
      /*  console.log("imnnnnnnnnnn ") */
      update_call_status = await callHistory.update({
        callStatus: get_call_status_data.callStatus,
      },
        {
          where: {
            id: get_call_status.id
          }
        }
      );

      return get_call_status_data.callStatus;

      // }
    } else {
      return get_call_status_data.callStatus;
    }
  },

  get_call_user_status: async function (get_data) {
    get_call_status_data = await callHistory.findOne({
      where: {
        [Op.or]: [
          { senderId: get_data.senderId, receiverId: get_data.receiverId },
          { receiverId: get_data.senderId, senderId: get_data.receiverId }
        ]
      },
      order: [
        ['id', 'DESC'],
      ],
    });
    return get_call_status_data
  },


  getRoomList: async function (connect_listener) {

    get_reciever = await socket_group.findAll({
      where: {
        groupId: connect_listener.groupId
        // id:1,
        // role: 2,
        //isNotification: 1
      }
    });

    return get_reciever


  },

  get_message1: async function (get_data) {
    // console.log(get_data,"from get=======");
    //get_msg_data.senderId=1
    get_user_status = await appusers.findOne({
      where: {
        id: get_data.senderId
      }
    });
    //console.log(get_user_status);
    if (get_user_status.dataValues.status = 1) {
      //get_msg_data.receiverId=2 // Testing data Neeraj
      get_data.offset = 0 //Tetsing Data Neeraj

      var get_messages_data = await database.query(`SELECT *,(select name from appusers where id =${get_data.receiverId})as recieverName, ifnull((select image from appusers where id =${get_data.receiverId}),'')as recieverImage,(select name from appusers where id =${get_data.senderId})as senderName,ifnull((select image from appusers where id =${get_data.senderId}),'')as senderImage FROM messages WHERE ((senderId=${get_data.senderId} AND receiverId=${get_data.receiverId}) OR (senderId=${get_data.receiverId} AND receiverId=${get_data.senderId})) and  deletedId!=${get_data.senderId} order by id desc LIMIT 20 OFFSET ${get_data.offset}`, {

        model: messages,
        mapToModel: true,
        type: database.QueryTypes.SELECT
      });

      //  var get_messages_data = await database.query(`select name from appusers where id =${get_msg_data.receiverId}`, {

      //  model: messages,
      //   mapToModel: true,
      //   type: database.QueryTypes.SELECT
      // });

      //console.log(get_messages_data)

      if (get_messages_data) {
        console.log(get_messages_data, "form adfjn");
        get_messages_data = get_messages_data.map(value => {
          return value.toJSON();
        });
      }

      return get_messages_data[0];
    }
  },

  check_socket_id1: async function (connect_listener, socket_id) {

    let check_user = await socket_group.findOne({

      where: {
        userId: connect_listener.userId,
        groupId: connect_listener.groupId
      }
    });

    /* console.log(check_user, "check_user"); */

    if (check_user) {

      create_socket_user = await socket_group.update({
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
      create_socket_user = await socket_group.create({
        userId: connect_listener.userId,
        groupId: connect_listener.groupId,
        category: connect_listener.category,
        socketId: socket_id,
        isOnline: 1,
        createdAt: await this.create_time_stamp(),
        updatedAt: await this.create_time_stamp()
      })

    }

    return create_socket_user;

  },

  send_message1: async function (get_data) {


    var user_data = await chatConstants.findOne({
      where: {
        senderId: get_data.senderId

        // [Op.or]: [
        //   { senderId: get_data.senderId, receiverId: get_data.receiverId },
        //   { receiverId: get_data.senderId, senderId: get_data.receiverId }

        // ]
      }
    });

    if (user_data) {
      //---------------------------------------------------------

      var datacheck = await updateMessages.findOne({
        where: {
          senderId: get_data.senderId,
          // groupId:get_data.groupId,
          //category:get_data.category,
        }
      });

      console.log("HFHVFDVDFBVDFBDF" + datacheck)
      if (!datacheck) {
        create_message = await updateMessages.create({
          senderId: get_data.senderId,
          //receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          groupId: get_data.groupId,
          category: get_data.category,
          groupName: get_data.groupName,

          chatConstantId: user_data.dataValues.id,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
          senderName: get_data.senderName,
          senderProfileImage: get_data.senderProfileImage

        });

      }
      else {
        create_message = await updateMessages.update({
          senderId: get_data.senderId,
          //receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          groupId: get_data.groupId,
          category: get_data.category,
          groupName: get_data.groupName,

          chatConstantId: user_data.dataValues.id,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
          senderName: get_data.senderName,
          senderProfileImage: get_data.senderProfileImage
        }, {
          where: {
            id: datacheck.dataValues.id

          }

        }


        );


      }


      //-------------------------------------------------


      create_message = await groupMessages.create({
        senderId: get_data.senderId,
        //receiverId: get_data.receiverId,
        messageType: get_data.messageType,
        message: get_data.message,
        groupId: get_data.groupId,
        category: get_data.category,
        groupName: get_data.groupName,

        chatConstantId: user_data.dataValues.id,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp(),
      });

      let countget = await groups.findOne({
        where: {
          category: get_data.category,
          id: get_data.groupId

        }

      })

      var count = countget.dataValues.count

      var count1 = ++count

      let update_last = await groups.update({

        count: count1,
      },
        {
          where: {
            category: get_data.category,
            id: get_data.groupId

          }
        }
      );

      console.log("vgsdlcdcjlv" + update_last)




      let update_last_message = await chatConstants.update({

        lastMessageId: create_message.dataValues.id,
        deletedId: 0
      },
        {
          where: {
            id: user_data.dataValues.id
          }
        }
      );

      var senduserdata = await appusers.findOne({
        where: {
          id: get_data.senderId,
        }
      });

      // var senddata = senduserdata.dataValues.name;
      // var senderIdData = get_data.senderId;
      // let gettoken = await helper.gettoken(get_data.receiverId);
      // if(gettoken.isNotification==1) {
      //     console.log("===================here");
      //     let sendpush = await helper.send_push_notification_chat( get_data.message, gettoken.deviceToken, gettoken.deviceType, '1', "Butterfly", senddata, senderIdData);
      // }
      // let notify = await helper.savenotifications(get_data.senderId,get_data.receiverId, '1', "New Message");


    } else {

      console.log("-------------------------------------Test1-------------------")
      var datacheck = await updateMessages.findOne({
        where: {
          senderId: get_data.senderId,

        }
      });

      console.log(datacheck)
      console.log("-------------------------------Neeraj Testing")
      if (!datacheck) {

        console.log("--------------------------------------------Test2----------------")
        create_message = await updateMessages.create({
          senderId: get_data.senderId,
          //receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          groupId: get_data.groupId,
          category: get_data.category,
          groupName: get_data.groupName,

          //chatConstantId: user_data.dataValues.id,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
          senderName: get_data.senderName,
          senderProfileImage: get_data.senderProfileImage

        });

      } else {

        create_message = await updateMessages.update({
          senderId: get_data.senderId,
          //receiverId: get_data.receiverId,
          messageType: get_data.messageType,
          message: get_data.message,
          groupId: get_data.groupId,
          category: get_data.category,
          groupName: get_data.groupName,

          //chatConstantId: user_data.dataValues.id,
          created: await this.create_time_stamp(),
          updated: await this.create_time_stamp(),
          senderName: get_data.senderName,
          senderProfileImage: get_data.senderProfileImage
        }, {
          where: {
            id: datacheck.dataValues.id

          }

        }


        );


      }





      let create_last_message = await chatConstants.create({
        senderId: get_data.senderId,
        // receiverId: get_data.receiverId,
        groupId: get_data.groupId,
        lastMessageId: 0,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp(),
      });

      create_message = await groupMessages.create({
        senderId: get_data.senderId,
        //receiverId: get_data.receiverId,
        messageType: get_data.messageType,
        message: get_data.message,
        groupId: get_data.groupId,
        category: get_data.category,
        groupName: get_data.groupName,
        chatConstantId: create_last_message.dataValues.id,
        created: await this.create_time_stamp(),
        updated: await this.create_time_stamp(),
      });

      let countget = await groups.findOne({
        where: {
          category: get_data.category,
          id: get_data.groupId

        }

      })
      var count = countget.dataValues.count

      var count1 = ++count

      var count = countget.dataValues.count
      console.log(count);
      let update_last = await groups.update({

        count: count1,
      },
        {
          where: {
            category: get_data.category,
            id: get_data.groupId

          }
        }
      );


      console.log(update_last);







      let update_last_message = await chatConstants.update({

        lastMessageId: create_message.dataValues.id
      },
        {
          where: {
            id: create_last_message.dataValues.id
          }
        }
      );

      // var senduserdata = await appusers.findOne({
      //   where: {
      //     id: get_data.senderId,
      //   }
      // });

      // var senddata = senduserdata.dataValues.name;
      // var senderIdData =get_data.senderId;
      // let gettoken = await helper.gettoken(get_data.receiverId);
      // if(gettoken.isNotification==1) {
      //     console.log("===================here");
      //     let sendpush = await helper.send_push_notification_chat( get_data.message, gettoken.deviceToken, gettoken.deviceType, '1', "Future Robotics", senddata, senderIdData);
      // }
      // let notify = await helper.savenotifications(get_data.senderId,get_data.receiverId, '1', "New Message");


      return create_message;
    }
  },

  data_to_send1: async function (get_data) {
    final_array = [];
    final_array = {
      senderId: get_data.senderId,
      receiverId: get_data.receiverId,
      messageType: get_data.messageType,
      message: get_data.message,
      groupId: get_data.groupId,
      category: get_data.category,
      groupName: get_data.groupName,
      senderName: get_data.senderName,
      senderProfileImage: get_data.senderProfileImage,
      receiverName: get_data.receiverName,
      RecieverProfileImage: get_data.RecieverProfileImage,
      created: await this.create_time_stamp(),

    }
    return final_array;

  },

  get_reciever_data1: async function (get_data) {

    get_reciever_data = await socket_group.findOne({

      where: {
        userId: get_data.senderId
      }

    });
    return get_reciever_data

  },

  get_block_status_users1: async function (get_data) {

    get_user_block_status = await userblocks.findOne({
      atrributes: ['id'],
      where: {
        userId: get_data.senderId
        // [Op.or]: [
        //   { userId: get_data.senderId, blockUserId: get_data.receiverId },
        //   { blockUserId: get_data.senderId, userId: get_data.receiverId }

        // ]
      }
    });

    /*  console.log(get_user_block_status,"get_user_block_status"); */

    return get_user_block_status;
  },

  get_reciever_device_token1: async function (get_data) {

    var chat_data = await database.query(`SELECT appusers.id,deviceToken,deviceType FROM appusers INNER JOIN socket_group ON appusers.id=socket_group.userId where socket_group.groupId=${get_data.groupId} and socket_group.notification=0 and  socket_group.userId NOT IN (${get_data.senderId})  and  socket_group.category="${get_data.category}"`)

    var tokendata = chat_data[0]
    var output1 = tokendata.map(user => user.deviceToken);

    var outpout2 = tokendata.map(user => user.id);
    console.log(outpout2)

    //     recors_upate = await notificationData.create({
    //       sender_id:get_data.senderId,
    //       receiver_id:get_data.receiverId,
    //       senderName:get_data.senderName,
    //       senderImage:get_data.senderProfileImage, 
    //       notification:'has sent you a messsage in groups'
    // })
    var i;
    for (i = 0; i < outpout2.length; i++) {
      recors_upate = await notificationData.create({
        sender_id: get_data.senderId,
        receiver_id: outpout2[i],
        senderName: get_data.senderName,
        senderImage: get_data.senderProfileImage,
        notification: 'has sent a message in the ' + get_data.groupName
      })



    }



    // get_reciever_token = await appusers.findOne({

    //   atrributes: ['id', 'deviceToken', 'deviceType'],//, 'isNotification'],
    //   where: {
    //     id: get_data.receiverId,
    //     // role: 2,
    //     //isNotification: 1
    //   }
    // });

    return output1


  },

  get_blocked_user_status1: async function (get_data) {



    //----------------------------------------
    //get_data.receiverId=2
    get_block_status_data = await userblocks.findOne({
      where: {

        blockUserId: get_data.senderId

      }
    });
    return get_block_status_data

  },


  send_push_notification1: function (get_message, device_token, device_type, title, data_to_send) {

    if (device_token != '' && device_token != null) {
      var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
      var fcm = new FCM(serverKey);
      if (device_type == 1) {
        var message = {
          // to: device_token,
          registration_ids: device_token,
          notification: {
            title: title,
            body: get_message
          },

          data: {
            body: get_message,
            receiver_data: data_to_send,
          }
        };
      } else {
        var message = {
          //  to: device_token,
          registration_ids: device_token,




          data: {
            body: get_message,
            receiver_data: data_to_send,
          }
        };
      }

      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", message);
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });

      return fcm;

    } else {
      return;
    }

  },


  get_message2: async function (get_msg_data) {

    get_user_status = await socket_group.findOne({
      where: {
        groupId: get_msg_data.groupId,
        category: get_msg_data.category,
        userId: get_msg_data.userId

      }

    })
    console.log(get_user_status.dataValues.msg_status)
    if (get_user_status.dataValues.msg_status == 0) {
      get_user_status = await groupMessages.findOne({
        where: {
          groupId: get_msg_data.groupId,
          groupName: get_msg_data.groupName
        }
      });
      // console.log(get_user_status);
      if (get_user_status) {
        var get_messages_data = await database.query(`SELECT senderId,groupId,groupName,message,appusers.name as senderName,appusers.image as senderProfileImage,messageType,category,group_messages.created FROM group_messages INNER JOIN appusers ON group_messages.senderId=appusers.id WHERE groupId=${get_msg_data.groupId} and groupName="${get_msg_data.groupName}"`, {

          // model: messages,
          //mapToModel: true,
          type: database.QueryTypes.SELECT
        });



        return get_messages_data;
      }
      return get_user_status
    }
    else {
      get_user_status = await groupMessages.findOne({
        where: {
          groupId: get_msg_data.groupId,
          groupName: get_msg_data.groupName
        }
      });
      get_user_status1 = await socket_group.findOne({
        where: {
          groupId: get_msg_data.groupId,
          category: get_msg_data.category,
          userId: get_msg_data.userId

        }

      })
      //console.log(get_user_status1.dataValues.msg_status)
      if (get_user_status) {
        var get_messages_data = await database.query(`SELECT senderId,groupId,groupName,message,appusers.name as senderName,appusers.image as senderProfileImage,messageType,category,group_messages.created FROM group_messages INNER JOIN appusers ON group_messages.senderId=appusers.id WHERE groupId=${get_msg_data.groupId} and groupName="${get_msg_data.groupName}" and group_messages.id>${get_user_status1.dataValues.msg_status}`, {

          // model: messages,
          //mapToModel: true,
          type: database.QueryTypes.SELECT
        });



        return get_messages_data;
      }
      return get_user_status

    }
    //return false;
  },


  get_chat_listing1: async function (get_chat_data) {

    userdata = await socket_group.findOne({

    })

    get_user_status = await appusers.findOne({
      where: {
        id: get_chat_data.userId
      }
    });

    if (get_user_status) {


      var chat_data = await database.query(`select *,(select Count(*) from messages where (receiverId=${get_chat_data.userId} and senderId=user_id) and (readStatus=0) ) as unreadcount  from (SELECT *,CASE WHEN senderId = ${get_chat_data.userId} THEN receiverId WHEN receiverId = ${get_chat_data.userId} THEN senderId  END AS user_id,(SELECT message FROM messages where id=lastMessageId ) as lastMessage ,(SELECT name FROM appusers where id=user_id) as userName, ifnull((SELECT image FROM appusers where id=user_id),'') as userImage,(SELECT  created  FROM messages where id=lastMessageId) as created_at ,(SELECT  messageType  FROM messages where id=lastMessageId) as messageType, ifnull((SELECT  isOnline  FROM socket_user where userId=user_id),0) as onlineStatus, ifnull((SELECT  status  FROM userblocks where (userId=user_id and blockUserId=${get_chat_data.userId}) or (blockUserId=user_id and userId=${get_chat_data.userId})),0) as block_status from chat_constants where (senderId=${get_chat_data.userId} or receiverId=${get_chat_data.userId}))tt where deletedId!=${get_chat_data.userId} order by created_at desc`, {

        model: messages,
        model: chatConstants,
        mapToModel: true,
        type: database.QueryTypes.SELECT
      })
      if (chat_data) {
        chat_data = chat_data.map(value => {
          value = value.toJSON();
          // value.block_status = 0;
          return value;
        });
      }
      return chat_data;
    }
  },


  delete_chat_users1: async function (get_data) {


    let dataget = await groupMessages.findOne({

      where: {
        category: get_data.category,
        groupId: get_data.groupId,


      },
      limit: 1,

      order: [
        ['id', 'DESC']
      ]

    })

    //console.log(dataget)
    let update_last = await socket_group.update({
      msg_status: dataget.dataValues.id
    },
      {
        where: {
          category: get_data.category,
          groupId: get_data.groupId,
          userId: get_data.userId

        }
      }
    );

    return update_last



  },

  notification_users1: async function (get_data) {



    let update_last = await socket_group.update({
      notification: get_data.notification
    },
      {
        where: {
          category: get_data.category,
          groupId: get_data.groupId,
          userId: get_data.userId

        }
      }
    );

    return update_last



  },


  one_chat_users1: async function (get_data) {


    let dataget = await messages.findOne({

      limit: 1,

      order: [
        ['id', 'DESC']
      ]

    })

    //console.log(dataget)
    let update_last = await socket_user.update({
      msg_status: dataget.dataValues.id
    },
      {
        where: {
          userId: get_data.userId,
          receiverId: get_data.receiverId,
        }
      }
    );

    return update_last



  },


  notification1: async function (get_data) {


    let update_last = await socket_user.update({
      notification: get_data.notification
    },
      {
        where: {

          userId: get_data.userId,
          receiverId: get_data.receiverId


        }
      }
    );

    return update_last



  },







}