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

  def json
    @fishing_components = FishingComponent.all.map do |fishing_component|
      fishing_component.as_json.merge(name: fishing_component.part.name,
                                      images: fishing_component.part.images.map do |image|
                                                url_for(image)
                                              end)
    end
    render json: @fishing_components
  end

  private

  def fishing_components_params
    params.permit(:part, :name, :color, :weight, :size, images: [])
  end
end
