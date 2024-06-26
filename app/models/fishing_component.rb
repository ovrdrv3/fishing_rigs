# frozen_string_literal: true

class FishingComponent < ApplicationRecord
  belongs_to :part, polymorphic: true

  def self.recent_activity(limit = 10)
    order(created_at: :desc).limit(limit).map do |component|
      {
        id: component.id,
        part_name: component.part.class.to_s,
        name: component.part.name,
        created_at: component.human_readable_created_at,
        first_image_url: component.part.images.first&.url
      }
    end
  end

  def human_readable_created_at
    "#{ActionController::Base.helpers.time_ago_in_words(created_at)} ago"
  end
end
