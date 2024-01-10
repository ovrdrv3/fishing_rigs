# frozen_string_literal: true

class Rig < ApplicationRecord
  serialize :fishing_component_ids, coder: JSON

  def parts
    return [] unless fishing_component_ids.present?

    fishing_component_ids.map do |id|
      FishingComponent.find(id).part
    end
  end
end
