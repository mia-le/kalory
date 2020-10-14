class AddNumberOfCorrectAnswersToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :number_of_correct_answers, :integer
  end
end
