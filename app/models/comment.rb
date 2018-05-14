class Comment < ApplicationRecord

  validates :post_id, :user_id, :body, presence: true

  


end
