////////////////////////////////////////////////////////////////////////////////

QUnit.test("Ensure local variabes are set properly", function(assert) {
	
	//////////
	// Give

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ { minViewportWidth: 0, maxImageDisplayWidth: 800, quality: 85 } ] } } });


  //////////
  // Then

  assert.equal(ip._innerWidth, window.innerWidth);
  assert.equal(ip._innerHeight, window.innerHeight);

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("2x high-res image call", function(assert) {

  //////////
  // Given

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ { minViewportWidth: 0, maxImageDisplayWidth: 800, quality: 85 } ] } } });
  
  
  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag."); 

  // Verify config details are ingested.
  assert.equal(ip._alt, "some horses", "_alt");
  assert.equal(ip._image, "horses.jpg", "_image");
  assert.equal(ip._maxHeight, 1000, "_maxHeight");
  assert.equal(ip._maxWidth, 1600, "_maxWidth");
  assert.equal(ip._devicePixelRatio, 2, "_devidePixelRatio");
  assert.equal(ip._style, "main", "_style");
  
  // TODO: Figure out how to move this out so it's called dynamically.
  assert.equal(ip._config.styles['main']['breakPoints'][0]['maxImageDisplayWidth'], 800, "maxImageDisplayWidth");

  // Method verification 
  assert.equal(ip.callHeight(), 1000, "callHeight()");
  assert.equal(ip.callWidth(), 1600, "callWidth()");
  assert.equal(ip.displayHeight(), 500, "displayHeight()");
  assert.equal(ip.displayWidth(), 800, "displayWidth()");
  assert.equal(ip.url(),'http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg', "url()"); 
  assert.equal(ip.quality(), 85, "quality()");
  assert.equal(ip.ratio(), 0.625, "ratio()");

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Verify window.devicePixelRatio is pulled in", function(assert) {

	// The other tests force an override to ensure the math works regardless of 
	// the browser being tested. This one just makes sure the data is loaded 
	// normally. 
  
  ///////////
  // Given

  var ip = new ImgTagBuilder({});

  //////////
  // Then

  assert.equal(ip._devicePixelRatio, window.devicePixelRatio, "_devicePixelRatio");

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Pick the larger of two config options (in decending order) based on innerWidth", function(assert) {

  //////////
  // Given

  var breakAlpha = { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 };
  var breakBravo = { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 };

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ breakAlpha, breakBravo ] } } });


  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag"); 

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Pick the smaller of two config options (in decending order) based on innerWidth", function(assert) {

  //////////
  // Given

  var breakAlpha = { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 };
  var breakBravo = { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 };

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ breakAlpha, breakBravo ] } } });
  

  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 700; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="400" height="250" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_800,h_500/horses.jpg">', "Target `img` tag"); 

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Make sure order of breakpoints in config doesn't matter", function(assert) {

  //////////
  // Given

  var breakAlpha = { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 };
  var breakBravo = { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 };

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ breakBravo, breakAlpha] } } });


  //////////
  // When

  ip._devicePixelRatio = 2; // Force to '2' so testing works across devices.
  ip._innerWidth = 1000; // Force for testing regardless of device. 

  ip.prep({ image: "horses.jpg", alt: "some horses",  style: "main", maxWidth: 1600, maxHeight: 1000 });


  //////////
  // Then

  // This is the key requirement. Everything else supports it.
  assert.equal(ip.imgTag(),'<img alt="some horses" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/horses.jpg">', "Target `img` tag"); 

});


////////////////////////////////////////////////////////////////////////////////

QUnit.test("Run lots of variaitions for QA", function(assert) {

  //////////
  // Given

  var ip = new ImgTagBuilder( { 
    styles: { 
      main: { 
        breakPoints: [ 
          // These are intentionally out of order to make sure sorting works properly.
          { minViewportWidth: 900, maxImageDisplayWidth: 800, quality: 85 },
          { minViewportWidth: 0, maxImageDisplayWidth: 400, quality: 85 },
          { minViewportWidth: 700, maxImageDisplayWidth: 600, quality: 85 },
        ] 
      } 
    } 
  }); 

  var testSets = [
    {
    	description: "Basline test",
      _devicePixelRatio: 2,
      _innerWidth: 1024,
      prepImage: "horses.jpg",
      prepAlt: "some horses",
      prepStyle: "main",
      prepMaxWidth: 1600,
      prepMaxHeight: 1000,
      finalAttWidth: 800,
      finalAttHeight: 500,
      finalUrlQuality: 85,
      finalUrlWidth: 1600,
      finalUrlHeight: 1000,
    }

  ];


  //////////
  // When

  for (var testIndex = 0, lastIndex = testSets.length; testIndex < lastIndex; testIndex = testIndex +1) {
  	var testData = testSets[testIndex];
    ip._devicePixelRatio = testData._devicePixelRatio;
    ip._innerWidth = testData._innerWidth; 
    ip.prep({ image: testData.prepImage, alt: testData.prepAlt,  style: testData.prepStyle, maxWidth: testData.prepMaxWidth, maxHeight: testData.prepMaxHeight });
 
 
    //////////
    // Then

    var imageString  = '<img alt="prepAlt" class="prepStyle" ';
        imageString += 'width="finalAttWidth" height="finalAttHeight" ';
        imageString += 'src="http://res.cloudinary.com/demo/image/upload/c_fill,q_finalUrlQuality,w_finalUrlWidth,h_finalUrlHeight/prepImage">';  

        imageString = imageString.replace(/prepAlt/, testData.prepAlt);
        imageString = imageString.replace(/prepStyle/, testData.prepStyle);
        imageString = imageString.replace(/prepImage/, testData.prepImage);
        imageString = imageString.replace(/finalAttWidth/, testData.finalAttWidth);
        imageString = imageString.replace(/finalAttHeight/, testData.finalAttHeight);
        imageString = imageString.replace(/finalUrlQuality/, testData.finalUrlQuality);
        imageString = imageString.replace(/finalUrlWidth/, testData.finalUrlWidth);
        imageString = imageString.replace(/finalUrlHeight/, testData.finalUrlHeight);

    assert.equal(ip.imgTag(), imageString, testData.description); 

  }

});

