/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	autoPK: false,
	attributes: {
		email:{
			type:"email",
			unique:true,
			required:true,
			primaryKey:true
		},
		name:{
			type:"string"
		},
		inbox:{
			collection:"email",
			via:"to"
		},
		outbox:{
			collection:"email",
			via:"from"
		},
		password:{
			type:"string"
		},
		admin:{
			type:"boolean",
			defaultsTo:false
		}
	}
};

