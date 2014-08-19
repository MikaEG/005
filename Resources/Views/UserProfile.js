var pageitems = 12;
var newWidth = Titanium.Platform.displayCaps.platformWidth;
var imgSeparator = calculationRatio(PetsKey.UI.UIWidth, 4, newWidth);
var imgWidth = (newWidth - (imgSeparator * 4)) / 3;
function LoggedInProfile(user) {
	if (user == undefined || user == null) {
		user = Ti.App.cloudUser;
	}
	var headerBar = Ti.UI.createView({
		top : 0,
		height : PetsKey.UI.headerHeight
	});
	var containerView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : 0,
		name : 'login',
	});
	var bodyView = Titanium.UI.createView({
		backgroundColor : '#c9cbcd',
		top : PetsKey.UI.headerHeight,
		height : viewHeight,
	});
	//.....................................
	containerView.add(headerBar);
	containerView.add(bodyView);
	createUserProfileHeader(headerBar);
	//.....................................
	bodyView.layout = 'vertical';
	var realhdr_H = 255;
	var realhdr_W = 640;
	//..Header dimensions ....
	var hdr_newwidth = Titanium.Platform.displayCaps.platformWidth;
	var hdr_newheigth = calculationRatio(1136, realhdr_H, Titanium.Platform.displayCaps.platformHeight);

	// Create an ImageView.
	var hdrView = Ti.UI.createView({
		backgroundImage : '/images/userprofile/UP_header.png',
		width : hdr_newwidth,
		height : hdr_newheigth
	});
	// Add to the parent view.
	bodyView.add(hdrView);
	//...........................................................
	var pic_hVal = calculationRatio(realhdr_H, 146, hdr_newheigth);
	var pic_wVal = calculationRatio(realhdr_W, 146, hdr_newwidth);
	var zVal = calculationRatio(realhdr_H, 80, hdr_newheigth);
	var imageXVal = calculationRatio(realhdr_W, 28, hdr_newwidth);
	// Create an ImageView.
	var profilePicView = Ti.UI.createImageView({
		defaultImage : '/images/noImage.png',
		width : pic_wVal,
		height : pic_hVal,
		left : imageXVal,
		bottom : zVal
	});
	var url = getUserImage(user);
	Ti.API.info(url);

	profilePicView.addEventListener('load', function() {
		alert('loaded');
	});
	hdrView.add(profilePicView);
	buildTopBarControls(hdrView);
	var aLabel = Ti.UI.createLabel({
		text : 'first name: ' + user.first_name,
		color : '#000',
		font : {
			fontSize : calculationRatio(realhdr_H, 25, hdr_newheigth),
			fontWeight : 'bold'
		},
		textAlign : 'center',
		bottom : calculationRatio(realhdr_H, 18, hdr_newheigth),
		left : imageXVal
	});

	// Add to the parent view.
	hdrView.add(aLabel);
	//................................................
	//...........................................................
	var counterYVal = calculationRatio(realhdr_H, 190, hdr_newheigth);
	var counter1_XVal = calculationRatio(realhdr_W, 213, hdr_newwidth);
	var counter2_XVal = calculationRatio(realhdr_W, 358, hdr_newwidth);
	var counter3_XVal = calculationRatio(realhdr_W, 504, hdr_newwidth);
	var counterWidth = calculationRatio(realhdr_W, 100, hdr_newwidth);
	var lblCounter1 = createCounterLabel(counterWidth, counterYVal, counter1_XVal);
	var lblCounter2 = createCounterLabel(counterWidth, counterYVal, counter2_XVal);
	var lblCounter3 = createCounterLabel(counterWidth, counterYVal, counter3_XVal);
	var counterheight = calculationRatio(realhdr_H, 20, hdr_newheigth);
	lblCounter1.font = lblCounter2.font = lblCounter3.font = {
		fontSize : counterheight,
		fontWeight : 'bold'
	};
	// Add to the parent view.
	hdrView.add(lblCounter1);
	hdrView.add(lblCounter2);
	hdrView.add(lblCounter3);
	//................................................

	Ti.include('/Views/CameraView.js');
	var CustomButton = require('CustomButton');
	var camBtnW = hdr_newwidth - calculationRatio(realhdr_W, 40, hdr_newwidth);
	var camBtnH = calculationRatio(realhdr_H, 55, hdr_newheigth);
	var camBtn = new CustomButton();
	camBtn.font = {
		fontSize : calculationRatio_Height(12)
	};
	camBtn.height = camBtnH;
	camBtn.width = camBtnW;
	camBtn.title = 'NEW POST';
	camBtn.color = '#FFF';

	camBtn.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
	camBtn.addEventListener("click", function(e) {
		PetsKey.ShowCamera();
	});
	bodyView.add(camBtn);

	//...............................................
	var ctrlViewHeight = calculationRatio_Height(110);
	// Create an ImageView.
	var ctrlView = Ti.UI.createView({
		backgroundImage : '/images/userprofile/usrProBtns.png', //'/images/userprofile/UP_ImgCtrls.png',
		width : calculationRatio_Width(640),
		height : ctrlViewHeight,
		layout : 'horizontal',

	});
	// Add to the parent view.
	bodyView.add(ctrlView);
	//alert('TEST01');
	//............................................
	var ctrlbtnXVal = calculationRatio_Width(20);
	var separator = calculationRatio_Width(15);
	var btn1 = createButton(realhdr_H, realhdr_W, hdr_newheigth, hdr_newwidth, ctrlbtnXVal);
	ctrlView.add(btn1);
	//............................................
	var btn2 = createButton(realhdr_H, realhdr_W, hdr_newheigth, hdr_newwidth, ctrlbtnXVal);
	btn2.left = separator;
	//btn2.backgroundFocusedImage = '/images/userprofile/detailsBtn.png';
	//btn2.backgroundSelectedImage = '/images/userprofile/detailsBtn.png';
	//btn2.backgroundColor = "green";
	ctrlView.add(btn2);
	//............................................
	var btn3 = createButton(realhdr_H, realhdr_W, hdr_newheigth, hdr_newwidth, ctrlbtnXVal);
	btn3.left = separator;
	ctrlView.add(btn3);
	//............................................
	var btn4 = createButton(realhdr_H, realhdr_W, hdr_newheigth, hdr_newwidth, ctrlbtnXVal);
	btn4.left = calculationRatio_Width(20);
	ctrlView.add(btn4);
	var imgViewHeight = calculationRatio_Height(500);

	var imagesView = Ti.UI.createScrollView({
		height : 'auto',
		width : hdr_newwidth,
		//	backgroundColor : '#F0F',
		//	contentWidth : '100%',
		//	contentHeight : imgViewHeight,
		showVerticalScrollIndicator : true,
		layout : 'horizontal'
		//opacity : 0.4
	});
	bodyView.add(imagesView);
	/*************************************/
	var imgSeparator = calculationRatio(realhdr_W, 12, hdr_newwidth);
	var imgWidth = (hdr_newwidth - (imgSeparator * 4)) / 3;

	btn1.addEventListener("click", function(e) {
		LoadUserImages(imagesView, true);
	});
	btn2.addEventListener("click", function(e) {
		LoadUserImages(imagesView, false);
	});
	//UserProfile.view.lblFirstName.text = data.first_name;
	progressIndicator.hide();
	LoadUserImages(imagesView, true);
	containerView.setPhotosCount = function setPhotosCount(newCount) {
		lblCounter1.text = newCount;
	};
	return containerView;
}

function createUserProfileHeader(headerBar) {
	refreshBtn = Ti.UI.createButton();
	refreshBtn.backgroundImage = '/images/refreshBtn.png';
	//refreshBtn.title = "LogOut";
	refreshBtn.right = calculationRatio_Width(8);
	refreshBtn.width = calculationRatio_Width(48);
	refreshBtn.height = calculationRatio_Height(48);
	headerBar.add(refreshBtn);
	refreshBtn.addEventListener('click', function() {
		LogOut();
	});
}

function LoadUserImages(imagesView, isBlocks, userID) {
	//alert("LoadUserImages: " + Ti.App.userID);
	if (Ti.App.userID != undefined) {
		imagesView.removeAllChildren();
		Ti.include('/Cloud/Photo.js');
		ExploreNewImages(imagesView, Ti.App.userID, isBlocks);
	} else {
		imagesView.removeAllChildren();
		Ti.include('/Cloud/Photo.js');
		ExploreNewImages(imagesView, userID, isBlocks);
	}
}

function ExploreNewImages(imagesview, filterUserID, isBlocks) {
	filterUserID = typeof filterUserID !== 'undefined' ? filterUserID : -1;
	isBlocks = typeof isBlocks !== 'undefined' ? isBlocks : true;
	//..........................................
	progressIndicator.show();
	if (filterUserID == undefined || filterUserID == -1 || filterUserID == null) {
		Cloud.Photos.query({
			//page : 1,
			//per_page : pageitems,
			order : '-created_at'
		}, DrawImagesOnSuccess);
	} else {
		Cloud.Photos.search({
			//page : 1,
			//per_page : pageitems,
			order : '-created_at',
			user_id : filterUserID,
		}, DrawImagesOnSuccess);
	}
	function DrawImagesOnSuccess(e) {
		if (filterUserID != -1 && filterUserID == Ti.App.userID) {
			userProfileWin.setPhotosCount(e.photos.length);
		}
		if (isBlocks)
			DrawImagesCompactOnSuccess(e);
		else
			DrawImagesDetailsOnSuccess(e);

	}

	function DrawImagesCompactOnSuccess(e) {
		if (e.success) {
			Ti.API.info('Success:\n' + 'Count: ' + e.photos.length);
			for (var i = 0; i < e.photos.length; i++) {
				var photo = e.photos[i];
				Ti.API.info('id: ' + photo.id + '\n' + 'name: ' + photo.name + '\n' + 'filename: ' + photo.filename + '\n' + 'updated_at: ' + photo.updated_at);
				var imgColor = '#b2b4b6';

				// Create an ImageView.
				var anImageView = Ti.UI.createImageView({
					image : photo.urls.medium_500, //'http://data2.whicdn.com/images/7688223/tumblr_lgtrx6ZABc1qcqawbo1_500_large.jpg',
					width : imgWidth,
					height : imgWidth,
					top : imgSeparator,
					left : imgSeparator,
					backgroundColor : imgColor,
				});
				anImageView.photo = photo;
				anImageView.addEventListener('load', function() {
					Ti.API.info('Image loaded!');
				});
				anImageView.addEventListener('click', onImageClick);
				// Add to the parent view.
				imagesview.add(anImageView);

			}
			progressIndicator.hide();
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			progressIndicator.hide();
		}
	}

	function DrawImagesDetailsOnSuccess(e) {
		if (e.success) {
			Ti.API.info('Success:\n' + 'Count: ' + e.photos.length);
			for (var i = 0; i < e.photos.length; i++) {
				var photo = e.photos[i];
				var pdetails = require('Views/Photo_SingleView');
				imagesview.add(new pdetails(photo));
			}
			progressIndicator.hide();
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			progressIndicator.hide();
		}
	}

}

function createButton(realhdr_H, realhdr_W, hdr_newheigth, hdr_newwidth, ctrlbtnXVal) {
	var ctrlbtnYVal = calculationRatio(realhdr_H, 6, hdr_newheigth);
	//var ctrlbtnXVal = calculationRatio(realhdr_W, 20, hdr_newwidth);
	var ctrlbtnWidth = calculationRatio(realhdr_W, 138, hdr_newwidth);
	var ctrlbtnHeight = calculationRatio(realhdr_H, 84, hdr_newheigth);
	var btn1 = Ti.UI.createButton();
	btn1.left = ctrlbtnXVal;
	btn1.top = ctrlbtnYVal;
	btn1.width = ctrlbtnWidth;
	btn1.height = ctrlbtnHeight;
	btn1.opacity = 0.5;
	return btn1;
};
function getUserImage(user) {
	var imageURL = '/images/noImage.png';
	if (user.photo != undefined || user.photo != null)
		imageURL = user.photo.urls.thumb_100;
	else if (fb.loggedIn) {
		imageURL = "http://graph.facebook.com/" + fb.uid + "/picture?type=large&" + Titanium.Platform.createUUID() + "&width=" + Math.ceil(150) + "&height=" + Math.ceil(150);
	}
	alert('fb.loggedIn:' + fb.loggedIn + "\nimage:" + imageURL);
	return imageURL;

};
function buildTopBarControls(hdrView) {
	var topV = calculationRatio_Height(105);
	var leftX = calculationRatio_Width(195);
	var btnH = calculationRatio_Height(81);
	var btnW = calculationRatio_Width(137);
	var petsBtn = Ti.UI.createButton();
	petsBtn.height = btnH;
	petsBtn.width = btnW;
	petsBtn.top = topV;
	petsBtn.left = leftX;
	petsBtn.backgroundImage = '/images/userprofile/petsBtn.jpg';
	petsBtn.addEventListener("click", function(e) {
		Ti.include("Pets.js");
		ViewPetsWindow();
	});
	hdrView.add(petsBtn);
}

//................................................................
module.exports = LoggedInProfile;
