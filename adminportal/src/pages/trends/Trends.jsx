import "./trends.css"
import {useEffect, useState} from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfoTrends from "../../components/featuredInfoTrends/FeaturedInfoTrends";
import { Weights } from "./trends";

export default function Trends(){
    const [noMask, setNoMask] = useState([])
    const [totalNoMask, setTotalNoMask] = useState(0)
    const [numPeople, setNumPeople] = useState([])
    const [totalNumPeople, setTotalNumPeople] = useState(0)
    const [numViolation, setNumViolation] = useState([])
    const [totalNumViolation, setTotalNumViolation] = useState(0)

    useEffect(()=>{
        if(noMask.length===0)
        fetch('http://localhost:4000/facemask/noMask', {method:"GET"})
        .then(response => response.json())
        .then(jsonData => 
            {
                jsonData['data'].forEach(e=>{e['Total']+=Math.floor((e['Total'])*Weights.unmasked/100)})
                jsonData['total'] += Math.floor(jsonData['total']*Weights.unmasked/100)
                setNoMask(jsonData['data'])
                setTotalNoMask(jsonData['total'])
            })
        .catch(err => {})

        if(numPeople.length===0)
        fetch('http://localhost:4000/socialdistance/numPeople', {method:"GET"})
        .then(response => response.json())
        .then(jsonData => 
            {
                jsonData['data'].forEach(e=>{e['Total']+=Math.floor((e['Total'])*Weights.crowd/100)})
                jsonData['total'] += Math.floor(jsonData['total']*Weights.crowd/100)
                setNumPeople(jsonData['data'])
                setTotalNumPeople(jsonData['total'])
            })
        .catch(err => {})

        if(numViolation.length===0)
        fetch('http://localhost:4000/socialdistance/numViolation', {method:"GET"})
        .then(response => response.json())
        .then(jsonData => 
            {
                jsonData['data'].forEach(e=>{e['Total']+=Math.floor((e['Total'])*Weights.violation/100)})
                jsonData['total'] += Math.floor(jsonData['total']*Weights.violation/100)
                setNumViolation(jsonData['data'])
                setTotalNumViolation(jsonData['total'])
            })
        .catch(err => {})
        })


    
    return (
        <div className="trends">
        <FeaturedInfoTrends
            className="trendsWidgets" 
            titles={["Crowd","No Mask","No Social Distance"]}
            values={[totalNumPeople, totalNoMask, totalNumViolation]}
            weights={[Weights.crowd, Weights.unmasked, Weights.violation]}
            clause="Compared to Current Week"
        />
        <Chart className="trendsWidgets"  data={numPeople} title="Number Of People" grid dataKey="Total"/>
        <Chart className="trendsWidgets" data={noMask} title="People Without Mask" grid dataKey="Total"/>
        <Chart className="trendsWidgets" data={numViolation} title="People Not Social Distancing" grid dataKey="Total"/>
        </div>
    );
}