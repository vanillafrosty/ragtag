json.posts do
  @posts.each do |post|
    json.set! post.id do
      json.extract! post, :id, :body, :user_id
      json.img_url asset_path(post.image.url)
      json.likes post.likes.map{ |like| like.user_id }
      json.comments post.comments.pluck(:id)
      # comments_arr.concat(post.comments)
    end
  end
end
