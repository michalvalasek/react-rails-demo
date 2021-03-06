class RecordsController < ApplicationController

  before_action :load_record, only: [:update, :destroy]

  def index
    @records = Record.all
    render component: 'Records', props: { data: @records }
  end

  def create
    @record = Record.new(record_params)

    if @record.save
      render json: @record
    else
      render json: @record.errors, status: :unprocessable_entity
    end
  end

  def update
    if @record.update(record_params)
      render json: @record
    else
      render json: @record.errors, state: :unprocessable_entity
    end
  end

  def destroy
    @record.destroy
    head :no_content
  end

private

  def load_record
    @record = Record.find(params[:id])
  end

  def record_params
    params.require(:record).permit(:title, :amount, :date)
  end
end
