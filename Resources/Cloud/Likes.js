function AddaLike(photo, lblLikes) {
	var photo_id = photo.id;
	Cloud.Likes.create({
		photo_id : photo_id
	}, function(e) {
		if (e.success) {
			var like = e.likes[0];
			photo.likes_count++;
			lblLikes.title = photo.likes_count + "Likes";
		} else {
			//alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			createToast("You have liked this photo!");
		}
	});
}

function getUserLike(photo) {
	var photo_id = photo.id;
	Cloud.Likes.query({
		photo_id : photo_id,
		user : {
			id : Ti.App.userID
		}
	}, function(e) {
		if (e.success) {
			alert(e);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}
