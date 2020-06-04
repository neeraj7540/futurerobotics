const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('crmpages', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      default: ''
    },
   
    content : {
      type: DataTypes.TEXT(),
      allowNull: false,
      default: ''
      
     }
    ,
     status : {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        default: 1
        
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
    tableName: 'crmpages',
    timestamps: true
  });
};
