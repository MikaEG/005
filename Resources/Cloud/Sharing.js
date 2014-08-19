function sharePhoto_fb(message, photo, view) {
	var data = {
		name : message,
		picture : photo.media
	};

	var where = 'me/photos';
	showLoading(view);
	fb.requestWithGraphPath(where, data, 'POST', fbCallback);

	function fbCallback(e) {
		stopLoading();
		if (e.success) {
			createToast("Posted on your fb wall");
		} else {
			createToast("Failed to Post");
		}
	}

}

