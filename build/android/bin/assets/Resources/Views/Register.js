function openRegister() {
	var mainWin = Ti.UI.createWindow({
		modal : 'true',
	});
	var transView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : '#000',
		opacity : '0.8',
	});
	mainWin.add(transView);
	var self = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
	});
	self.layout = 'vertical';
	mainWin.add(self);
	//..Controls ....
	var txtUserName = PetsKey.UI.createTextbox();
	txtUserName.hintText = 'User Name';
	var txtPass = PetsKey.UI.createTextbox();
	txtPass.hintText = 'Password';
	txtPass.passwordMask = true;
	//.................................
	self.add(txtUserName);
	self.add(txtPass);
	//.................................
	var btn = PetsKey.UI.createButton();
	btn.title = "Save Information";
	btn.addEventListener("click", function() {

		Cloud.SocialIntegrations.externalAccountLogin({
			type : 'facebook',
			token : fb.accessToken
		}, function(e) {
			if (e.success) {
				createToast('Logged in! You are now logged in as ' + user.username);
				OpenUserProfile(e.users[0]);				
			} else {
				createToast(e);
			}
		});

	});
	self.add(btn);
	mainWin.open();
}

