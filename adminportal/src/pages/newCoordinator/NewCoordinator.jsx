import "./newCoordinator.css";
import React, {useState} from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { auth, database } from "../../firebase/Firebase";
import { useHistory } from "react-router-dom";


export default function NewCoordinator() {
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault()
    
    auth.createUserWithEmailAndPassword(email, password)
    .then(newUser =>{
        const user = newUser.user
        let data = 
          {
            username : username,
            name : name,
            email : email,
            department : department,
            responsibilities : responsibilities,
            id: user.uid,
            reports: []
          }
          console.log(JSON.stringify(data))
        database.ref(`Coordinators/${user.uid}`).set(data)
        .catch(error =>{
          console.log(error.message)
        })
    })
    .catch(error =>{
        console.log(error.message)
    })
    setUsername("")
    setName("")
    setEmail("")
    setPassword("")
    setDepartment("")
    setResponsibilities([])
    confirmAlert({
      title: 'New Coordinator Created!',
      message: 'Go back or Stay',
      buttons: [
        {
          label: 'Go back',
          onClick: () => {
            history.push('/admin/coordinators')
          }
        },
        {
          label: 'Stay',
          onClick: () => {}
        }
      ]
    });
  };
  
  return (
    <div className="newCoordinator">
      <h1 className="newCoordinatorTitle">New Coordinator</h1>
      <form onSubmit={handleSubmit} className="newCoordinatorForm">
        <div className="newCoordinatorItem">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="coordinator123" />
        </div>
        <div className="newCoordinatorItem">
          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Anas Ahmed" />
        </div>
        <div className="newCoordinatorItem">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="AnasAhmedFYP@gmail.com" />
        </div>
        <div className="newCoordinatorItem">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        <div className="newCoordinatorItem">
          <label>Department</label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Cs Department" />
        </div>
        <div className="newCoordinatorItem">
          <label>Responsibilities</label>
          <input type="text" value={responsibilities} onChange={(e) => setResponsibilities(e.target.value.split(','))} placeholder="Report, Check" />
        </div>
        <button className="newCoordinatorButton">Create</button>
      </form>
    </div>
  );
}
