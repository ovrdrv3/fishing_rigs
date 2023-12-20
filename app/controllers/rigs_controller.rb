# frozen_string_literal: true

class RigsController < ApplicationController
  def index
    @hello_world_props = { name: 'Stranger' }
  end
end
