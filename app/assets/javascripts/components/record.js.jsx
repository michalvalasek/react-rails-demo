let Record = React.createClass({

  getInitialState() {
    return {
      edit: false
    }
  },

  handleDelete(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: `/records/${this.props.record._id.$oid}`,
      dataType: 'JSON',
      success: () => this.props.handleDeleteRecord(this.props.record)
    })
  },

  handleToggle(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit})
  },

  handleEdit(e) {
    e.preventDefault();
    let data = {
      record: {
        title: React.findDOMNode(this.refs.title).value,
        date: React.findDOMNode(this.refs.date).value,
        amount: React.findDOMNode(this.refs.amount).value
      }
    };
    $.ajax({
      method: 'PATCH',
      url: `/records/${this.props.record._id.$oid}`,
      data: data,
      dataType: 'JSON',
      success: (respData) => {
        this.setState({edit: false});
        this.props.handleEditRecord(this.props.record, respData)
      }
    })
  },

  renderRecordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className="btn btn-default btn-xs" onClick={this.handleToggle}>Edit</a>&nbsp;
          <a className="btn btn-danger btn-xs" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  },

  renderRecordForm() {
    return (
      <tr>
        <td><input type="text" defaultValue={this.props.record.date} ref="date" className="form-control"/></td>
        <td><input type="text" defaultValue={this.props.record.title} ref="title" className="form-control"/></td>
        <td><input type="number" defaultValue={this.props.record.amount} ref="amount" className="form-control"/></td>
        <td>
          <a className="btn btn-default btn-sm" onClick={this.handleEdit}>Update</a>&nbsp;
          <a className="btn btn-danger btn-sm" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    )
  },

  render() {
    return this.state.edit ? this.renderRecordForm() : this.renderRecordRow();
  }
})
