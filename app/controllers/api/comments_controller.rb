class Api::CommentsController < ApplicationController

  def index
    post = Post.find(params[:post_id])
    if post
      @comments = post.comments.includes(:user)
      render :index
    else
      render json: ['Error finding the post'], status: 422
    end
  end

  def create
    post = Post.find(params[:post_id])
    if post
      @comment = post.comments.new(comment_params)
      @comment.user_id = current_user.id
      if @comment.save
        render :show
      else
        render @comment.errors.full_messages, status: 422
      end
    else
      render json: ['Error finding the post'], status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment
      @comment.destroy
      render :show
    else
      render json: ['Error destroying the comment'], status: 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end


end
