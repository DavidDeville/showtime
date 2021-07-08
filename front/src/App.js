import logo from "./logo.svg";
import "bootswatch/dist/lux/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import ConcertsPage from "./components/ConcertsPage";
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/concerts" component={ConcertsPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
