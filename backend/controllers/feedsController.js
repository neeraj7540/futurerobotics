const config = require('config');
const db = require('../db/db');
const { models } = db;

const sequelize = require('sequelize');
const { Op } = sequelize;

const helper = require('../helpers/helper');
const apiResponseHelper = require('../helpers/apiResponseHelper');
const reportedFeedsTable = db.models.reportedfeed;
const feedsTable = db.models.feed;
const appUsersTable = db.models.appusers;
const feeCatTable = db.models.feedscategory;
const groupsTable = db.models.groups;
const reportedTable = db.models.reportedfeed;

const postTable = db.models.post;
const FCM = require('fcm-node');

const likeDeslikeTable = db.models.feedlikedeslike

const feedCommentTable = db.models.feedcomment;

const messages = db.models.messages;

const database = require('../db/db');

const socket_group = db.models.socket_group;

const notificationData = db.models.notification_data;

console.log(notificationData)

const groupMessages = db.models.group_messages;

const updateMessages = db.models.update_messages;


const oneUpdateMessages = db.models.one_update_messages;

//------------------------
//const socket_group=db.models.socket_group;

//const updateMessages=db.models.update_messages;




appUsersTable.hasMany(groupMessages, { foreignKey: 'senderId' });

//const feedCommentTable1 = db.models.feedcomment;

const commentLikedeslike = db.models.comment_likedeslike;
console.log(commentLikedeslike);

reportedFeedsTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
reportedFeedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });
feedsTable.belongsTo(feeCatTable, { foreignKey: 'feedCatId' });
//feedsTable.belongsTo(feeCatTable, { foreignKey: 'id' });



feedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });
//reportedFeedsTable.belongsTo(appUsersTable, { foreignKey: 'userId' });

//feedsTable.belongsTo(feedCommentTable, { foreignKey: 'id' });hasOne
//feedsTable.hasOne(feedCommentTable, { foreignKey: 'id' }); //test
//feedsTable.hasOne(feedCommentTable1, { foreignKey: 'feedId' });//correct

feedsTable.hasMany(feedCommentTable, { foreignKey: 'feedId' });

//feedCommentTable.hasOne(feedsTable, { foreignKey: 'id' });
feedCommentTable.belongsTo(appUsersTable, { foreignKey: 'userId' });

feedCommentTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
//feedCommentTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


//likeDeslikeTable.belongsTo(feedsTable, { foreignKey: 'feedId' });
likeDeslikeTable.belongsTo(appUsersTable, { foreignKey: 'userId' });


//--------------
appUsersTable.hasMany(messages, { foreignKey: 'receiverId' });


const filesUpload = require('../helpers/uploadFiles').uploadFile;
const fs = require('fs');
const appusers = require('../db/models/appusers');

module.exports = {

  getAllreportedFeeds: async (req, res) => {
    try {
      const itemList = await reportedFeedsTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'status', 'reason', 'createdAt', 'updatedAt'],
        group: ['feedId'],
        include: [
          {
            model: feedsTable,
            attributes: ['id', 'description', 'feedCatId', 'image', 'status', 'createdAt', 'updatedAt'],
            include: [
              {
                attributes: ['id', 'name'],
                model: feeCatTable
              }
            ]
          }
        ],
        order: [
          ['id', 'DESC']
        ]

      });

      if (itemList) {

        return apiResponseHelper.post(res, true, 'Reported Feeds List', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Reported Feeds List', {});
      }
    } catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Error', 'Something Went Wrong.Please Try Again');

    }


  }
  ,

  getAllFeeds: async (req, res) => {


    try {

      const itemList = await feedsTable.findAll({
        attributes: ['id', 'feedCatId', 'userId', 'description', 'image', 'status', 'createdAt', 'updatedAt'],
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          },

          {
            model: feeCatTable,
            attributes: ['id', 'name', 'description', 'status', 'createdAt', 'updatedAt']

          },

          // {
          //   model: likeDeslikeTable,
          //   attributes: ['id','feedId','userId','likeDeslike','status','createdAt','updatedAt'],
          //   include: [
          //     {
          //       model: appUsersTable,
          //       attributes: ['id','name','email','image','status']

          //     }
          //   ]

          // },

          {
            model: feedCommentTable,
            attributes: ['id', 'feedId', 'userId', 'comment', 'status', 'createdAt', 'updatedAt'],
            // include: [
            //   {
            //     model: appUsersTable,
            //     attributes: ['id','name','email','image','status']

            //   }
            // ]

          },


        ],
        order: [
          ['id', 'DESC']
        ]

      });

      if (itemList) {

        return apiResponseHelper.post(res, true, 'Feeds List', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Feeds List', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  }






  ,
  updateFeedStatus: async (req, res) => {
    try {
      const item = await feedsTable.findOne({
        attributes: ['id', 'status'],
        where: {
          id: req.body.feedId
        }

      });

      let data = {
        status: req.body.status
      }

      if (item) {
        const updateEntry = await feedsTable.update(
          data,
          {
            where: {
              id: req.body.feedId,

            }
          });


        const reporteTable = await reportedFeedsTable.update(
          data,
          {
            where: {
              feedId: req.body.feedId,

            }
          });

        if (updateEntry) {

          return apiResponseHelper.post(res, true, 'Status has been updated!', {});
        } else {
          return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
        }

      }


    } catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }


  }
  ,

  getDashBoardData: async (req, res) => {

    try {

      const users = await appUsersTable.findAll({
        attributes: ['id'],
        raw: true,
      })

      const groups = await groupsTable.findAll({
        attributes: ['id'],
        raw: true,
      })

      const posts = await postTable.findAll({
        attributes: ['id'],
        raw: true,
      })

      const reports = await reportedTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'status'],
        group: ['feedId'],
        where: {
          status: '1'
        },
        raw: true,
      })

      return apiResponseHelper.post(res, true, 'Dashboard Items', { totalUsers: users.length, totalGroups: groups.length, totalPost: posts.length, totalReport: reports.length });

    }
    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }


  }
  ,


  getAllLikes: async (req, res) => {

    try {

      const likedeslike = await likeDeslikeTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'likeDeslike', 'status', 'createdAt', 'updatedAt'],
        where: {
          feedId: req.params.id
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          }
        ]

      })

      if (likedeslike.length > 0) {
        return apiResponseHelper.post(res, true, 'details', likedeslike);

      } else {
        return apiResponseHelper.post(res, true, 'details', {});
      }

    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }


  },


  getAllComments: async (req, res) => {

    try {

      const item = await feedCommentTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'comment', 'status', 'createdAt', 'like', 'deslike', 'updatedAt'],
        where: {
          feedId: req.params.id
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          }
        ]

      })

      if (item.length > 0) {
        return apiResponseHelper.post(res, true, 'details', item);

      } else {
        return apiResponseHelper.post(res, true, 'details', {});
      }

    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }


  }
  ,

  feedReporterList: async (req, res) => {

    try {

      const item = await reportedFeedsTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'reason'],
        group: 'userId',
        where: {
          feedId: req.params.id
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          }
        ]
      })

      if (item.length > 0) {
        return apiResponseHelper.post(res, true, 'details', item);

      } else {
        return apiResponseHelper.post(res, true, 'details', {});
      }

    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }




  }

  ,

  updateCommentStatus: async (req, res) => {


    try {

      const item = await feedCommentTable.findOne({
        attributes: ['id', 'status'],
        where: {
          id: req.body.commentId
        }

      });



      if (item) {
        let data = {
          status: req.body.status
        }


        const updateEntry = await feedCommentTable.update(
          data,
          {
            where: {
              id: req.body.commentId,

            }
          });


        if (updateEntry) {

          return apiResponseHelper.post(res, true, 'Status has been updated!', {});
        } else {
          return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
        }


      } else {

        return apiResponseHelper.onError(res, false, 'Comment not found', {});


      }


    }
    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }


  },
  getAllFeeds_data: async (req, res) => {


    try {
      const required = {
        id: req.params.id,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const itemList = await feedsTable.findAll({
        // attributes: ['id', 'feedCatId', 'userId', 'feed_id', 'title', 'Date', 'like', 'comment_count', 'deslike', 'description', 'image', 'status', 'createdAt', 'updatedAt'],

        attributes: {
          include: [
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1')`), 'like_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0')`), 'deslike_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
            [sequelize.literal(`IF (LOCATE("public/images/default/main.png", \`feed\`.\`image\`), '', \`feed\`.\`image\`)`), 'image'],
          ]
        },
        where: {
          status: '1',
        },
        order: [
          ['id', 'DESC']
        ],
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          },
          {
            model: feeCatTable,
            attributes: ['id', 'name', 'description', 'status', 'createdAt', 'updatedAt']

          },
          {
            model: feedCommentTable,
            // attributes: ['id', 'commentId', 'feedId', 'userId', 'comment', 'comment_image', 'status', 'like', 'deslike', 'createdAt', 'updatedAt'],
            attributes: {
              include: [
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='1')`), 'like_count'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='0')`), 'deslike_count'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
              ],
            },

            where: {
              status: '1'
            },

            include: [
              {
                model: appUsersTable,
                attributes: ['id', 'name', 'email', 'image', 'status']

              }
            ],

            limit: 1,

            order: [
              ['id', 'DESC']
            ]
          },
        ],
        //limit: 1,



      });

      // var testdata = itemList;
      // console.log(testdata);


      if (itemList) {

        return apiResponseHelper.post(res, true, 'Feeds List', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Feeds List', {});
      }


    } catch (e) {
      console.log(e);
      // return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
      return helper.error(res, err);

    }










  },


  getAllLikes_List: async (req, res) => {

    try {

      const likedeslike = await likeDeslikeTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'likeDeslike', 'status', 'createdAt', 'updatedAt'],
        where: {
          feedId: req.params.id
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          }
        ]

      })

      if (likedeslike.length > 0) {
        return apiResponseHelper.post(res, true, 'details', likedeslike);

      } else {
        return apiResponseHelper.post(res, true, 'details', {});
      }

    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }


  },

  getAllComments_list: async (req, res) => {

    try {

      const item = await feedCommentTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'comment', 'status', 'createdAt', 'like', 'deslike', 'updatedAt'],
        where: {
          feedId: req.params.id
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          }
        ]

      })

      if (item.length > 0) {
        return apiResponseHelper.post(res, true, 'details', item);

      } else {
        return apiResponseHelper.post(res, true, 'details', {});
      }

    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }


  }
  ,

  // likeDeslike 1=>like, 0=>dislike

  // like_deslike: async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const feed_id = req.params.feed_id;

  //     console.log('-----------------------------------------Test1');

  //     const likedeslike = await likeDeslikeTable.findOne({
  //       where: {
  //         feedId: req.params.feed_id,
  //         userId: req.params.id,
  //       },
  //     });
  //     //-------------------------------------------------------------------- Test For Notification-----------------

  //     const dataget = await feedsTable.findOne({
  //       where: {
  //         id: req.params.feed_id,
  //       },
  //     })

  //     // console.log(dataget.dataValues.userId)

  //     const getdevice_token = await appUsersTable.findOne({

  //       where: {
  //         id: dataget.dataValues.userId,
  //       },
  //     })

  //     const senderuser = await appUsersTable.findOne({
  //       where: {
  //         id: req.params.id,
  //       },
  //     })

  //     if (!likedeslike) {
  //       if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 1) {
  //         //----------------------------------------DataStore


  //         console.log('-----------------------------------------------------Test2--------------------')

  //         recors_upate = await notificationData.create({
  //           sender_id: req.params.id,
  //           receiver_id: dataget.dataValues.userId,
  //           senderName: senderuser.dataValues.name,
  //           senderImage: senderuser.dataValues.image,
  //           notification: 'liked your post'
  //         })


  //         //---------------------------------

  //         var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //         var fcm = new FCM(serverKey);
  //         var device_token = getdevice_token.dataValues.deviceToken
  //         var title = 'Future Robotics'
  //         var get_message = senderuser.dataValues.name + " liked your post"


  //         var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //           to: device_token,
  //           // collapse_key: 'your_collapse_key',

  //           notification: {
  //             title: title,
  //             body: get_message
  //           },

  //           data: {  //you can send only notification or only data(or include both)
  //             body: get_message,
  //             // receiver_data: data_to_send,
  //           }
  //         };

  //         fcm.send(message, function (err, response) {
  //           if (err) {
  //             console.log("Something has gone wrong!", message);
  //           } else {
  //             console.log("Successfully sent with response: ", response);
  //           }
  //         });

  //         // return fcm;

  //       }

  //       if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 0) {


  //         console.log("------------------------------------------------------------Test3-------------------------")
  //         //----------------------------Update data-------------------------
  //         recors_upate = await notificationData.create({
  //           sender_id: req.params.id,
  //           receiver_id: dataget.dataValues.userId,
  //           senderName: senderuser.dataValues.name,
  //           senderImage: senderuser.dataValues.image,
  //           notification: 'disliked your post'
  //         })






  //         //-------------------------------------------------

  //         var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //         var fcm = new FCM(serverKey);
  //         var device_token = getdevice_token.dataValues.deviceToken
  //         var title = 'Future Robotics'
  //         var get_message = senderuser.dataValues.name + " disliked your post"


  //         var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //           to: device_token,
  //           // collapse_key: 'your_collapse_key',

  //           notification: {
  //             title: title,
  //             body: get_message
  //           },

  //           data: {  //you can send only notification or only data(or include both)
  //             body: get_message,
  //             // receiver_data: data_to_send,
  //           }
  //         };

  //         fcm.send(message, function (err, response) {
  //           if (err) {
  //             console.log("Something has gone wrong!", message);
  //           } else {
  //             console.log("Successfully sent with response: ", response);
  //           }
  //         });

  //         // return fcm;

  //       }
  //     }

  //     else {
  //       //-------------------------Update data information------------------------------------------

  //       console.log("----------------------------------------------------Test5")

  //       var information = await likeDeslikeTable.findOne({
  //         where: {
  //           feedId: req.params.feed_id,
  //           userId: req.params.id,

  //         }

  //       })

  //       var test = information.dataValues.likeDeslike;
  //       // console.log(test, '=============>test');
  //       // return;

  //       if (req.body.likeDeslike !== test) {
  //         if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 1) {
  //           //----------------------------------------DataStore

  //           console.log('------------------------------------------------Test6------------------')


  //           recors_upate = await notificationData.create({
  //             sender_id: req.params.id,
  //             receiver_id: dataget.dataValues.userId,
  //             senderName: senderuser.dataValues.name,
  //             senderImage: senderuser.dataValues.image,
  //             notification: 'liked your post'
  //           })


  //           //---------------------------------

  //           var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //           var fcm = new FCM(serverKey);
  //           var device_token = getdevice_token.dataValues.deviceToken
  //           var title = 'Future Robotics'
  //           var get_message = senderuser.dataValues.name + " liked your post"


  //           var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //             to: device_token,
  //             // collapse_key: 'your_collapse_key',

  //             notification: {
  //               title: title,
  //               body: get_message
  //             },

  //             data: {  //you can send only notification or only data(or include both)
  //               body: get_message,
  //               // receiver_data: data_to_send,
  //             }
  //           };

  //           fcm.send(message, function (err, response) {
  //             if (err) {
  //               console.log("Something has gone wrong!", message);
  //             } else {
  //               console.log("Successfully sent with response: ", response);
  //             }
  //           });

  //           // return fcm;

  //         }

  //         if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 0) {
  //           //----------------------------Update data-------------------------
  //           recors_upate = await notificationData.create({
  //             sender_id: req.params.id,
  //             receiver_id: dataget.dataValues.userId,
  //             senderName: senderuser.dataValues.name,
  //             senderImage: senderuser.dataValues.image,
  //             notification: 'disliked your post'
  //           })






  //           //-------------------------------------------------

  //           var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //           var fcm = new FCM(serverKey);
  //           var device_token = getdevice_token.dataValues.deviceToken
  //           var title = 'Future Robotics'
  //           var get_message = senderuser.dataValues.name + " dislike your post"


  //           var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //             to: device_token,
  //             // collapse_key: 'your_collapse_key',

  //             notification: {
  //               title: title,
  //               body: get_message
  //             },

  //             data: {  //you can send only notification or only data(or include both)
  //               body: get_message,
  //               // receiver_data: data_to_send,
  //             }
  //           };

  //           fcm.send(message, function (err, response) {
  //             if (err) {
  //               console.log("Something has gone wrong!", message);
  //             } else {
  //               console.log("Successfully sent with response: ", response);
  //             }
  //           });

  //           // return fcm;

  //         }
  //       }

  //     }




  //     //--------------------------------------------------------------------------
  //     if (!likedeslike) {
  //       const data1 = req.body;
  //       data1.feedId = req.params.feed_id;
  //       data1.userId = req.params.id;
  //       data1.likeDeslike = req.body.likeDeslike;
  //       data1.status = '1'

  //       const itemAdded = await likeDeslikeTable.create(data1);


  //       const get_available_data1 = await likeDeslikeTable.count({
  //         where: {
  //           status: '1',
  //           feedId: req.params.feed_id,
  //           likeDeslike: '1',
  //           // status:'1'
  //         },
  //       })
  //       var test1 = get_available_data1;
  //       console.log("----------------------------------------------Test7")
  //       console.log("Total like count" + test1);
  //       const get_available_data2 = await likeDeslikeTable.count({
  //         where: {

  //           feedId: req.params.feed_id,
  //           likeDeslike: '0',

  //         },
  //       })
  //       var test2 = get_available_data2;
  //       console.log("Total deslike count" + test2)
  //       console.log("--------------------------------------------------------Test8")
  //       //---------------------------------------------------------------

  //       let data2 = {
  //         like: test1,
  //         deslike: test2

  //       }

  //       const updateEntry = await feedsTable.update(
  //         data2,
  //         {
  //           where: {
  //             feed_id: req.params.feed_id,

  //           }
  //         });






  //       //----------------------------------------------------------------------

  //       let data = {
  //         like_count: test1,
  //         deslike_count: test2

  //       }

  //       const updateEntry12345 = await likeDeslikeTable.update(
  //         data,
  //         {
  //           where: {
  //             feedId: req.params.feed_id,

  //           }
  //         });

  //       const countdata = await likeDeslikeTable.findOne({
  //         attributes: ['id', 'feedId', 'userId', 'like_count', 'deslike_count'],
  //         where: {
  //           feedId: req.params.feed_id,
  //           userId: req.params.id,

  //         },
  //       })


  //       if (itemAdded) {

  //         return apiResponseHelper.post(res, true, 'New Like/Deslike Add', countdata);
  //       } else {
  //         return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
  //       }


  //     }




  //     const data1 = req.body;
  //     data1.feedId = req.params.feed_id;
  //     data1.userId = req.params.id;
  //     data1.likeDeslike = req.body.likeDeslike;
  //     const updateEntry = await likeDeslikeTable.update(
  //       data1,
  //       {
  //         where: {
  //           id: likedeslike.id,

  //         }
  //       });

  //     const get_available_data1 = await likeDeslikeTable.count({
  //       where: {
  //         status: '1',
  //         feedId: req.params.feed_id,
  //         likeDeslike: '1'
  //       },
  //     })
  //     var test1 = get_available_data1;
  //     console.log(test1);
  //     const get_available_data2 = await likeDeslikeTable.count({
  //       where: {
  //         status: '1',
  //         feedId: req.params.feed_id,
  //         likeDeslike: '0'
  //       },
  //     })
  //     var test2 = get_available_data2;
  //     console.log(test2)

  //     let data = {
  //       like_count: test1,
  //       deslike_count: test2

  //     }
  //     //---------------------------------------------------------------------
  //     let data3 = {
  //       like: test1,
  //       deslike: test2

  //     }

  //     const updateEntry12 = await feedsTable.update(
  //       data3,
  //       {
  //         where: {
  //           feed_id: req.params.feed_id,

  //         }
  //       });





  //     //----------------------------------------------------------------------------------------------  
  //     const updateEntry1 = await likeDeslikeTable.update(
  //       data,
  //       {
  //         where: {
  //           feedId: req.params.feed_id,

  //         }
  //       });

  //     const countdata = await likeDeslikeTable.findOne({
  //       attributes: ['id', 'feedId', 'userId', 'like_count', 'deslike_count'],
  //       where: {
  //         feedId: req.params.feed_id,
  //         userId: req.params.id,

  //       },
  //     })



  //     if (updateEntry) {

  //       return apiResponseHelper.post(res, true, 'New Like/Deslike Update', countdata);
  //     } else {
  //       return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
  //     }


  //   }

  //   catch (e) {
  //     console.log(e);

  //     return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

  //   }

  // },



  // likeDeslike 1=>like, 0=>dislike
  like_dislike_new: async (req, res) => {
    try {
      const required = {
        id: req.params.id,
        feed_id: req.params.feed_id,
        likeDeslike: req.body.likeDeslike, // 0 => dislike, 1 => like
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);

      if (![0, 1].includes(parseInt(requestData.likeDeslike))) throw "Invalid value in param likeDeslike.";

      const user = await appUsersTable.findOne({
        where: {
          id: requestData.id,
        },
        raw: true,
      });
      if (!user) throw "Invalid id.";

      let feed = await models['feed'].findOne({
        where: {
          id: requestData.feed_id,
        },
        include: [
          {
            model: models['appusers'],
            required: true,
            attributes: [
              'id',
              'name',
              'email',
              'deviceToken',
            ],
          }
        ],
      });
      if (!feed) throw "Invalid feed_id.";
      feed = feed.toJSON();
      console.log(feed, '=========>feed');

      const alreadyLikedDisliked = await models['feedlikedeslike'].findOne({
        where: {
          feedId: requestData.feed_id,
          userId: requestData.id,
        },
        raw: true,
      });

      console.log({
        feedId: requestData.feed_id,
        userId: requestData.id,
      })
      // console.log(alreadyLikedDisliked, '===============>alreadyLikedDisliked');
      // return;

      // let message = `${user.name}${!alreadyLikedDisliked ? `${requestData.likeDeslike == 1 ? ' liked' : ' disliked'} your` : `'s ${requestData.likeDeslike == 1 ? 'like' : 'dislike'} removed from`} post`;
      const condition = !alreadyLikedDisliked || alreadyLikedDisliked && alreadyLikedDisliked.likeDeslike != requestData.likeDeslike;

      let message = `${user.name}${condition ? `${requestData.likeDeslike == 1 ? ' liked' : ' disliked'} your` : `'s ${requestData.likeDeslike == 1 ? 'like' : 'dislike'} removed from`} post`;

      if (condition) {
        const upFeedlikedeslike = {
          ...(
            alreadyLikedDisliked
              ? {
                id: alreadyLikedDisliked.id,
              } : {}
          ),
          userId: requestData.id,
          feedId: requestData.feed_id,
          status: '1',
          likeDeslike: requestData.likeDeslike,
        };

        const updatedFeedlikedeslikeId = await helper.save(models['feedlikedeslike'], upFeedlikedeslike)

        const saveNotification = await helper.save(models.notification_data, {
          sender_id: requestData.id,
          receiver_id: feed.appuser.id,
          senderName: user.name,
          senderImage: user.image,
          notification: `${requestData.likeDeslike == 1 ? 'liked' : 'disliked'} your post`,
        });

        if (feed.appuser.deviceToken) {
          const dataForSend = {
            message,
            deviceToken: feed.appuser.deviceToken,
          };
          helper.sendPushNotification(dataForSend);
          console.log(dataForSend, '===============>dataForSend');
        }
        // console.log(feed.appuser.deviceToken, '===============>user.deviceToken');
        // console.log(upFeedlikedeslike, '===============>upFeedlikedeslike');
      } else {
        await helper.delete(models['feedlikedeslike'], alreadyLikedDisliked.id);
      }

      const responseData = await models['appusers'].findOne({
        attributes: [
          [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=${requestData.feed_id} && f.likeDeslike='1')`), 'like_count'],
          [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=${requestData.feed_id} && f.likeDeslike='0')`), 'deslike_count'],
          [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=${requestData.feed_id} && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
          [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=${requestData.feed_id} && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
        ],
        raw: true,
      });

      return helper.success(res, message, responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },



  get_cat_data: async (req, res) => {
    try {
      const required = {
        id: req.params.id,
        title: req.params.title,
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);
      const title = req.params.title;
      console.log(title)


      if (title !== 'All Post') {
        //console.log('Neeraj kumar')
        const itemList = await feedsTable.findAll({
          // attributes: ['id', 'feedCatId', 'userId', 'feed_id', 'title', 'Date', 'like', 'comment_count', 'deslike', 'description', 'image', 'status', 'createdAt', 'updatedAt'],
          attributes: {
            include: [
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1')`), 'like_count'],
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0')`), 'deslike_count'],
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
              [sequelize.literal(`IF (LOCATE("public/images/default/main.png", \`feed\`.\`image\`), '', \`feed\`.\`image\`)`), 'image'],
            ]
          },
          where: {
            title: req.params.title,
            status: '1'
          },
          order: [
            ['id', 'DESC']
          ],
          include: [
            {
              model: appUsersTable,
              attributes: ['id', 'name', 'email', 'image', 'status']

            },

            {
              model: feeCatTable,
              attributes: ['id', 'name', 'description', 'status', 'createdAt', 'updatedAt']

            },

            {
              model: feedCommentTable,
              // attributes: ['id', 'feedId', 'userId', 'comment', 'status', 'like', 'deslike', 'createdAt', 'updatedAt'],
              attributes: {
                include: [
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='1')`), 'like_count'],
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='0')`), 'deslike_count'],
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
                ],
              },
              where: {
                status: '1'
              },
              include: [
                {
                  model: appUsersTable,
                  attributes: ['id', 'name', 'email', 'image', 'status']

                }
              ]

            },

          ],
          order: [
            ['id', 'DESC']
          ]

        });
        if (itemList) {

          return apiResponseHelper.post(res, true, 'Feeds Category Wise List', itemList);
        } else {
          return apiResponseHelper.post(res, true, 'Feeds Category Wise List', {});
        }

      }
      else {
        const itemList = await feedsTable.findAll({
          // attributes: ['id', 'feedCatId', 'userId', 'feed_id', 'title', 'Date', 'like', 'comment_count', 'deslike', 'description', 'image', 'status', 'createdAt', 'updatedAt'],
          attributes: {
            include: [
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1')`), 'like_count'],
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0')`), 'deslike_count'],
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
              [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
            ]
          },
          where: {
            status: '1'
          },

          include: [
            {
              model: appUsersTable,
              attributes: ['id', 'name', 'email', 'image', 'status']
            },
            {
              model: feeCatTable,
              attributes: ['id', 'name', 'description', 'status', 'createdAt', 'updatedAt']
            },
            {
              model: feedCommentTable,
              // attributes: ['id', 'commentId', 'feedId', 'userId', 'comment', 'status', 'like', 'deslike', 'createdAt', 'updatedAt'],
              attributes: {
                include: [
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='1')`), 'like_count'],
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='0')`), 'deslike_count'],
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
                  [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
                ],
              },
              where: {
                status: '1'
              },
              include: [
                {
                  model: appUsersTable,
                  attributes: ['id', 'name', 'email', 'image', 'status']
                }
              ],


            },


          ],
          order: [
            ['id', 'DESC']
          ]



        });

        if (itemList) {

          return apiResponseHelper.post(res, true, 'Feeds Category Wise List', itemList);
        } else {
          return apiResponseHelper.post(res, true, 'Feeds Category Wise List', {});
        }

      }





    } catch (err) {


      return helper.error(res, err);
      // console.log(e);
      // return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },

  feed_comment_data: async (req, res) => {
    try {


      const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
      const data = req.body;
      data.image = uploadFile[0].imageName;
      var data2 = data.image

      if (req.body.image == "") {
        var image = "";
      }

      else if (data2 == "public/images/default/main.png") {
        var image = ""
      }
      else {

        var image = 'http://34.232.2.249:4100/' + data2;
      }




      const data1 = req.body;
      data1.feedId = req.params.feed_id;
      data1.userId = req.params.id;
      data1.comment_image = image;
      // data1.comment_image = 'http://34.232.2.249:4100/'+uploadFile[0].imageName;
      data1.comment = req.body.comment;
      data1.status = '1'

      const itemAdded = await feedCommentTable.create(data1);

      //----------------------------feed Comment Count---------------------------------------

      const countdata = await feedCommentTable.count({
        where: {
          feedId: req.params.feed_id,
          status: '1'
        }
      })

      // console.log(countdata)

      const dataupdate = await feedsTable.update({
        comment_count: countdata
      }, {
        where: {
          id: req.params.feed_id
        }
      }
      )




      //----------------------------------------------------------------------------------------------
      const upadete = await feedCommentTable.update(
        {
          commentId: itemAdded.dataValues.id,
        },
        {
          where: {
            id: itemAdded.dataValues.id
          }

        })
      //----------------------------------------------------------------------------------------Firebase Notification--------------------


      const dataget = await feedsTable.findOne({

        where: {
          id: req.params.feed_id,


        },
      })

      // console.log(dataget.dataValues.userId)

      const getdevice_token = await appUsersTable.findOne({

        where: {
          id: dataget.dataValues.userId,
        },
      })

      const senderuser = await appUsersTable.findOne({

        where: {
          id: req.params.id,
        },
      })


      if (getdevice_token.dataValues.deviceToken) {

        recors_upate = await notificationData.create({
          sender_id: req.params.id,
          receiver_id: dataget.dataValues.userId,
          senderName: senderuser.dataValues.name,
          senderImage: senderuser.dataValues.image,
          notification: 'commented on your post'
        })


        var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
        var fcm = new FCM(serverKey);
        var device_token = getdevice_token.dataValues.deviceToken
        var title = 'Future Robotics'
        var get_message = senderuser.dataValues.name + " commented on your post"


        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: device_token,
          // collapse_key: 'your_collapse_key',

          notification: {
            title: title,
            body: get_message
          },

          data: {  //you can send only notification or only data(or include both)
            body: get_message,
            // receiver_data: data_to_send,
          }
        };

        fcm.send(message, function (err, response) {
          if (err) {
            console.log("Something has gone wrong!", message);
          } else {
            console.log("Successfully sent with response: ", response);
          }
        });





      }







      //-----------------------------------------------------------------------------------

      // console.log(itemAdded.dataValues.id)



      const dataget1 = await feedCommentTable.findOne({
        attributes: ['id', 'commentId', 'feedId', 'userId', 'comment', 'comment_image', 'createdAt', 'updatedAt'],


        where: {
          id: itemAdded.dataValues.id
        },
        include: [
          {
            model: feedsTable,
            attributes: ['comment_count']

          }

        ]

      })


      //console.log(itemAdded)
      if (itemAdded) {

        return apiResponseHelper.post(res, true, 'New Comment Add', dataget1);
      } else {
        return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
      }

    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }

  },


  get_id_data: async (req, res) => {


    try {
      const feed_id = req.params.feed_id;
      const itemList = await feedsTable.findOne({
        attributes: ['id', 'feedCatId', 'userId', 'feed_id', 'title', 'Date', 'like', 'comment_count', 'deslike', 'description', 'image', 'status', 'createdAt', 'updatedAt'],
        where: {
          feed_id: req.params.feed_id
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          },

          //  {
          //   model: feedCommentTable,
          //   attributes: ['id','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
          //   include: [
          //     {
          //       model: appUsersTable,
          //       attributes: ['id','name','email','image','status']

          //     }
          //   ]

          // },


        ],

        // include: [ 
        //    {
        //       model: feedCommentTable,
        //       attributes: ['id','feedId','userId','comment','status','like','deslike','createdAt','updatedAt'],
        //       where:{
        //         feedId:1
        //       },
        //       include: [
        //         {
        //           model: appUsersTable,
        //           attributes: ['id','name','email','image','status']

        //         }
        //       ]

        //     },

        // ],

        order: [
          ['id', 'DESC']
        ]

      });

      //var testdata=itemList;
      //console.log(testdata);


      if (itemList) {

        return apiResponseHelper.post(res, true, 'Feeds Profile Data', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Feeds Profile Data', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },


  get_coment_data: async (req, res) => {
    try {
      const feed_id = req.params.feed_id;
      const itemList = await feedCommentTable.findAll({
        attributes: ['id', 'feedId', 'userId', 'comment', 'status', 'like', 'deslike', 'createdAt', 'updatedAt'],
        where: {
          feedId: req.params.feed_id
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          },

        ],

        order: [
          ['id', 'DESC']
        ]

      });




      if (itemList) {

        return apiResponseHelper.post(res, true, 'Feeds Comment Data', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Feeds Comment Data', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },


  community_feed_details: async (req, res) => {


    try {
      const required = {
        id: req.params.id,
        feed_id: req.params.feed_id,
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);

      const feed_id = req.params.feed_id;
      const itemList = await feedsTable.findOne({
        // attributes: ['feedCatId', 'userId', 'feed_id', 'title', 'Date', 'like', 'comment_count', 'deslike', 'description', 'image', 'status', 'createdAt', 'updatedAt'],
        attributes: {
          include: [
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1')`), 'like_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0')`), 'deslike_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
            [sequelize.literal(`IF (LOCATE("public/images/default/main.png", \`feed\`.\`image\`), '', \`feed\`.\`image\`)`), 'image'],
          ],
          exclude: [
            'image'
          ]
        },
        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          },

          {
            model: feedCommentTable,
            // attributes: ['commentId', 'feedId', 'userId', 'comment', 'comment_image', 'status', 'like', 'deslike', 'createdAt', 'updatedAt'],
            attributes: {
              include: [
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='1')`), 'like_count'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='0')`), 'deslike_count'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomments.id && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
              ],
            },
            where: {
              status: '1'
            },
            required: false,
            include: [
              {
                model: appUsersTable,
                attributes: ['id', 'name', 'email', 'image', 'status']

              }
            ]

          },


        ],
        where: {
          feed_id: req.params.feed_id,
          status: '1',
        },
        order: [
          ['id', 'DESC']
        ]

      });




      if (itemList) {

        return apiResponseHelper.post(res, true, 'Feeds Profile Data', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Feeds Profile Data', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },



  //---------------------Comment Like or deslike-----------------------------------------------
  comment_like_deslike_new: async (req, res) => {
    try {
      const required = {
        id: req.params.id,
        commentId: req.params.commentId,
        likeDeslike: req.body.likeDeslike, // 0 => dislike, 1 => like
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);

      if (![0, 1].includes(parseInt(requestData.likeDeslike))) throw "Invalid value in param likeDeslike.";

      const user = await appUsersTable.findOne({
        where: {
          id: requestData.id,
        },
        raw: true,
      });
      if (!user) throw "Invalid id.";

      let feedComment = await feedCommentTable.findOne({
        where: {
          commentId: requestData.commentId,
        },
        include: [
          {
            model: models['appusers'],
            required: true,
            attributes: [
              'id',
              'name',
              'email',
              'deviceToken',
            ],
          },
          {
            model: models['feed'],
            required: true,
            include: [
              {
                model: models['appusers'],
                required: true,
                attributes: [
                  'id',
                  'name',
                  'email',
                  'deviceToken',
                ],
              }
            ]
          },
        ]
      });
      if (!feedComment) throw "Invalid commentId.";
      feedComment = feedComment.toJSON();
      console.log(feedComment, '=========>feedComment');
      // return;

      const alreadyLikedDisliked = await models['comment_likedeslike'].findOne({
        where: {
          commentId: requestData.commentId,
          userId: requestData.id,
        },
        raw: true,
      });
      console.log(alreadyLikedDisliked, '===============>alreadyLikedDisliked');
      // return;
      const condition = !alreadyLikedDisliked || alreadyLikedDisliked && alreadyLikedDisliked.likeDeslike != requestData.likeDeslike;

      let message = `${user.name}${condition ? `${requestData.likeDeslike == 1 ? ' liked' : ' disliked'} your` : `'s ${requestData.likeDeslike == 1 ? 'like' : 'dislike'} removed from`} comment`;

      // console.log(alreadyLikedDisliked, '=========>alreadyLikedDisliked');
      // console.log(!alreadyLikedDisliked || alreadyLikedDisliked && alreadyLikedDisliked.hasOwnProperty('likeDeslike') == requestData.likeDeslike, '=========>alreadyLikedDisliked123123123');
      // return;

      if (condition) {
        const upFeedlikedeslike = {
          ...(
            alreadyLikedDisliked
              ? {
                id: alreadyLikedDisliked.id,
              } : {}
          ),
          userId: requestData.id,
          commentId: requestData.commentId,
          status: '1',
          likeDeslike: requestData.likeDeslike,
        };

        const updatedFeedlikedeslikeId = await helper.save(models['comment_likedeslike'], upFeedlikedeslike)

        recors_upate = await helper.save(models.notification_data, {
          sender_id: requestData.id,
          receiver_id: feedComment.appuser.id,
          senderName: user.name,
          senderImage: user.image,
          notification: `${requestData.likeDeslike == 1 ? 'liked' : 'disliked'} your comment`,
        });

        if (feedComment.appuser.deviceToken) {
          const dataForSend = {
            message,
            deviceToken: feedComment.appuser.deviceToken,
          };
          helper.sendPushNotification(dataForSend);
          console.log(dataForSend, '===============>dataForSend');
        }
        // console.log(feed.appuser.deviceToken, '===============>user.deviceToken');
        // console.log(upFeedlikedeslike, '===============>upFeedlikedeslike');
      } else {
        await helper.delete(models['comment_likedeslike'], alreadyLikedDisliked.id);
      }

      const responseData = await models['appusers'].findOne({
        attributes: [
          [sequelize.literal(`${requestData.commentId}`), 'commentId'],
          [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=${requestData.commentId} && f.likeDeslike='1')`), 'like_count'],
          [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=${requestData.commentId} && f.likeDeslike='0')`), 'deslike_count'],
          [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=${requestData.commentId} && f.likeDeslike='1' && f.userId=${requestData.id})`), 'isLiked'],
          [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=${requestData.commentId} && f.likeDeslike='0' && f.userId=${requestData.id})`), 'isDisliked'],
        ],
        raw: true,
      });

      return helper.success(res, message, responseData);
    } catch (err) {
      return helper.error(res, err);
    }

  },
  // comment_like_deslike: async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const commentId = req.params.commentId;


  //     const likedeslike = await commentLikedeslike.findOne({

  //       where: {
  //         commentId: req.params.commentId,
  //         userId: req.params.id,

  //       },
  //     })

  //     //-------------------------------Firebase ------------------

  //     const dataget = await feedCommentTable.findOne({

  //       where: {
  //         commentId: req.params.commentId,


  //       },
  //     })

  //     // console.log(dataget.dataValues.userId)

  //     const getdevice_token = await appUsersTable.findOne({

  //       where: {
  //         id: dataget.dataValues.userId,
  //       },
  //     })

  //     const senderuser = await appUsersTable.findOne({

  //       where: {
  //         id: req.params.id,
  //       },
  //     })


  //     if (!likedeslike) {
  //       if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 1) {
  //         //----------------------------------------DataStore


  //         recors_upate = await notificationData.create({
  //           sender_id: req.params.id,
  //           receiver_id: dataget.dataValues.userId,
  //           senderName: senderuser.dataValues.name,
  //           senderImage: senderuser.dataValues.image,
  //           notification: 'liked your comment'
  //         })


  //         //---------------------------------

  //         var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //         var fcm = new FCM(serverKey);
  //         var device_token = getdevice_token.dataValues.deviceToken
  //         var title = 'Future Robotics'
  //         var get_message = senderuser.dataValues.name + " liked your comment"


  //         var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //           to: device_token,
  //           // collapse_key: 'your_collapse_key',

  //           notification: {
  //             title: title,
  //             body: get_message
  //           },

  //           data: {  //you can send only notification or only data(or include both)
  //             body: get_message,
  //             // receiver_data: data_to_send,
  //           }
  //         };

  //         fcm.send(message, function (err, response) {
  //           if (err) {
  //             console.log("Something has gone wrong!", message);
  //           } else {
  //             console.log("Successfully sent with response: ", response);
  //           }
  //         });

  //         // return fcm;

  //       }

  //       if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 0) {
  //         //----------------------------Update data-------------------------
  //         recors_upate = await notificationData.create({
  //           sender_id: req.params.id,
  //           receiver_id: dataget.dataValues.userId,
  //           senderName: senderuser.dataValues.name,
  //           senderImage: senderuser.dataValues.image,
  //           notification: 'disliked your comment'
  //         })






  //         //-------------------------------------------------

  //         var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //         var fcm = new FCM(serverKey);
  //         var device_token = getdevice_token.dataValues.deviceToken
  //         var title = 'Future Robotics'
  //         var get_message = senderuser.dataValues.name + " dislike your comment"


  //         var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //           to: device_token,
  //           // collapse_key: 'your_collapse_key',

  //           notification: {
  //             title: title,
  //             body: get_message
  //           },

  //           data: {  //you can send only notification or only data(or include both)
  //             body: get_message,
  //             // receiver_data: data_to_send,
  //           }
  //         };

  //         fcm.send(message, function (err, response) {
  //           if (err) {
  //             console.log("Something has gone wrong!", message);
  //           } else {
  //             console.log("Successfully sent with response: ", response);
  //           }
  //         });

  //         // return fcm;

  //       }
  //     }
  //     else {
  //       //-------------------------Update data information------------------------------------------

  //       const information = await commentLikedeslike.findOne({

  //         where: {
  //           commentId: req.params.commentId,
  //           userId: req.params.id,

  //         },
  //       })

  //       var test = information.dataValues.likeDeslike;

  //       if (req.body.likeDeslike !== test) {
  //         if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 1) {
  //           //----------------------------------------DataStore


  //           recors_upate = await notificationData.create({
  //             sender_id: req.params.id,
  //             receiver_id: dataget.dataValues.userId,
  //             senderName: senderuser.dataValues.name,
  //             senderImage: senderuser.dataValues.image,
  //             notification: 'liked your comment'
  //           })


  //           //---------------------------------

  //           var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //           var fcm = new FCM(serverKey);
  //           var device_token = getdevice_token.dataValues.deviceToken
  //           var title = 'Future Robotics'
  //           var get_message = senderuser.dataValues.name + " liked your comment"


  //           var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //             to: device_token,
  //             // collapse_key: 'your_collapse_key',

  //             notification: {
  //               title: title,
  //               body: get_message
  //             },

  //             data: {  //you can send only notification or only data(or include both)
  //               body: get_message,
  //               // receiver_data: data_to_send,
  //             }
  //           };

  //           fcm.send(message, function (err, response) {
  //             if (err) {
  //               console.log("Something has gone wrong!", message);
  //             } else {
  //               console.log("Successfully sent with response: ", response);
  //             }
  //           });

  //           // return fcm;

  //         }

  //         if (getdevice_token.dataValues.deviceToken && req.body.likeDeslike == 0) {
  //           //----------------------------Update data-------------------------
  //           recors_upate = await notificationData.create({
  //             sender_id: req.params.id,
  //             receiver_id: dataget.dataValues.userId,
  //             senderName: senderuser.dataValues.name,
  //             senderImage: senderuser.dataValues.image,
  //             notification: 'disliked your comment'
  //           })






  //           //-------------------------------------------------

  //           var serverKey = 'AAAAs4zBDdk:APA91bHK9lCR3q0EDhAqV66ftg08OU9Wtrgd-dVjl3T-1uVBwZaCRbkK145iMf8h8bmDVOy-IBhUM01-IiD80cfXB1d8WrCZBy50DuFq3NuO27SUj2NwBzBx2eSFI7yNHgooJ74IW4vx'; //put your server key here
  //           var fcm = new FCM(serverKey);
  //           var device_token = getdevice_token.dataValues.deviceToken
  //           var title = 'Future Robotics'
  //           var get_message = senderuser.dataValues.name + " dislike your comment"


  //           var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  //             to: device_token,
  //             // collapse_key: 'your_collapse_key',

  //             notification: {
  //               title: title,
  //               body: get_message
  //             },

  //             data: {  //you can send only notification or only data(or include both)
  //               body: get_message,
  //               // receiver_data: data_to_send,
  //             }
  //           };

  //           fcm.send(message, function (err, response) {
  //             if (err) {
  //               console.log("Something has gone wrong!", message);
  //             } else {
  //               console.log("Successfully sent with response: ", response);
  //             }
  //           });

  //           // return fcm;

  //         }
  //       }

  //     }





  //     //---------------------------------------------------------
  //     // console.log(likedeslike)

  //     if (!likedeslike) {
  //       const data1 = req.body;
  //       data1.commentId = req.params.commentId;
  //       data1.userId = req.params.id;
  //       data1.likeDeslike = req.body.likeDeslike;
  //       data1.status = '1'

  //       const itemAdded = await commentLikedeslike.create(data1);


  //       const get_available_data1 = await commentLikedeslike.count({
  //         where: {
  //           status: '1',
  //           commentId: req.params.commentId,
  //           likeDeslike: '1'
  //         },
  //       })
  //       var test1 = get_available_data1;
  //       console.log(test1);
  //       const get_available_data2 = await commentLikedeslike.count({
  //         where: {
  //           status: '1',
  //           commentId: req.params.commentId,
  //           likeDeslike: '0'
  //         },
  //       })
  //       var test2 = get_available_data2;
  //       console.log(test2)

  //       let data = {
  //         like_count: test1,
  //         deslike_count: test2

  //       }
  //       //-----------------------------------------------------
  //       let data2 = {
  //         like: test1,
  //         deslike: test2

  //       }


  //       const updateEntry2 = await feedCommentTable.update(
  //         data2,
  //         {
  //           where: {
  //             commentId: req.params.commentId,

  //           }
  //         });



  //       //-------------------------------------------------------
  //       const updateEntry = await commentLikedeslike.update(
  //         data,
  //         {
  //           where: {
  //             commentId: req.params.commentId,

  //           }
  //         });

  //       const countdata = await commentLikedeslike.findOne({
  //         attributes: ['id', 'commentId', 'userId', 'like_count', 'deslike_count'],
  //         where: {
  //           commentId: req.params.commentId,
  //           userId: req.params.id,

  //         },
  //       })


  //       if (itemAdded) {

  //         return apiResponseHelper.post(res, true, 'New Like/Deslike Add', countdata);
  //       } else {
  //         return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
  //       }


  //     }

  //     const data1 = req.body;
  //     data1.commentId = req.params.commentId;
  //     data1.userId = req.params.id;
  //     data1.likeDeslike = req.body.likeDeslike;
  //     const updateEntry = await commentLikedeslike.update(
  //       data1,
  //       {
  //         where: {
  //           id: likedeslike.id,

  //         }
  //       });

  //     const get_available_data1 = await commentLikedeslike.count({
  //       where: {
  //         status: '1',
  //         commentId: req.params.commentId,
  //         likeDeslike: '1'
  //       },
  //     })
  //     var test1 = get_available_data1;
  //     console.log(test1);
  //     const get_available_data2 = await commentLikedeslike.count({
  //       where: {
  //         status: '1',
  //         commentId: req.params.commentId,
  //         likeDeslike: '0'
  //       },
  //     })
  //     var test2 = get_available_data2;
  //     console.log(test2)

  //     let data = {
  //       like_count: test1,
  //       deslike_count: test2

  //     }
  //     let data3 = {
  //       like: test1,
  //       deslike: test2

  //     }


  //     //--------------------------------------
  //     const updateEntry2 = await feedCommentTable.update(
  //       data3,
  //       {
  //         where: {
  //           commentId: req.params.commentId,

  //         }
  //       });







  //     //----------------------------------------------------- 
  //     const updateEntry1 = await commentLikedeslike.update(
  //       data,
  //       {
  //         where: {
  //           commentId: req.params.commentId,

  //         }
  //       });

  //     const countdata = await commentLikedeslike.findOne({
  //       attributes: ['id', 'commentId', 'userId', 'like_count', 'deslike_count'],
  //       where: {
  //         commentId: req.params.commentId,
  //         userId: req.params.id,

  //       },
  //     })



  //     if (updateEntry) {

  //       return apiResponseHelper.post(res, true, 'New Like/Deslike Update', countdata);
  //     } else {
  //       return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
  //     }


  //   }

  //   catch (e) {
  //     console.log(e);

  //     return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

  //   }

  // },


  delete_post: async (req, res) => {
    try {
      req.checkBody('userId', 'userId is required in body').notEmpty();
      req.checkBody('feed_id', 'feed_id is required in body').notEmpty();

      const error = req.validationErrors();
      const userId = req.body.userId;
      const feed_id = req.body.feed_id;
      if (error) {

        return apiResponseHelper.onError(res, false, error[0].msg, {});

      }
      const updateEntrys = await feedsTable.findOne(
        {
          where: {
            userId: req.body.userId,
            feed_id: req.body.feed_id
          }
        });

      if (updateEntrys) {

        const updateEntry = await feedsTable.destroy(
          {
            where: {
              userId: req.body.userId,
              feed_id: req.body.feed_id
            }
          });

        const updateEntry1 = await feedCommentTable.destroy(
          {
            where: {
              //userId:req.body.userId,
              feedId: req.body.feed_id
            }
          });

        const updateEntry2 = await likeDeslikeTable.destroy(
          {
            where: {
              //userId:req.body.userId,
              feedId: req.body.feed_id
            }
          });

        return apiResponseHelper.post(res, true, 'Post Delete successfully', updateEntry);

      }
      else {

        return apiResponseHelper.onError(res, false, 'Data Not Found', {});

      }











    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }

  },


  delete_comment: async (req, res) => {
    try {
      req.checkBody('userId', 'userId is required in body').notEmpty();
      req.checkBody('commentId', 'commentId is required in body').notEmpty();

      const error = req.validationErrors();
      const userId = req.body.userId;
      const commentId = req.body.commentId;
      if (error) {

        return apiResponseHelper.onError(res, false, error[0].msg, {});

      }
      const updateEntrys = await feedCommentTable.findOne(
        {
          where: {
            userId: req.body.userId,
            commentId: req.body.commentId
          }
        });


      if (updateEntrys) {

        const datacount = await feedCommentTable.count(
          {
            where: {
              feedId: updateEntrys.dataValues.feedId,
              status: '1'
            }
          });





        const updateEntry1 = await feedCommentTable.destroy(
          {
            where: {

              commentId: req.body.commentId
            }
          });

        const updateEntry2 = await commentLikedeslike.destroy(
          {
            where: {

              commentId: req.body.commentId
            }
          });

        const datacount1 = await feedCommentTable.count(
          {
            where: {
              feedId: updateEntrys.dataValues.feedId,
              status: '1'
            }
          });

        const dataupdate = await feedsTable.update({
          comment_count: datacount1
        }, {
          where: {
            id: updateEntrys.dataValues.feedId
          }
        }
        )

        return apiResponseHelper.post(res, true, 'Comment Delete successfully', updateEntry1);

      }
      else {

        return apiResponseHelper.onError(res, false, 'Data Not Found', {});

      }











    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }

  },


  edit_post: async (req, res) => {
    try {
      const uploadFile = await filesUpload(req, res, [{ name: 'image' }], config.userFilePath);
      const data = req.body;
      data.image = uploadFile[0].imageName;
      var data1 = data.image
      //data.userId=req.body.userId;
      //data.feed_id=req.body.feed_id;
      //data.title=req.body.title;
      //data.description=req.body.description;

      // console.log(data1)
      //  userId:req.body.userId,
      // feed_id:req.body.feed_id

      const updateEntrys = await feedsTable.findOne(
        {
          where: {
            userId: req.body.userId,
            feed_id: req.body.feed_id
          }
        });

      //console.log(updateEntrys.title);
      if (updateEntrys) {

        if (req.body.title == "") {
          var title = updateEntrys.title;
        }
        else {
          var title = req.body.title;
        }
        //console.log(title)
        if (req.body.description == "") {
          var description = updateEntrys.description;
        }
        else {
          var description = req.body.description;
        }

        if (req.body.image == "") {
          var image = updateEntrys.image;
        }

        else if (data1 == "public/images/default/main.png") {
          var image = updateEntrys.image
        }
        else {

          var image = 'http://34.232.2.249:4100/' + data1;
        }

        console.log(image)
        const feedupdate = await feedsTable.update(
          {
            title: title,
            description: description,
            image: image
          }, {
          where: {
            userId: req.body.userId,
            feed_id: req.body.feed_id
          }
        }
        )


        if (feedupdate) {
          const Entrys = await feedsTable.findOne(
            {
              where: {
                userId: req.body.userId,
                feed_id: req.body.feed_id
              }
            });

          return apiResponseHelper.post(res, true, 'Post Updated Successfully', Entrys);
        }
        else {
          return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
        }

      }
      else {

        return apiResponseHelper.onError(res, false, 'Data Not Found', {});

      }











    }

    catch (e) {
      console.log(e);

      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }

  },


  search_feed: async (req, res) => {
    try {
      req.checkBody('title', 'title is required in body').notEmpty();
      req.checkBody('id', 'id is required in body').notEmpty();


      const error = req.validationErrors();
      const title = req.body.title;


      if (error) {

        return apiResponseHelper.onError(res, false, error[0].msg, {});

      }

      // var sequelize = require('sequelize');
      // const Op = sequelize.Op

      const itemList = await feedsTable.findAll({
        attributes: {
          include: [
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1')`), 'like_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0')`), 'deslike_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='1' && f.userId=${req.body.id})`), 'isLiked'],
            [sequelize.literal(`(SELECT COUNT(*) FROM feedlikedeslike AS f WHERE f.feedId=feed.id && f.likeDeslike='0' && f.userId=${req.body.id})`), 'isDisliked'],
            [sequelize.literal(`IF (LOCATE("public/images/default/main.png", \`feed\`.\`image\`), '', \`feed\`.\`image\`)`), 'image'],
          ]
        },
        where: {
          title: {
            [Op.like]: '%' + req.body.title + '%'
          },
          status: '1'
        },
        order: [
          ['id', 'DESC']
        ],

        include: [
          {
            model: appUsersTable,
            attributes: ['id', 'name', 'email', 'image', 'status']

          },

          {
            model: feeCatTable,
            attributes: ['id', 'name', 'description', 'status', 'createdAt', 'updatedAt']

          },

          {
            model: feedCommentTable,
            // attributes: ['id', 'commentId', 'feedId', 'userId', 'comment', 'comment_image', 'status', 'like', 'deslike', 'createdAt', 'updatedAt'],
            attributes: {
              include: [
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='1')`), 'like_count'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='0')`), 'deslike_count'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='1' && f.userId=${req.body.id})`), 'isLiked'],
                [sequelize.literal(`(SELECT COUNT(*) FROM comment_likedeslike AS f WHERE f.commentId=feedcomment.id && f.likeDeslike='0' && f.userId=${req.body.id})`), 'isDisliked'],
              ],
            },
            where: {
              status: '1'
            },

            include: [
              {
                model: appUsersTable,
                attributes: ['id', 'name', 'email', 'image', 'status']

              }
            ],

            limit: 1,

            order: [
              ['id', 'DESC']
            ]
          },


        ],
        //limit: 1,


      });

      var testdata = itemList;
      console.log(testdata);


      if (itemList) {

        return apiResponseHelper.post(res, true, ' Search Feeds List', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Search Feeds List', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },




  userlist: async (req, res) => {


    try {

      const itemList = await notificationData.findAll({

        where: {
          receiver_id: req.params.id,
          status: '1'
        },

        order: [
          ['id', 'DESC']
        ]




      });

      var testdata = itemList;
      console.log(testdata);


      if (itemList) {

        return apiResponseHelper.post(res, true, 'Notification List', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Notification List', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }
  },

  readSingleNotification: async (req, res) => {
    try {
       const required = {
        notificationId: req.body.notificationId,
        userId: req.body.userId,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const user = await models.appusers.findOne({
        where: {
          id: requestData.userId,
        },
      });
      if (!user) throw "Invalid userId.";

      const notification = await models.notification_data.findOne({
        where: {
          id: requestData.notificationId,
          receiver_id: requestData.userId,
        },
      });
      if (!notification) throw "Invalid notificationId.";

      await helper.save(models.notification_data, {
        id: requestData.notificationId,
        isRead: 1,
      });

      const updatedNotification = await models.notification_data.findOne({
        where: {
          id: requestData.notificationId
        }
      })

      return helper.success(res, 'Notification read successfully.', updatedNotification);
    } catch (e) {
      return helper.error(res, e);
    }
  },

  readAllNotifications: async (req, res) => {
    try {
       const required = {
        userId: req.body.userId,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const user = await models.appusers.findOne({
        where: {
          id: requestData.userId,
        },
      });
      if (!user) throw "Invalid userId.";

      await models.notification_data.update(
        {
          isRead: 1
        },
        {
          where: {
            receiver_id: requestData.userId,
          }
        }
      );

      const updatedNotifications = await models.notification_data.findAll({
        where: {
          receiver_id: requestData.userId
        },
        order: [['id', 'DESC']],
      })

      return helper.success(res, 'All Notifications read successfully.', updatedNotifications);
    } catch (e) {
      return helper.error(res, e);
    }
  },
  clearAllNotifications: async (req, res) => {
    try {
       const required = {
        userId: req.body.userId,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const user = await models.appusers.findOne({
        where: {
          id: requestData.userId,
        },
      });
      if (!user) throw "Invalid userId.";

      await models.notification_data.destroy(
        {
          where: {
            receiver_id: requestData.userId,
          }
        }
      );

      const updatedNotifications = await models.notification_data.findAll({
        where: {
          receiver_id: requestData.userId
        },
        order: [['id', 'DESC']],
      })

      return helper.success(res, 'All Notifications cleared successfully.', updatedNotifications);
    } catch (e) {
      return helper.error(res, e);
    }
  },


  massagelist: async (req, res) => {


    try {

      const itemList = await socket_group.findAll({

        where: {
          userId: req.params.id
        }
      });

      if (!itemList) {

        return apiResponseHelper.post(res, true, 'User List', {});
      }

      var testdata = itemList;


      var data = testdata.map(user => user.groupId)

      // var sequelize = require('sequelize');
      // var Op = sequelize.Op;
      var arrayofTaskId = data;
      const itemList1 = await updateMessages.findAll({
        where: {
          groupId: {
            [Op.in]: arrayofTaskId
          },
          senderId: {
            [Op.not]: req.params.id
          },



        },
        order: [
          ['id', 'DESC']
        ]
      })//.then(function(result) {
      //   return res.json(result)
      // })

      //console.log(itemList1)









      if (itemList) {

        return apiResponseHelper.post(res, true, 'User List', itemList1);
      } else {
        return apiResponseHelper.post(res, true, 'User List', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },

  //---------------------Test-----------

  massagelist2: async (req, res) => {


    try {

      const itemList = await socket_group.findAll({

        where: {
          userId: req.params.id
        }
      });

      if (!itemList) {

        return apiResponseHelper.post(res, true, 'User List', {});
      }

      var testdata = itemList;


      var data = testdata.map(user => user.groupId)

      // var sequelize = require('sequelize');
      // var Op = sequelize.Op;
      var arrayofTaskId = data;
      const Data1 = await socket_group.findAll({
        where: {
          groupId: {
            [Op.in]: arrayofTaskId
          },
        },

      })


      var data123 = Data1.map(user => user.userId)





      const itemList1 = await updateMessages.findAll({
        where: {
          senderId: {
            [Op.in]: data123,
            [Op.not]: req.params.id
          },

        },
        order: [
          ['id', 'DESC']
        ]
      })








      if (itemList) {

        return apiResponseHelper.post(res, true, 'User List', itemList1);
      } else {
        return apiResponseHelper.post(res, true, 'User List', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },







  //------------------------------------------
  massagelist1: async (req, res) => {


    try {

      const itemList = await updateMessages.findAll({

        where: {
          senderId: req.params.id
        }
      });

      if (!itemList) {

        return apiResponseHelper.post(res, true, 'User List', {});
      }

      var testdata = itemList;


      var data = testdata.map(user => user.groupId)

      // var sequelize = require('sequelize');
      // var Op = sequelize.Op;
      var arrayofTaskId = data;
      const itemList1 = await updateMessages.findAll({
        where: {
          groupId: {
            [Op.in]: arrayofTaskId
          },
          senderId: {
            [Op.not]: req.params.id
          }


        }
      })//.then(function(result) {
      //   return res.json(result)
      // })

      //console.log(itemList1)









      if (itemList) {

        return apiResponseHelper.post(res, true, 'User List', itemList1);
      } else {
        return apiResponseHelper.post(res, true, 'User List', {});
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },













  massagelist_count: async (req, res) => {
    try {
      const itemList = await socket_group.findAll({
        where: {
          userId: req.body.id
        }
      });

      if (!itemList) {
        return apiResponseHelper.post(res, true, 'User List', {});
      }

      var testdata = itemList;

      var data = testdata.map(user => user.groupId)

      // var sequelize = require('sequelize');
      // var Op = sequelize.Op;
      var arrayofTaskId = data;
      const itemList1 = await updateMessages.count({
        where: {
          groupId: {
            [Op.in]: arrayofTaskId
          },
          senderId: {
            [Op.not]: req.body.id
          }
        }
      });

      if (itemList) {
        return apiResponseHelper.post(res, true, 'Massage List Count', itemList1);
      } else {
        return apiResponseHelper.post(res, true, 'Massage List Count', {});
      }
    } catch (e) {
      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
    }










  },


  massageCountUser: async (req, res) => {
    try {
      const required = {
        id: req.body.id, // id of auth user
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);
      
      // var chatConstant = await chatConstants.findOne({
      //   where: {
      //     [Op.or]: [
      //       { senderId: requestData.id },
      //       { receiverId: requestData.id }
      //     ]
      //   },
      // });
      var unreadMessages = await models.one_update_messages.findAll({
        where: {
          receiverId: requestData.id,
          readStatus: 0
        },
        attributes: [
          'id',
          'senderId',
          'receiverId',
          'readStatus'
        ],
        order: [['id', 'DESC']],
        group: ['senderId'],
      });

      return helper.success(res, 'unread count', unreadMessages.length);
    } catch (e) {
      return helper.error(res, e);
      // console.log(e);
      // return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});
    }










  },

  //----------------------------------------------------------------

  notificationcountdata: async (req, res) => {
    try {
      const itemList = await notificationData.count({
        where: {
          receiver_id: req.body.id,
          status: '1',
          isRead:0
        },
        order: [
          ['id', 'DESC']
        ]
      });
      var testdata = itemList;
      console.log(testdata);

      if (itemList) {

        return apiResponseHelper.post(res, true, 'Notification Count', itemList);
      } else {
        return apiResponseHelper.post(res, true, 'Notification Count', itemList);
      }


    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },



  //------------------------------Massage data-----------------------------------

  //oneUpdateMessages

  massageDataliist: async (req, res) => {
    try {

      // const itemList = await socket_group.findAll({

      //   where: {
      //     userId: req.params.id
      //   }
      // });

      // const getsenderdata = await oneUpdateMessages.findAll({

      //   where: {
      //     receiverId: req.params.id
      //   }
      // });


      // var get_messages_data = await database.query(`SELECT one_update_messages.id, appusers.id as senderId,one_update_messages.message,one_update_messages.created,appusers.name as senderName,appusers.image as senderProfileImage FROM one_update_messages INNER JOIN appusers ON one_update_messages.senderId=appusers.id WHERE one_update_messages.receiverId=${req.params.id}`, {

      // });

      // console.log(get_messages_data)







      // if (!itemList) {

      //   return apiResponseHelper.post(res, true, 'User List', {});
      // }

      // var testdata = itemList;


      // var data = testdata.map(user => user.groupId)

      // var arrayofTaskId = data;
      // const itemList1 = await updateMessages.findAll({
      //   where: {
      //     groupId: {
      //       [Op.in]: arrayofTaskId
      //     },
      //     senderId: {
      //       [Op.not]: req.params.id
      //     },



      //   },
      //   order: [
      //     ['id', 'DESC']
      //   ]
      // })//.then(function(result) {
      // //   return res.json(result)
      // // })

      // //console.log(itemList1)





      



      // if (itemList) {

      //   return apiResponseHelper.post(res, true, 'User List', get_messages_data[0]);
      // } else {
      //   return apiResponseHelper.post(res, true, 'User List', {});
      // }

      // SELECT one_update_messages.id, appusers.id as senderId, one_update_messages.message, one_update_messages.created ,appusers.name as senderName, appusers.image as senderProfileImage FROM one_update_messages INNER JOIN appusers ON one_update_messages.senderId=appusers.id WHERE one_update_messages.receiverId=${req.params.id}


      var get_messages_data = await database.query(`SELECT oum.id, sender.id as senderId, oum.message, oum.created ,sender.name as senderName, sender.image as senderProfileImage FROM one_update_messages AS oum INNER JOIN appusers AS sender ON (CASE WHEN oum.senderId=${req.params.id} THEN oum.receiverId ELSE oum.senderId END)=sender.id WHERE oum.id IN (SELECT MAX(id) FROM one_update_messages AS ou WHERE ou.receiverId=sender.id && ou.senderId=${req.params.id} ||ou.receiverId=${req.params.id} && ou.senderId=sender.id) ORDER by oum.id DESC`, {
        // model: messages,
        mapToModel: true,
        type: database.QueryTypes.SELECT
      });

      return apiResponseHelper.post(res, true, 'User List', get_messages_data);

    } catch (e) {


      console.log(e);
      return apiResponseHelper.onError(res, false, 'Something Went Wrong.Please Try Again', {});

    }










  },












}