import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./CreationPage.css";

import { HOME_PAGE } from "../../constants";
import { Form } from "Movie/components/Form";
import { create, resetProposalList } from "Movie/Actions";

export const CreationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef();

  useEffect(() => {
    dialogRef.current.showModal();
    // Search results live in Redux, not in Form's local state, so
    // they'd otherwise survive this dialog closing (and reopening,
    // or navigating to the update page) and show up stale.
    return () => {
      dispatch(resetProposalList());
    };
  }, [dispatch]);

  const close = () => navigate(HOME_PAGE);

  const onSubmit = async (movie) => {
    const { id } = await dispatch(create(movie));
    navigate(`/movies/${id}/update`);
  };

  return (
    <dialog
      ref={dialogRef}
      className="movie-creation-dialog"
      aria-label="Create a movie"
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
        className="movie-creation-dialog__close"
        onClick={close}
        aria-label="Close"
      />
      <div className="movie-creation-dialog__body">
        <Form onSubmit={onSubmit} />
      </div>
    </dialog>
  );
};
