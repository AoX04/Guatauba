/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var moment = require('moment');

function createToken(user) {
	console.log(user);
    var payload = {
        sub:  user.email,
        iat: moment().unix(),
        exp: moment().add(3, 'days').unix()
    };
    console.log(payload);
    //console.log(config.TOKEN_SECRET);
    return jwt.encode(payload, sails.config.session.secret);
}

module.exports = {
	
	login:function(req,res){
		
		var user = {
			email:req.param('email'),
			password:req.param('password')
		}
		
		//console.log(user);
		
		User.findOne(user).exec(function(err,existingUser){
			if(existingUser){
				//delete existingUser.password;
				//res.send(existingUser);
				//console.log('line 145:',existingUser);
				var token = createToken(existingUser);
				var auth_data = {
					"Uid":existingUser.email,
					"Expiry":moment().add(3, 'days').unix(),
					"Access-Token": token
				}

				req.session.Uid = auth_data.Uid;
				req.session.Expiry = auth_data.Expiry;
				req.session["Access-Token"] = auth_data["Access-Token"];

				res.set(auth_data);
				return res.send(existingUser);
				
			}else res.send(401);
		});
		
	},
	
	list_all:function(req,res){
		User.find().exec(function(err,data){
			res.send(data);
		})
	},
	
	me:function (req,res){
		var token = req.session["Access-Token"];
		//console.log("toej" token);
        console.log("token: ", token);
        var payload = jwt.decode(token, sails.config.session.secret);
		console.log(payload.sub);
		User.findOne(payload.sub).exec(function(err,user){
			if(user){
				res.send(user);	
			}else res.send(401);
		});
	}
	
};

