export const selectMovies = (state) => state.movies.items;
export const selectProposalList = (state) => state.movies.proposals;
export const selectIsSearching = (state) => state.movies.isSearching;
export const selectIsFetching = (state) => state.movies.isFetching;

export const selectFormValues = (state) => state.form.movie?.values;
