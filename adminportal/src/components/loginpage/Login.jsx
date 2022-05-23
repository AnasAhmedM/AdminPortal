import React from 'react';
import './login.css';
import { useState, useEffect, useContext} from "react";
import {Person} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {database} from "../../firebase/Firebase";
import {LoginState} from "../../firebase/LoginState"

export default function Login(){
    const history = useHistory()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");
    
    useEffect(()=>{
        if(LoginState['logged'])
            history.push('/admin/')
        if(data.length === 0){
            database.ref('/Admin').once('value', function (snapshot) {
                let cred = snapshot.val()
                setData(cred)
            })
        }
      }, [])

    const handleSubmit = () =>{
        if(data['password'] === password && data['username'] === username){
            LoginState['logged'] = true
            history.push('/admin')
         }
    }

    return(
        <div style={{backgroundColor:''}} className='main'>
            <h1 className='loginTitle'>Welcome to Admin Portal</h1>
            <div style={{backgroundColor:''}} className='divLogin'>
                <div className='divLoginLogo'>
                    <Person className='loginIcon'/>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type='input' name='username' placeholder='Username' required onChange={(e) => setUsername(e.target.value)}/>
                        <input type='password' name='pwd' placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
                        <button type='submit'>Log In</button>
                    </form>
                </div>
            </div>
            <h3 className='footerText'>Crowd Analysis for Covid-19 SOPs detection System - Admin Panel</h3>
        </div>
    )
}
