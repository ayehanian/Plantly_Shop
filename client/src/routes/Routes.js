import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import jwt from "jwt-decode";

import HomePage from "../pages/HomePage/HomePage";
import Cart from "../pages/Cart/Cart";
import Profiler from "../pages/Profiler/Profiler";
import LoginForm from "../components/LoginForm";
import NotFound from "../pages/NotFound/NotFound";
import RegistrationForm from "../components/RegistrationForm";
import ItemDetailsPage from "../pages/ItemDetailsPage/ItemDetailsPage";
import setAuthToken from "../components/common/setAuthToken";
import Preloader from "../components/Preloader";
import {
  getUser,
  preloaderClose,
  userFromJwt,
} from "../store/actions/loginActions";
import { getWishlist } from "../store/actions/wishlist";
import SearchPage from "../pages/SearchPage/SearchPage";
import Shop from "../pages/Shop/Shop";

// eslint-disable-next-line no-shadow
const Routes = ({
  isAuthenticated,
  getUser,
  getWishlist,
  preloaderClose,
  preloader,
  userFromJwt,
}) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem("authToken");
    if (token) {
      userFromJwt(jwt(token));
      preloaderClose();
      setAuthToken(token);
      getWishlist();
      getUser();
    } else {
      preloaderClose();
    }
  }, [getUser, getWishlist, preloaderClose, userFromJwt]);

  // eslint-disable-next-line no-nested-ternary
  return preloader ? (
    <Preloader />
  ) : isAuthenticated ? (
    <Switch>
      <Route exact path="/api/">
        <HomePage />
      </Route>
      <Route path="/api/cart">
        <Cart />
      </Route>
      <Route path="/api/search">
        <SearchPage />
      </Route>
      <Route path="/api/shop">
        <Shop />
      </Route>
      <Route path="/api/notfound">
        <NotFound />
      </Route>
      <Route path="/api/profile">
        <Profiler />
      </Route>
      <Redirect to="/api/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/api/">
        <HomePage />
      </Route>
      <Route path="/api/cart">
        <Cart />
      </Route>
      <Route path="/api/search">
        <SearchPage />
      </Route>
      <Route path="/api/shop">
        <Shop />
      </Route>
      {/* <Route path="/about-us"> */}

      {/* </Route> */}
      <Route path="/api/notfound">
        <NotFound />
      </Route>
      <Route path="/api/login">
        <LoginForm />
      </Route>
      <Route path="/api/registration">
        <RegistrationForm />
      </Route>
      <Route path="/api/products/:id">
        <ItemDetailsPage />
      </Route>
      <Redirect to="/api/" />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,
    user: state.loginReducer.user,
    preloader: state.loginReducer.loginPreloader,
  };
}

export default connect(mapStateToProps, {
  getUser,
  getWishlist,
  preloaderClose,
  userFromJwt,
})(Routes);
