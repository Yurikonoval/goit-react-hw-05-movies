import React from 'react';
import Spinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loader() {
  return (
    <Spinner
      type="Rings"
      color="darkblue"
      height={150}
      width={150}
      style={{ textAlign: 'center' }}
    />
  );
}
