const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feed', {
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
    userId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,

    },

    feedCatId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,

    },
  
    status : {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      default: 0
      
     }
    
    ,
    description : {
        type: DataTypes.TEXT(),
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

         
}, {
    tableName: 'feed',
    timestamps: true
  });
};
