class CreateSuggestions < ActiveRecord::Migration[7.1]
  def change
    create_table :suggestions do |t|
      t.integer :age
      t.string :strength
      t.string :skill_level
      t.string :budget
      t.integer :fishing_type
      t.string :target_species
      t.string :season
      t.json :suggested_rod
      t.json :suggested_reel

      t.timestamps
    end
  end
end
