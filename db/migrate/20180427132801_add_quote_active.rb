class AddQuoteActive < ActiveRecord::Migration[5.1]
  def change
  	add_column :quotes, :active, :boolean, default: false
  end
end
