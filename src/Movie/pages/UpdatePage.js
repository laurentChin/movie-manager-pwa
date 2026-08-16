import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./UpdatePage.css";

import { HOME_PAGE } from "../../constants";
import { Form } from "Movie/components/Form";
import { update } from "Movie/Actions";
import { fetchMovie } from "Movie/graphql/client";
import { selectMovies } from "Movie/selectors";

export const UpdatePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(
    movies.find((movie) => movie.id === params.id)
  );
  const dialogRef = useRef();

  useEffect(() => {
    if (!movie) {
      fetchMovie(parseInt(params.id)).then((response) => setMovie(response));
    }
  }, [params, movie]);

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  // Reopens the movie's own detail dialog/page on Home (the same
  // mechanism CreationPage uses after creating a movie) instead of
  // just dropping back to the bare grid, since that's where editing
  // is normally entered from in the first place.
  const close = () =>
    navigate(HOME_PAGE, { state: { openMovieId: params.id } });

  return (
    <dialog
      ref={dialogRef}
      className="movie-update-dialog"
      aria-label="Edit movie"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          close();
        }
      }}
    >
      <button
        type="button"
        className="movie-update-dialog__close"
        onClick={close}
        aria-label="Close"
      />
      <div className="movie-update-dialog__body">
        <Form
          key={movie?.id || "loading"}
          onSubmit={(data) => dispatch(update(data))}
          initialValues={movie}
          isUpdate
        />
      </div>
    </dialog>
  );
};
