import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/moviesApi';
import noPhoto from '../../images/not-found-image.jpg';
import s from './CastView.module.css';

export default function CastView() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieCast(movieId).then(({ cast }) => {
      if (cast.length) {
        setCast(cast);
        return;
      }
      setCast([]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.cast}>
      <ul className={s.castList}>
        {cast.length > 0 ? (
          cast.map(actor => (
            <li key={actor.id} className={s.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : noPhoto
                }
                alt={actor.name}
                width="130"
              />
              <div className={s.textInfo}>
                <p className={s.actorName}>{actor.name}</p>
                <p className={s.actorCharacter}>{actor.character}</p>
              </div>
            </li>
          ))
        ) : (
          <p className={s.noInfo}>Nothing about cast:(.</p>
        )}
      </ul>
    </div>
  );
}
