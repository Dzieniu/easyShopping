var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dzieniu@gmail.com',
    pass: '**'
  }
});

module.exports = {
sendPlan: function(email,text,sd,ed,callback){
	var mailOptions = {
	  from: 'Easy Shopping <dzieniu@gmail.com>',
	  to: email,
	  subject: sd+'-'+ed+' - Plan zywienia + lista zakupów ',
	  html: text
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
		callback();
	});
}
};
