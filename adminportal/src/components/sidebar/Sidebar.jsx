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
  ExitToApp
} from "@material-ui/icons"


import {Link, useHistory} from "react-router-dom"
import {LoginState} from "../../firebase/LoginState"

export default function Sidebar() {
  const history = useHistory()

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
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
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
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Alerts
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Coordinator Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
