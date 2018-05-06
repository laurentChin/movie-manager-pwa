import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreationPage, UpdatePage, BulkImportPage } from "./";

const MovieRouter = ({match}) => (<Switch>
  <Route exact path={`${match.url}/create`} component={CreationPage}/>
  <Route path={`${match.url}/:id/update`} component={UpdatePage}/>
  <Route path={`${match.url}/import`} component={BulkImportPage}/>
</Switch>);

export default MovieRouter;
