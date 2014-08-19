function ExploreView() {
	var headerBar = Ti.UI.createView({
		top: 0,
		height:PetsKey.UI.headerHeight
	});
	var containerView = Ti.UI.createView({
		height:Ti.UI.SIZE,
		top: 0,
	});
	var bodyView = Titanium.UI.createView({
		backgroundColor : '#FFF',
		top : PetsKey.UI.headerHeight,
		height : Ti.UI.FILL,
		name : 'explore',
	});
	bodyView.height = viewHeight;
	
	containerView.add(headerBar);
	containerView.add(bodyView);
	containerView.headerBar = headerBar;
	//..............................
	var imagesview = Ti.UI.createScrollView({
		height : 'auto',
		contentWidth : '100%',
		contentHeight : viewHeight,
		showVerticalScrollIndicator : true,
		layout : 'horizontal',
	});
	imagesview.contentHeight = viewHeight;
	bodyView.add(imagesview);
	bodyView.imagesview = imagesview;
	//..............................
	containerView.refreshBtn = Ti.UI.createButton();
	containerView.refreshBtn.backgroundImage = '/images/refreshBtn.png';
	//mainWin.refreshBtn.title = "R";
	containerView.refreshBtn.right = calculationRatio_Width(8);
	//mainWin.refreshBtn.top = calculationRatio_Width(8);
	containerView.refreshBtn.width = calculationRatio_Width(48);
	containerView.refreshBtn.height = calculationRatio_Height(48);
	containerView.headerBar.add(containerView.refreshBtn);
	containerView.refreshBtn.visible = false;
	containerView.refreshBtn.addEventListener('click', function() {
		LoadImages(containerView,imagesview);
	});
	//..............................
	LoadImages(containerView,imagesview);
	
	return containerView;
}

function LoadImages(mainWin,imagesview) {
	var navActInd = Titanium.UI.createActivityIndicator({
		right : calculationRatio_Width(16),
		style : Ti.UI.ActivityIndicatorStyle.PLAIN,
	});
	var headerBar = mainWin.headerBar;
	headerBar.add(navActInd);
	mainWin.refreshBtn.visible = false;
	navActInd.show();
	//..................................................
	imagesview.removeAllChildren();
	Ti.include('/Cloud/Photo.js');
	GetPhotos(DrawImagesDetailsOnSuccess, 1);
	//..................................................
	function DrawImagesDetailsOnSuccess(e) {
		if (e.success) {
			Ti.API.info('Success:\n' + 'Count: ' + e.photos.length);
			var pdetails = require('Photo_SingleView');
			for (var i = 0; i < e.photos.length; i++) {
				var photo = e.photos[i];
				imagesview.add(new pdetails(photo));
			}
		} else {
			createToast("Error while loading images ... Please try again later");
		}
		navActInd.hide();
		mainWin.refreshBtn.visible = true;
	}

}

module.exports = ExploreView;
