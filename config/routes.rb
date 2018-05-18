Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update] do
      get '/follows' => 'users#follows'
      post '/follows' => 'users#createFollow'
      delete '/follows' => 'users#destroyFollow'
    end
    get '/search' => 'users#search'
    resource :sessions, only: [:create, :destroy]
    resources :posts do
      get '/likes' => 'posts#likes'
      post '/likes' => 'posts#createLike'
      delete '/likes' => 'posts#destroyLike'
      get '/comments' => 'comments#index'
      post '/comments' => 'comments#create'
    end
    resources :comments, only: :destroy
  end

end
