# frozen_string_literal: true

class RigsController < ApplicationController
  def index
    @recent_activity = FishingComponent.recent_activity
  end

  def new; end
end
