class AddTotalScoreToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :total_score, :integer
  end
end
