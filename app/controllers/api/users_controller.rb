class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def createFollow
    user = User.find(params[:user_id])
    @follow = user.led_follows.new(follower_id: current_user.id)
    if @follow.save
      render '/api/follows/show'
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroyFollow
    user = User.find(params[:user_id])
    @follow = user.led_follows.where(follower_id: current_user.id)
    @follow = @follow.destroy_all.first
    if @follow != nil
      render '/api/follows/show'
    else
      render json: ['Error when unfollowing user'], status: 422
    end
  end


  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

end
