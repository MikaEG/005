 function CustomButton() {
	var btn = Ti.UI.createButton({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : calculationRatio_Height(5),
		borderColor : '#9a4d84',
		color : '#FFF',
		width : '90%',
		height : 'auto',
		top: calculationRatio_Height(5),
		title : 'button text',
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '50%',
				y : '0'
			},
			endPoint : {
				x : '50%',
				y : '100%'
			},
			colors : [{
				color : '#bb5da1',
				offset : 0.0
			}, {
				color : '#803f6e',
				offset : 1.0
			}],
		},
	});

	btn.addEventListener('touchstart', changeBTN2pressed);
	btn.addEventListener('touchend', changeBTN2normal);
	return btn;

function changeBTN2pressed(e) {
	var button = e.source;
	button.backgroundGradient = {
		type : 'linear',
		startPoint : {
			x : '50%',
			y : '100%'
		},
		endPoint : {
			x : '50%',
			y : '0'
		},
		colors : [{
			color : '#bb5da1',
			offset : 0.0
		}, {
			color : '#803f6e',
			offset : 1.0
		}]
	};
}

function changeBTN2normal(e) {
	var button = e.source;
	button.backgroundGradient = {
		type : 'linear',
		startPoint : {
			x : '50%',
			y : '0'
		},
		endPoint : {
			x : '50%',
			y : '100%'
		},
		colors : [{
			color : '#bb5da1',
			offset : 0.0
		}, {
			color : '#803f6e',
			offset : 1.0
		}],
	};
}
};
module.exports = CustomButton;
