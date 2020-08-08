const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('notification', {
        noti_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true  
          },
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: true,
      
          },
        
          notification: {
            type: DataTypes.STRING(1000),
            allowNull: true,
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
      tableName:'notification',
      timestamps: true
    });
  };
  