import React from 'react';
import { Field, reduxForm } from 'redux-form';

let MovieForm = props => {
  const { handleSubmit, formats } = props;
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
    <div>
      {formats.map((format) => (
        <label key={format.id}>
          <Field name={`formats[${format.id}]`} component="input" type="checkbox" value={format}/>
          <span>{format.name}</span>
        </label>
      ))}
    </div>
    <button type="submit">Create</button>
  </form>)
}

MovieForm = reduxForm({
  form: 'movie'
})(MovieForm);

export default MovieForm;

