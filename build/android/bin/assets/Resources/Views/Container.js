function Container() {
	var mainWin = Ti.UI.createWindow({
		exitOnClose : true,
		fullscreen : true,
		navBarHidden : true,
		backgroundColor : true,
	});

	var bodyView = Titanium.UI.createView({
		backgroundColor : '#FFF',
		top : PetsKey.UI.headerHeight,
		height : Ti.UI.FILL
	});
	bodyView.height = viewHeight;
	mainWin.add(bodyView);
	//..............................
	mainWin.headerBar = createHeaderView();
	mainWin.headerBar.setTitle("PetsKey");
	mainWin.headerBar.top = 0;
	mainWin.add(mainWin.headerBar);
	//..............................
	//..............................
	mainWin.footerBar = createFooterBar("btn01");
	mainWin.add(mainWin.footerBar);	
	//..............................
	appContainer = bodyView;
	Ti.App.SetTitle = function SetTitle(myTitle) {
		mainWin.headerBar.setTitle(myTitle);
	};
	//..............................

	return mainWin;
}

module.exports = Container;
