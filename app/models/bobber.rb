# frozen_string_literal: true

class Bobber < ApplicationRecord
  has_one :fishing_component, as: :part, dependent: :destroy, autosave: true
  has_many_attached :images

  validates :name, :color, presence: true

  after_initialize :build_fishing_component, unless: :fishing_component
end
