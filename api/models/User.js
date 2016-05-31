/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var _ = require('lodash');
var bcrypt = require('bcrypt-as-promised');


module.exports = {

	attributes: {
		username: {
			type: 'string',
		},
		password: {
			type: 'string',
		},
		tweets: {
			collection: 'tweet',
			via: 'user'
		},
		followers: {
			collection: 'user',
			via: 'following',
			dominant: true
		},
		following: {
			collection: 'user',
			via: 'followers'
		}
	},
	afterValidate(values, next) {
		if (values.password) {
			bcrypt.genSalt(10).then((salt) => {
				return bcrypt.hash(values.password, salt);
			}).then((passwordHash) => {
				values.password = passwordHash;
				next();
			}).catch(next);
		}
		else {
			next();
		}
	}



};

