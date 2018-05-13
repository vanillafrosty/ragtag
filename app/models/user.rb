class User < ApplicationRecord

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}

  has_attached_file :avatar, default_url: "navy.jpeg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  has_many :posts,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :Post


  attr_reader :password

  before_validation :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end


end
