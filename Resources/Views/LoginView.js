function LoginView() {
	var bodyView = Titanium.UI.createView({
		backgroundColor : '#FFF',
		top : PetsKey.UI.headerHeight,
		height : Ti.UI.FILL,
		name : 'login',

	});
	bodyView.height = viewHeight;
	bodyView.layout = 'vertical';
	//........................................
	var size = ((Titanium.Platform.displayCaps.platformWidth) * 0.4);
	var img = Ti.UI.createImageView({
		image : '/images/VLogo.png',
		height : 'auto',
		width : size,
		top : 5
	});

	var txtUserName = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 5,
		borderColor : '#9a4d84',
		color : '#9a4d84',
		width : '90%',
		height : 'auto',
		hintText : 'Username',
	});
	var txtPass = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 5,
		borderColor : '#9a4d84',
		color : '#9a4d84',
		width : '90%',
		height : 'auto',
		hintText : 'Password',
		passwordMask : true
	});
	//-----------------------------------------------
	var CustomButton = require('CustomButton');
	var btnLogin = new CustomButton();
	btnLogin.title = "Sign In";
	btnLogin.addEventListener('click', function() {
		Cloud.Users.login({
			login : txtUserName.value,
			password : txtPass.value
		}, onCloudLoginSuccess);
	});
	//-----------------------------------------------
	var btnSignUp = new CustomButton();
	btnSignUp.title = "Sign Up/Register";
	btnSignUp.addEventListener('click', function() {
		Ti.include('NewUser.js');
		openUserDetails();
	});
	//-----------------------------------------------
	bodyView.add(img);
	bodyView.add(txtUserName);
	bodyView.add(txtPass);
	bodyView.add(btnLogin);
	bodyView.add(btnSignUp);
	//.....................................
	bodyView.add(fb.createLoginButton({
		style : fb.BUTTON_STYLE_WIDE
	}));
	//....................................
	
	return bodyView;
}

module.exports = LoginView;
