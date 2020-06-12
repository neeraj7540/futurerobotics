const common = require('../../helpers/common');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appusers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
  
    image: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    name : {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    about:{
      type: DataTypes.TEXT(),
      allowNull: true,
      default: ""

    },

    work:{
      type: DataTypes.TEXT(),
      allowNull: true,
      default: ""

    },

    dob:{
      type: DataTypes.STRING(150),
      allowNull: false,
      default: ""

    }
    ,
    additional:{
      type: DataTypes.TEXT(),
      allowNull: true,
      default: ""

    }
    ,
    location : {
      type: DataTypes.STRING(60),
      allowNull: true,
      default: ""
    },

    country : {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
   
    deviceType : {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    deviceToken : {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
    ,
    status : {
      type: DataTypes.INTEGER(11),
      default: 0
      
     }
    
    ,

    hireAvailable:{
      type:Boolean,
      default:true
    }
     ,
      
     occupation: {
      type: DataTypes.TEXT(),
      default: ""
    }
    ,
    company:{
      type: DataTypes.TEXT(),
      default: ""

    }
    ,
    experience:{
      type: DataTypes.TEXT(),
      default: ""
    }
     ,
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    tableName: 'appusers',
    timestamps: true
  });
};
