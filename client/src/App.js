import { Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import {Login, Signup} from "./pages/Auth";
import Script from "./pages/ScriptPage";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        TODO: <Route exact path="/script/:id" component={Script} />
      </Switch>
    </Router>
  );
}

export default App;