class SizeFinder

  attr_accessor :window_inner_width, :window_inner_height
  attr_accessor :styles

  def load_basic_tests
    @styles = {
    	"basic" => [
        {
        	break_point: 900,
        	image_width: 800
        },
        {
        	break_point: 500,
        	image_width: 400
        },
        {
        	break_point: 0,
        	image_width: 200
        }
    	]
    }
  end

  def request_width style
    @styles[style][0][:image_width]
  end

end

