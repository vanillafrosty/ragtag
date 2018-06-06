comments_arr = []
# users_arr = []
# seen_users = {}

json.posts do
  @posts.each do |post|
    json.set! post.id do
      json.extract! post, :id, :body, :user_id
      json.img_url asset_path(post.image.url)
      json.likes post.likes.map{ |like| like.user_id }
      json.comments post.comments.pluck(:id)
      comments_arr.concat(post.comments)
      # if (!seen_users[post.user.id])
      #   users_arr.push(post.user)
      #   seen_users[post.user.id] = true
      # end
    end
  end
end


json.users do
  @followed_users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
  comments_arr.each do |comment|
    json.set! comment.user.id do
      json.partial! 'api/users/user', user: comment.user
    end
  end
  json.set! @current_user.id do
    json.partial! 'api/users/user', user: @current_user
    json.followedUsers @followed_users.pluck(:id)
  end
end


json.comments do
  comments_arr.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :post_id, :user_id
    end
  end
end
