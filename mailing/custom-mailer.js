var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dzieniu@gmail.com',
    pass: 'Majsterek1423'
  }
});

module.exports = {
sendPlan: function(email,text,callback){
	var mailOptions = {
	  from: 'Easy Shopping <dzieniu@gmail.com>',
	  to: email,
	  subject: 'Tygodniowy plan zywienia: '+'20.12-'+'27.12.2017',
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