json.partial! 'api/users/user', user: @user
json.follows @user.followers.map{ |follower| follower.id }
json.bio @user.bio
