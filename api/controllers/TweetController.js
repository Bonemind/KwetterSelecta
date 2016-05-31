/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');

module.exports = {
	create(req, res) {
		if (!req.session.me) {
			return res.serverError(403);
		}
		var hashtagMatcher = /(#\w+)/g
		var content = req.param('content');
		var hashtags = content.match(hashtagMatcher);
		var promises = _.map(hashtags, (hashtag) => {
			return Hashtag.findOrCreate({ name: hashtag });
		});
		Promise.all(promises)
		.then((hashtags) => {
			console.log(hashtags);
			return Tweet.create({ content: content, user: req.session.me, hashtags: _.map(hashtags, (h) => { return h.id }) })
		}).then((t) => {
			if (req.wantsJSON) {
				res.ok(t);
			} else {
				res.redirect('/tweet');
			}
		}).catch((ex) => {
			res.serverError(ex);
		});
	}
	
};

