const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('socket_user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

   userId:{
   type: DataTypes.INTEGER(11),
   allowNull: true,

 },

socketId:{
     type: DataTypes.STRING(50),
      allowNull: true,

},
  
isOnline: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      default: 0
      
     }    
    ,
  createdAt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    },
    updatedAt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    },  

         
}, {
    tableName: 'socket_user',
    timestamps: true
  });
};

