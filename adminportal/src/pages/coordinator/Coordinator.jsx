import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  Person,
  Work
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./coordinator.css";
import { coordinatorData } from "../../dummyData";
import { useState, useEffect } from "react";

export default function Coordinator() {
  const { id } = useParams();
  const [coordinator] = useState(coordinatorData.filter((item) => item.id == id)[0]);

  return (
    <div className="coordinator">
      <div className="coordinatorTitleContainer">
        <h1 className="coordinatorTitle">Edit Coordinator</h1>
      </div>
      <div className="coordinatorContainer">
        <div className="coordinatorShow">
          <div className="coordinatorShowTop">
            <Person className="coordinatorShowImg"/>
            <div className="coordinatorShowTopTitle">
              <span className="coordinatorShowCoordinatorname">{coordinator.name}</span>
            </div>
          </div>
          <div className="coordinatorShowBottom">
            <span className="coordinatorShowTitle">Account Details</span>
            <div className="coordinatorShowInfo">
              <PermIdentity className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{coordinator.username}</span>
            </div>
            <span className="coordinatorShowTitle">Contact Details</span>
            <div className="coordinatorShowInfo">
              <MailOutline className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{coordinator.email}</span>
            </div>
            <div className="coordinatorShowInfo">
              <LocationSearching className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{coordinator.department}</span>
            </div>
          </div>
          <div className="coordinatorShowBottom">
            <span className="coordinatorShowTitle">Responsibilties</span>
            <div className="coordinatorShowInfo">
              <Work className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{coordinator.responsibilities.toString()}</span>
            </div>
          </div>
        </div>
        <div className="coordinatorUpdate">
          <span className="coordinatorUpdateTitle">Edit</span>
          <form className="coordinatorUpdateForm">
            <div className="coordinatorUpdateLeft">
              <div className="coordinatorUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={coordinator.username}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={coordinator.name}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  placeholder={coordinator.email}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Department</label>
                <input
                  type="text"
                  placeholder={coordinator.department}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Responsibilities</label>
                <input
                  type="text"
                  placeholder={coordinator.responsibilities.toString()}
                  className="coordinatorUpdateInput"
                />
              </div>
            </div>
            <div className="coordinatorUpdateRight">
              <button className="coordinatorUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
