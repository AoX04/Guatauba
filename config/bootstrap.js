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
var Waterline = require('waterline');
var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();


module.exports.bootstrap = function(cb) {
	
	var server = new SMTPServer({
		secure: false,
		disabledCommands: ['AUTH'],
		//key: fs.readFileSync('certs/server.key'),
		//cert: fs.readFileSync('certs/server.crt'),
		onData: function(stream, session, callback){
			stream.pipe(process.stdout); // print message to console
			var data = "";
			stream.setEncoding('utf8');
			stream.on('data', function(chunk) {
				//assert.equal(typeof chunk, 'string');
				data += chunk;
				//console.log('got %d characters of string data', chunk.length);
			});
			
			mailparser.on("end", function(mail_object){
				console.log("From:", mail_object.from); //[{address:'sender@example.com',name:'Sender Name'}]
				console.log("Subject:", mail_object.subject); // Hello world!
				console.log("Text body:", mail_object.text); // How are you today?
				Log.create(mail_object).exec(function (err,data){
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

