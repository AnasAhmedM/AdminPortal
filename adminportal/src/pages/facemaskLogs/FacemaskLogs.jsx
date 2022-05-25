import "./logs.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function FacemaskLogs(){
    const [data, setData] = useState([]);

    useEffect(()=>{
      if(data.length===0){
        fetch('http://localhost:4000/facemask/', {method:"GET"})
          .then(response => response.json())
          .then(jsonData => 
            {
                setData(jsonData.reverse())
            })
          .catch(err => {})
      }
      });

    const handleDelete = (logID) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(
              'http://localhost:4000/facemask/delete/'+logID,{method:"DELETE"}).catch(err => {})
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

    const columns = [
        {
            field: "count",
            headerName: "Count",
            width: 200,
            formatter:"bold"
          },
          {
            field: "masked",
            headerName: "Masked",
            width: 200,
          },
          {
            field: "unmasked",
            headerName: "Unmasked",
            width: 150,
          },
          {
            field: 'timestamp',
            headerName: "Date/Time",
            type: 'dateTime',
            valueGetter: ({ value }) => {
              var d = new Date(0)
              d.setUTCSeconds(value)
              return d
            },
            width: 200,
          },
          {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
              return (
                <>
                  <DeleteOutline 
                    className="logDelete" 
                    onClick={() => handleDelete(params.row._id)}
                  />
                </>
              );
            },
          },
    ]

    return(
        <div className="logs">
          {/* {JSON.stringify(data)} */}
            <DataGrid
            rows={data}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={50}
            />
        </div>
    )
}