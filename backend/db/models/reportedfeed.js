

const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reportedfeed', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
   feedId:{
    type: DataTypes.INTEGER(11),
    allowNull: false,

   },

   userId:{
    type: DataTypes.INTEGER(11),
    allowNull: false,

   }
,

   reason:{
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
    tableName: 'reportedfeed',
    timestamps: true
  });
};
