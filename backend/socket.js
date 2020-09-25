const config = require('config');
const Sequelize = require('sequelize');

const db = require('./db/db');
var base64Img = require('base64-img');

const socket_user =db.models.socket_user;
const apiResponseHelper = require('./helpers/apiResponseHelper');
//const socket_user = db.models.socket_user
console.log(socket_user)

const Op = Sequelize.Op;
const my_function = require('./socketFunction.js');

module.exports = function (io) {
  io.on('connection', function (socket) {

    console.log("socket Connected");
    socket.on('connect_user', async function (connect_listener) {
      try {
        let socket_id = socket.id
        let check_socket_id = await my_function.check_socket_id(connect_listener, socket_id);
        success_message = [];
        success_message = {
          'success_message': 'connected successfully'
        }
        socket.emit('connect_listener', success_message);//
      } catch (error) {
        throw error
      }
    });

    socket.on('disconnect', async function () {
      let socket_id = socket.id
      console.log("jgscjasvjksh"+socket.id)
      let socket_disconnect = await my_function.socket_disconnect(socket_id)

      console.log('socket user disconnected');
    });

 
    
    socket.on('send_message', async function (get_data) {
      try {

         //console.log("Neeraj")
        let get_block_status_data_user = await my_function.get_blocked_user_status(get_data)
          //  console.log(get_block_status_data_user,"get_block_status_data_user")
        if(get_block_status_data_user!=null){
        if (get_block_status_data_user.dataValues.userTo == get_data.senderId) {
          success_message = [];
          success_message = {
            'success_message': 'You Are Blocked By This User'
          }
          socket.emit('new_message', success_message);
          return;
        }
      }
        // } else {

          if (get_data.messageType == 1) {
            extension_data = get_data.extension
            convert_image = await my_function.image_base_64(get_data.message, extension_data);
            get_data.message = convert_image;
          }
          let send_message = await my_function.send_message(get_data)
          let data_to_send = await my_function.data_to_send(get_data);

          let get_message = await my_function. get_message1(get_data);
          //socket.emit('new_message', data_to_send);
          socket.emit('new_message', get_message);
          let get_reciever_data = await my_function.get_reciever_data(get_data)
          if (get_reciever_data.isOnline == 1) {
            let get_block_status_data = await my_function.get_block_status_users(get_data);

            /*    console.log(get_block_status,"get_block_status"); */
            console.log(!get_block_status_data, "============")
            if (!get_block_status_data) {
              socket.to(get_reciever_data.dataValues.socketId).emit('new_message', get_message);
            }
          }

           let get_reciever_device_token = await my_function.get_reciever_device_token(get_data)
          // get_reciever_device_token.dataValues.deviceToken='deUAAwWyQ42mz3vplOvOna:APA91bHfosYaHG0fK8XWmtmR_5_nT0NpvaBT0fi2tml5j5RmLA7Am_gSdCMkPSpcmcfkjzjqHKHeHgms8KVwf3KkVM_fxw-kfhkJ9gcDDRm5fUr9Mp8B30TfjTVn2KFPQXrqrUtc4oZc'
           get_reciever_device_token.dataValues.device_type=1

         

          if (get_reciever_device_token && get_data.message!='') {
             console.log("innnnnnnnnnndata"); 
            message = get_data.senderName + ' Sent You a Message'
            device_token = get_reciever_device_token.dataValues.deviceToken
            device_type = get_reciever_device_token.dataValues.device_type
            title = 'Future Robotics'
            let send_push_to_reciever = await my_function.send_push_notification(message, device_token, device_type, title, data_to_send)
          }
        

      } catch (error) {
        throw error
      }
    });


    socket.on('get_message', async function (get_msg_data) {
      try {
        // console.log(get_msg_data,"from socket");

        let get_message = await my_function.get_message(get_msg_data);
        console.log(get_message,"from sockjet========");

        if (get_message.length > 0) {

          socket.emit('get_data_message', get_message);

        } else {

          success_message = [];
          // success_message = {
          //   'success_message': 'Data Not Available'
          // }
          socket.emit('get_data_message', success_message);
        }

      } catch (error) {
        throw error
      }
    });

    socket.on('chat_listing', async function (chat_data) {
      try {
        console.log(chat_data, "=====socket ");
        let get_chat_listing = await my_function.get_chat_listing(chat_data);

        if (get_chat_listing.length > 0) {
          socket.emit('chat_message', get_chat_listing);
        } else {

          success_message = [];
          /* success_message = {
            'success_message': 'Data Not Available'
          } */
          socket.emit('chat_message', success_message);

        }
      } catch (error) {
        throw error
      }
    });

    socket.on("block_user", async function (block_data) {
      try {

        let block_data_user = await my_function.block_user(block_data);

        /* console.log(block_data_user,"block_data_user") */
        create_data = [];
        create_data = {
          'block_data': block_data.status
        }
        socket.emit('block_data', create_data);
      } catch (error) {
        throw error
      }
    });

    socket.on('delete_chat', async function (delete_chat) {
      try {

        let delete_chat_data = await my_function.delete_chat_users(delete_chat)
        success_message = []
        success_message = {
          'success_message': 'Chat Deleted Successfully'
        }

        socket.emit('delete_data', success_message);

      } catch (error) {
        throw error
      }
    });

//---------------------------Testing- group------------------------------------------------------------------------
socket.on('connect_user1', async function (connect_listener) {
  try {
  let socket_id = socket.id
  let check_socket_id = await my_function.check_socket_id1(connect_listener, socket_id);
  
  //console.log(check_socket_id)
  let availableGroups = await my_function.getRoomList(connect_listener, socket_id);
 // console.log(availableGroups)
  availableGroups.forEach(item=>{ 
  socket.join(item.groupId); 
  });
  
  success_message = [];
  success_message = {
  'success_message': 'connected successfully',
  'connectedGroups': availableGroups
  
  }
  socket.emit('connect_listener1', success_message);
  } catch (error) {
  throw error
  }
  });


  //------------------------------------------
  socket.on('send_message_group', async function (get_data) {
    try {

       
      let get_block_status_data_user = await my_function.get_blocked_user_status1(get_data)
        
      if(get_block_status_data_user!=null){
      if (get_block_status_data_user.dataValues.userTo == get_data.senderId) {
        success_message = [];
        success_message = {
          'success_message': 'You Are Blocked By This User'
        } 
        socket.emit('messageReceiveAtGroup', success_message);
        return;
      }
    }
    console.log("Neeraj")
      // } else {

        if (get_data.messageType == 1) {
          extension_data = get_data.extension
          convert_image = await my_function.image_base_64(get_data.message, extension_data);
          get_data.message = convert_image;
        }
        let send_message = await my_function.send_message1(get_data)
        let data_to_send = await my_function.data_to_send1(get_data);
        let availableGroups = await my_function.getRoomList(get_data);
       
        console.log(availableGroups[0].groupId)
        socket.emit('messageReceiveAtGroup', data_to_send);

        

        let get_reciever_data = await my_function.get_reciever_data1(get_data)
        console.log("Neeraj")
        if (get_reciever_data.isOnline == 1) {
          let get_block_status_data = await my_function.get_block_status_users1(get_data);

          
          console.log(!get_block_status_data, "============")
          if (!get_block_status_data) {
            socket.to(availableGroups[0].groupId).emit('messageReceiveAtGroup', data_to_send);
          
          }
        }

         let get_reciever_device_token = await my_function.get_reciever_device_token1(get_data)
        // get_reciever_device_token.dataValues.deviceToken='deUAAwWyQ42mz3vplOvOna:APA91bHfosYaHG0fK8XWmtmR_5_nT0NpvaBT0fi2tml5j5RmLA7Am_gSdCMkPSpcmcfkjzjqHKHeHgms8KVwf3KkVM_fxw-kfhkJ9gcDDRm5fUr9Mp8B30TfjTVn2KFPQXrqrUtc4oZc'
       
        console.log(get_reciever_device_token)
        device_type=1

      

         console.log('Neeraj Kumar')

        if (get_reciever_device_token && get_data.message!='') {
           console.log("innnnnnnnnnndata"); 
          message = get_data.senderName + ' Sent You a Message'
          device_token = get_reciever_device_token
          device_type = device_type
          title = get_data.groupName
          let send_push_to_reciever = await my_function.send_push_notification1(message, device_token, device_type, title, data_to_send)
        }
      

    } catch (error) {
      throw error
    }
  });


  socket.on('get_group_message', async function (get_msg_data) {
    try {
      // console.log(get_msg_data,"from socket");

      let get_message = await my_function.get_message2(get_msg_data);
      console.log(get_message,"from sockjet========");

      if (get_message) {

        socket.emit('get_group_data_message', get_message);

      } else {

        success_message = [];
        // success_message = {
        //   'success_message': 'Data Not Available'
        // }
        socket.emit('get_group_data_message', success_message);
      }

    } catch (error) {
      throw error
    }
  });


  socket.on('group_chat_listing', async function (chat_data) {
    try {
      console.log(chat_data, "=====socket ");
      let get_chat_listing = await my_function.get_chat_listing1(chat_data);

      if (get_chat_listing.length > 0) {
        socket.emit('group_chat_list', get_chat_listing);
      } else {

        success_message = [];
        /* success_message = {
          'success_message': 'Data Not Available'
        } */
        socket.emit('group_chat_list', success_message);

      }
    } catch (error) {
      throw error
    }
  });


//------------------------------------------------------------------------------------------


socket.on('group_chat_delete', async function (get_data) {
  try {

    let delete_chat_data = await my_function.delete_chat_users1(get_data)
    success_message = []
    success_message = {
      'success_message': 'Chat Deleted Successfully'
    }

    socket.emit('group_delete_data', success_message);

  } catch (error) {
    throw error
  }
});

//---------------------------------Notification-----------------------------------------------

socket.on('notification_status', async function (get_data) {
  try {

    let delete_chat_data = await my_function.notification_users1(get_data)

    if(get_data.notification ==0){
      success_message = {
        'success_message': 'Notifications Unblock Successfully'
      }

    }

    if(get_data.notification ==1){
      success_message = {
        'success_message': 'Notifications block Successfully'
      }

    }

    // success_message = []
    // success_message = {
    //   'success_message': ' Successfully'
    // }

    socket.emit('notification_information', success_message);

  } catch (error) {
    throw error
  }
});


//---------------------------Clear Chat-----------------------------------------------

socket.on('chat_clear_one', async function (get_data) {
  try {

    let delete_chat_data = await my_function.one_chat_users1(get_data)
    success_message = []
    success_message = {
      'success_message': 'Chat Deleted Successfully'
    }

    socket.emit('chat_clear_one_data', success_message);

  } catch (error) {
    throw error
  }
});


//--------------------------Notificatio--------one to one-------------------------

socket.on('notification_one_to_one', async function (get_data) {
  try {

    let delete_chat_data = await my_function.notification1(get_data)

    if(get_data.notification ==0){
      success_message = {
        'success_message': 'Notifications Unblock Successfully'
      }

    }

    if(get_data.notification ==1){
      success_message = {
        'success_message': 'Notifications block Successfully'
      }

    }

    // success_message = []
    // success_message = {
    //   'success_message': ' Successfully'
    // }

    socket.emit('notification_one', success_message);

  } catch (error) {
    throw error
  }
});




















  })
}


