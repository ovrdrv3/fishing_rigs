class CreateRigs < ActiveRecord::Migration[7.1]
  def change
    create_table :rigs do |t|
      t.string :name
      t.text :fishing_components_ids

      t.timestamps
    end
  end
end
