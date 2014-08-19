function SearchView() {
	var bodyView = Titanium.UI.createView({
		backgroundColor : 'blue',
		top : PetsKey.UI.headerHeight,
		height : Ti.UI.FILL,
		layout : 'vertical',
		name : 'search',
	});
	bodyView.height = viewHeight;
	//..............................
	var searchBar = Ti.UI.createView();
	searchBar.backgroundImage = "/images/searchView/searchBar.png";
	searchBar.width = PetsKey.UI.TotalWidth;
	searchBar.height = calculationRatio_Height(88);
	searchBar.top = 0;
	//.................................
	var scrollView = Ti.UI.createScrollView();
	scrollView.height = bodyView.height - searchBar.height;
	scrollView.layout = 'vertical';
	scrollView.scrollType = 'vertical';
	scrollView.backgroundColor = '#c9cbcd';
	// Create a TextField.
	var fontSize = calculationRatio_Height(20);
	var aTextField = Ti.UI.createTextField({
		height : calculationRatio_Height(45),
		left : calculationRatio_Width(66),
		width : calculationRatio_Width(550),
		hintText : 'Search users',
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
		color:'black',
		//bottom:0,
		//backgroundColor : 'red',
		//verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		//backgroundColor:'red'
	});

	// Listen for return events.
	aTextField.addEventListener('return', function(e) {
		aTextField.blur();
		searchUsers(aTextField.value, scrollView);
	});
	// Add to the parent view.
	searchBar.add(aTextField);
	// Add to the parent view.
	bodyView.add(searchBar);
	bodyView.add(scrollView);
	return bodyView;
}

module.exports = SearchView;
////////////////////////////////////////////
function searchUsers(searchPattern, scrollView) {
	scrollView.removeAllChildren();
	Cloud.Users.search({
		q : searchPattern
	}, function(e) {
		if (e.success) {
			alert('Success:\n' + 'Count: ' + e.users.length);
			for (var i = 0; i < e.users.length; i++) {
				var user = e.users[i];
				//alert('id: ' + user.id + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
				var row = createUserRow(user);
				scrollView.add(row);
			}
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function createUserRow(user) {
	var parentView = Ti.UI.createView();
	parentView.height = calculationRatio_Height(190);
	parentView.width = PetsKey.UI.TotalWidth;
	parentView.layout = "horizontal";
	parentView.backgroundImage = "/images/searchView/resultBG.png";
	//......................................
	var userPhoto = "";
	//user.photo.urls.square_75;
	var imageSize = calculationRatio_Height(146);
	var topmargin = calculationRatio_Height(20);
	var leftmargin = calculationRatio_Height(29);

	// Create an ImageView.
	var userImg = Ti.UI.createImageView({
		defaultImage : '/images/noImage.png',
		left : topmargin,
		height : imageSize,
		width : imageSize,
		top : topmargin,
		left : leftmargin,
	});
	if (user.photo != undefined)
		userImg.image = user.photo.urls.small_240;
	// Add to the parent view.
	parentView.add(userImg);
	//......................................
	var lblView = Ti.UI.createView();
	lblView.layout = "vertical";
	lblView.width = calculationRatio_Width(350);
	lblView.height = imageSize;
	lblView.top = topmargin;
	lblView.left = topmargin;
	parentView.add(lblView);
	//......................................
	var lblUserName = Ti.UI.createLabel();
	lblUserName.text = "user name: " + user.username;
	lblView.add(lblUserName);

	var lblRealName = Ti.UI.createLabel();
	lblRealName.text = user.first_name + " " + user.last_name;
	lblView.add(lblRealName);
	return parentView;

}

