const config = require('config');
const jwt = require('jsonwebtoken');
var apn = require('apn');
var FCM = require('fcm-node');
const webpush = require("web-push");
const ServerKey = "AAAANuebeg0:APA91bH1-GY41wdfW__F7eq3I4bqN5w12cUrwgJfzV458NXEkv5zt85PvibvCsB_pyZkLzfW53NWCXS2MEtg80aq9f1252PAuRn9WMD1mqgG6y3bQMfesCbdmU6bTz5FZM5_hP0LFM9v"
var  fcm = new FCM(ServerKey);
webpush.setGCMAPIKey(ServerKey);
const publicVapidKey = "BLqVUwxtyep8ekUeJgQ92GsVO2w5HwzxgxVg0PEXgV4Q8E0xHhBATbjvGxFSmyFadr8pbM3NAZxUXd2I_WOe-sM"
const privateVapidKey = "ptNJiH5_gw9ZyZdBU8q5dXjGgm8EOBG3jD-B9hx10Vs";

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicVapidKey,
    privateVapidKey
  );

var collapse_key =  'AIzaSyD4zrhGNnokl9Cp8A9Vp5FI-lfuwvxpTA0'
var options = {
    token: {
      key: "certificate/AuthKey_VMA8V84CAA.p8",
      keyId: "VMA8V84CAA",
      teamId: "94FK8B9L4N"
    },
      production: true
  };

const userId = (token) => {
    const decoded = jwt.verify(token, config.jwtToken);
    return decoded.id;
}
const generateRandomString = (length = 10) => {
    return Math.random().toString(36).substr(0,length);
}

const timestamp = () => {
	return time = Math.floor(Date.now()/1000)
}

const sendPush = (msg,deviceToken,type, Id, name, image, badgeCount,phone,authkey,p256dh,isGroup,groupProfileImage) =>{
       console.log("i send push to ",name,"unread count", badgeCount);
      if(type==0){
       var apnProvider = new apn.Provider(options);
       var note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = badgeCount;
        note.sound = "ping.aiff";
        note.alert = "\uD83D\uDCE7 \u2709 "+msg;
        note.payload = {"type":type,"sender_id":Id,'sender_name':name,"sender_image":image, "phone":phone,'isGroup':isGroup,'groupImage':groupProfileImage};
        note.topic = "com.live.HiLiteMD";
        apnProvider.send(note, deviceToken).then((result) => {
            console.log("push send")
        }).catch(error=>{
            console.log(error);
        })
    }else if(type==1){
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: deviceToken, 
            collapse_key: collapse_key,
            title:msg,
            body:msg,
            data: {"type":type,"sender_id":Id,'sender_name':name,"sender_image":image,"phone":phone,'isGroup':isGroup,'groupImage':groupProfileImage}
          };
          
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }else if(type==2){

       // console.log("need to send web push");
   


        const payload = JSON.stringify({ title: "hiliteMD:"+msg, url:"https://webchat.hilitehealth.com/#/chat?id="+Id});
         let  pushSubscription = {"endpoint":deviceToken,"expirationTime":null,"keys":{"p256dh":p256dh,"auth":authkey}}
        
        webpush.sendNotification(pushSubscription, payload).catch( error => {
            console.log(error);
        }) ;
    }    
}

module.exports = {
    userId,
    generateRandomString,
    timestamp,
    sendPush
}