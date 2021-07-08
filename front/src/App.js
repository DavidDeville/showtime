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
  console.log(isAuthenticated);
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated
  }

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
          </Switch>
        </HashRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
