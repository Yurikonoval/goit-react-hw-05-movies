import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';
import './App.css';

const HomePageView = lazy(() =>
  import('./views/HomePageView/HomePageView' /* webpackChunkName: "homepage"*/),
);
const MoviesPageView = lazy(() =>
  import(
    './views/MoviesPageView/MoviesPageView' /* webpackChunkName: "movies"*/
  ),
);
const MovieDetailsPageView = lazy(() =>
  import(
    './views/MovieDetailsPageView/MovieDetailPageView' /* webpackChunkName: "movie-details"*/
  ),
);
const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView/NotFoundView' /* webpackChunkName: "not-found"*/
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePageView />
          </Route>
          <Route path="/movies" exact>
            <MoviesPageView />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPageView />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
