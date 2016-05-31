/**
 * AuthController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt-as-promised');

module.exports = {
	login(req, res) {
		var username = req.param('username');
		var password = req.param('password');
		User.findOne({ username: username })
		.then((user) => {
			if (!user) {
				console.log('!user');
				return Promise.reject();
			}
			return Promise.all([user, bcrypt.compare(password, user.password)]);
		}).then((data) => {
			req.session.me = data[0];
			if (req.wantsJSON) {
				return res.ok(data[0]);
			} else {
				return res.redirect('/dashboard');
			}
		}).catch((x) => {
			console.log(x);
			res.status(401);
			return res.ok({ error: 'Username or password incorrect' });
		});
	},

	logout(req, res) {
		req.session.destroy();
		res.ok();
	},

};

