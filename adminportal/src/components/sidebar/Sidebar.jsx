import "./sidebar.css"
import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
  CameraRear,
  BarChart,
  MailOutline,
  DynamicFeed,
  ExitToApp,
  TrendingUp
} from "@material-ui/icons"

import {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom"
import {LoginState} from "../../firebase/LoginState"
import { database } from "../../firebase/Firebase";

export default function Sidebar() {
  const history = useHistory()
  const [notification, setNotification] = useState(0)
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 1000);
  return () => {
    clearInterval(interval);
  };
  }, []);

  useEffect(()=>{
    database.ref('/Reports').once('value', function (snapshot) {
      let count = 0 
      if(snapshot.val())
      Object.keys(snapshot.val()).forEach(e=> {
        if(snapshot.val()[e]['read'] === false) 
          count+=1
      })
      setNotification(count)
    });
  })

  const handleLogout = () =>{
    LoginState['logged'] = false;
    window.location.reload()
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/" className="link">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/admin/analytics" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            </Link>
            <Link to="/admin/trends" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Trends
              </li>
            </Link>
            
            <li className="sidebarListItem" onClick={()=>handleLogout()}>
              <ExitToApp className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/coordinators" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Coordinators
              </li>
            </Link>
            <Link to="/admin/writeReport" className="link">
            <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Write Report
              </li>
            </Link>
              
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Add New</h3>
          <ul className="sidebarList">
            <Link to="/admin/newCoordinator" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Add Coordinators
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/admin/coordinatorReports" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Coordinator Reports
                {notification != 0?<span className="notificationIndicator">{notification}</span>:null}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
