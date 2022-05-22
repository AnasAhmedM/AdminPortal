import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, Person} from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Crowd Analysis for Covid-19 SOPs detection System - Admin Panel</span>
        </div>
        {/* <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Person className="topAvatar" />
        </div> */}
      </div>
    </div>
  );
}
