import React, { useEffect } from "react";
import { Field, initialize, reduxForm } from "redux-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FormatCheckboxGroup } from "../../Format/index";
import { CoverInput } from "Core/components/CoverInput";
import { ProposalList } from "Movie/components/ProposalList";
import { HOME_PAGE } from "../../constants";
import { search } from "Movie/Actions";
import { selectFormValues, selectProposalList } from "../Movie.selectors";

const Component = ({
  handleSubmit,
  formats,
  initialized,
  initialValues,
  isUpdate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposalList);
  const values = useSelector(selectFormValues);

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
