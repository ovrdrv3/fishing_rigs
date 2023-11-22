class CreateSinkers < ActiveRecord::Migration[7.1]
  def change
    create_table :sinkers do |t|
      t.string :name
      t.string :weight

      t.timestamps
    end
  end
end
