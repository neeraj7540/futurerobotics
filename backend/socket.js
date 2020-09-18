const config = require('config');
const Sequelize = require('sequelize');

const db = require('./db/db');
//console.log(db)
const apiResponseHelper = require('./helpers/apiResponseHelper');
const socket_user = db.models.socket_user
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







  })
}


