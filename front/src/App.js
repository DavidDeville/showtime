import logo from "./logo.svg";
import "bootswatch/dist/lux/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import ConcertsPage from "./components/ConcertsPage";
import LoginPage from "./components/LoginPage";
import AuthContext from "./contexts/AuthContext";
import api from "./services/authAPI";
import { useState } from "react";
import AdminPage from "./components/AdminPage";
import CreateConcertPage from "./components/CreateConcertPage";
import UpdateConcertPage from "./components/UpdateConcertPage";

api.setup();

const PrivateRoute = ({ path, isAuthenticated, component }) =>
  isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );

const App = () => {
  // Check if user is logged or not
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());

  // Check if user is an admin or not
  const [isAdmin, setIsAdmin] = useState(api.isAdmin());

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  };

  return (
    <div className="App">
      <AuthContext.Provider value={contextValue}>
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route
              exact
              path="/concerts"
              render={(props) => (
                <ConcertsPage isAuthenticated={isAuthenticated} {...props} />
              )}
            />
            <PrivateRoute
              exact
              path="/admin"
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              component={AdminPage}
            />
            <PrivateRoute
              exact
              path="/concert/create"
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              component={CreateConcertPage}
            />
            <PrivateRoute
              path="/concert/:id"
              isAuthenticated={isAuthenticated}
              component={UpdateConcertPage}
            />
          </Switch>
        </HashRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
