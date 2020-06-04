const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedscategory', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    name: {
      type: DataTypes.STRING(60),
      allowNull: true,
      default: ''
    },
   
    status : {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      default: 0
      
     }
    
    ,
    description : {
        type: DataTypes.TEXT(),
        allowNull: true,
        default: ''
        
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
    tableName: 'feedscategory',
    timestamps: true
  });
};
