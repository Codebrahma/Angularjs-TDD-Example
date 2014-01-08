class PagesController < ApplicationController
  def index
  end
  def mock
  	data = [{
  		:investment => 	100,
        :rate => {
        	:category => "B3",
        	:value => "11.9"
        },
        :term => 36,
        :fico => "680-678",
        :amount => 18000,
        :title => "Brighter Future",
        :purpose => "Debt Consolidation",
        :funded => "90",
        :amount_left => "50",
        :time => "13" 
  	},{
      :investment =>  500,
        :rate => {
          :category => "B3",
          :value => "12.9"
        },
        :term => 37,
        :fico => "689-678",
        :amount => 20000,
        :title => "Silly text",
        :purpose => "Debt Consolidation",
        :funded => "90",
        :amount_left => "50",
        :time => "13" 
    }]
  	render json: data
  end
end
