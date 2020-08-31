const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('groups', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    image: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    name : {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    count:{
      type: DataTypes.INTEGER(11),
      allowNull: true,
      },

    category : {
        type: DataTypes.STRING(60),
        allowNull: false,
      },

    
    status : {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      default: 0
      
     }
    
    ,
    description : {
        type: DataTypes.STRING(60),
        allowNull: false,
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
    
    isChecked:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false

    }


         
}, {
    tableName: 'groups',
    timestamps: true
  });
};
