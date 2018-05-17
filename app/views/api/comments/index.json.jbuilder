users_hash = {}

json.comments do
  @comments.each do |comment|
    users_hash[comment.user_id] = {id: comment.user.id, username: comment.user.username}
    json.set! comment.id do
      json.extract! comment, :id, :body, :user_id, :post_id
    end
  end
end


json.users do
  json.merge! users_hash
  json.set! @post_user.id do
    json.extract! @post_user, :id, :username
    json.avatar_url image_path(@post_user.avatar.url)
    json.follows @post_user.followers.pluck(:id)
  end
  json.set! @current_user.id do
    json.extract! @current_user, :id, :username
    json.avatar_url image_path(@current_user.avatar.url)
    #send up follows as well so that we don't break profile info when we close the modal
    json.follows @current_user.followers.map{ |follower| follower.id }
  end
end
