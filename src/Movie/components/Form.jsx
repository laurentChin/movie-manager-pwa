import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Form.css";

import { HOME_PAGE } from "../../constants";

import { fetchFormats } from "Format";
import { FormatCheckboxGroup } from "Format/FormatCheckboxGroup";

import { selectFormatList } from "Format/selectors";
import { CoverInput } from "Core/components/CoverInput";

import { search } from "Movie/Actions";
import { SuggestionsPanel } from "Movie/components/SuggestionsPanel";
import { selectProposalList } from "Movie/selectors";

export const Form = ({ onSubmit, initialValues }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposalList);
  const [movie, setMovie] = useState(initialValues || {});

  const formats = useSelector(selectFormatList);

  useEffect(() => {
    if (formats.length === 0) {
      dispatch(fetchFormats());
    }
  });

  return (
    <>
      <form
        className="movie-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(movie);
        }}
      >
        {movie.id && (
          <input
            name="id"
            type="hidden"
            value={movie.id}
            onChange={({ currentTarget: { value: id } }) =>
              setMovie({ ...movie, id })
            }
          />
        )}
        <div className="formField">
          <input
            id="title"
            name="title"
            type="text"
            placeholder=" "
            required
            value={movie.title || ""}
            onChange={({ currentTarget: { value: title } }) =>
              setMovie({ ...movie, title })
            }
          />
          <label htmlFor="title">Title</label>
          {movie.title && (
            <button
              type="button"
              className="movie-form__search"
              onClick={() => dispatch(search(movie.title))}
            >
              Search
            </button>
          )}
        </div>
        <div className="formField">
          <input
            id="direction"
            name="direction"
            type="text"
            placeholder=" "
            value={movie.direction || ""}
            onChange={({ currentTarget: { value: direction } }) =>
              setMovie({ ...movie, direction })
            }
          />
          <label htmlFor="direction">Director</label>
        </div>
        <div className="formField formField--date">
          <input
            id="releaseDate"
            name="releaseDate"
            type="date"
            placeholder=" "
            value={movie.releaseDate || ""}
            onChange={({ currentTarget: { value: releaseDate } }) =>
              setMovie({ ...movie, releaseDate })
            }
          />
          <label htmlFor="releaseDate">Release date</label>
        </div>
        <FormatCheckboxGroup
          formats={formats}
          initialValues={movie.formats || []}
          onChange={(changes) => setMovie({ ...movie, formats: changes })}
        />
        <CoverInput
          onChange={(poster) => setMovie({ ...movie, poster })}
          value={movie.poster || ""}
        />
        <div className="movie-form__actions">
          <button
            type="button"
            className="movie-form__cancel"
            onClick={() => navigate(HOME_PAGE)}
          >
            Go back to movie list
          </button>
          <button type="submit" className="movie-form__submit">
            {initialValues ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <SuggestionsPanel
        proposals={proposals}
        onSelect={(proposal) => setMovie({ ...movie, ...proposal })}
      />
    </>
  );
};
