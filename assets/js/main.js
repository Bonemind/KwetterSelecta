$(document).ready( function() {
	var logoutEl = $('#logout');
	var followEl = $('#follow');
	var unfollowEl = $('#unfollow');

	if (logoutEl) {
		logoutEl.bind('click', function(e) {
			e.preventDefault();
			$.ajax({
				url: '/logout',
				type: 'DELETE',
				success: function(result) {
					window.location.href = '/login';
				},
			});
		});
	}

	if (followEl) {
		followEl.bind('click', function(e) {
			e.preventDefault();
			var followId = $(this).data('follow');
			console.log(followId);
			$.ajax({
				url: '/user/following',
				type: 'POST',
				data: { user: followId },
				success: function(result) {
					location.reload();
				},
			});
		});
	}

	if (unfollowEl) {
		unfollowEl.bind('click', function(e) {
			e.preventDefault();
			var unfollowId = $(this).data('unfollow');
			$.ajax({
				url: '/user/following/' + unfollowId,
				type: 'DELETE',
				success: function(result) {
					location.reload();
				},
			});
		});
	}

	$('.tweet').each(function(i) {
		var text = this.innerText;
		text = text.replace(/#(\w+)/g, '<a href="/hashtag/\$1">#\$1</a>');
		console.log(this);
		$(this).html(text);
	});

});
