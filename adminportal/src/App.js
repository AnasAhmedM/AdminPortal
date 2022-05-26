import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Trends from "./pages/trends/Trends.jsx";
import FacemaskLogs from "./pages/facemaskLogs/FacemaskLogs";
import SocialDistanceLogs from "./pages/socialDistanceLogs/SocialDistanceLogs"
import CoordinatorList from "./pages/coordinatorList/CoordinatorList";
import WriteReport from "./pages/writeReport/WriteReport";
import Coordinator from "./pages/coordinator/Coordinator";
import NewCoordinator from "./pages/newCoordinator/NewCoordinator";
import CoordinatorReports from "./pages/coordinatorReports/CoordinatorReports";
import Report from "./pages/report/Report";
import {useHistory} from "react-router-dom";
import {LoginState} from "./firebase/LoginState"
import {useEffect, useState} from "react";
import { useIdleTimer } from 'react-idle-timer'
import { confirmAlert } from 'react-confirm-alert';
import { database } from "./firebase/Firebase";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-notifications/lib/notifications.css';
import { Weights } from "./pages/trends/trendsW";


function App(){
  const history = useHistory()
  const [logged, setLogged] = useState(LoginState['logged'])
  const time = 300
  const [notifications, setNotifications] = useState([])
  const [sendNotifations, setSendNotifations] = useState(false)
  const [sendAlertCrowd, setSendAlertCrowd] = useState(false)
  const [sendAlertUnmasked, setSendAlertUnmasked] = useState(false)
  const [sendAlertViolation, setSendAlertViolation] = useState(false)

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

  const onClickNotification = () => {
  
  }

  useEffect(()=>{
    setLogged(LoginState['logged'])
    if(!logged)
        history.push('/')
    
    if(notifications.length===0)
    database.ref('Reports').once('value', function (snapshot) {
      if(!snapshot.val())
          return
      let values = Object.keys(snapshot.val()).map((e) =>{
        if(snapshot.val()[e]['read'])
          return
        return snapshot.val()[e]
      })
      setNotifications(values)
    });    

    if(!sendNotifations && notifications.length!==0){
      setSendNotifations(true)
      setTimeout(()=>{
        notifications.forEach(e=>{
          if(e)
            NotificationManager.info(e['title'], e['priority'], 2*1000, onClickNotification, false)
        })
      },1000)
    }

    if(!sendAlertCrowd){
      setSendAlertCrowd(true)
      setTimeout(()=>{
        if(Weights.crowd>0)
            NotificationManager.error(`Increased by ${Weights.crowd}%`,"Crowd is Increasing", 5*1000, true)
      },1000)
    }

    if(!sendAlertUnmasked){
      setSendAlertUnmasked(true)
      setTimeout(()=>{
        if(Weights.unmasked>0)
          NotificationManager.error(`Increased by ${Weights.unmasked}%`,"More People are not Wearing Masks", 5*1000, true)
      },1000)
    }

    if(!sendAlertViolation){
      setSendAlertViolation(true)
      setTimeout(()=>{
        if(Weights.violation>0)
          NotificationManager.error(`Increased by ${Weights.violation}%`,"More People are not Social Distancing", 5*1000, true)
      },1000)
    }
  })

  return (
    <Router>
      <div>
        {/* {JSON.stringify(notifications)} */}
        <NotificationContainer/>
        <Topbar />
          <div className="container">
            <Sidebar />
            <Switch>
              <Route exact path="/admin/">
                <Home />
              </Route>
              <Route path="/admin/trends">
                <Trends />
              </Route>
              <Route path="/admin/facemaskLogs">
                <FacemaskLogs />
              </Route>
              <Route path="/admin/socialDistanceLogs">
                <SocialDistanceLogs />
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
              <Route path="/admin/coordinatorReports">
                <CoordinatorReports />
              </Route>
              <Route path="/admin/report/:id">
                <Report />
              </Route>
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
