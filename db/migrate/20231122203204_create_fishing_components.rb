class CreateFishingComponents < ActiveRecord::Migration[7.1]
  def change
    create_table :fishing_components do |t|
      t.references :part, polymorphic: true

      t.timestamps
    end
  end
end
