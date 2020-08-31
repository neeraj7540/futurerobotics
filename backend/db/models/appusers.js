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
      allowNull: true
    },
  
    image: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    name : {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    biodesc : {
      type: DataTypes.STRING(100),
      allowNull: true,
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
      //allowNull: false,
      allowNull: true,
      default: ""

    }
    ,
    age:{
      type: DataTypes.STRING(150),
      allowNull: true,
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
      allowNull: true,
    },
    deviceToken : {
      type: DataTypes.STRING(200),
      allowNull: true,
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
      allowNull:true
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
    lat : {
      type: DataTypes.STRING(60),
      allowNull: true,
      default: ""
    },
    long : {
      type: DataTypes.STRING(60),
      allowNull: true,
      default: ""
    },
   
    select_robots : {
      type: DataTypes.STRING(60),
      allowNull: true,
      default: ""
    },
    select_plc : {
      type: DataTypes.STRING(60),
      allowNull: true,
      default: ""
    },
    about_me : {
      type: DataTypes.STRING(600),
      allowNull: true,
      default: ""
    },
    social_type : {
      type: DataTypes.STRING(600),
      allowNull: true,
      default: ""
    },
    social_id : {
      type: DataTypes.STRING(600),
      allowNull: true,
      default: ""
    },
    email_check : {
      type: DataTypes.STRING(20),
      allowNull: true,
      default: ""
    },


    resetLink:{
      type: DataTypes.STRING(600),
      default: ""

    },
    otp:{
      type: DataTypes.STRING(60),
      default: ""

    }
    ,
    emailStatus:{
      type: DataTypes.STRING(60),
      default: ""

    },
    facebook_url:{
      type: DataTypes.STRING(100),
      default: ""

    },
    linkedin_url:{
      type: DataTypes.STRING(100),
      default: ""

    },
    instagram_url:{
      type: DataTypes.STRING(100),
      default: ""

    },
   joined_date:{
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: common.timestamp()

    },
    phone:{
      type: DataTypes.STRING(100),
      default: ""

    }
    
         
}, {
    tableName: 'appusers',
    timestamps: true
  });
};
