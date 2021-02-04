import React, { useState, useEffect, useRef, lazy } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadMore from '../../components/LoadMore/LoadMore';
import * as moviesAPI from '../../services/moviesApi';
import noPhoto from '../../images/not-found-image.jpg';
import s from './MoviesPageView.module.css';

const NotFoundView = lazy(() => import('../../components/NotFound/NotFound'));

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const isFirstRender = useRef(true);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return moviesAPI
      .fetchMoviesSearch(query, page)
      .then(({ results, total_results }) => {
        setMovies(movies => [...movies, ...results]);
        setTotalResult(total_results);
        scrollTo();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery);
  }, [location.search]);

  const scrollTo = () => {
    if (page !== 1) {
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.clientHeight - 80,
          behavior: 'smooth',
        });
      }, 1000);
    }
  };

  const handleFormSubmit = findQuery => {
    if (query === findQuery) {
      return;
    }
    setQuery(findQuery);
    setPage(1);
    setMovies([]);
    history.push({ ...location, search: `query=${findQuery}` });
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {query && movies && (
        <>
          <ul className={s.gallery}>
            {movies.map(({ id, title, poster_path }) => (
              <li key={id} className={s.galleryItem}>
                <Link
                  to={{ pathname: `${url}/${id}`, state: { from: location } }}
                  className={s.link}
                >
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : noPhoto
                    }
                    alt={title}
                    className={s.image}
                  />
                  <p className={s.title}>{title}</p>
                </Link>
              </li>
            ))}
          </ul>
          {movies.length !== 0 && <LoadMore onLoadMore={onLoadMore} />}
          {totalResult === 0 && <NotFoundView />}
        </>
      )}
    </>
  );
}
