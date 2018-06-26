import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/home';
import BookView from './components/books/bookView';
import Layout from './hoc/layout';
import Login from './containers/admin/login';
import Auth from './hoc/auth';
import User from './components/admin';
import AddBook from './components/admin/addBook';
import UserReviews from './components/admin/userReviews';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Auth(Home, null)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/user" component={Auth(User, true)} />
        <Route exact path="/user/add" component={Auth(AddBook, true)} />
        <Route exact path="/books/:id" component={Auth(BookView)} />
        <Route
          exact
          path="/user/user-reviews"
          component={Auth(UserReviews, true)}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
