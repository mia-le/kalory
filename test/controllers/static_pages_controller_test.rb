require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  
  test "should get home" do
    get root_path
    assert_response :success
    assert_select "title", "Home"
  end

  test "should get help" do
    get help_path
    assert_response :success
    assert_select "title", "Help"
  end
  
  test "should get about" do
    get about_path
    assert_response :success
    assert_select "title", "About"
  end
  
  test "should get contact" do
    get contact_path
    assert_response :success
    assert_select "title", "Contact"
  end
  
  test "should get roll" do
    get roll_path
    assert_response :success
    assert_select "title", "Roll a Dice"
  end
  
  test "should get new" do
    get signup_path
    assert_response :success
    assert_select "title", "Sign up"
  end
  
  test "dice results are integers" do
    get roll_path
    assert_response :success
    assert_not_nil @controller.view_assigns['dice1_result']
    assert_not_nil @controller.view_assigns['dice2_result']
    assert_instance_of Integer, @controller.view_assigns['dice1_result']
    assert_instance_of Integer, @controller.view_assigns['dice2_result']
end
  
end
