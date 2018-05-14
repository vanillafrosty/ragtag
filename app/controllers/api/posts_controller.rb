class Api::PostsController < ApplicationController

  def index
    #if we want the user's index (home feed), find the current user's
    #followed posts
    #if we are navigating to an arbitrary user's profile page...
    #params = { type: "index"/"user", id: "5" }
    if (params[:type] == "index")
      #nested includes takes care of all potential N+1 queries
      all_users = current_user.followed_people.includes(posts: :likes)
      @posts = [];
      @users = [];
      #we don't really need a nested array when sending @posts back up
      # to our json view...so we concat.
      #we don't want to return up a user if he/she has no posts, that's
      #unecessary data
      #ACTUALLY may want to remove the check for length...
      #if we want to render a number/list of people that current user
      #is following on the index sidebar. make it a todo
      all_users.each do |user|
        if user.posts.length > 0
          @posts.concat(user.posts)
          @users.push(user)
        end
      end
      #we need the current user when rendering the sidebar, so we do this.
      #remember that without the below, the users slice of state will be
      #replaced by only all the followed users of current_user
      @users.push(current_user)
      render :index
    elsif (params[:type] == "user")
      user = User.find(params[:id])
      if user
        @users = []
        @posts = user.posts.includes(:likes)
        render :index
      else
        render json: ['Cannot find user with that ID'], status: 422
      end
    end
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def show
  end

  def likes
  end

  def createLike
    post = Post.find(params[:post_id])
    @like = post.likes.new(user_id: current_user.id)
    if @like.save
      render '/api/likes/show'
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroyLike
    post = Post.find(params[:post_id])
    @like = post.likes.where(user_id: current_user.id)
    @like = @like.destroy_all.first
    if @like != nil
      render '/api/likes/show'
    else
      render json: ['Error when removing the like'], status: 422
    end
  end

  private
  def post_params
    params.require(:post).permit(:body, :image)
  end


end
