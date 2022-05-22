import "./coordinatorReports.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {auth, database} from "../../firebase/Firebase";

export default function CoordinatorReports(){
    const [data, setData] = useState([]);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => {
      clearInterval(interval);
    };
    }, []);

    useEffect(()=>{
      if(data.length===0)
      database.ref('Reports').once('value', function (snapshot) {
        if(!snapshot.val())
          return
        let values = Object.keys(snapshot.val()).map((e) =>{
           let current = snapshot.val()[e]
           current['id'] = e
          return current
        })
        setData(values)
      });
    })

    const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            database.ref(`Reports/${id}`).remove()
            .catch(error => console.log(error.message))
            setData([])
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

    const markRead = (id) => {
      database.ref(`Reports/${id}/read`).set(true)
    }

    const readToggle = (id,read) => {
      database.ref(`Reports/${id}/read`).set(read?false:true)
    }

    const columns = [
        {
            field: "title",
            headerName: "Title",
            width: 200,
            formatter:"bold"
          },
          {
            field: "description",
            headerName: "Desc",
            width: 250,
          },
          {
            field: "reporter",
            headerName: "Coordinator",
            width: 200,
          },
          {
            field: "priority",
            headerName: "Priority",
            width: 150,
          },
          {
            field: "read",
            headerName: "Status",
            type: "action",
            width: 150,
            renderCell: (params) => {
              return(
                <div>
                  <button className="coordinatorReportsReadMark" onClick={()=>{
                    readToggle(params.row.id, params.row.read)
                    setData([])
                  }}>{params.row.read? "Mark Unread": "Mark Read"}</button>
                </div>
              )
            }
          },
          {
            field: 'date',
            headerName: "Date/Time",
            type: 'dateTime',
            valueGetter: ({ value }) => value && new Date(value),
            width: 200,
          },
          {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
              return (
                <>
                  <Link to={
                    {
                      pathname: "/admin/report/" + params.row.id,
                      state : params.row
                    }
                  }>
                    <button className="coordinatorReportsOpen" onClick={()=>markRead(params.row.id)}>Open</button>
                  </Link>
                  <DeleteOutline 
                    className="coordinatorListDelete" 
                    onClick={() => handleDelete(params.row.id)}
                  />
                </>
              );
            },
          },
    ]

    return(
        <div className="coordinatorReports">
          {/* {JSON.stringify(data)} */}
            <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            sortingOrder={"priority"}
            />
        </div>
    )
}