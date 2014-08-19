Ti.include("Constants.js");
Ti.include("Common.js");
Ti.include("FooterBar.js");
Ti.include("Cloud/Sharing.js");
var appContainer = null;
var viewStack = new Array();
//.............................
var mainWindow = new require('Views/Container')();
function applyBackButton() {
	if (viewStack.length > 1) {
		var old = null;
		var newViewName = null;
		do {
			old = viewStack.pop();
			newViewName = viewStack[viewStack.length - 1];
		} while(old==newViewName);
		//...............................................
		var newView = null;
		if (ExploreWin != null && ExploreWin.name == newViewName) {
			OpenExploreWindow();
		} else if (SearchWin != null && SearchWin.name == newViewName) {

			//FooterBar.btn02.title ="back";
			OpenSearchWindow();
		} else if (CurrentUserWin != null && CurrentUserWin.name == newViewName) {
			OpenLoginWindow();
		} else if (LostWin != null && LostWin.name == newViewName) {

			OpenLostWindow();
		} else if (SalesWin != null && SalesWin.name == newViewName) {

			OpenSalesWindow();
		}
	} else {
		mainWindow.close();
	}
}

//......................................
mainWindow.addEventListener('android:back', function() {
	applyBackButton();
});
mainWindow.open();
mainWindow.footerBar.btn01.fireEvent('click');

