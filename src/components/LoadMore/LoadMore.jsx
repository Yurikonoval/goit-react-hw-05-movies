import React from 'react';
import PropTypes from 'prop-types';
import s from './LoadMore.module.css';

export default function LoadMore({ onLoadMore }) {
  return (
    <button type="button" onClick={onLoadMore} className={s.button}>
      Load more
    </button>
  );
}

LoadMore.propTypes = {
  onLoadMore: PropTypes.func,
};
