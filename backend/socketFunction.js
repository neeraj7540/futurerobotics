const config = require('config');
const sequelize = require('sequelize');

const db = require('./db/db');
console.log(db)
const apiResponseHelper = require('./helpers/apiResponseHelper');
const socket_user = db.models.socketUser




module.exports = {

    create_time_stamp: async function () {

        let current_time = Math.round(new Date().getTime() / 1000)
    
        return current_time;
      },
      check_socket_id: async function (connect_listener, socket_id) {

        let check_user = await socket_user.findOne({
    
          where: {
            userId: connect_listener.userId
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
    
      }





}