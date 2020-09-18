const config = require('config');
const sequelize = require('sequelize');

const db = require('./db/db');

const socket_user =db.models.socket_user;
console.log(socket_user)
//console.log(db)
const apiResponseHelper = require('./helpers/apiResponseHelper');


const fs = require('fs');
const  path = require('path');




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
            createdAt: await this.create_time_stamp(),
            updatedAt: await this.create_time_stamp()
          })
        }
        return create_socket_user;
    
      },
      socket_disconnect: async function (socket_id) {
        console.log(socket_id,"socket_id") 
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
      }





}