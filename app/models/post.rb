class Post < ApplicationRecord

  validates :user_id, presence: true
  validates :image, attachment_presence: true

  has_attached_file :image, default_url: "gray.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  belongs_to :user,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :User



end
