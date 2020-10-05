Rails.application.routes.draw do
root 'static_pages#home'
get '/help', to: 'static_pages#help'
get '/about', to: 'static_pages#about'
get '/contact', to: 'static_pages#contact'
get '/roll', to: 'static_pages#roll'
get '/signup', to: 'users#new'
get '/guess', to: 'guess_pages#guess'

resources :users
end
