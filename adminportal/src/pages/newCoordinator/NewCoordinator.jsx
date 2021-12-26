import "./newCoordinator.css";
import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../../config";

export default function NewCoordinator() {
  const [currentUser, setCurrentUser] = useState(null);    
  const handleSubmit = (e) => {
    /*
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);      
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
    */
    setCurrentUser("User")
    if (currentUser)
      return <Redirect to="/newCoordinator" />;
  };
  
  
  return (
    <div className="newCoordinator">
      <h1 className="newCoordinatorTitle">New Coordinator</h1>
      <form onSubmit={handleSubmit} className="newCoordinatorForm">
        <div className="newCoordinatorItem">
          <label>Username</label>
          <input type="text" placeholder="coordinator123" />
        </div>
        <div className="newCoordinatorItem">
          <label>Full Name</label>
          <input type="text" placeholder="Anas Ahmed" />
        </div>
        <div className="newCoordinatorItem">
          <label>Email</label>
          <input type="email" placeholder="AnasAhmedFYP@gmail.com" />
        </div>
        <div className="newCoordinatorItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newCoordinatorItem">
          <label>Department</label>
          <input type="text" placeholder="Cs Department" />
        </div>
        <div className="newCoordinatorItem">
          <label>Responsibilities</label>
          <input type="text" placeholder="Report, Check" />
        </div>
        <button className="newCoordinatorButton">Create</button>
      </form>
    </div>
  );
}
