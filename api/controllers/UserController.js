/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	register(req, res){
		var username = req.param('username');
		var password = req.param('password');

		User.findOne({ username: username })
		.then((u) => {
			if (u) {
				return Promise.reject('Username already in use');
			}
			return User.create({ username: username, password: password })
		}).then((u) => {
			if (req.wantsJSON) {
				return res.ok(u);
			} else {
				return res.redirect('/login');
			}
		}).catch((ex) => {
			res.status(422)
			res.ok({ error: ex });
		});
	},

	addFollowing(req, res) {
		var user = req.param('user');
		User.findOne(user)
		.then((user) => {
			if (!user) {
				res.status(404);
				Promise.reject('Requested user not found');
			}
			return User.findOne(req.session.me.id);
		}).then((me) => {
			me.following.add(user);
			return me.save()
		}).then((u) => {
			res.ok(u);
		}).catch((ex) => {
			res.serverError(ex);
		});
	},

	removeFollowing(req, res) {
		var user = req.param('user');
		User.findOne(user)
		.then((user) => {
			if (!user) {
				res.status(404);
				Promise.reject('Requested user not found');
			}
			return User.findOne(req.session.me.id);
		}).then((me) => {
			me.following.remove(user);
			return me.save()
		}).then((u) => {
			res.ok(u);
		}).catch((ex) => {
			res.serverError(ex);
		});
	},

	dashboard(req, res) {
		var id = req.session.me.id;
		res.redirect('/user/' + id + '/dashboard');
	},

	viewUser(req, res) {
		var id = req.param('user');

		User.findOne(id)
		.populate('tweets')
		.populate('followers')
		.populate('following')
		.then((u) => {
			var following = _.map(u.following, (f) => { return f.id });
			if (following.length == 0) {
				following = [];
			}
			following.push(id);
			return Promise.all([u, Tweet.find({ user: following })]);
		}).then((dash) => {
			var data = dash[0];
			data.timeline = dash[1];
			data.isFollowing = false;
			data.isFollower = false;

			if (req.session.me && id != req.session.me.id) {
				var myId = req.session.me.id;
				data.isFollower = _.findIndex(data.followers, (u) => { return u.id == myId }) >= 0;
				data.isFollowing = _.findIndex(data.following, (u) => { return u.id == myId }) >= 0;
			}
			return res.ok(data, 'user/dashboard');
		})
	}
};

