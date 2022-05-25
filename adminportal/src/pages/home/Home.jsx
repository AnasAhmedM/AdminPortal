import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {useEffect, useState} from "react";
import { NumberOfPeople, PeopleNoSocialDistance } from "../../dummyData";

export default function Home() {
  const [data, setData] = useState([])
  const [PeopleWithoutMask] = useState([
    {
      name: "Sun",
      "Total": 0,
    },
    {
      name: "Mon",
      "Total": 0,
    },
    {
      name: "Tue",
      "Total": 0,
    },
    {
      name: "Wed",
      "Total": 0,
    },
    {
      name: "Thu",
      "Total": 0,
    },
    {
      name: "Fri",
      "Total": 0,
    },
    {
      name: "Sat",
      "Total": 0,
    },
  ])

  useEffect(()=>{
    if(data.length===0)
    fetch('http://localhost:4000/facemask/', {method:"GET"})
      .then(response => response.json())
      .then(jsonData => 
        {
            setData(jsonData)
            console.log(jsonData)
        })
      .catch(err => {})
      getPeopleWithoutMask()
  })

  const getPeopleWithoutMask= () =>{
    data.forEach(e=>{
      let min = new Date()
      min.setDate(min.getDate() - 7);
      let max = new Date()
      let current = new Date(0)
      current.setUTCSeconds(e['timestamp'])
      if(current<min || current> max)
        return
      PeopleWithoutMask[current.getDay()]['Total'] += e['masked']
    })
  }
  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={NumberOfPeople} title="Number Of People" grid dataKey="Total"/>
      <Chart data={PeopleWithoutMask} title="People Without Mask" grid dataKey="Total"/>
      <Chart data={PeopleNoSocialDistance} title="People Not Social Distancing" grid dataKey="Total"/>
    </div>
  );
}
