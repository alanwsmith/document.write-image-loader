var ImageLoader = function() {

}

ImageLoader.prototype.url_to_call = function() {
  return "http://res.cloudinary.com/demo/image/upload/w_" + this.url_request_width() + ",h_" + this.url_request_height() + "/horses.jpg"; 
};

ImageLoader.prototype.load_params = function(params) {
  console.log(params); 
  this._viewport_width = params["viewport_width"];
  this._percent_of_viewport = params["percent_of_viewport"];
  this._raw_height = params["original_height"];
  this._raw_width = params["original_width"];
};

ImageLoader.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
};

ImageLoader.prototype.render_width = function() {
  return this._percent_of_viewport * .01 * this._viewport_width;
};

ImageLoader.prototype.url_request_height = function() {
  return this.render_height(); 
};

ImageLoader.prototype.url_request_width = function() {
  return this.render_width(); 
};
