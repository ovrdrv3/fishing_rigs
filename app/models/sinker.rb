# frozen_string_literal: true

class Sinker < ApplicationRecord
  has_one :fishing_component, as: :part

  validates :name, presence: true
  validates :weight, presence: true
end
