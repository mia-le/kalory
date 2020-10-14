class ApplicationController < ActionController::Base
  include SessionsHelper
=begin
  def guess
    chosen_upc = @upcs.random_thing()
    rs = Unirest.get("nutionxnix.api.com/ipc/${chosen_upc}")
    
    @brand_name = rs['brand_name']
    ...
    
    render html: "guess"
  end
=end
  
end
