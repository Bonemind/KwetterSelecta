/**
 * HashtagController
 *
 * @description :: Server-side logic for managing hashtags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findOne(req, res) {
		var tag = req.param('id');
		if (!tag.indexOf('#') == 0) {
			tag = '#' + tag;
		}
		Hashtag.findOne({ name: tag})
		.populate('tweets')
		.then((h) => {
			if (!h) {
				return res.notFound();
			}
			return res.ok(h);
		});
	}
};

