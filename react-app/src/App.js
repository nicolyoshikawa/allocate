import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import Expense from "./components/Expense";
import LandingPage from "./components/LandingPage";
import ViewFriends from "./components/Friends";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && user && (
        <>
          <div className="container">
            <div className="sections">
                <div className="sidebar">
                    <div><NavLink exact to="/home">All Expenses</NavLink></div>
                    <div><NavLink exact to="/friends">Friends</NavLink></div>
                </div>
                <Switch>
                  <Route exact path="/expenses/:id">
                    <Expense/>
                  </Route>
                  <Route exact path="/home">
                    <Home/>
                  </Route>
                  <Route exact path="/friends">
                    <ViewFriends/>
                  </Route>
                  <Route exact path="/">
                    <LandingPage/>
                  </Route>
                  <Route>
                    <h1>Page Not Found</h1>
                  </Route>
                </Switch>
                <div className="sidebar">
                    <div>Balance</div>
                </div>
            </div>
          </div>
        </>
      )}
      {isLoaded && !user && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/expenses/:id">
            <Expense/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/friends">
            <ViewFriends/>
          </Route>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
