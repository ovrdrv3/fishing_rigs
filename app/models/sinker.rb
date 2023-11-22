class Sinker < ApplicationRecord
    belongs_to :fishing_component, as: :part
end
