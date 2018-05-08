@posts.each do |post|
  json.set! post.id do
    json.extract! post, :id, :body, :user_id, :img_url
  end
end
