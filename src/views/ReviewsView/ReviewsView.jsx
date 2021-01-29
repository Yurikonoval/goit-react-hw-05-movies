import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/moviesApi';
import s from './ReviewsView.module.css';

export default function CastView() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieRewiews(movieId).then(({ results }) => {
      if (results.length) {
        setReviews(results);
        return;
      }
      setReviews([]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.reviews}>
      <ul className={s.reviewsList}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id} className={s.reviewsListItem}>
              <p className={s.reviewsAuthor}>Author: {review.author}</p>
              <p className={s.reviewsReview}>{review.content}</p>
            </li>
          ))
        ) : (
          <p className={s.noInfo}>No reviews.</p>
        )}
      </ul>
    </div>
  );
}
