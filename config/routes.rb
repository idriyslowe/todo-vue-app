Rails.application.routes.draw do
  namespace :v1 do
    get "/tasks" => "tasks#index"
    post "/tasks" => "tasks#create"
    get "/tasks/:id" => "tasks#show"
    patch "/tasks/:id" => "tasks#update"
    delete "/tasks/:id" => "tasks#destroy"
  end  
end
