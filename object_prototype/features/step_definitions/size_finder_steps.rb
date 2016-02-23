Given(/^SizeFinder - Viewport: (\d+)x(\d+) \- DPR: (\d+) \- Source: (\d+)x(\d+)$/) do |view_width, view_height, dpr, source_width, source_height|
  @sf= SizeFinder.new_with(
    window_inner_width: view_width.to_i, 
    window_inner_height: view_height.to_i, 
    device_pixel_ratio: dpr.to_i,
    source_width: source_width.to_i,
    source_height: source_height.to_i
  )
end

When(/^the window size is (\d+)x(\d+)$/) do |width, height|
  @sf.window_inner_width = width
  @sf.window_inner_height = height
end

Then(/^the window_inner_height should be (\d+)$/) do |height|
  expect(@sf.window_inner_height).to eq(height.to_i)
end

Then(/^the window_inner_width should be (\d+)$/) do |width|
  expect(@sf.window_inner_width).to eq(width.to_i)
end

Then(/^the request width returned by '(.*?)' should be (\d+)px$/) do |style, pixels|
  expect(@sf.request_width_for_style style).to eq(pixels.to_i)
end
