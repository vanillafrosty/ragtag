class Follow < ApplicationRecord

  validates :follower_id, :followee_id, presence: true

  validates :follower_id, uniqueness: { scope: :followee_id }

  belongs_to :follower,
    foreign_key: :follower_id,
    primary_key: :id,
    class_name: :User

  belongs_to :followee,
    foreign_key: :followee_id,
    primary_key: :id,
    class_name: :User

end
