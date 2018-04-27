Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root to: "pages#home"
  namespace :api, defaults: { format: :json } do
    get 'quotes/:id', to: 'quotes#show'

    post 'quotes/new', to: 'quotes#new'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
