const Twit = require('twit')
var nodemailer = require('nodemailer');

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
      user: 'shivkumar.anwane95@gmail.com',
      pass: 'Shiv.2212455'
    }
  });
  
  var mailOptions = {
    from: 'shivkumar.anwane95@gmail.com',
    to: 'shiv.anwane@gmail.com'
  };
  
   var followId = ['987236469134712832','2613904818','2596143056','2595957175','1221365126','2665238888','2645220206','2911771819','735362544160886784','944168331279339523','2656599733','4808052715','3619207820','2602959463','2589318188','1066064184','2543217782','2650295678','2583806562','1056904937932709888','2611134289','1080769008452829184','2615251201','2907739345'];
   
   var stream = T.stream('statuses/filter', { follow: followId })
   stream.on('tweet', function (tweet) 
   {
     if(followId.indexOf(tweet.user.id_str) !== -1)
     {
       if(!tweet.text.startsWith("RT @"))
       {
         mailOptions.text = tweet.text;
         mailOptions.subject = 'Tweet from @'+tweet.user.screen_name;

         console.log(tweet.text)
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