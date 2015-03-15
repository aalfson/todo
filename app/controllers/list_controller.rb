class ListController < ApplicationController

  def index
    @tasks = Task.all
  end

end
