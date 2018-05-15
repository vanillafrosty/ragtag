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
end
