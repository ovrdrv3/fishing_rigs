# frozen_string_literal: true

class RigsController < ApplicationController
  def index
    @recent_activity = FishingComponent.recent_activity
    @rigs = Rig.all
  end

  def new; end

  def create
    @rig = Rig.new(rig_params)

    return render json: { id: @rig.id }, status: :created if @rig.save

    @errors = @rig.errors if @rig.errors.any?
    render :new, status: :unprocessable_entity
  end

  def show
    # TODO: This is a hack to get the images to show up in the view. I need to figure out how to get the images to show up in the view without this hack.
    ActiveStorage::Current.url_options = { host: 'localhost:3000' }
    @rig = Rig.find(params[:id])
  end

  def edit
    @rig = Rig.find(params[:id])
  end

  def update
    @rig = Rig.find(params[:id])

    if @rig.update(rig_params)
      render json: { id: @rig.id }, status: :ok
    else
      render json: { errors: @rig.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def rig_params
    params.require(:rig).permit(:name, fishing_component_ids: [])
  end
end
