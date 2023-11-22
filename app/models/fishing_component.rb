class FishingComponent < ApplicationRecord
    belongs_to :part, polymorphic: true
end