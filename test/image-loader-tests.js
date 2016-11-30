QUnit.test("2x DPR Basic call stright to load_params", function(assert) {

  // Given
	var imageLoader = new ImageLoader(); 

  // When
  imageLoader.load_params(
    {
    	dpr: 2,
    	image_name: "horses.jpg",
      percent_of_viewport_width: 50,
      quality: 80,
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Then - Verify instance variables.
  assert.equal(imageLoader._dpr, 2, "Device pixel resolution"); 
  assert.equal(imageLoader._image_name, "horses.jpg", "Image name"); 
  assert.equal(imageLoader._raw_height, 1067, "Raw image height"); 
  assert.equal(imageLoader._raw_width, 1600, "Raw image width");
  assert.equal(imageLoader._percent_of_viewport_width, 50, "Percent of viewport width"); 
  assert.equal(imageLoader._quality, 80, "Quality level");
  assert.equal(imageLoader._viewport_height, 680, "Viewport height");
  assert.equal(imageLoader._viewport_width, 1024, "Viewport width");
  assert.equal(imageLoader._url_template, "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]", "URL Template");

  // And - Verify functions
  assert.equal(imageLoader.url_to_call(), "http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg", "Final URL");
  assert.equal(imageLoader.render_height(), 341, "Render height");
  assert.equal(imageLoader.render_width(), 512, "Render width");
  assert.equal(imageLoader.url_request_height(), 682, "Request height");
  assert.equal(imageLoader.url_request_width(), 1024, "Request width");
  assert.equal(imageLoader.img_tag(), '<img src="http://res.cloudinary.com/demo/image/upload/w_1024,h_682,q_80/horses.jpg" width="512" height="341">', "Image tag");

});




/*
TODO:

- Make sure width is always returned as an integer. 
- Make sure height is always returned as an integer. 
- Make sure any half pixel results are truncated properly. 
- Add ability to restrict image so it's always fully visible (e.g. reduce if it would otherwise be too tall). 
- Add ability to restrict to max pixel size? (Could just use the raw_width for this, though, that's a bit of a hack)
- Maybe set default dpr to 1 if no value is avaialble.  
- Make sure to check odd width and height at different dprs. 
- Test 1.3 dpr. 
- Setup so return widths are always divisible by 10 to reduce number of possible iterations. 

*/
