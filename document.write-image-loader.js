var ImageLoader = function() {

};

ImageLoader.prototype.url_to_call = function() {
	return this._url_template.replace('[WIDTH]', this.url_request_width()).replace('[HEIGHT]', this.url_request_height()).replace('[QUALITY]', this._quality).replace('[IMAGE_NAME]', this._image_name) 
};

ImageLoader.prototype.img_tag = function() {
	return '<img src="' + this.url_to_call() + '" width="' + this.render_width() + '" height="' + this.render_height() + '">'
};

ImageLoader.prototype.load_params = function(params) {
	// This is the core funciton that takes all possible inputs.
	// Convience methods will be used in production, but they will all communicate
	// load_params. 

  this._dpr = params["dpr"] ? params["dpr"] : 1;
  this._image_name = params["image_name"];
  this._viewport_height = params["viewport_height"];
  this._viewport_width = params["viewport_width"];
  this._max_render_width = params["max_render_width"] ? params["max_render_width"] : params["raw_width"];
  this._percent_of_viewport_width = params["percent_of_viewport_width"];
  this._quality = params["quality"];
  this._raw_height = params["raw_height"];
  this._raw_width = params["raw_width"];
  this._url_template = params["url_template"];
};

ImageLoader.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
};

ImageLoader.prototype.render_width = function() {
	return Math.min(this._max_render_width, (this._percent_of_viewport_width * .01 * this._viewport_width)  )
};

ImageLoader.prototype.url_request_height = function() {
  return this.render_height() * this._dpr; 
};

ImageLoader.prototype.url_request_width = function() {
  return this.render_width() * this._dpr; 
};


