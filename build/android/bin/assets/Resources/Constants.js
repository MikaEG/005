var ExploreWin = null;
var SearchWin = null;
var CurrentUserWin = null;
var LostWin = null;
var SalesWin = null;
var userProfileWin = null;
var PetsKey = {};
PetsKey.UI = {};
//................................
PetsKey.UI.mainC1 = '#b97ba8';
PetsKey.UI.mainC2 = '#803f6e';
PetsKey.UI.UIHeight = 1136;
PetsKey.UI.UIWidth = 640;
PetsKey.UI.TotalWidth = Titanium.Platform.displayCaps.platformWidth;
PetsKey.UI.TotalHeight = Titanium.Platform.displayCaps.platformHeight;

//.......................
var Cloud = require('ti.cloud');
Cloud.debug = true;
//....................................
var fb = require('facebook');
fb.appid = '263582617132711';
fb.forceDialogAuth = true;
fb.fileUpload = true;
fb.permissions = ['publish_stream', 'read_stream', 'email', 'user_about_me', 'user_birthday', 'user_location'];
//.....................................
fb.addEventListener('login', function(e) {
	showLoading("Logging to PetsKey");
	if (e.success) {
		Cloud.SocialIntegrations.externalAccountLogin({
			type : 'facebook',
			token : fb.accessToken
		}, onCloudLoginSuccess);

	} else if (e.error) {
		createToast("Error = " + e.error);
	} else if (e.cancelled) {
		//alert("canceld");
	}
});
fb.addEventListener('logout', function(e) {
	if (e.success) {
		createToast("logged out Facebook account!");
		OpenLoginWindow();
	}
});
function onCloudLoginSuccess(e) {
	if (e.success) {
		var user = e.users[0];
		stopLoading();
		OpenUserProfile(e.users[0]);
	} else {
		//alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		createToast('Cannot login right now, please check your internet connection');
	}
}
