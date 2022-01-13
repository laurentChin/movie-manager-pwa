import React, { useEffect } from "react";
import { Field, initialize, reduxForm } from "redux-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchFormats, FormatCheckboxGroup } from "Format";
import { CoverInput } from "Core/components/CoverInput";
import { HOME_PAGE } from "../../constants";
import { search } from "Movie/Actions";
import { ProposalList } from "Movie/components/ProposalList";
import { selectFormValues, selectProposalList } from "Movie/Movie.selectors";
import { selectFormatList } from "Format/Format.selectors";

const Component = ({ handleSubmit, initialized, initialValues, isUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposalList);
  const values = useSelector(selectFormValues);

  const formats = useSelector(selectFormatList);

  useEffect(() => {
    if (formats.length === 0) {
      dispatch(fetchFormats());
    }
  });

  useEffect(() => {
    if (initialValues && !initialized) {
      dispatch(initialize("movie", initialValues, true));
    }
  }, [initialValues, dispatch, initialized]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {initialized && isUpdate && (
          <Field name="id" component="input" type="hidden" />
        )}
        <div>
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text" required />
          {values?.title && (
            <span
              className="search"
              onClick={() => dispatch(search(values.title))}
            >
              search
            </span>
          )}
        </div>
        <div>
          <label htmlFor="direction">Director</label>
          <Field name="direction" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="releaseDate">Release date</label>
          <Field name="releaseDate" component="input" type="date" />
        </div>
        <Field
          name="formats"
          component={FormatCheckboxGroup}
          formats={formats}
          selection={
            initialized && initialValues.formats ? initialValues.formats : []
          }
        />
        <Field name="poster" component={CoverInput} />
        <button onClick={() => navigate(HOME_PAGE)}>
          Go back to movie list
        </button>
        <button type="submit">{initialized ? "Update" : "Create"}</button>
      </form>
      {proposals.length > 0 && <ProposalList proposals={proposals} />}
    </>
  );
};

export const Form = reduxForm({
  form: "movie",
  enableReinitialize: true,
})(Component);
