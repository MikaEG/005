function LFView() {
	var bodyView = Titanium.UI.createView({
		backgroundColor : 'yellow',
		top : PetsKey.UI.headerHeight,
		height : Ti.UI.FILL,
		name:'lfview'
	});
	bodyView.height = viewHeight;
	
	return bodyView;
}
module.exports = LFView; 