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
      </Toolbar>
    </AppBar>
    <Switch>
      <Route path="/tests">
        <TestsDashboard></TestsDashboard>
      </Route>
      <Route path="/users">
        <UsersDashboard></UsersDashboard>
      </Route>
      {/* Default path back to home */}
      <Route path="/*">
        <Redirect to="/commands"></Redirect>
      </Route>
    </Switch>
  </Router>
}

export default App;
