function ViewPetsWindow() {
	var imageWindow = Ti.UI.createWindow({
		exitOnClose : false,
		fullscreen : true,
		modal : true,
		navBarHidden : true,
		backgroundColor : '#FFF',
		layout : 'vertical'
	});

	// Create a TableView.
	var aTableView = Ti.UI.createTableView();
	// Populate the TableView data.
	var data = [{
		title : 'Row 1',
		hasChild : true,
		color : 'red',
		header : 'First'
	}, {
		title : 'Row 2',
		hasDetail : true,
		color : 'green'
	}, {
		title : 'Row 3',
		hasCheck : true,
		color : 'blue',
		header : 'Second'
	}, {
		title : 'Row 4',
		color : 'orange'
	}];
	aTableView.setData(data);

	// Listen for click events.
	aTableView.addEventListener('click', function(e) {
		alert('title: \'' + e.row.title + '\', section: \'' + e.section.headerTitle + '\', index: ' + e.index);
	});
	var header = createHeaderView();
	imageWindow.add(header);
	var newPets = Ti.UI.createButton();
	newPets.top = 0;
	newPets.right = calculationRatio_Width(2);
	newPets.backgroundImage = "/images/userprofile/newPetBtn.png";
	newPets.width = calculationRatio_Width(53);
	newPets.height = calculationRatio_Height(53);
	newPets.title = '';
	//newPets.backgroundGradient = header.backgroundGradient;
	header.add(newPets);
	newPets.addEventListener("click", function(e) {
		AddNewPetWindow();
	});
	imageWindow.add(aTableView);
	imageWindow.open();
}

function AddNewPetWindow() {
	Ti.include('/Views/CameraView.js');
	var CustomButton = require('CustomButton');
	var imageWindow = Ti.UI.createWindow({
		exitOnClose : false,
		fullscreen : true,
		modal : true,
		navBarHidden : true,
		backgroundColor : '#FFF',
		layout : 'vertical'
	});
	var header = createHeaderView();
	
	var backBtn = createBackButton(imageWindow);
	header.add(backBtn);
	imageWindow.add(header);
	//...................................
	var myView = Ti.UI.createScrollView({
		layout : 'vertical',
		height: Ti.UI.FILL
	});
	var photoSize = calculationRatio_Height(146);
	var margin = calculationRatio_Width(10);
	// Create an ImageView.
	var petImage = Ti.UI.createImageView({
		width : photoSize,
		height : photoSize,
		top : margin,
		defaultImage:'/images/VLogo.png',
	});
	petImage.addEventListener('load', function() {
		Ti.API.info('Image loaded!');
	});
	// Add to the parent view.
	myView.add(petImage);

	Ti.include('CameraView.js');
	var camBtnW = calculationRatio_Width(200);
	var camBtnH = calculationRatio_Height(146);
	var camBtn = new CustomButton();
	camBtn.height = camBtnH;
	camBtn.width = camBtnW;
	camBtn.title = 'SELECT';
	camBtn.color = '#FFF';
	camBtn.left= calculationRatio_Width(10);
	//camBtn.image='/images/userprofile/camerabtn_icon.png';
	camBtn.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
	camBtn.addEventListener("click", PetsKey.ShowCamera);
	myView.add(camBtn);
	//..............................................
	imageWindow.add(myView);
	// Create a TextField.
	var txtAutoComplete = Ti.UI.createTextField({
		height : 35,
		top : 10,
		left : 40,
		width : 240,
		hintText : 'This is hint text',
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	// Listen for return events.
	txtAutoComplete.addEventListener('return', function(e) {
		txtAutoComplete.blur();
		if (txtAutoComplete.value.length == 0) {
		}
	});

	// Add to the parent view.
	myView.add(txtAutoComplete);
	BuildAutoComplete(txtAutoComplete, imageWindow);
	imageWindow.open({
		activityEnterAnimation : Ti.Android.R.anim.fade_in,
		activityExitAnimation : Ti.Android.R.anim.fade_out
	});

}

function BuildAutoComplete(txtAutoComplete, imageWindow) {
	var searchArray = ["DOG", "CAT", "FISH", "TURTLE", "HAMESTER"];
	//Table view showing your autocomplete values
	var tblvAutoComplete = Ti.UI.createTableView({
		width : txtAutoComplete.width,
		backgroundColor : '#EFEFEF',
		height : 0,
		maxRowHeight : 35,
		minRowHeight : 35,
		allowSelection : true
	});
	imageWindow.add(tblvAutoComplete);
	//Starts auto complete
	txtAutoComplete.addEventListener('change', function(e) {
		var pattern = e.source.value;
		var tempArray = PatternMatch(searchArray, pattern);
		CreateAutoCompleteList(tempArray);
	});
	//You got the required value and you clicks the word
	tblvAutoComplete.addEventListener('click', function(e) {
		txtAutoComplete.value = e.rowData.result;
	});

	//Returns the array which contains a match with the pattern
	function PatternMatch(arrayToSearch, pattern) {
		var searchLen = pattern.length;
		arrayToSearch.sort();
		var tempArray = [];
		for (var index = 0, len = arrayToSearch.length; index < len; index++) {
			if (arrayToSearch[index].toUpperCase().indexOf(pattern.toUpperCase()) != -1) {
				tempArray.push(arrayToSearch[index]);
			}
		}
		return tempArray;
	}

	//setting the tableview values
	function CreateAutoCompleteList(searchResults) {
		var tableData = [];
		for (var index = 0, len = searchResults.length; index < len; index++) {

			var lblSearchResult = Ti.UI.createLabel({
				top : 2,
				width : '40%',
				height : 34,
				left : '5%',
				font : {
					fontSize : 14
				},
				color : '#000000',
				text : searchResults[index]
			});

			//Creating the table view row
			var row = Ti.UI.createTableViewRow({
				backgroundColor : 'transparent',
				focusable : true,
				height : 50,
				result : searchResults[index]
			});

			row.add(lblSearchResult);
			tableData.push(row);
		}
		tblvAutoComplete.setData(tableData);
		tblvAutoComplete.height = tableData.length * 35;
	}

}

function AddNewPet(myPet) {
	Cloud.Objects.create({
		classname : 'pets',
		fields : {
			name : myPet.name,
			isMale : myPet.isMale,
			birthDate : myPet.birthDate,
			type_id : myPet.type_id
		}
	}, function(e) {
		if (e.success) {
			var pet = e.pets[0];
			alert('Success:\n' + 'id: ' + pet.id + '\n' + 'make: ' + pet.name + '\n' + 'color: ' + pet.isMale + '\n' + 'year: ' + pet.birthDate + '\n' + 'created_at: ' + pet.created_at);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function GetAllPets(userID) {

}
