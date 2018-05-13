json.username user.username
json.id user.id
json.avatar_url image_path(user.avatar.url)
json.follows user.followers.map{ |follower| follower.id }
