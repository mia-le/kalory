require 'test_helper'

class GuessPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get guess" do
    get guess_path
    assert_response :success
    assert_select "title", "Guess the Nutrition Facts"
  end
end
