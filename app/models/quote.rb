class Quote < ApplicationRecord
  def next_id
    self.class.where('id > ?', self.id).pluck(:id).first
  end

  def previous_id
    self.class.where('id < ?', self.id).pluck(:id).last
  end

=begin  
  def next_id
    if self.class.where('id > ?', self.id)
    	Quote.order("RANDOM()").where.not(id: id).where.not(id: previous_id).pluck(:id).first
    end
  end
=end

end