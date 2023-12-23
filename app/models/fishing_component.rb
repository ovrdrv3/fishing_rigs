# frozen_string_literal: true

class FishingComponent < ApplicationRecord
  belongs_to :part, polymorphic: true

  def self.recent_activity(limit = 10)
    order(created_at: :desc).limit(limit).map do |component|
      {
        id: component.id,
        name: component.part.name,
        created_at: component.human_readable_created_at
      }
    end
  end

  def human_readable_created_at
    "created #{ActionController::Base.helpers.time_ago_in_words(created_at)} ago"
  end
end
