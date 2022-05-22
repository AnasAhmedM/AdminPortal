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
    const [names, setName]  = useState([]);

    useEffect(()=>{
    if(data.length === 0){
      database.ref('Reports').once('value', function (snapshot) {
        let values = Object.keys(snapshot.val()).map((e) =>{
           let current = snapshot.val()[e]
           current['id'] = e
          return current
        })
        setData(values)
      });
    }
    }, [])

    const handleDelete = (id) => {
        setData(data.filter(e =>  e.id != id))
    }

    const markRead = (id) => {
      database.ref(`Reports/${id}/read`).set(true)
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
            width: 400,
          },
          {
            field: "reporter",
            headerName: "Coordinator",
            width: 400,
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
                      pathname: "/admin/coordinatorReport/" + params.row.id,
                      state : params.row
                    }
                  }>
                    <button className="coordinatorListEdit" onClick={()=>markRead(params.row.id)}>Read</button>
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
            />
        </div>
    )
}