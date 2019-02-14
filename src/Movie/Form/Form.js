import React from "react";
import { Field, reduxForm } from "redux-form";

import { FormatCheckboxGroup } from "../../Format/index";
import { CoverInput } from "./";
import ProposalList from "../components/ProposalList";
import { HOME_PAGE } from "../../constants";

const MovieForm = ({
  handleSubmit,
  formats,
  initialized,
  initialValues,
  backToList,
  title,
  search,
  proposals,
  resetProposalList,
  selectProposal,
  push
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        {initialized && <Field name="id" component="input" type="hidden" />}
        <div>
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text" required />
          <span className="search" onClick={() => search(title)}>
            search
          </span>
        </div>
        <div>
          <label htmlFor="director">Director</label>
          <Field name="director" component="input" type="text" />
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
        {push && (
          <button onClick={() => push(HOME_PAGE)}>Go back to movie list</button>
        )}
        <button type="submit">{initialized ? "Update" : "Create"}</button>
      </form>
      {proposals.length > 0 && (
        <ProposalList
          proposals={proposals}
          closeHandler={resetProposalList}
          selectProposal={selectProposal}
        />
      )}
    </>
  );
};

export default reduxForm({
  form: "movie",
  enableReinitialize: true
})(MovieForm);
