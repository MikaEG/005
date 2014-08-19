function GetPhotos(DrawImagesOnSuccess, pageIndex) {
	if (pageIndex == null || pageIndex == undefined)
		pageIndex = 1;
	Cloud.Photos.query({
		page : pageIndex,
		per_page : 100,
		order : '-created_at'
	}, DrawImagesOnSuccess);
}

