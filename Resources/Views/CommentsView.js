function ShowCommentsWindow(photoid) {
	Ti.include('Cloud/Reviews.js');
	//..................................
	var selfWin = Ti.UI.createWindow({
		exitOnClose : false,
		fullscreen : true,
		modal : true,
		navBarHidden : true,
		backgroundColor : '#FFF',
	});
	selfWin.photoid = photoid;

	var pendingView = Ti.UI.createView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL
	});
	var style;
	if (Ti.Platform.name === 'iPhone OS') {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	} else {
		style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : 'black',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : calculationRatio_Height(26),
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : style,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});
	pendingView.add(activityIndicator);
	activityIndicator.show();
	selfWin.add(pendingView);
	getCommentList(photoid, callbackFunction);
	//.......................................
	var header = createHeaderView();
	header.top = 0;
	var backbtn = createBackButton(selfWin);
	header.add(backbtn);
	//........................................
	selfWin.add(header);
	selfWin.open();
	//...................................................
	function callbackFunction(e) {
		if (e.success) {
			var commentView = Ti.UI.createScrollView({
				layout : 'horizontal',
				height : selfWin.height,
				width : Ti.UI.FILL,
				top : header.height
			});
			for (var i = 0; i < e.reviews.length; i++) {
				var review = e.reviews[i];
				//alert('id: ' + review.id + '\n' + 'id: ' + review.id + '\n' + 'rating: ' + review.rating + '\n' + 'content: ' + review.content + '\n' + 'updated_at: ' + review.updated_at);
				var userName = review.user.first_name == undefined ? "" : review.user.first_name;
				addCommentToView(review);
			}
			var newComm = Ti.UI.createView({
				backgroundColor : '#FFF',
				layout : 'horizontal',
				height : Ti.UI.SIZE,
				bottom : 0
			});
			var txtWidth = PetsKey.UI.TotalWidth - calculationRatio_Width(10 + 50);
			var txtComment = Ti.UI.createTextField({
				width : txtWidth
			});
			var btnComment = Ti.UI.createButton({
				width : calculationRatio_Width(50)
			});
			btnComment.addEventListener('click', function() {
				addComment(selfWin.photoid, txtComment.value, function(myReview) {
					addCommentToView(myReview);
				});
				txtComment.value = "";
			});

			newComm.add(txtComment);
			newComm.add(btnComment);
			commentView.hide();
			selfWin.add(commentView);
			if (Ti.App.userID != undefined && Ti.App.userID != null) {
				selfWin.add(newComm);
			}
			//.......................................................
			pendingView.hide();
			commentView.scrollToBottom();
			commentView.show();
		} else {
			//alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			createToast(":( can't reach the comments");
		}

		function addCommentToView(myReview) {
			var user = myReview.user;
			var content = myReview.content;
			var first_name = user == undefined ? "Unknown" : user.first_name;
			var created_at = myReview.created_at;
			var itemView = Ti.UI.createView({
				layout : 'horizontal',
				height : Ti.UI.SIZE,
				top : calculationRatio_Height(5),
			});
			var userImage = Ti.UI.createImageView({
				defaultImage : '/images/noImage.png',
				width : '75',
				height : '75',
				left : calculationRatio_Width(5),
				top : calculationRatio_Height(5)
			});
			if (user != undefined && user.photo != undefined)
				userImage.image = user.photo.urls.square_75;				
			itemView.add(userImage);
			var commentValue = first_name + '\n' + content + "\n" + calculatTimeDiff(created_at);
			var widthLbl = PetsKey.UI.TotalWidth;
			widthLbl -= userImage.width;
			widthLbl -= (userImage.left * 3);
			//.........................................................
			var lblComment = Ti.UI.createLabel({
				left : calculationRatio_Width(5),
				text : commentValue,
				color : '#000',
				width : widthLbl,
				font : {
					fontSize : calculationRatio_Height(16)
				},
			});
			itemView.add(lblComment);
			commentView.add(itemView);
			commentView.scrollToBottom();

		}

	}

}

