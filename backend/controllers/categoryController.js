const config = require('config');
const db = require('../db/db');
const fs = require('fs');
const common = require('../helpers/common');
const responseHelper = require('../helpers/responseHelper');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const filesUpload = require('../helpers/uploadFiles').uploadFile;
const Users = db.models.users;
const Categories = db.models.categories;
const groupUsers = db.models.groupUsers;
const appUsers = db.models.appUsers;
const accessRequest = db.models.accessRequest;
const accessRequestTable = db.models.accessRequest;
const groupMessageTable =  db.models.groupMessages;
const message = db.models.messages;
const chatConstant = db.models.chatConstants;
const Sequelize = require('sequelize');
const database = require('../db/db.js');



Categories.belongsTo(Users, { foreignKey: 'addedBy' });
Categories.hasMany(groupUsers, { foreignKey: 'groupId' });
accessRequest.belongsTo(appUsers,{ foreignKey: 'userId' })
groupUsers.belongsTo(appUsers,{ foreignKey: 'userId' });
chatConstant.belongsTo(message,{ foreignKey: 'lastMessageId'})
chatConstant.belongsTo(appUsers,{foreignKey:'receiverId'})


module.exports = {
  //////============================= add Category Function ===============================//////
  add: async (req, res) => {
    try {

     const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.categoriesFilePath);
      if (uploadFile) {
        const category = await Categories.findOne({
          where: {
            name: req.body.name
          }
        });
        if (!category) {
          const data = {};
          data.name = req.body.name;
          data.image = uploadFile[0].imageName;
          data.addedBy = common.userId(req.token);
          data.lastMessage="";
          data.maxparticipants='0';
          data.lastMessageType='0'
          data.lastMessageTime= Math.round(new Date().getTime() / 1000);
          const addCategory = await Categories.create(data);
          if (addCategory) {
            responseHelper.post(res, 'Added', 'Group Added Successfully ');
          } else {
            responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
          }
        } else {
          fs.unlinkSync(uploadFile[0].imageName);
          responseHelper.post(res,'Exists', 'Group already exists');
        }
      }
      else {
        responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
      }

    } catch (e) {
      return responseHelper.onError(res, 'Error', e);
    }
  },
  //////============================= view Categories Function ===============================//////

  

// 

  view: async (req, res) => {
    try {
      const category = await Categories.findAll({
        attributes: ['id', 'status', 'name', 'image', 'updatedAt', 'user.email'],
        include: [
          {
            model: Users,
            attributes: [],
            required: true
          },
        ],
        raw: true
      });
      if (category) {
        responseHelper.get(res,'category list', category)
      } else {
        responseHelper.get(res, 'category list', [])
      }
    } catch (e) {
      return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
    }
  },
  //////============================= get specific Category Function ===============================//////
  viewById: async (req, res) => {
    try {
      const catId = req.params.id;
      const category = await Categories.findByPk(catId,
        {
          attributes: ['id', 'status', 'name', 'image', 'user.email'],
          include: [
            {
              model: Users,
              attributes: [],
              required: true
            },
          ],
          raw: true
        });
      if (category) {
        responseHelper.get(res,'category Detail', category)
      } else {
        responseHelper.onError(res,'Group Detail', 'Invalid Group Id')
      }
    } catch (e) {
      responseHelper.onError(res,'Error', 'Something Went Wrong.Please Try Again');
    }
  },
  //////============================= update Category Status Function ===============================//////
  status: async (req, res) => {
    try {
      req.checkBody('id', 'Group id is required').notEmpty();
      req.checkBody('status', 'status is required').notEmpty();
      req.checkBody('id', 'Group id should be integer').isInt();
      const error = req.validationErrors();
      if (error) {
        responseHelper.onError(res, 'Error', error[0].msg);
        return;
      }
      const data = req.body;
      data.status = data.status;

      const catStatus = await Categories.update(
        data,
        {
          where: {
            id: data.id
          }
        });
      if (catStatus) {
        responseHelper.put(res, 'Status', 'Successfully Updated!')
      } else {
        responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again!')
      }
    } catch (e) {
      responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again!');
    }
  },

    //////============================= update Category  Function ===============================//////
    update: async (req, res) => {
      try {

        const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.categoriesFilePath);
        if (uploadFile) {
             const data = {};
             data.name = req.body.name;
             // if image is not changed
             if(uploadFile === true) {
             }   
             // if image is changed           
             else {
            // data.image = uploadFile[0].imageName;
             }
             if(req.body.imageChanged=="yes"){
              data.image = uploadFile[0].imageName;
             }
             else{
               
             }
        
            const updateCategory = await Categories.update(
              data,
              {
                where: {
                  id: req.body.id
                }
              });
             if (updateCategory) {
               responseHelper.post(res, 'Updated', 'Group Updated Successfully');
             } else {
               responseHelper.onError(res,'Error', 'Something Went Wrong.Please Try Again');
             }
        }
         else {
           responseHelper.onError(res,'Error', 'Something Went Wrong.Please Try Again');
         }
   
       } catch (e) {
          if(e.errors[0].message === 'name must be unique') {
            responseHelper.onError(res, 'Error','Group already exists');
            return; 
          }
          responseHelper.onError(res, 'Error',e.errors[0].message);
       }
    },

 //////=================================== delete category Function ====================================//////
 
 delete : async(req,res) => {
  try {
   const category = await Categories.findOne({
     attributes: ['image'],
     where: {
       id: req.params.id
     }
   });
   if(category) {
   
     console.log(req.params.id);



     const inqueryAccessRequest = await  accessRequestTable.findAll({
      attributes: ['id'],
      where: {
        groupId: req.params.id
      }
   })

     if(inqueryAccessRequest){
      const accessRequest = await   accessRequestTable.destroy({ where: { 
        groupId: req.params.id 
      }})
     }  

     
     const inqueryGroupMessageRequest = await  groupMessageTable.findAll({
      attributes: ['id'],
      where: {
        groupId: req.params.id
      }
   })

     if(inqueryGroupMessageRequest){
      const groupMessageRequest = await  groupMessageTable.destroy({ where: { 
        groupId: req.params.id 
       }})

     }

     const deleteCategory =  await Categories.destroy({
       where: {
       id : req.params.id
      }
    })


  if(deleteCategory) {


   fs.unlinkSync(category.dataValues.image);
   responseHelper.del(res, 'Deleted', 'Group Successfully Deleted!');

  } else {
   responseHelper.onError(res,'Error', 'Something Went Wrong.Please Try Again');

  }
 } else {
   responseHelper.onError(res,'Error', 'Group Not Exists');

 }
  } catch (e) {
    console.log(e)
   responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');

  }
},





  //////============================= get active Category Function ===============================//////
  viewByStatus: async (req, res) => {
    try {
      // const catId = req.params.id;
      const status = req.params.status;

      console.log(status);

      const category = await Categories.findAll({
        attributes: ['name','id'],
        where: {
          status: req.params.status
        }
      });
      if (category) {
        responseHelper.get(res,'Group Detail', category)
      } else {
        responseHelper.onError(res, 'Group Detail', 'Invalid Group status')
      }
    } catch (e) {
      responseHelper.onError(res,'Error', 'Something Went Wrong.Please Try Again');
    }
  },


  apiGroupsList: async (req, res) => {
   
     try {
    
       allGroupUsers=[];

      let  category = await Categories.findAll({
        attributes: ['id', 'status', 'name', 'image','lastMessageType',"lastMessage",'lastMessageTime'],
        raw:true
      });

      let  accessRequestData = await accessRequest.findAll({
        attributes: ['id','userId' ,'groupId','requestStatus','unreadCount','updated'],
        raw :true,
      });

     
      if (category) {
        category.forEach(item=>{
            item.status=0;
            let index = accessRequestData.findIndex(element=>{
              if(element.groupId==item.id && element.userId==req.user.id && element.requestStatus==2){
                 return element;
              }
            })
        if(index!=-1){
             // console.log(accessRequestData[index].unreadCount);
              item.status=Number(accessRequestData[index].requestStatus);
              item['unreadCount']=accessRequestData[index].unreadCount;
              if(item.lastMessageTime<accessRequestData[index].updated){
                item.lastMessage="";
                item['unreadCount']=0;
                item.lastMessageTime=0;
               }
            }
        })

        category = category.filter(item=>item.status==2);
          
        
      
           await Promise.all(category.map(async item => {
           let  accessRequestUserData = await accessRequest.findAll({
              attributes: ['id','userId' ,'groupId','requestStatus','unreadCount','updated'],
              raw :true,
              where:{
                groupId:item.id,
                requestStatus:'2',                
              },
              include: [
                {
                model: appUsers,
                attributes: ['id','name','image','phone'],
                },
              ],
            });
            accessRequestUserData.forEach(item=>{
              var obj  = new Object();
              if(item['appUser.id']!=null && item['appUser.id']!=req.user.id){
                obj.id = item['appUser.id'];
                obj.name = item['appUser.name'];
                obj.image = item['appUser.image'];
                obj.phone = item['appUser.phone'];
                obj.lastMessageType = '0';
                obj.lastMessage ="";
                obj.lastMessageTime = 0;
                obj.unreadCount = 0;
                allGroupUsers.push(obj);
              }
              
            })
                                  
          }))
       const recentchat = await database.query('select *,(select name from appUsers where id=tt.userid) as username,(select image from appUsers where id=tt.userid) as userimage,(select phone from appUsers where id=tt.userid) as phone,(SELECT count(*) as unreadcount FROM `messages` WHERE ((`senderId`=tt.userid and `receiverId`='+req.user.id+')) and `readStatus`=0) as unreadcount  from (SELECT  *,(SELECT  `message` FROM `messages` WHERE `id`=`lastMessageId`) as msg,(SELECT `messageType` FROM `messages` WHERE `id`=`lastMessageId`) as messageType, (SELECT `senderId` FROM `messages` WHERE `id`=`lastMessageId`) as messagesSenderId,(SELECT `receiverId` FROM `messages` WHERE `id`=`lastMessageId`) as messagesReceiverId,case when `senderId`='+req.user.id+' then `receiverId` when `receiverId`='+req.user.id+' then `senderId` end as userid FROM chat_constants where `senderId`='+req.user.id+' or `receiverId`='+req.user.id+')tt', {
       type: database.QueryTypes.SELECT
      });
    
     recentchat.forEach(element=>{
         if(element.username!=null){
          let obj = {};
          obj.id = element.userid;
          obj.name = element.username;
          obj.image = element.userimage;
          obj.phone = element.phone;
          obj.lastMessageType = String(element.messageType);
          obj.lastMessage = element.msg;
          obj.lastMessageTime = element.created;
          obj.unreadCount = element.unreadcount;
         
          category.unshift(obj);

         }
         
       })

     
     category =  category.sort((a,b) => {return (b.lastMessageTime - a.lastMessageTime)});

     allGroupUsers.forEach(element=>{
           let findIndex = category.findIndex(item=>item.id==element.id && item.name==element.name);
           if(findIndex==-1){
            category.push(element);
           }
     })
    
    

     // console.log(recentchat);
      return apiResponseHelper.get(res, true, 'Groups list', category)

      } else {
        return apiResponseHelper.get(res, true, 'Groups list', [])
      }
    } catch (e) {
      // return apiResponseHelper.onError(res, false,{},'Something Went Wrong.Please Try Again');
      throw e;
    }
  },

  
  ApiGroupViewById: async (req, res) => {
    try {
      const catId = req.params.id;
      const category = await Categories.findByPk(catId,
        {
          attributes: ['id', 'name', 'image','lastMessageType',"lastMessage",'lastMessageTime'],
          raw: true
          
        });
        
      if (category) {
        const groupUsersData = await accessRequest.findAll({
        attributes: ['userId', 'groupId'],
        where: {
          groupId: catId,
          requestStatus:'2'
        },
         include: [
          {
          model: appUsers,
          attributes: ['id','name','image','phone'],
          raw:true,
          },
        ],


        raw:true,
    
      });
   
      groupUsersData.map(item=>{
       // console.log(item, req.user.id);

        if(item['appUser.name']!=null){
          item['userName'] = item['appUser.name'];
          item['userImage'] = item['appUser.image'];
          item['phone'] = item['appUser.phone'];
          delete item['appUser.name'];
          delete item['appUser.image'];
          delete item['appUser.phone'];
          return item;

        }
       
      }) 

      var index = groupUsersData.findIndex(item=>item['appUser.id']==req.user.id);
   
      if(index!=-1){
        groupUsersData.splice(index, 1);

      }


      return apiResponseHelper.get(res, true, 'Group Details', {category,groupUsersData});
   
    } else {
       return apiResponseHelper.onError(res, false ,'Invalid Group Id','Invalid Group Id')
      }
    } catch (e) {
      throw e
     //return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', []);
    }
  },

  apiUserGroupsList : async (req,res) =>{
    try {
      const userGroups = await accessRequest.findAll({
        attributes: ['id','groupId'],
        where:{
          userId:req.params.id,
          requestStatus:'2'       
        },
        raw:true
      });

      if(userGroups){  
      responseHelper.post(res, 'Success', userGroups);
      }
    else{
        responseHelper.post(res, 'error', 'Unable to find any user groups');
    } 
      
     }
  catch (e){
    return responseHelper.post(res,'Error',e)
     }   
  }



}