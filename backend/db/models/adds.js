const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adds', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    

    
    url : {
        type: DataTypes.TEXT(),
        allowNull: false,
        default: ''
        
       },
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
    tableName: 'adds',
    timestamps: true
  });
};
