import "./writeReport.css";
import React, {useState, useEffect} from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {database} from "../../firebase/Firebase";
import Select from 'react-select'

export default function WriteReport() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [selected, setSeleted] = useState([]);
    const [priority, setPriority] = useState("Low");
    const [data, setData] = useState([]);
    const priorityOptions = [
        {value: 'high', label: 'High'},
        {value: 'medium', label: 'Medium'},
        {value: 'low', label: 'Low'}]

    useEffect(()=>{
        if(data.length === 0){
          database.ref('Coordinators').once('value', function (snapshot) {
            let values = Object.keys(snapshot.val()).map((e) =>{
              return {value: snapshot.val()[e]['id'], label:  snapshot.val()[e]['name']}
            })
            setData(values)
          });
        }
      }, [])
  
    const handleSubmit = (event) => {
        event.preventDefault()

        if(selected.length===0){
            confirmAlert({
                title: 'No Coordinator Selected!',
                message: 'Please select at least one coordinator.',
                buttons: [
                  {
                    label: 'Okay',
                    onClick: () => {
                        return
                    }
                  }
                ]
              });
        }

        confirmAlert({
            title: 'Are you sure you want to send this report?',
            message: '',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    let report = {
                        title: title,
                        description: desc,
                        priority: priority,
                        read : false,
                        date : Date.now()
                    }
                    selected.forEach(element => {
                        database.ref(`Coordinators/${element['value']}/reports`).push(report)
                        .catch(error =>{
                        console.log(error.message)
                        })
                    });

                    setTitle("")
                    setDesc("")
                    setPriority("Low")
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
    }

    return(
        <div className="writeReport">
            <h1 className="writeReportTitle">Write Report</h1>
            <form onSubmit={handleSubmit} className="writeReportForm">
                <div className="writeReportFormItem">
                    <label>Title</label>
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </div>
                <div className="writeReportFormItem">
                    <label>Description</label>
                    <textarea type="textarea" required value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
                </div>
                <div className="writeReportFormItem">
                    <label>Coordinators</label>
                    <Select isMulti options={data} onChange={(e) => setSeleted(e)}/>
                </div>
                <div className="writeReportFormItem">
                    <label>Priority</label>
                    <Select options={priorityOptions} onChange={(e) => setPriority(e.value)}/>
                </div>
                <button className="writeReportFormButton">Send</button>
            </form>
        </div>
    )
}