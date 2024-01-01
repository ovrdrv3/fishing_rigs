# frozen_string_literal: true

class FishingComponent < ApplicationRecord
  belongs_to :part, polymorphic: true

  def self.recent_activity(limit = 10)
    # TODO: This is a hack to get the images to show up in the view. I need to figure out how to get the images to show up in the view without this hack.
    ActiveStorage::Current.url_options = { host: 'localhost:3000' }
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
    "created #{ActionController::Base.helpers.time_ago_in_words(created_at)} ago"
  end
end
