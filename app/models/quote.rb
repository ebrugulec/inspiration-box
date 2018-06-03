class Quote < ApplicationRecord

  validates :text, presence: true
  validates :author, presence: true

  def self.to_csv
  	attributes = %w{id text author}

   	CSV.generate(headers: true) do |csv|
    	csv << attributes

      all.each do |quote|
      	csv << attributes.map{ |attr| quote.send(attr) }
	  	end	
		end
	end

  def next_id
    self.class.where('id > ?', self.id).where(active: true).pluck(:id).first
  end

  def previous_id
    self.class.where('id < ?', self.id).where(active: true).pluck(:id).last
  end

=begin  
  def next_id
    if self.class.where('id > ?', self.id)
    	Quote.order("RANDOM()").where.not(id: id).where.not(id: previous_id).pluck(:id).first
    end
  end
=end

end
