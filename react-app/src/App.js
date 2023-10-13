import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal"
import LoginFormModal from "./components/LoginFormModal";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import Expense from "./components/Expense";
import LandingPage from "./components/LandingPage";
import NavSideBar from "./components/NavSideBar";
import Balance from "./components/Balance";
import FriendDetail from "./components/FriendDetail";
import PageNotFound from "./components/PageNotFound";
import GroupExpenses from "./components/GroupExpenses";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
          <div className="container">
            <div className="sections">
                <NavSideBar isLoaded={isLoaded} />
                <Switch>
                  <Route exact path="/expenses/:id">
                    <Expense/>
                  </Route>
                  <Route exact path="/home">
                    <Home/>
                  </Route>
                  <Route exact path="/friends/:id">
                    <FriendDetail/>
                  </Route>
                  <Route exact path="/">
                    <LandingPage/>
                  </Route>
                  <Route path="/login" >
                    <LoginFormModal />
                  </Route>
                  <Route path="/signup">
                    <SignupFormModal />
                  </Route>
                  <Route path="/groups/:id">
                    <GroupExpenses />
                  </Route>
                  <Route>
                    <PageNotFound/>
                  </Route>
                  {/* <Balance loggedIn={isLoaded} /> */}
                </Switch>
                {/* <Balance loggedIn={isLoaded} /> */}
            </div>
          </div>
      )}
    </>
  );
}

export default App;
