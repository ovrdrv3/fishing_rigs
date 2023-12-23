# frozen_string_literal: true

class Bobber < ApplicationRecord
  has_one :fishing_component, as: :part

  validates :name, presence: true
  validates :color, presence: true
end
