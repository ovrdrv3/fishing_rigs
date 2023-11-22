class Bobber < ApplicationRecord
    has_one :fishing_component, as: :part
end
