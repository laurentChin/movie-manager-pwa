import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Form } from "Movie/components/Form";
import { update } from "Movie/Actions";
import { fetchMovie } from "Movie/graphql/client";
import { selectMovies } from "Movie/Movie.selectors";

export const UpdatePage = () => {
  const params = useParams();
  const movies = useSelector(selectMovies);
  const dispacth = useDispatch();
  const [movie, setMovie] = useState(
    movies.find((movie) => movie.id === params.id)
  );

  useEffect(() => {
    if (!movie) {
      fetchMovie(parseInt(params.id)).then((response) => setMovie(response));
    }
  }, [params, movie]);

  return (
    <Form
      onSubmit={(data) => dispacth(update(data))}
      initialValues={movie}
      isUpdate
    />
  );
};
