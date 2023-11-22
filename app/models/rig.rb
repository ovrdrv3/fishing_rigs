class Rig < ApplicationRecord
    serialize :fishing_components_ids, JSON

    def parts
        fishing_components_ids.map do |id|
            FishingComponent.find(id).part
        end
    end
end
