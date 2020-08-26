const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_post', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
},
 category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
 
    image: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      description : {
          type: DataTypes.TEXT(),
          allowNull: false,
          default: ''
          
         }
        ,

   status : {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      default: 0
      
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
    tableName: 'user_post',
    timestamps: true
  });
};