class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :body
      t.integer :user_id, null: false
      t.string :img_url, null: false

      t.timestamps
    end

    add_index :posts, :user_id
  end
end
