import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';

import { CSVInput } from "./";


class BulkImportForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (<form onSubmit={handleSubmit}>
      <div>
        <label>Select a .csv file to import</label>
        <Field name="csv" component={CSVInput} required />
      </div>
      <button type="submit">Import</button>
    </form>);
  }
}

BulkImportForm = reduxForm({
  form: 'bulkImport'
})(BulkImportForm);

export default BulkImportForm;
