class Api::CommentsController < ApplicationController

  def index
    post = Post.find(params[:post_id])
    if post
      @comments = post.comments.includes(:user)
      #force send post's user and current session user otherwise we may not necessarily
      #have them (it's not guaranteed the post's user/session user have commented on the post)
      #we need the post's user to render the post show modal and we need current user to render
      #profile info 
      @post_user = post.user
      @current_user = current_user
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
        render json: @comment.errors.full_messages, status: 422
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
