import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchFormats } from "Format";
import { selectFormatList } from "Format/Format.selectors";

import { Form } from "Movie/components/Form";
import { create } from "Movie/Actions";

export const CreationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formats = useSelector(selectFormatList);

  useEffect(() => {
    if (formats.length === 0) {
      dispatch(fetchFormats());
    }
  });

  const handleSubmit = async (movie) => {
    const { id } = await dispatch(create(movie));
    navigate(`/movies/${id}/update`);
  };

  return <Form onSubmit={handleSubmit} formats={formats} />;
};
