import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Form } from "Movie/components/Form";
import { create } from "Movie/Actions";

export const CreationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (movie) => {
    const { id } = await dispatch(create(movie));
    navigate(`/movies/${id}/update`);
  };

  return <Form onSubmit={handleSubmit} />;
};
