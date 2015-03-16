class ListController < ApplicationController

  def index
  end

  def tasks
    @tasks = Task.all
    render json: @tasks
  end

  def completed
    task = Task.find(params[:id])
    task.completed = task.completed ? false : true
    task.save

    render json: task
  end

  def create
    task = Task.create(description: params[:description])
    render json: task
  end

end
