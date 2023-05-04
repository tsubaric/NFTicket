import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import MyTicketsPage from "./pages/MyTicketsPage.jsx";
import Event from "./pages/Event.jsx";
import { createBrowserHistory as history } from "history";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer.jsx";
import Events from "./pages/Events.jsx";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Dashboard id="dashboard"/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={CreateEvent} />
          <Route path="/events" exact component={Events} />
          <Route path="/tickets" exact component={MyTicketsPage} />
          <Route path="/event/:eventId" exact component={Event} />
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
