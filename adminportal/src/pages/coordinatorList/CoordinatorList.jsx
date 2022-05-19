import "./coordinatorList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {auth, database} from "../../firebase/Firebase";

export default function CoordinatorList() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    if(data.length === 0){
      database.ref('Coordinators').once('value', function (snapshot) {
        let values = Object.keys(snapshot.val()).map((e) =>{
          return snapshot.val()[e]
        })
        setData(values)
      });
    }
  }, [])

  const handleDelete = (uid, email, password) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            database.ref(`Coordinators/${uid}`).remove()
            .catch(error => console.log(error.message))
            auth
              .deleteUser(uid)
              .then(() => {
                console.log('Successfully deleted user');
              })
              .catch((error) => {
                console.log('Error deleting user:', error);
              });
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
      field: "username",
      headerName: "Username",
      width: 200,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "department",
      headerName: "Department",
      width: 200,
    },
    {
      field: "responsibilities",
      headerName: "Responsibilities",
      width: 250,
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
                pathname: "/admin/coordinator/" + params.row.username,
                state : params.row
              }
            }>
              <button className="coordinatorListEdit">Edit</button>
            </Link>
            <DeleteOutline 
              className="coordinatorListDelete" 
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    
      <div className="coordinatorList">
        {/* {JSON.stringify(data)} */}
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
        />
      </div>
      
  );
}
