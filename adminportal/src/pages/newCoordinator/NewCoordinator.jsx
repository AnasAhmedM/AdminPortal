import "./newCoordinator.css";
import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { Coordinator, CoordinatorBuilder } from "../../firebase/Coordinator";


export default function NewCoordinator() {
  const [response, setResponse] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault()
    
    var coordinator = new CoordinatorBuilder()
    .setUsername(username)
    .setName(name)
    .setEmail(email)
    .setPassword(password)
    .setDepartment(department)
    .setResponsibilities(responsibilities)
    .build()

    setResponse(coordinator.createCoordinator())
    alert(response.message)

    if (response.message === "Sucesss")
      window.location.reload(false);
    
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
