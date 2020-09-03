const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedcomment', {
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

       feedId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,

    },

  
    status : {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      default: 0
      
     }
    
    ,
    comment : {
        type: DataTypes.TEXT(),
        allowNull: false,
       }
      ,

      like : {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        default: 0
        
       }

   ,

   deslike : {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    default: 0
    
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
    tableName: 'feedcomment',
    timestamps: true,
    defaultValue:""
  });
};
