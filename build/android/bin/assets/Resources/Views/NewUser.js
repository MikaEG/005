function openUserDetails(user, isfacebook) {
	var mainWin = Ti.UI.createWindow({
		modal : 'true',
	});
	var transView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : '#000',
		opacity : '0.6',
	});
	mainWin.add(transView);
	var self = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.Size,
	});
	self.layout = 'vertical';
	mainWin.add(self);
	//.......................................
	var hMargin = calculationRatio_Height(10);
	var view0 = Ti.UI.createView({
		layout : 'vertical',
		//backgroundColor : '#CCC',
		height : Ti.UI.SIZE,
		top : hMargin,
	});
	var imgeSize = calculationRatio_Width(75);
	var img = Ti.UI.createImageView({
		width : imgeSize,
		height : imgeSize,
		backgroundColor : 'red'
	});
	view0.add(img);
	var userImage = {};
	img.addEventListener('click', function() {
		Ti.include('/Views/CameraView.js');
		PetsKey.ShowCamera(imgLoaded);
		function imgLoaded(event) {
			//checking if it is photo
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//getting media
				userImage = event.media;
				img.image = userImage;
				//img.image = image.nativePath;
				//self.imgPath = image.nativePath;
			}
		}

	});
	self.add(view0);
	var view1 = Ti.UI.createView({
		layout : 'vertical',
	//	backgroundColor : '#CCC',
		height : Ti.UI.SIZE,
		top : hMargin,
	});
	var txtUserName = Ti.UI.createTextField({
		width : '80%'
	});
	txtUserName.hintText = 'User name';
	var txtPass = Ti.UI.createTextField({
		width : '80%'
	});
	txtPass.hintText = 'Password';
	txtPass.passwordMask = true;
	view1.add(txtUserName);
	view1.add(txtPass);

	self.add(view1);
	//...........................................
	var view2 = Ti.UI.createView({
		layout : 'vertical',
	//	backgroundColor : '#CCC',
		height : Ti.UI.SIZE,
		top : hMargin,
	});
	var txtRealNumber = Ti.UI.createTextField({
		width : '80%'
	});
	txtRealNumber.hintText = 'Real name';
	var txtMobileNumber = Ti.UI.createTextField({
		width : '80%'
	});
	txtMobileNumber.hintText = 'Mobile';
	txtMobileNumber.keyboardType = Ti.UI.KEYBOARD_PHONE_PAD;
	var txtEmail = Ti.UI.createTextField({
		width : '80%'
	});
	txtEmail.hintText = 'Email';
	txtEmail.keyboardType = Ti.UI.KEYBOARD_EMAIL;

	view2.add(txtRealNumber);
	view2.add(txtMobileNumber);
	view2.add(txtEmail);

	//...............................................
	var picker = Ti.UI.createPicker({
		width : txtEmail.width
	});

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Gender'
	});
	data[1] = Ti.UI.createPickerRow({
		title : 'Male'
	});
	data[2] = Ti.UI.createPickerRow({
		title : 'Female'
	});

	picker.add(data);
	picker.selectionIndicator = true;
	view2.add(picker);

	var btncheckIn = Ti.UI.createButton({
		title : 'Checkin As Home'
	});
	//view2.add(btncheckIn);
	self.add(view2);
	//...........................................
	var btnView = Ti.UI.createView({
		layout : 'vertical',
		//backgroundColor : '#CCC',
		height : Ti.UI.SIZE,
		top : hMargin,
	});
	var savebtn = Ti.UI.createButton({
		title : 'save'
	});
	savebtn.addEventListener('click', function() {
		showLoading();
		Cloud.Users.create({
			username : txtUserName.value,
			email : txtEmail.value,
			first_name : txtRealNumber.value,
			password : txtPass.value,
			password_confirmation : txtPass.value,
			photo : userImage
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				createToast('user created please login');
				//'Success:\\n' + 'id: ' + user.id + '\\n' + 'first name: ' + user.first_name + '\\n' + 'last name: ' + user.last_name);
				stopLoading();
				OpenLoginWindow();
			} else {
				createToast('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
			stopLoading();
		});

	});
	btnView.add(savebtn);
	self.add(btnView);
	mainWin.open();
}

