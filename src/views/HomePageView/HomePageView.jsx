import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import LoadMore from '../../components/LoadMore/LoadMore';
import * as moviesAPI from '../../services/moviesApi';
import s from './HomePageView.module.css';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const { url } = useRouteMatch();

  useEffect(() => {
    return moviesAPI.fetchMoviesTrending(page).then(({ results }) => {
      setMovies(movies => [...movies, ...results]);
      scrollTo();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <ul className={s.gallery}>
        {movies &&
          movies.map(({ id, title, poster_path }) => (
            <li key={id} className={s.galleryItem}>
              <Link to={`${url}movies/${id}`} className={s.link}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt={title}
                  className={s.image}
                />
                <p className={s.title}>{title}</p>
              </Link>
            </li>
          ))}
      </ul>
      <LoadMore onLoadMore={onLoadMore} />
    </>
  );
}
