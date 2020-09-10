class StaticPagesController < ApplicationController
  def home
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
  
  def roll
    @dice1_result = (1..6).to_a.shuffle.first
    @dice2_result = (1..6).to_a.shuffle.first
  end
end
