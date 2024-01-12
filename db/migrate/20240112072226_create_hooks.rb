class CreateHooks < ActiveRecord::Migration[7.1]
  def change
    create_table :hooks do |t|
      t.string :name
      t.string :size

      t.timestamps
    end
  end
end
