let Records = React.createClass({
  getInitialState() {
    return {
      records: this.props.data
    }
  },

  getDefaultProps() {
    return {
      records: []
    }
  },

  addRecord(record) {
    let records = React.addons.update(this.state.records, {$push: [record]});
    this.setState({records: records})
  },

  updateRecord(record, data) {
    let index = this.state.records.indexOf(record);
    let records = React.addons.update(this.state.records, {$splice: [[index, 1, data]]});
    this.replaceState({records: records})
  },

  deleteRecord(record) {
    let index = this.state.records.indexOf(record);
    let records = React.addons.update(this.state.records, {$splice: [[index, 1]]});
    this.replaceState({records: records})
  },

  credits() {
    let credits = this.state.records.filter(rec => rec.amount >= 0);
    return credits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0);
  },

  debits() {
    let debits = this.state.records.filter(rec => rec.amount < 0);
    return debits.reduce((prev, curr) => prev + parseFloat(curr.amount), 0);
  },

  balance() {
    return this.debits() + this.credits();
  },

  renderRecord(record) {
    return (
      <Record
        key={record._id.$oid}
        record={record}
        handleDeleteRecord={this.deleteRecord}
        handleEditRecord={this.updateRecord} />
    )
  },

  render() {
    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          <AmountBox type="success" amount={this.credits()} text="Credit" />
          <AmountBox type="danger" amount={this.debits()} text="Debit" />
          <AmountBox type="info" amount={this.balance()} text="Balance" />
        </div>
        <RecordForm handleNewRecord={this.addRecord} />
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>Date</td>
              <td>Title</td>
              <td>Amount</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(this.renderRecord)}
          </tbody>
        </table>
      </div>
    );
  }
})
