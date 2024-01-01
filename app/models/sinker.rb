# frozen_string_literal: true

class Sinker < ApplicationRecord
  has_one :fishing_component, as: :part, dependent: :destroy
  has_many_attached :images

  validates :name, presence: true
  validates :weight, presence: true

  after_initialize :build_fishing_component, unless: :fishing_component
end
