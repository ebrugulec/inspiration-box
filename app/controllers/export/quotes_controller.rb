class Export::QuotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def csv
    @quotes = Quote.where(active: true)

    respond_to do |format|
      format.csv { send_data @quotes.to_csv, filename: "quotes-#{Date.today}.csv" }
    end
  end

end
