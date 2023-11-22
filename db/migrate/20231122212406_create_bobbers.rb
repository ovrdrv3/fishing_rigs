class CreateBobbers < ActiveRecord::Migration[7.1]
  def change
    create_table :bobbers do |t|
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
