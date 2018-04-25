import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreationPage, UpdatePage } from "./";

const MovieRouter = ({match}) => (<Switch>
  <Route exact path={`${match.url}/create`} component={CreationPage}/>
  <Route path={`${match.url}/:id/update`} component={UpdatePage}/>
</Switch>);

export default MovieRouter;
