class AddNumberOfPlaysToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :number_of_plays, :integer
  end
end
