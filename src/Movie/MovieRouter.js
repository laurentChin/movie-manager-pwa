import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreationPage, UpdatePage } from "./";

const MovieRouter = ({ match }) => (
  <Routes>
    <Route exact path="create" element={<CreationPage />} />
    <Route path=":id/update" element={<UpdatePage />} />
  </Routes>
);

export default MovieRouter;
