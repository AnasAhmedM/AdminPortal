import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {useEffect, useState} from "react";
import {database} from "../../firebase/Firebase";


export default function Home() {
  const [noMask, setNoMask] = useState([])
  const [totalNoMask, setTotalNoMask] = useState(0)
  const [numPeople, setNumPeople] = useState([])
  const [totalNumPeople, setTotalNumPeople] = useState(0)
  const [numViolation, setNumViolation] = useState([])
  const [totalNumViolation, setTotalNumViolation] = useState(0)

  const [noMaskLastWeek, setNoMaskLastWeek] = useState([])
  const [totalNoMaskLastWeek, setTotalNoMaskLastWeek] = useState(0)
  const [numPeopleLastWeek, setNumPeopleLastWeek] = useState([])
  const [totalNumPeopleLastWeek, setTotalNumPeopleLastWeek] = useState(0)
  const [numViolationLastWeek, setNumViolationLastWeek] = useState([])
  const [totalNumViolationLastWeek, setTotalNumViolationLastWeek] = useState(0)
  const [snapshot, setSnapshot] = useState(false)

  

  useEffect(()=>{
    if(noMask.length===0)
    fetch('http://localhost:4000/facemask/noMask', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            setNoMask(jsonData['data'])
            setTotalNoMask(jsonData['total'])
        })
      .catch(err => {})

    if(numPeople.length===0)
    fetch('http://localhost:4000/socialdistance/numPeople', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            setNumPeople(jsonData['data'])
            setTotalNumPeople(jsonData['total'])
        })
      .catch(err => {})

    if(numViolation.length===0)
    fetch('http://localhost:4000/socialdistance/numViolation', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            setNumViolation(jsonData['data'])
            setTotalNumViolation(jsonData['total'])
        })
      .catch(err => {})
    
      if(noMaskLastWeek.length===0)
      fetch('http://localhost:4000/facemask/noMaskLastWeek', {method:"GET"})
        .then(response => response.json())
        .then(jsonData => 
          {
              setNoMaskLastWeek(jsonData['data'])
              setTotalNoMaskLastWeek(jsonData['total'])
          })
        .catch(err => {})
  
      if(numPeopleLastWeek.length===0)
      fetch('http://localhost:4000/socialdistance/numPeopleLastWeek', {method:"GET"})
        .then(response => response.json())
        .then(jsonData => 
          {
              setNumPeopleLastWeek(jsonData['data'])
              setTotalNumPeopleLastWeek(jsonData['total'])
          })
        .catch(err => {})
  
      if(numViolationLastWeek.length===0)
      fetch('http://localhost:4000/socialdistance/numViolationLastWeek', {method:"GET"})
        .then(response => response.json())
        .then(jsonData => 
          {
              setNumViolationLastWeek(jsonData['data'])
              setTotalNumViolationLastWeek(jsonData['total'])
          })
        .catch(err => {})
          
      if(noMask.length && numPeople.length && numViolation.length && !snapshot){
        database.ref('Snapshot/').set(
          {
            noMask: noMask,
            numPeople: numPeople,
            numViolation: numViolation,
            lastUpdate: Date.now()
          }
        )
        .catch(error =>{
          console.log(error.message)
        })
        setSnapshot(true)
    }
     })


  
  return (
    <div className="home">
      <FeaturedInfo 
        titles={["Crowd","No Mask","No Social Distance"]}
        values={[totalNumPeople, totalNoMask, totalNumViolation]}
        oldValues={[totalNumPeopleLastWeek, totalNoMaskLastWeek, totalNumViolationLastWeek]}
        clause="Compared to Last Week"
      />
      <Chart data={numPeople} title="Number Of People" grid dataKey="Total"/>
      <Chart data={noMask} title="People Without Mask" grid dataKey="Total"/>
      <Chart data={numViolation} title="People Not Social Distancing" grid dataKey="Total"/>

      <Chart data={numPeopleLastWeek} title="Number Of People (Last Week)" grid dataKey="Total"/>
      <Chart data={noMaskLastWeek} title="People Without Mask (Last Week)" grid dataKey="Total"/>
      <Chart data={numViolationLastWeek} title="People Not Social Distancing (Last Week)" grid dataKey="Total"/>
    </div>
  );
}
