json.posts do
  @posts.each do |post|
    json.set! post.id do
      json.extract! post, :id, :body, :user_id
      json.img_url asset_path(post.image.url)
      json.likes post.likes.map{ |like| like.user_id }
    end
  end
end


json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
