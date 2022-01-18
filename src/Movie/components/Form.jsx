import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HOME_PAGE } from "../../constants";

import { fetchFormats } from "Format";
import { FormatCheckboxGroup } from "Format/FormatCheckboxGroup";

import { selectFormatList } from "Format/selectors";
import { CoverInput } from "Core/components/CoverInput";

import { search } from "Movie/Actions";
import { ProposalList } from "Movie/components/ProposalList";
import { selectProposalList } from "Movie/selectors";

export const Form = ({ onSubmit, initialValues }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposalList);
  const [movie, setMovie] = useState({});

  const formats = useSelector(selectFormatList);

  useEffect(() => {
    if (formats.length === 0) {
      dispatch(fetchFormats());
    }
  });

  useEffect(() => {
    if (initialValues) {
      setMovie(initialValues);
    }
  }, [initialValues]);

  return (
    <>
      <form
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
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            required
            value={movie.title || ""}
            onChange={({ currentTarget: { value: title } }) =>
              setMovie({ ...movie, title })
            }
          />
          {movie.title && (
            <span
              className="search"
              onClick={() => dispatch(search(movie.title))}
            >
              search
            </span>
          )}
        </div>
        <div>
          <label htmlFor="direction">Director</label>
          <input
            name="direction"
            type="text"
            value={movie.direction || ""}
            onChange={({ currentTarget: { value: direction } }) =>
              setMovie({ ...movie, direction })
            }
          />
        </div>
        <div>
          <label htmlFor="releaseDate">Release date</label>
          <input
            name="releaseDate"
            type="date"
            value={movie.releaseDate || ""}
            onChange={({ currentTarget: { value: releaseDate } }) =>
              setMovie({ ...movie, releaseDate })
            }
          />
        </div>
        <div>
          <FormatCheckboxGroup
            formats={formats}
            initialValues={movie.formats || []}
            onChange={(changes) => setMovie({ ...movie, formats: changes })}
          />
        </div>
        <CoverInput
          onChange={(poster) => setMovie({ ...movie, poster })}
          value={movie.poster || ""}
        />
        <button onClick={() => navigate(HOME_PAGE)}>
          Go back to movie list
        </button>
        <button type="submit">{initialValues ? "Update" : "Create"}</button>
      </form>
      {proposals.length > 0 && (
        <ProposalList
          proposals={proposals}
          onSelect={(proposal) => setMovie({ ...movie, ...proposal })}
        />
      )}
    </>
  );
};
