function addComment(photo_id, message, addCallBack) {
	//var photo_id = photo.id;
	Cloud.Reviews.create({
		photo_id : photo_id,
		content : message,
		allow_duplicate : true
	}, function(e) {
		if (e.success) {
			addCallBack(e.reviews[0]);
			createToast("Comment was added!");
		} else {
			//alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			createToast(":( can't add the comment right now!");
		}
	});
}
function getCommentList(photo_id, callbackFunction) {
	//var photo_id = photo.id;
	Cloud.Reviews.query({
		order : 'created_at',
		photo_id : photo_id,
	}, callbackFunction);
}