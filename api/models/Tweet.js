/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		content: {
			type: 'string',
			required: true,
		},

		user: {
			model: 'user',
			required: true
		},
		hashtags: {
			collection: 'hashtag',
			via: 'tweets',
			dominant: true
		},

	}
};

