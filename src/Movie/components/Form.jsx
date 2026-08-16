import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Form.css";

import { fetchFormats } from "Format";
import { FormatCheckboxGroup } from "Format/FormatCheckboxGroup";

import { selectFormatList } from "Format/selectors";
import { CoverInput } from "Core/components/CoverInput";
import { useMediaQuery } from "Core/useMediaQuery";

import { search, resetProposalList } from "Movie/Actions";
import { SuggestionsPanel } from "Movie/components/SuggestionsPanel";
import { selectProposalList } from "Movie/selectors";
import { DESKTOP_QUERY } from "Movie/constants";

const SEARCH_MIN_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 400;

export const Form = ({ onSubmit, initialValues }) => {
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposalList);
  const [movie, setMovie] = useState(initialValues || {});
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // Selecting a suggestion fills title/direction with values long
  // enough to re-trigger the debounced search below; skip that one
  // cycle so picking a result doesn't immediately search again.
  const skipNextSearchRef = useRef(false);

  const formats = useSelector(selectFormatList);

  useEffect(() => {
    if (formats.length === 0) {
      dispatch(fetchFormats());
    }
  });

  useEffect(() => {
    if (!isDesktop) {
      return undefined;
    }

    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return undefined;
    }

    const title = (movie.title || "").trim();
    const direction = (movie.direction || "").trim();

    // Title takes precedence (it's the field the manual mobile
    // button is tied to); director only drives the search once the
    // user is typing there without a usable title.
    let terms;
    let byDirector = false;
    if (title.length >= SEARCH_MIN_LENGTH) {
      terms = title;
    } else if (direction.length >= SEARCH_MIN_LENGTH) {
      terms = direction;
      byDirector = true;
    } else {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      dispatch(search(terms, byDirector));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [isDesktop, movie.title, movie.direction, dispatch]);

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
        <div className="movie-form__body">
          <CoverInput
            onChange={(poster) => setMovie({ ...movie, poster })}
            value={movie.poster || ""}
          />
          <div className="movie-form__fields">
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
              {!isDesktop && movie.title && (
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
          </div>
        </div>
        <div className="movie-form__actions">
          <button type="submit" className="movie-form__submit">
            {initialValues ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <SuggestionsPanel
        proposals={proposals}
        onSelect={(proposal) => {
          skipNextSearchRef.current = true;
          setMovie({ ...movie, ...proposal });
          dispatch(resetProposalList());
        }}
      />
    </>
  );
};
