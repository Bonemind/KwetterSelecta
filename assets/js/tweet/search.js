$(document).ready( function() {
	$('#search').bind('click', function(e) {
		e.preventDefault();
		var query = $('[name="query"]').val();
		console.log(query);
		window.location.href = '/tweet?' + 'where={"content":{"contains":"' + query + '"}}';
	});

});
