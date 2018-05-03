import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

import { FormatCheckboxGroup } from "../Format";
import { CoverInput } from './';

class MovieForm extends Component {
  render() {
    const { handleSubmit, formats, initialized, initialValues } = this.props;
    return (<form onSubmit={handleSubmit}>
      {initialized && <Field name="id" component="input" type="hidden"/>}
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" required/>
      </div>
      <div>
        <label htmlFor="director">Director</label>
        <Field name="director" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="releaseDate">Release date</label>
        <Field name="releaseDate" component="input" type="date"/>
      </div>
      <Field name="formats"
             component={FormatCheckboxGroup}
             formats={formats}
             selection={(initialized && initialValues.formats) ? initialValues.formats : []}/>
      <Field name="poster" component={CoverInput} />
      <button type="submit">{this.props.initialized ? 'Update' : 'Create'}</button>
    </form>)
  }

}

MovieForm = reduxForm({
  form: 'movie',
  enableReinitialize: true
})(MovieForm);

export default MovieForm;

