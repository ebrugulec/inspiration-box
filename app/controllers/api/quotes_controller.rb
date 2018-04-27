class Api::QuotesController < ApplicationController
	skip_before_action :verify_authenticity_token

	def show
		@quote = Quote.where(id: params[:id], active: true).first
  end

  	def new
  		@quote = Quote.new(quote_params)
  		if @quote.save
  			respond_to do |format|
  				format.json { head :no_content }
  			end
  		end
  	end

  	private

  	def quote_params
  		params.require(:quote).permit(:text, :author)
  	end
end
