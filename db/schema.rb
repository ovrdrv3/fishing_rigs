# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_11_22_212406) do
  create_table "bobbers", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fishing_components", force: :cascade do |t|
    t.string "name"
    t.string "part_type"
    t.integer "part_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["part_type", "part_id"], name: "index_fishing_components_on_part"
  end

  create_table "rigs", force: :cascade do |t|
    t.string "name"
    t.text "fishing_components_ids"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sinkers", force: :cascade do |t|
    t.string "name"
    t.string "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
