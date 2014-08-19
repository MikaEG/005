/**
 * @author Mai
 */
function createFooterBar(SelectedButton) {
	var footerBar = createHeaderView();
	footerBar.bottom = 0;
	footerBar.top = viewHeight + PetsKey.UI.headerHeight;
	footerBar.backgroundColor = '#000';
	footerBar.backgroundGradient = null;
	footerBar.layout = 'horizontal';
	footerBar.setTitle("");
	footerBar.height = 'auto';
	footerBar.SelectedButton = SelectedButton;
	var btn01 = createFooterButton(footerBar, "btn01", SelectedButton);
	var btn02 = createFooterButton(footerBar, "btn02", SelectedButton);
	var btn03 = createFooterButton(footerBar, "btn03", SelectedButton);
	var btn04 = createFooterButton(footerBar, "btn04", SelectedButton);
	var btn05 = createFooterButton(footerBar, "btn05", SelectedButton);
	btn01.addEventListener('click', function() {
		OpenExploreWindow();
	});
	btn02.addEventListener('click', function() {
		OpenSearchWindow();
	});
	btn03.addEventListener('click', function() {
		OpenLoginWindow();
	});
	btn04.addEventListener('click', function() {
		OpenLostWindow();
	});
	btn05.addEventListener('click', function() {
		OpenSalesWindow();
	});
	footerBar.footerBtn_setActive = footerBtn_setActive;
	footerBar.btn01 = btn01;
	footerBar.btn02 = btn02;
	footerBar.btn03 = btn03;
	footerBar.btn04 = btn04;
	footerBar.btn05 = btn05;
	//..................................
	return footerBar;
};

function createFooterButton(footerBar, btnName, selectedName) {
	var isSelected = selectedName == btnName;
	var myWidth = (PetsKey.UI.TotalWidth / 5 - 1);
	var myHeight = PetsKey.UI.footerHeight;
	var imgPath = footerBtn_imgPath(btnName);
	var imgPath_Active = footerBtn_activeimgPath(btnName);
	// Create a Button.
	var btn = Ti.UI.createButton({
		title : ' ',
		height : myHeight,
		width : myWidth,
		backgroundImage : imgPath,
		backgroundFocusedImage : imgPath_Active,
		backgroundSelectedImage : imgPath_Active,
		top : 1,
		bottom : 2,
		left : 1,
		right : 0
	});
	footerBar.add(btn);
	//.................................
	if (btnName == 'btn01') {
		btn.left = 0;
		//btn.width = btn.width + 1;
	} else if (btnName == 'btn05') {
		btn.right = 0;
		btn.width = btn.width + 1;
	}
	btn.btnName = btnName;
	if (isSelected) {
		footerBtn_setActive(btn);
	};
	btn.addEventListener("click", footerBtn_setActive);

	return btn;
};

function footerBtn_imgPath(btnName) {
	return '/images/footerbar/' + btnName + '.png';
};
function footerBtn_activeimgPath(btnName) {
	return '/images/footerbar/' + btnName + '_active.png';
};
function footerBtn_setActive(e) {
	var btn = e.source;
	if (btn == null)
		btn = e;
	var btnName = btn.btnName;
	btn.isActive = true;
	//..... incase we are initializing the footerbar
	if (mainWindow != undefined && mainWindow.footerBar != undefined) {
		var FooterBar = mainWindow.footerBar;
		var currentItem = FooterBar.activeBtn;
		if (currentItem != null && currentItem != undefined && currentItem.btnName == btnName)
			return;
		footerBtn_settoInactive(currentItem);
		FooterBar.activeBtn = btn;
	}
	btn.backgroundImage = footerBtn_activeimgPath(btn.btnName);
	//btn.title = "SELECTED";
};

function footerBtn_settoInactive(btn) {
	if (btn == undefined || btn == null)
		return;
	btn.backgroundImage = footerBtn_imgPath(btn.btnName);
	btn.isActive = false;
//	btn.title = "";
};