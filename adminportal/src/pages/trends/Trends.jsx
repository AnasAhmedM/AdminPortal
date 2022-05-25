import "./trends.css"
import {useEffect, useState} from "react";

export default function Trends(){
    const [data, setData] = useState([])

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
    })

    return(
        <div className="trends">
            <h1>Trends</h1>
            {JSON.stringify(data)}
        </div>
    )
}