'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/db.js')[env];
const db = {};

let sequelize;
let models = {};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

let modules = [
  require('./admin.js'),
  require('./appusers.js'),
  require('./groups.js'),
  require('./feedscategory.js'),
  require('./otherapps.js') ,
  require('./crmpages.js'),
  require('./feed.js'),
  require('./feedlikedeslike.js'),
  require('./feedcomment.js'),
  require('./reportedfeed.js'),
  require('./post.js'),
  require('./ads.js'),
  require('./groupaccess.js'),
  require('./notification.js'),
  require('./chat.js'),
  require('./constant'),
  require('./blocked_user'),
  require('./online_user'),
  require('./user_post.js'),
  require('./robotlist.js'),
  require('./plclist.js'),
  require('./general.js'),
  require('./comment_likedeslike.js'),
  require('./socket_user.js'),
  require('./userblocks.js'),
  require('./chat_constants.js'),
  require('./messages.js'),
  require('./chat_block.js'),
  require('./roomlist.js'),
  require('./group_messages.js'),
  require('./socket_group.js'),
  require('./update_messages.js'),
  require('./notification_data.js')
  
   
];
// Initialize models
modules.forEach((module) => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = models;
