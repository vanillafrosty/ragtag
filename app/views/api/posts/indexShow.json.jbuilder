comments_arr = []

json.posts do
  @posts.each_with_index do |post, ind|
    json.set! post.id do
      json.extract! post, :id, :body, :user_id
      json.img_url asset_path(post.image.url)
      json.likes post.likes.map{ |like| like.user_id }
      json.comments post.comments.pluck(:id)
      json.order ind+@page_offset
      comments_arr.concat(post.comments)
    end
  end
end

json.users do
  json.set! @user.id do
    json.partial! 'api/users/user', user: @user
    json.follows @user.followers.pluck(:id)
    json.bio @user.bio
  end
  comments_arr.each do |comment|
    json.set! comment.user.id do
      json.partial! 'api/users/user', user: comment.user
    end
  end
  json.set! @current_user.id do
    json.partial! 'api/users/user', user: @current_user
    json.follows @user.followers.pluck(:id)
    json.bio @user.bio
  end
end

json.comments do
  comments_arr.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :post_id, :user_id
    end
  end
end
