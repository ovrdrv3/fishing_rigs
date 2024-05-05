# frozen_string_literal: true

Rails.application.routes.draw do
  root 'rigs#index'

  devise_for :users
  resources :hooks
  get 'hello_world', to: 'hello_world#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  resources :rigs, only: %i(index edit new create show update)
  resources :suggestions, only: %i(index new show edit)
  resources :fishing_components, only: %i(index new create)
  get :fishing_components_json, to: 'fishing_components#json'
end
