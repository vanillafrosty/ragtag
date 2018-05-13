json.extract! @post, :id, :body, :user_id
json.img_url asset_path(@post.image.url)
json.likes @post.likes.map{ |like| like.user_id }
