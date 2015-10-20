let RecordForm = React.createClass({

  getInitialState() {
    return {
      title: '',
      date: '',
      amount: ''
    }
  },

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  },

  handleSubmit(e) {
    e.preventDefault();
    $.post('', { record: this.state }, (data) => {
      this.props.handleNewRecord(data);
      this.setState(this.getInitialState())
    }, 'JSON');
  },

  valid() {
    return this.state.title && this.state.date && this.state.amount;
  },

  render() {
    return (
      <form className="form form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="date"
            className="form-control"
            placeholder="Date"
            value={this.state.date}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="amount"
            className="form-control"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.handleChange} />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.valid()}>
            Create record
          </button>
      </form>
    )
  }
})
