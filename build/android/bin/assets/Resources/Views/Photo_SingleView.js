var topMargin = calculationRatio_Height(7);
function PhotoDetails(photo) {
	var user = photo.user;
	var hdrContainer = Buildheader(photo, user);
	// Create an ImageView.
	var mySize = Titanium.Platform.displayCaps.platformWidth - topMargin - topMargin;
	var anImageView = Ti.UI.createImageView({
		image : photo.urls.medium_500,
		width : mySize,
		height : mySize,
		left : topMargin,
		top : 0,
	});
	anImageView.addEventListener('load', function() {
		Ti.API.info('Image loaded!');
	});
	var footer = BuildFooter(photo);
	var tempH = footer.height + hdrContainer.height + anImageView.height;
	var self = Ti.UI.createView({
		layout : 'vertical',
		height : tempH,
		backgroundColor : '#FFF',
	});

	self.add(hdrContainer);
	self.add(anImageView);
	self.add(footer);
	//..................................................................
	return self;
	//..................................................................
	function Buildheader() {

		var photoFontSize = calculationRatio_Height(20);
		var clockSize = photoFontSize;
		var imageSize = calculationRatio_Width(32);
		var headerHeight = imageSize + topMargin + topMargin;
		var hdrContainer = Ti.UI.createView({
			layout : 'horizontal',
			height : headerHeight,
			width : Titanium.UI.FILL,
		});
		// Create an ImageView.
		var userImg = Ti.UI.createImageView({
			defaultImage : '/images/noImage.png',
			left : topMargin,
			height : imageSize,
			width : imageSize,
			top : topMargin
		});
		if (user.photo != undefined)
			userImg.image = user.photo.urls.square_75;
		// Add to the parent view.
		hdrContainer.add(userImg);
		//...........................................................
		// Create a Label.
		var lblUserName = Ti.UI.createLabel({
			text : user.first_name,
			color : '#000',
			left : topMargin,
			font : {
				fontSize : photoFontSize
			},
		});

		var timeDiff = calculatPhotoTime(photo);
		// Create a Label.
		var lblPhoto = Ti.UI.createLabel({
			text : timeDiff,
			textAlign : 'right',
			font : {
				fontSize : photoFontSize
			},
		});
		var clockImg = Ti.UI.createImageView({
			image : '/images/PhotoDetails/clock_icon.png',
			width : clockSize,
			height : clockSize,
		});
		//............................................................
		var hdrInfo = Ti.UI.createView({
			height : imageSize,
			width : Titanium.UI.FILL,
			top : topMargin,
		});

		var photoTimeView = Ti.UI.createView({
			layout : 'horizontal',
			right : topMargin,
			width : Titanium.UI.SIZE,
			height : Titanium.UI.SIZE,
		});
		photoTimeView.add(clockImg);
		photoTimeView.add(lblPhoto);
		//................................
		hdrInfo.add(lblUserName);
		hdrInfo.add(photoTimeView);
		hdrContainer.add(hdrInfo);
		return hdrContainer;
	}

	//..................................................................
	function BuildFooter() {
		var btnHeight = calculationRatio_Height(32);

		var footer = Ti.UI.createView({
			height : calculationRatio_Height(40),
			width : Titanium.UI.FILL,
			top : topMargin,
		});
		//...................................
		var shareBtn = Ti.UI.createButton();
		shareBtn.title = "";
		shareBtn.right = topMargin;
		shareBtn.width = calculationRatio_Width(45);
		shareBtn.height = btnHeight;
		shareBtn.backgroundImage = "/images/PhotoDetails/moreBtn.png";
		footer.add(shareBtn);
		shareBtn.addEventListener('click', function() {
			var message = "Have you seen my pic on #petskey";
			if (photo.user.id != Ti.App.userID)
				message = "A nice photo for " + photo.user.first_name + " on #petskey";
			sharePhoto_fb(message, anImageView.toImage(), footer);
		});
		//...................................
		//MAI:Ti.include('Likes.js');
		//getUserLike(photo);
		// Create a Label.
		var btnLikes = Ti.UI.createButton({
			left : topMargin,
			backgroundImage : '/images/PhotoDetails/likeBtn.png',
			width : calculationRatio_Width(75),
			height : btnHeight,
		});
		if (photo.likes_count == undefined || photo.likes_count == null) {
			photo.likes_count = 0;
		}
		//lblLikes.title = photo.likes_count + "Likes";
		btnLikes.addEventListener('click', function() {
			Ti.include('/Cloud/Likes.js');
			AddaLike(photo, btnLikes);
		});

		// Add to the parent view.
		var likeView = Ti.UI.createView({
			layout : 'horizontal',
			width : Titanium.UI.SIZE,
			height : shareBtn.height,
			backgroundColor : '#FFF',
			left : '0'
		});
		//likeView.add(likeImg);
		likeView.add(btnLikes);

		var commentsBtn = Ti.UI.createButton();
		commentsBtn.title = " ";
		commentsBtn.left = topMargin;
		commentsBtn.width = calculationRatio_Width(118);
		commentsBtn.height = shareBtn.height;
		commentsBtn.backgroundImage = "/images/PhotoDetails/commentBtn.png";
		commentsBtn.addEventListener('click', function() {
			Ti.include('/Views/CommentsView.js');
			ShowCommentsWindow(photo.id);
		});
		likeView.add(commentsBtn);

		footer.add(likeView);

		return footer;
	}

};

module.exports = PhotoDetails;
