PetsKey.ShowCamera = function(callOnSuccess) {
	if (callOnSuccess == undefined || callOnSuccess == null) {
		callOnSuccess = SaveImageAfterSuccess;
	}
	//Create a dialog with options
	var dialog = Titanium.UI.createOptionDialog({
		//title of dialog
		title : 'Choose an image source...',
		//options
		options : ['Camera', 'Photo Gallery', 'Cancel'],
		//index of cancel button
		cancel : 2
	});

	//add event listener
	dialog.addEventListener('click', function(e) {
		//if first option was selected
		if (e.index == 0) {
			//then we are getting image from camera
			Titanium.Media.showCamera({
				//we got something
				success : callOnSuccess,
				cancel : function() {
					//do somehting if user cancels operation
				},
				error : function(error) {
					//error happend, create alert
					var a = Titanium.UI.createAlertDialog({
						title : 'Camera'
					});
					//set message
					if (error.code == Titanium.Media.NO_CAMERA) {
						a.setMessage('Device does not have camera');
					} else {
						a.setMessage('Unexpected error: ' + error.code);
					}

					// show alert
					a.show();
				},
				allowImageEditing : true,
				saveToPhotoGallery : true
			});
		} else if (e.index == 1) {
			//obtain an image from the gallery
			Titanium.Media.openPhotoGallery({
				success : callOnSuccess,
				cancel : function() {
					//user cancelled the action fron within
					//the photo gallery
					progressIndicator.hide();
				}
			});
		} else {
			//cancel was tapped
			//user opted not to choose a photo
		}
	});

	//show dialog
	dialog.show();
	//- See more at: http://appcodingeasy.com/Titanium-Mobile/Choosing-picture-from-gallery-or-camera#sthash.8peyeoJY.dpuf

};

function SaveImageAfterSuccess(event) {
	showLoading();
	//getting media
	var image = event.media;
	// set image view
	//alert(image.nativePath);
	//checking if it is photo
	if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
		//we may create image view with contents from image variable
		//or simply save path to image
		//Ti.App.Properties.setString("image", image.nativePath);
		Cloud.Photos.create({
			photo : image// Titanium.Filesystem.getFile(image.nativePath)
		}, function(e) {
			if (e.success) {
				var photo = e.photos[0];
				createToast('Photo SAVED');
					//'Photo SAVED:\n' + 'id: ' + photo.id + '\n' + 'filename: ' + photo.filename + '\n' + 'size: ' + photo.size, 'updated_at: ' + photo.updated_at);
				stopLoading();
			} else {
				createToast('Error in Photo:\n' + ((e.error && e.message) || JSON.stringify(e)));
				stopLoading();
			}
		});

	}
}

function ShowCameraOLD(e, currentView) {
	Titanium.Media.showCamera({
		overlay : currentView,
		success : function(event) {
			messageView.show();
			Cloud.onsendstream = function(e) {
				messageLabel.text = 'Please Wait, Uploading Photo ' + (Math.floor(e.progress * 0.5 * 100) * 2) + '% Complete';
			};
			Cloud.ondatastream = function(evt) {
				messageLabel.text = 'Please Wait, Uploading Photo ' + (Math.floor(e.progress * 0.5 * 100) + 0.5) * 2 + '% Complete';
			};
			var cropRect = event.cropRect;
			var image = event.media;

			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				Cloud.Posts.create({
					content : 'Man Walks On',
					title : 'News of the',
					photo : event.media
				}, function(e) {
					Cloud.onsendstream = Cloud.ondatastream = null;
					if (e.success) {
						var photo = e.photos[0];
						messageView.hide();
						//alert('Success:\\n' + 'id: ' + photo.id + '\\n' + 'filename: ' + photo.filename + '\\n' + 'size: ' + photo.size, 'updated_at: ' + photo.updated_at);
					} else {
						alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});
				//
				//messageWin.close({opacity:0,duration:500});
			} else {
				alert("got the wrong type back =" + event.mediaType);
			}
		},
		cancel : function() {
		},
		error : function(error) {
			// create alert
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});

			// set message
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}

			// show alert
			a.show();
		},
		saveToPhotoGallery : true,
		allowEditing : true,
		mediaTypes : [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
	});
};