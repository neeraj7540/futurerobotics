const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedlikedeslike', {
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
     likeDeslike:{
     type: DataTypes.INTEGER(2),
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
    tableName: 'feedlikedeslike',
    timestamps: true
  });
};
