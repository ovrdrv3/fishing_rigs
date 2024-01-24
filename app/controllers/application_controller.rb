# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action do
    # TODO: This is a hack to get the images to show up in the view. I need to figure out how to get the images to show up in the view without this hack.
    ActiveStorage::Current.url_options = { host: 'localhost:3000' }
    :authenticate_user!
  end
end
