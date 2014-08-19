function SalesView() {
	var bodyView = Titanium.UI.createView({
		backgroundColor : 'orange',
		top : PetsKey.UI.headerHeight,
		height : Ti.UI.FILL,
		name:'sales'
	});
	bodyView.height = viewHeight;
	
	return bodyView;
}
module.exports = SalesView; 