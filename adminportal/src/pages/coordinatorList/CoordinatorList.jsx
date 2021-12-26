import "./coordinatorList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { coordinatorData } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CoordinatorList() {
  const [data, setData] = useState(coordinatorData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
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
            <Link to={"/coordinator/" + params.row.id}>
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
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
      
  );
}
