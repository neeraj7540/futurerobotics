const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification_data', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sender_id:{
        type: DataTypes.INTEGER(11),
        allowNull: true,
        

    },
  receiver_id:{
        type: DataTypes.INTEGER(11),
        allowNull: true,
        },

 senderName: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      default: ''
    },
   senderImage: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        default: ''
      },
   notification: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        default: ''
      },

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
    tableName: 'notification_data',
    timestamps: true
  });
};
