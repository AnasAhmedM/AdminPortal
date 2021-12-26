import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  CameraRear,
  BarChart,
  MailOutline,
  DynamicFeed,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Graphs
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/coordinators" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Coordinators
              </li>
            </Link>
              <li className="sidebarListItem">
                <CameraRear className="sidebarIcon" />
                Cameras
              </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Add New</h3>
          <ul className="sidebarList">
            <Link to="/newCoordinator" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Add Coordinators
              </li>
            </Link>
            <Link to="/newcamera" className="link">
              <li className="sidebarListItem">
                <CameraRear className="sidebarIcon" />
                Add Cameras
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
