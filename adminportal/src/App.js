import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoordinatorList from "./pages/coordinatorList/CoordinatorList";
import WriteReport from "./pages/writeReport/WriteReport";
import Coordinator from "./pages/coordinator/Coordinator";
import NewCoordinator from "./pages/newCoordinator/NewCoordinator";
import {useHistory} from "react-router-dom";
import {LoginState} from "./firebase/LoginState"
import {useEffect, useState} from "react";
import { useIdleTimer } from 'react-idle-timer'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App(){
  const history = useHistory()
  const [logged, setLogged] = useState(LoginState['logged'])
  const time = 300

  const onIdle = () => {
    confirmAlert({
      title: 'Session Timeout',
      message: `You have Been Logout for Staying Idle for ${time} Seconds`,
      buttons: [
        {
          label: 'Login',
          onClick: () => {
            window.location.reload()
          }
        }
      ]
    });
  }

  const idleTimer = useIdleTimer({ onIdle, timeout: time *1000})

  useEffect(()=>{
    setLogged(LoginState['logged'])
    if(!logged)
        history.push('/')
  })

  return (
    <Router>
      <div>
        <Topbar />
          <div className="container">
            <Sidebar />
            <Switch>
              <Route exact path="/admin/">
                <Home />
              </Route>
              <Route path="/admin/coordinators">
                <CoordinatorList />
              </Route>
              <Route path="/admin/writeReport">
                <WriteReport />
              </Route>
              <Route path="/admin/coordinator/:id">
                <Coordinator />
              </Route>
              <Route path="/admin/newCoordinator">
                <NewCoordinator />
              </Route>
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
