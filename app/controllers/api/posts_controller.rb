class Api::PostsController < ApplicationController

  def index
    #beef this up
    #if we want the user's index (home feed), find the current user's
    #followed posts
    #if we are navigating to an arbitrary user's profile page...
    #params = { type: "index"/"user", id: "5" }
    if (params[:type] == "index")
      #come back to nested includes later (for N+1 queries)
      # @posts = current_user.posts.includes(:likes)
      users = current_user.followed_people.includes(:posts)
      @posts = [];
      users.each{ |user| @posts.concat(user.posts)}
      #the above returns a 2D array, each array represents all the posts
      #for a given user
      #we don't really need a nested array when sending @posts back up
      # to our json view...so we concat. should work.
      render :index
    elsif (params[:type] == "user")
      user = User.find(params[:id])
      if user
        # @posts = current_user.posts.includes(:likes)
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
