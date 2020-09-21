const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userblocks', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,  
    },
    blockUserId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,  
    },
    status : {
        type: DataTypes.INTEGER(1),
        //  enum : ['0', '1'],      //0=unblock, 1=block
        defaultValue: 1
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
        tableName: 'userblocks',
        timestamps: true
    });
};
