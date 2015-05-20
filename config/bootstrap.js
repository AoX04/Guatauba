/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var SMTPServer = require('smtp-server').SMTPServer;
var fs = require('fs');
var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();


module.exports.bootstrap = function(cb) {
	
	var server = new SMTPServer({
		secure: false,
		disabledCommands: ['AUTH'],
		//key: fs.readFileSync('certs/server.key'),
		//cert: fs.readFileSync('certs/server.crt'),
		onData: function(stream, session, callback){
			//stream.pipe(process.stdout); // print message to console
			var data = "";
			stream.setEncoding('utf8');
			stream.on('data', function(chunk) {
				//assert.equal(typeof chunk, 'string');
				data += chunk;
				//console.log('got %d characters of string data', chunk.length);
			});
			
			mailparser.on("end", function(mail_object){
				
				var email = {
					text:mail_object.text,
					subject:mail_object.subject,
					from: mail_object.from[0].address,
					to: mail_object.to[0].address,
					headers:mail_object.headers
				};
				
				Email.create(email).exec(function (err,data){
					console.log(err);
				});
			});
			
			stream.on('end', function(){
				
				mailparser.write(data);
				mailparser.end();
				callback();
			});
		}
	});
	server.listen(25);
	cb();

};

