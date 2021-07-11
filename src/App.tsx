// import router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { TestsDashboard } from './dashboards/TestsDashboard'
import { UsersDashboard } from "./dashboards/UsersDashboard";
import { ScorecardsDashboard } from "./dashboards/ScorecardsDashboard";
import { LeaderboardsDashboard } from "./dashboards/LeaderboardsDashboard";

function App() {
  return <Router>
    <AppBar position="static" >
      <Toolbar>
        <Link to="/tests" style={{ color: "white" }}>
          <Typography variant="h6" color="inherit">Tests</Typography>
        </Link>
        <div style={{ width: 10 }}></div>
        <Link to="/users" style={{ color: "white" }}>
          <Typography variant="h6" color="inherit">Users</Typography>
        </Link>
        <div style={{ width: 10 }}></div>
        <Link to="/scorecards" style={{ color: "white" }}>
          <Typography variant="h6" color="inherit">Scorecards</Typography>
        </Link>
        <div style={{ width: 10 }}></div>
        <Link to="/Leaderboards" style={{ color: "white" }}>
          <Typography variant="h6" color="inherit">Leaderboards</Typography>
        </Link>
      </Toolbar>
    </AppBar>
    <Switch>
      <Route path="/tests">
        <TestsDashboard></TestsDashboard>
      </Route>
      <Route path="/users">
        <UsersDashboard></UsersDashboard>
      </Route>
      <Route path="/scorecards">
        <ScorecardsDashboard></ScorecardsDashboard>
      </Route>
      <Route path="/leaderboards">
        <LeaderboardsDashboard></LeaderboardsDashboard>
      </Route>
      {/* Default path back to home */}
      <Route path="/*">
        <Redirect to="/tests"></Redirect>
      </Route>
    </Switch>
  </Router>
}

export default App;
