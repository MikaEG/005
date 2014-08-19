PetsKey.UI.headerHeight = Math.min(calculationRatio_Height(86), 48);
PetsKey.UI.footerHeight = calculationRatio_Height(68);
var viewHeight = Titanium.Platform.displayCaps.platformHeight - PetsKey.UI.footerHeight - PetsKey.UI.headerHeight;
PetsKey.UI.fontSize = (viewHeight * 4) / 100;
//......................................
var progressIndicator = Ti.UI.createActivityIndicator({
	color : 'green',
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : 26,
		fontWeight : 'bold'
	},
	message : 'Loading...',
	style : Ti.UI.ActivityIndicatorStyle.DARK,
	top : 0,
	right : 10,
	height : Ti.UI.SIZE,
	width : 26
});
//........................................................
var mainC1 = '#b97ba8';
var mainC2 = '#803f6e';
function commonGradient() {
	return {
		type : 'linear',
		startPoint : {
			x : '0%',
			y : '0%'
		},
		endPoint : {
			x : '0%',
			y : '50%'
		},
		colors : [{
			color : mainC1,
			offset : 0.0
		}, {
			color : mainC2,
			offset : 1.0
		}],
	};
}

function createHeaderView() {
	var headerView = new Ti.UI.createView({
		height : PetsKey.UI.headerHeight,
		backgroundGradient : commonGradient()
	});
	//.....................................

	var myFont = 16;
	// Create a Label.
	var aLabel = Ti.UI.createLabel({
		text : 'PetsKey',
		color : '#FFF',
		font : {
			fontSize : myFont
		},
	});
	// Add to the parent view.
	headerView.add(aLabel);
	headerView.setTitle = function(title) {
		aLabel.text = title;
	};
	//...........................
	return headerView;
};

var navActIndView = undefined;
function showLoading(extratext) {
	var view = Ti.UI.createWindow({
		fullscreen : true,
		navBarHidden : true,
		exitOnClose : false,
		opacity : '0.6',
	});
	var msg = ' Loading...' + extratext == undefined ? '' : extratext;
	var navActInd = Titanium.UI.createActivityIndicator({
		style : Ti.UI.ActivityIndicatorStyle.BIG,
		message : msg
	});
	view.add(navActInd);
	navActInd.show();
	navActIndView = view;
	navActIndView.open();
}

function stopLoading() {
	if (navActIndView != undefined)
		navActIndView.close();
}

function createToast(message) {
	var toast = Ti.UI.createNotification({
		message : message,
		duration : Ti.UI.NOTIFICATION_DURATION_SHORT
	});
	toast.show();
}

function calculationRatio(X, Y, newX) {
	var hdr_newheigth = newX * Y / X;
	return hdr_newheigth;
}

function calculationRatio_Width(oldX) {
	var myW = Titanium.Platform.displayCaps.platformWidth;
	var newX = calculationRatio(PetsKey.UI.UIWidth, oldX, myW);
	return newX;
}

function calculationRatio_Height(oldY) {
	var myH = Titanium.Platform.displayCaps.platformHeight;
	var newY = calculationRatio(PetsKey.UI.UIHeight, oldY, myH);
	return Math.ceil(newY);
}

function calculatPhotoTime(photo) {
	var timeDiff = "";
	var photoDate = new Date(Date.parse(photo.created_at));
	var today = new Date(Date.parse((new Date()).toISOString()));
	if (today.getUTCFullYear() != photoDate.getUTCFullYear()) {
		timeDiff = DateDiff.inYears(today, photoDate) + "y";
	}
	//.......SAME YEAR.......DIFF MONTH.....................
	else if (today.getUTCMonth() != photoDate.getUTCMonth()) {
		timeDiff = DateDiff.inWeeks(today, photoDate) + "w";
	}
	//.......SAME YEAR.......SAME MONTH....Diff DAY.........
	else if (today.getUTCDate() != photoDate.getUTCDate()) {
		indays = DateDiff.inDays(today, photoDate);
		if (indays > 6)
			timeDiff = DateDiff.inWeeks(today, photoDate) + "w";
		else
			timeDiff = DateDiff.inDays(today, photoDate) + "d";
	}
	//.......SAME DATE.....................
	else if (today.getUTCHours() != photoDate.getUTCHours()) {
		timeDiff = DateDiff.inHours(today, photoDate) + "h";
	} else {
		timeDiff = DateDiff.inMinuits(today, photoDate) + "min";
	}
	return timeDiff;
}

function calculatTimeDiff(created_at) {
	var timeDiff = "";
	var photoDate = new Date(Date.parse(created_at));
	var today = new Date();
	if (today.getUTCFullYear() != photoDate.getUTCFullYear() || today.getUTCMonth() != photoDate.getUTCMonth()) {
		timeDiff = DateDiff.inWeeks(today, photoDate) + "w";
	} else {
		if (today.getUTCDay() != photoDate.getUTCDay()) {
			timeDiff = DateDiff.inDays(today, photoDate) + "d";
		} else {
			if (today.getUTCHours() != photoDate.getUTCHours()) {
				timeDiff = DateDiff.inHours(today, photoDate) + "h";
			} else {
				timeDiff = DateDiff.inMinuits(today, photoDate) + "m";
			}
		}
	}
	return timeDiff;
}

var DateDiff = {

	inMinuits : function(d1, d2) {
		var diffMs = (d1 - d2);
		var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
		// minutes
		return diffMins;
	},
	inHours : function(d1, d2) {
		var diffMs = (d1 - d2);
		var diffHrs = Math.round((diffMs) / 3600000);
		// hours
		return diffHrs;
	},
	inDays : function(d1, d2) {
		var diffMs = (d1 - d2);
		var diffDs = Math.round((diffMs) / (1000 * 60 * 60 * 24));
		return diffDs;
	},

	inWeeks : function(d1, d2) {
		var t2 = d2.getTime();
		var t1 = d1.getTime();

		return parseInt((t1 - t2) / (24 * 3600 * 1000 * 7));
	},

	inMonths : function(d1, d2) {
		var months;
		months = (d2.getFullYear() - d1.getFullYear()) * 12;
		months -= d1.getMonth() + 1;
		months += d2.getMonth();
		return months <= 0 ? 0 : months;
	},

	inYears : function(d1, d2) {
		return d2.getFullYear() - d1.getFullYear();
	}
};
//..............................................
function createBackButton(mainWindow) {
	var backBtn = Ti.UI.createButton();
	backBtn.top = 0;
	backBtn.left = calculationRatio_Width(2);
	backBtn.backgroundGradient = commonGradient();
	backBtn.backgroundImage = "/images/userprofile/backBtn.png";
	backBtn.width = calculationRatio_Width(53);
	backBtn.height = calculationRatio_Height(53);
	backBtn.title = '';
	backBtn.color = "#e6e5e5";
	backBtn.window = mainWindow;
	backBtn.addEventListener('click', function(e) {
		e.source.window.close({
			activityEnterAnimation : Ti.Android.R.anim.fade_in,
			activityExitAnimation : Ti.Android.R.anim.fade_out
		});
	});
	return backBtn;
}

function createCounterLabel(widthVal, bottomVal, leftVal) {
	return Ti.UI.createLabel({
		text : '0000',
		color : '#000',
		width : widthVal,
		font : {
			fontSize : 15,
			fontWeight : 'bold'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		bottom : bottomVal,
		left : leftVal,
		//backgroundColor:'#999'
	});
};
function onImageClick(src) {
	var photo = src.source.photo;
	var imageWindow = Ti.UI.createWindow({
		exitOnClose : false,
		fullscreen : true,
		modal : true,
		navBarHidden : true,
		backgroundColor : '#FFF',
		layout : 'vertical'
	});
	var pdetails = require('Views/Photo_SingleView');
	var imageDetails = new pdetails(photo);
	var header = createHeaderView();
	imageWindow.add(header);
	imageWindow.add(imageDetails);
	imageWindow.open();
}

function OpenNewWindow(myView, newPath, mytitle) {
	if (myView == undefined || myView == null) {
		var winClass = require(newPath);
		myView = new winClass();
	}

	if (viewStack.length != 0) {
		var oldIndex = viewStack.indexOf(myView.name);
		if (oldIndex != -1) {
			viewStack.splice(oldIndex, 1);
			mainWindow.remove(myView);
		}

		mainWindow.children[mainWindow.getChildren().length - 1].hide();
	}
	mainWindow.add(myView);
	myView.show();
	viewStack.push(myView.name);
	Ti.App.SetTitle(mytitle);
	return myView;
}

function OpenLostWindow() {
	footerBtn_setActive(mainWindow.footerBar.btn04);
	LostWin = OpenNewWindow(LostWin, 'Views/LFView', "Lost & Found");
}

function OpenSalesWindow() {
	footerBtn_setActive(mainWindow.footerBar.btn05);
	SalesWin = OpenNewWindow(SalesWin, 'Views/SalesView', "For Sale!");
}

function OpenSearchWindow() {
	footerBtn_setActive(mainWindow.footerBar.btn02);
	SearchWin = OpenNewWindow(SearchWin, 'Views/SearchView', "Search petsKey");
}

function OpenLoginWindow() {
	footerBtn_setActive(mainWindow.footerBar.btn03);
	if (Ti.App.userID == undefined || Ti.App.userID == null) {
		Cloud.Users.showMe(function(e) {
			if (e.success) {
				OpenUserProfile(e.users[0]);
			} else {
				if (fb.accessToken != null) {
					Cloud.SocialIntegrations.externalAccountLogin({
						type : 'facebook',
						token : fb.accessToken
					}, function(e) {
						if (e.success) {
							OpenUserProfile(e.users[0]);
							return;
						}
					});
				}
				Ti.App.userID = null;
				Ti.App.cloudUser = null;
				CurrentUserWin = OpenNewWindow(CurrentUserWin, 'Views/LoginView', "LogIn to Petskey");

			}
		});
	} else {
		OpenUserProfile(Ti.App.cloudUser);
	}
}

function OpenUserProfile(user) {
	Ti.App.userID = user.id;
	Ti.App.cloudUser = user;
	userProfileWin = OpenNewWindow(userProfileWin, 'Views/UserProfile', "My Petskey");
}

function OpenExploreWindow() {
	ExploreWin = OpenNewWindow(ExploreWin, 'Views/ExploreView', "Explore");
	footerBtn_setActive(mainWindow.footerBar.btn01);

}

function constructMainWindow_NOTUSED() {
	var mainWin = Titanium.UI.createView({
		height : viewHeight + PetsKey.UI.headerHeight,
		width : '100%',
	});
	mainWin.addEventListener("android:back", function(e) {
		Ti.API.info('back pressed');
		ExploreWin.add(mainWin.prevWin);
		mainWin.prevWin.show();
		ExploreWin.remove(mainWin);
	});
	return mainWin;
}

function LogOut() {
	if (Ti.App.userID == null)
		return;

	Cloud.Users.logout(function(e) {
		if (e.success) {
			Ti.App.userID = null;
			Ti.App.cloudUser = null;
			userProfileWin = null;
			if (fb.loggedIn) {
				fb.logout();
			} else {
				createToast("logged out successfully!");
				OpenLoginWindow();
			}
		} else {
			createToast('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
		stopLoading();
	});

}

