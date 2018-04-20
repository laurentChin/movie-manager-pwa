import React from 'react';
import { Field, reduxForm } from 'redux-form';

let MovieForm = props => {
  const { handleSubmit } = props
  return (<form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">Title</label>
      <Field name="title" component="input" type="text"/>
    </div>
    <div>
      <label htmlFor="director">Director</label>
      <Field name="director" component="input" type="text"/>
    </div>
    <div>
      <label htmlFor="releaseDate">Release date</label>
      <Field name="releaseDate" component="input" type="date"/>
    </div>
    <button type="submit">Create</button>
  </form>)
}

MovieForm = reduxForm({
  form: 'movie'
})(MovieForm);

export default MovieForm;

