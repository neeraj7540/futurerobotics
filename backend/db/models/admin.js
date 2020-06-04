const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false
    },


    role: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
   

    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  
   
    image: {
      type: DataTypes.STRING(60),
      allowNull: false
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
    tableName: 'admin',
    timestamps: false
  });
};
