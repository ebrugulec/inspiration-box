class PagesController < ApplicationController
  def home
  	@first_quote_id = Quote.order("RANDOM()").first.id
  end
end
