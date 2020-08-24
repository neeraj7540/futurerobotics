const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plclist', {
    plc_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id:{
        type: DataTypes.INTEGER(11),
        allowNull: true,
        

    },
   name: {
      type: DataTypes.STRING(60),
      allowNull: true,
      default: ''
    },
    image: {
        type: DataTypes.STRING(140),
        allowNull: true,
        default: ''
      },
      count:{
        type: DataTypes.INTEGER(11),
        allowNull: true,
        },

    isSelected: {
        type: DataTypes.STRING(60),
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
    tableName: 'plclist',
    timestamps: true
  });
};
