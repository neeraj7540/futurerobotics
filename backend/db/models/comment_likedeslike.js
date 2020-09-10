const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment_likedeslike', {
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

    commentId:{
        type: DataTypes.INTEGER(11),
        allowNull: false,

    },
 status : {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      default: 0
      
     }
    ,
     likeDeslike:{
     type: DataTypes.INTEGER(2),
      allowNull: false,
      default: 0


     }

      ,
  

    like_count:{
      type: DataTypes.INTEGER(11),
      allowNull: true,

  },
  deslike_count:{
    type: DataTypes.INTEGER(11),
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
    tableName: 'comment_likedeslike',
    timestamps: true
  });
};
