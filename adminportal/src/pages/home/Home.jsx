import Chart from "../../components/chart/Chart";
import "./home.css";
import {useEffect, useState} from "react";
import {database} from "../../firebase/Firebase";

export default function Home() {
  const [data, setData] = useState([])
  const [noMask, SetNoMask] = useState([])
  const [numPeople, SetNumPeople] = useState([])
  const [numViolation, SetNumViolation] = useState([])

  useEffect(()=>{
    if(data.length===0)
    fetch('http://localhost:4000/facemask/', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            setData(jsonData)
        })
      .catch(err => {})
    
    if(noMask.length===0)
    fetch('http://localhost:4000/facemask/noMask', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            SetNoMask(jsonData)
        })
      .catch(err => {})

    if(numPeople.length===0)
    fetch('http://localhost:4000/socialdistance/numPeople', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            SetNumPeople(jsonData)
        })
      .catch(err => {})

    if(numViolation.length===0)
    fetch('http://localhost:4000/socialdistance/numViolation', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            SetNumViolation(jsonData)
        })
      .catch(err => {})
    
    
      database.ref('Snapshot/').set(
        {
          noMask: noMask,
          numPeople: numPeople,
          numViolation: numViolation
        }
      ).catch(error =>{
        console.log(error.message)
      })
     })


  
  return (
    <div className="home">
      <Chart data={numPeople} title="Number Of People" grid dataKey="Total"/>
      <Chart data={noMask} title="People Without Mask" grid dataKey="Total"/>
      <Chart data={numViolation} title="People Not Social Distancing" grid dataKey="Total"/>
    </div>
  );
}
