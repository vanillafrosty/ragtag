class Api::PostsController < ApplicationController

  def index
    @posts = current_user.posts
    render :index
  end

  def create
    debugger
    @post = current_user.posts.new(post_params)
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def show
  end

  private
  def post_params
    params.require(:post).permit(:body, :image)
  end


end
