class UsersController < ApplicationController
  def new
    user_list = User.all
    @users = user_list
  end

end
