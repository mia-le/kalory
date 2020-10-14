class UsersController < ApplicationController
  def new
    @user = User.new
  end
  
  def show
     @user = User.find(params[:id])
     
     @percentage_score = 0;
     @percentage_correct = 0;
     
     if (@user.number_of_plays > 0)
      @percentage_score = (@user.total_score.to_f / (@user.number_of_plays * 100)).round(2);
      @percentage_correct = ((@user.number_of_correct_answers.to_f / @user.number_of_plays) * 100).round(2);
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      reset_session
      log_in @user
      flash[:success] = "Welcome to the Calories Guessing!"
      redirect_to @user
    else
      render 'new'
    end
  end
  
  def score_reset
    # if not logged in, show error message as JSON
    if (current_user == nil)
      render :json  => {
        "success" => false,
        "error" => "Please login to submit the score"
      }
      return;
    end
    
    current_user.number_of_plays = 0;
    current_user.high_score = 0;
    current_user.total_score = 0;
    current_user.number_of_correct_answers = 0;
    
    # save it up
    user_was_saved = current_user.save()
    
    if (user_was_saved)
      render :json => {
        "success" => true
      }
    else
      render :json => {
        "success" => false,
        "error" => current_user.errors
      }
    end
  end
  
  # updating scores
  def score_update
    # if not logged in, show error message as JSON
    if (current_user == nil)
      render :json  => {
        "success" => false,
        "error" => "Please login to submit the score"
      }
      return;
    end
    
    # get score of this round from params
    this_round = "#{params[:score]}".to_i()
    this_round ||= 0
    
    # set user data to zero if undefined or nil
    if (current_user.number_of_plays.nil?)
        current_user.number_of_plays = 0;
    end
    
    if (current_user.high_score.nil?)
        current_user.high_score = 0;
    end
    
    if (current_user.total_score.nil?)
        current_user.total_score = 0;
    end
    
    if (current_user.number_of_correct_answers.nil?)
        current_user.number_of_correct_answers = 0;
    end
    
    # played one more game
    current_user.number_of_plays += 1;
    # answer is correct if we have some kind of score
    current_user.number_of_correct_answers += ((this_round == 0) ? 0 : 1);
    # add to the total score
    current_user.total_score += this_round;
    #compare high score
    if (current_user.high_score < this_round)
      current_user.high_score = this_round;
    end
    
    # save it up
    user_was_saved = current_user.save()
    
    if (user_was_saved)
      render :json => {
        "success" => true
      }
    else
      render :json => {
        "success" => false,
        "error" => current_user.errors
      }
    end
  end
  
  private
    def user_params
      params.require(:user).permit(:name, :email, :password,
      :password_confirmation)
    end

end
