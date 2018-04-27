class PagesController < ApplicationController
  def home
  	@first_quote_id = Quote.order("RANDOM()").where(active: true).first.id
  end
end
