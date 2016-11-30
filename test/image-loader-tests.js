QUnit.test("1x DPR Basic call stright to load_params", function(assert) {

	var imageLoader = new ImageLoader(); 

  // Given 
  imageLoader.load_params(
    {
    	dpr: 1,
    	image_name: "horse.jpg",
      percent_of_viewport_width: 50,
      quality: 80,
      raw_height: 1067,
      raw_width: 1600,
      viewport_height: 680,
      viewport_width: 1024,
      url_template: "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]"
    }
  );

  // Verify instance variables.
  assert.equal(imageLoader._dpr, 1, "Device pixel resolution") 
  assert.equal(imageLoader._image_name, "horse.jpg"); 
  assert.equal(imageLoader._raw_height, 1067, "Raw image height") 
  assert.equal(imageLoader._raw_width, 1600, "Raw image width") 
  assert.equal(imageLoader._percent_of_viewport_width, 50, "Percent of viewport width") 
  assert.equal(imageLoader._quality, 80, "Quality level");
  assert.equal(imageLoader._viewport_height, 680, "Viewport height") 
  assert.equal(imageLoader._viewport_width, 1024, "Viewport width") 
  assert.equal(imageLoader._url_template, "http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT],q_[QUALITY]/[IMAGE_NAME]", "URL Template");


  // Verify functions
  assert.equal(imageLoader.url_to_call(), "http://res.cloudinary.com/demo/image/upload/w_512,h_341,q_80/horses.jpg", "Final URL");

  assert.equal(imageLoader.render_height(), 341, "Render height");

  assert.equal(imageLoader.render_width(), 512, "Render width");

  assert.equal(imageLoader.url_request_height(), 341, "Request height");

  assert.equal(imageLoader.url_request_width(), 512, "Request width");

});


