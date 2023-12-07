# frozen_string_literal: true

class FishingComponent < ApplicationRecord
  belongs_to :part, polymorphic: true
end
