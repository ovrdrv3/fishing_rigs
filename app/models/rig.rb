# frozen_string_literal: true

class Rig < ApplicationRecord
  serialize :fishing_component_ids, JSON

  def parts
    ids = JSON.parse(fishing_component_ids)
    ids.map do |id|
      FishingComponent.find(id).part
    end
  end
end
