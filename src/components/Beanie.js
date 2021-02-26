import React from 'react';
import { DataGrid } from "@material-ui/data-grid";

const Beanie = ({beanieData}) => {
  const columns = [
    { field: 'name', headerName: 'Product Name', width: 300 },
    { field: 'color', headerName: 'Color', width: 180 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 200 },
    { field: 'availability', headerName: 'Availbaility', width: 200 }
  ];

  const rows = beanieData.map((row)=>{
    let editedString = row.availability.slice(50,-31)
    return {...row, availability: editedString}
  })

    return (
      <div>
      {beanieData.length > 0 ? (
        <div style={{ height: 650, width: "70%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={30} />
        </div>
      ) : (
        <h1>Loading data, please wait...</h1>
      )}
    </div>
    );
}

export default Beanie;