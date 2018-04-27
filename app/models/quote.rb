class Quote < ApplicationRecord

  validates :text, presence: true
  validates :author, presence: true

  def next_id
    self.class.where('id > ?', self.id).where(active: true).pluck(:id).first
  end

  def previous_id
    self.class.where('id < ?', self.id).where(active: true).pluck(:id).first
  end

=begin  
  def next_id
    if self.class.where('id > ?', self.id)
    	Quote.order("RANDOM()").where.not(id: id).where.not(id: previous_id).pluck(:id).first
    end
  end
=end

end