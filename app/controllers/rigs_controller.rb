# frozen_string_literal: true

class RigsController < ApplicationController
  def index
    @recent_activity = FishingComponent.recent_activity
  end

  def new; end

  def create
    @rig = Rig.new(rig_params)

    return render json: { id: @rig.id }, status: :created if @rig.save

    @errors = @rig.errors if @rig.errors.any?
    render :new, status: :unprocessable_entity
  end

  private

  def rig_params
    params.permit(:name, component_ids: [])
  end
end
