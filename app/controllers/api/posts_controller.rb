class Api::PostsController < ApplicationController

  def index
    @posts = current_user.posts
    render :index
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
    @post = Post.find(params[:post_id])
    @like = @post.likes.new(user_id: current_user.id)
    if @like.save
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroyLike
    @post = Post.find(params[:post_id])
    @like = @post.likes.where(user_id: current_user.id)
    if @like.destroy_all
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  private
  def post_params
    params.require(:post).permit(:body, :image)
  end


end
