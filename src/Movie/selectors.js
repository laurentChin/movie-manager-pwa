export const selectOffset = (state) => state.movies.offset;
export const selectLimit = (state) => state.movies.limit;
export const selectMovies = (state) => state.movies.items;
export const selectProposalList = (state) => state.movies.proposals;
export const selectIsFetching = (state) => state.movies.isFetching;

export const selectFormValues = (state) => state.form.movie?.values;
