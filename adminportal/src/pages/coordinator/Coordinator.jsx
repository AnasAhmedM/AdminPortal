import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  Person,
  Work
} from "@material-ui/icons";
import { Link, useLocation, useHistory} from "react-router-dom";
import "./coordinator.css";
import { coordinatorData } from "../../dummyData";
import { useState, useEffect } from "react";
import {database} from "../../firebase/Firebase";

export default function Coordinator() {
  const history = useHistory()
  const location = useLocation()
  const {name, username, email, department, responsibilities, id} = location.state
  const [getName, setName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getOldPassword, setOldPassword] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getPassword1, setPassword1] = useState("");
  const [getUsername, setUsername] = useState("");
  const [getDepartment, setDepartment] = useState("");
  const [getResponsibilities, setResponsibilities] = useState([]);

  useEffect(()=>{
    if(getName.length === 0){
      setName(name)
      setEmail(email)
      setUsername(username)
      setDepartment(department)
      setResponsibilities(responsibilities)
    }
  })

  const handleUpdate = () => {
    database.ref(`Coordinators/${id}`).set(
      {
          username : getUsername,
          name : getName,
          email : getEmail,
          department : getDepartment,
          responsibilities : getResponsibilities,
          id : id,
      }
    )
    history.push('/admin/coordinators')
  };

  const handleUpdatePassword = () => {
    
};

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
              <span className="coordinatorShowCoordinatorname">{name}</span>
            </div>
          </div>
          <div className="coordinatorShowBottom">
            <span className="coordinatorShowTitle">Account Details</span>
            <div className="coordinatorShowInfo">
              <PermIdentity className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{username}</span>
            </div>
            <span className="coordinatorShowTitle">Contact Details</span>
            <div className="coordinatorShowInfo">
              <MailOutline className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{email}</span>
            </div>
            <div className="coordinatorShowInfo">
              <LocationSearching className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{department}</span>
            </div>
          </div>
          <div className="coordinatorShowBottom">
            <span className="coordinatorShowTitle">Responsibilties</span>
            <div className="coordinatorShowInfo">
              <Work className="coordinatorShowIcon" />
              <span className="coordinatorShowInfoTitle">{responsibilities}</span>
            </div>
          </div>
        </div>
        <div className="coordinatorUpdate">
          <span className="coordinatorUpdateTitle">Edit</span>
          <form onSubmit={handleUpdate} className="coordinatorUpdateForm">
            <div className="coordinatorUpdateLeft">
              <div className="coordinatorUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={getUsername}
                  onChange={(e) => setUsername(e.target.value)}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value={getName}
                  onChange={(e) => setName(e.target.value)}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  value={getEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Department</label>
                <input
                  type="text"
                  value={getDepartment}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="coordinatorUpdateInput"
                />
              </div>
              <div className="coordinatorUpdateItem">
                <label>Responsibilities</label>
                <input
                  type="text"
                  value={getResponsibilities}
                  onChange={(e) => setResponsibilities(e.target.value.split(','))}
                  className="coordinatorUpdateInput"
                />
              </div>
            </div>
            <div className="coordinatorUpdateRight">
                <button className="coordinatorUpdateButton">Update</button>
            </div>
          </form>
        </div>
        {/* <div className="coordinatorChangePassword">
          <span className="coordinatorUpdateTitle">ChangePassword</span>
          <form className="coordinatorUpdatePasswordForm">
          <div className="coordinatorUpdateLeft">
              <div className="coordinatorUpdateItem">
                <label>Old Password</label>
                <input
                  type="password"
                  value={getOldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="coordinatorUpdateInput"
                />
              </div>
            </div>
            <div className="coordinatorUpdateLeft">
              <div className="coordinatorUpdateItem">
                <label>New Password</label>
                <input
                  type="password"
                  value={getPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  className="coordinatorUpdateInput"
                />
              </div>
            </div>
            <div className="coordinatorUpdateLeft">
              <div className="coordinatorUpdateItem">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={getPassword1}
                  onChange={(e) => setPassword1(e.target.value)}
                  className="coordinatorUpdateInput"
                />
              </div>
            </div>
            <div className="coordinatorUpdatePasswordBelow">
              <Link to='/coordinators'>
                <button 
                  className="coordinatorUpdatePasswordButton"
                  onClick={() => handleUpdatePassword()}
                >Update</button>
              </Link>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
}
