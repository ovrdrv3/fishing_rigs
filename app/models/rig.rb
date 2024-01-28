# frozen_string_literal: true

class Rig < ApplicationRecord
  serialize :fishing_component_ids, coder: JSON
  validates :name, presence: true

  def parts
    return [] unless fishing_component_ids.present?

    # Preload all FishingComponent records in a single query
    components = FishingComponent.where(id: fishing_component_ids).includes(:part)

    # Map over the original fishing_component_ids to preserve order and duplicates
    fishing_component_ids.map do |id|
      component = components.find { |comp| comp.id == id }
      component&.part
    end
  end
end
