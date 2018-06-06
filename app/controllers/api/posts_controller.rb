class Api::PostsController < ApplicationController

  def index
    #we generally want the current user always in our state
    #remember that without the below, the users slice of state will be
    #replaced by only all the followed users of current_user
    @current_user = current_user
    if (params[:type] == "index") #home feed
      #nested includes takes care of all potential N+1 queries
      @followed_users = current_user.followed_people
      @posts = Post.where(user_id: @followed_users).includes(:user, :likes, {comments: :user}).order(created_at: :desc).page(params[:page])
      @page_offset = (params[:page].to_i-1)*5 #5 is the default posts per page
      render :index
    elsif (params[:type] == "user") #user show
      @user = User.find(params[:id])
      if @user
        @posts = @user.posts.includes(:likes, {comments: :user})
        render :indexShow
      else
        render json: ['Cannot find user with that ID'], status: 422
      end
    elsif (params[:type] == "explore") #explore page
      @posts = Post.order(created_at: :desc).includes(:user, :likes, {comments: :user}).page(params[:page]).per(12)
      @page_offset = (params[:page].to_i-1)*12 #12 is the posts per explore page
      render :explore
    else
      render json: ['Invalid request type'], status: 422
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

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(update_params)
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    if @post
      @post.destroy
      render :show
    else
      render json: ['Error destroying the post'], status: 422
    end
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

  def update_params
    params.require(:post).permit(:body)
  end


end
