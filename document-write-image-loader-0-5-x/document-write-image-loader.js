var ImageLoader_0_5_x = function() {};

ImageLoader_0_5_x.prototype.version_number = function() {
    return "0.5.0";
};

ImageLoader_0_5_x.prototype.image_string_from_params = function(params) {
    console.log(params);
    var _width = 640;  // TODO: make a function to build this.
    var _height = 436; // TODO: make a function to build this.
    var _stub_render_width = 1280; // TODO: make a function to build this.
    var _stub_render_height = 852;  // TODO: make a function to build this.
    var output_string = '<img alt="' + params['alt_text'] + '" width="' + _width + '" height="' +  _height + '" src="http://res.cloudinary.com/demo/image/upload/w_' + _stub_render_width + ',h_' + _stub_render_height + '/' + params['filename'] + '">';
    return output_string;
};

ImageLoader_0_5_x.prototype.set_url_template= function() {

};


/**********************************************************\
 * NOTE
 *
 * The functions below are deprecated and no longer tested
 * they will be removed when this refactor is complete.
 *
\**********************************************************/


// ImageLoader_0_5_x.prototype.set_url_template= function() {
//     // TODO: Take in a parameter and set the instance variable
//     //       `_url_template` so that it can be set one time
//     //       and isn't required for every call.
// }


// ImageLoader_0_5_x.prototype.load_environment = function() {
//     // TODO: Setup an initilization type call the 
//     //       pulls in and the environmental parameters 
//     //       from the browser a single time so they can
//     //       be used across multiple uses.
// };


// TODO: Delete this funciton and move its contents into `load_environment`
ImageLoader_0_5_x.prototype.load_environmental_params = function() {
    this._dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
};

ImageLoader_0_5_x.prototype.url_to_call = function() {
	return this._url_template.replace('[WIDTH]', this.url_request_width()).replace('[HEIGHT]', this.url_request_height()).replace('[QUALITY]', this._quality).replace('[IMAGE_NAME]', this._image_name) 
};

ImageLoader_0_5_x.prototype.img_tag = function() {
	return '<img src="' + this.url_to_call() + '" width="' + this.render_width() + '" height="' + this.render_height() + '">'
};

ImageLoader_0_5_x.prototype.load_params = function(params) {
	// This is the core funciton that takes all possible inputs.
	// Convience methods will be used in production, but they will all communicate
	// load_params. 

  // Required
  this._image_name = params["image_name"];
  this._viewport_height = params["viewport_height"];
  this._viewport_width = params["viewport_width"];
  this._raw_height = params["raw_height"];
  this._raw_width = params["raw_width"];
  this._url_template = params["url_template"];

  // Optional 
  this._dpr = params["dpr"] ? params["dpr"] : 1;
  this._max_render_width = params["max_render_width"] ? params["max_render_width"] : params["raw_width"];
  this._percent_of_viewport_width = params["percent_of_viewport_width"] ? params["percent_of_viewport_width"] : 100;
  this._quality = params["quality"] ? params["quality"] : 80;
  
  // If `percent_of_viewport_height` is called, translate it into `_percent_of_viewport_width`.
  if("percent_of_viewport_height" in params) {
    this._percent_of_viewport_width = Math.floor(this._viewport_height * params["percent_of_viewport_height"] * this._raw_width / this._raw_height / this._viewport_width);
  }
  
};

ImageLoader_0_5_x.prototype.render_height = function() {
	return  Math.floor(this._raw_height * this.render_width() / this._raw_width );
};

ImageLoader_0_5_x.prototype.render_width = function() {
	return Math.floor(Math.min(this._max_render_width, (this._percent_of_viewport_width * .01 * this._viewport_width)));
};

ImageLoader_0_5_x.prototype.url_request_height = function() {
  return this.render_height() * this._dpr; 
};

ImageLoader_0_5_x.prototype.url_request_width = function() {
  return this.render_width() * this._dpr; 
};


