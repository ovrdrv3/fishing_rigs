# frozen_string_literal: true

class FishingComponentsController < ApplicationController
  layout 'application'

  def new; end

  def create
    @part = fishing_components_params[:part]
    @new_part = @part.classify.constantize.new(fishing_components_params.without(:part))

    if @new_part.save
      redirect_to root_path
    else
      @errors = @new_part.errors if @new_part.errors.any?
      render :new, status: :unprocessable_entity
    end
  end

  def index
    @fishing_components = FishingComponent.all
  end

  private

  def fishing_components_params
    params.permit(:part, :name, :color, :weight, images: [])
  end
end
