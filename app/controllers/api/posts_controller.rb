class Api::PostsController < ApplicationController

  def index
    # @posts = Post.all
    @posts = current_user.posts
    render :index
  end

  def create

  end

  def show
  end


end
