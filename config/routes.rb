Rails.application.routes.draw do

  root 'static_pages#home'
  get '/help', to: 'static_pages#help'
  get '/about', to: 'static_pages#about'
  get '/contact', to: 'static_pages#contact'
  get '/roll', to: 'static_pages#roll'
  
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get 'sessions/new'
  
  
  post '/updateScore', to: 'users#score_update'
  post '/resetScore', to: 'users#score_reset'

  get '/guess', to: 'guess#guess'
  resources :users
end
