const Twit = require('twit')
var nodemailer = require('nodemailer');
var express = require('express');  


var app = express();  
app.get('/', function (req, res) {  
  res.send('Welcome to Twitter Monitoring Bot!');  
});  


var server = app.listen(process.env.PORT || 5000, function () {  
  var host = server.address().address;  
  var port = server.address().port;  
   console.log('Example app listening at http://%s:%s', host, port);  
}); 


const apikey = 'Q8UbwJB0J2yTZq98CPmq6eKa5'
const apiSecretKey = 'IgjTcZJ5A1zOG4KBRAmWGPp0KugEkeGaci3olgTH6r9WSUiEwC'
const accessToken = '1394175660277440516-jOGRtnNxpikb8Vn6bMniCuSeby11VL'
const accessTokenSecret = 'cIxzVuQgUnMkhxUJm5d5OjCfoy72q5XizcdLn60zxYRvg'

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});


(async () => {

  console.log("Application Start...")

  //Send Email
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'socialmediafeeds@legasis.in',
      pass: 'Social@Hacks123'
    }
  });
  
  var mailOptions = {
    from: 'socialmediafeeds@legasis.in',
    to: 'socialmediafeeds@legasis.in'
  };
 

   var followId = ['987236469134712832','471741741','2613904818','2596143056','2595957175','1221365126','2665238888','2645220206','2911771819','735362544160886784','944168331279339523','2656599733','4808052715','3619207820','2602959463','2589318188','1066064184','2543217782','2650295678','2583806562','1056904937932709888','2611134289','1080769008452829184','2615251201','2907739345'];
   
   var stream = T.stream('statuses/filter', { follow: followId })
   stream.on('tweet', function (tweet) 
   {

     if(followId.indexOf(tweet.user.id_str) !== -1)
     {
      //  console.log("pre olddd ************");
      //  console.log(tweet);
       if((!tweet.text.startsWith("RT @")) && (tweet.in_reply_to_status_id==null))        //
       {
         if(tweet.hasOwnProperty('extended_tweet'))
         {
          mailOptions.text = tweet.extended_tweet.full_text;
         }else{
          mailOptions.text = tweet.text;
         }
         
         mailOptions.subject = 'Tweet from @'+tweet.user.screen_name;

         console.log(tweet.text);
         console.log(tweet.user.screen_name);
    
         transporter.sendMail(mailOptions, function(error, info)
         {
           if (error) 
           {
             console.log(error);
           } else 
           {
             console.log('Email sent: ' + info.response);
           }
         });
       }
     }
     else
     {
       //console.log("Id does not exists!")
     }
})
})();