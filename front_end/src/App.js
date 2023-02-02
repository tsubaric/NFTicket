import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEventPage";
import Events from "./pages/Events";
import myTickets from "./pages/myTickets";

import { createBrowserHistory as history } from "history";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Dashboard />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={CreateEvent} />
          <Route path="/events" exact component={Events} />
          <Route path="/tickets" exact component={myTickets} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
