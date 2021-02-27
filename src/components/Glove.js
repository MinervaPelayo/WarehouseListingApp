import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const Glove = ({ gloveData }) => {
  const columns = [
    { field: 'name', headerName: 'Product Name', width: 300 },
    { field: 'color', headerName: 'Color', width: 180 },
    { field: 'price', headerName: 'Price', width: 140 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 200 },
    { field: 'availability', headerName: 'Availbaility', width: 200 },
  ];
  
  return (
    <div>
      {gloveData.length > 0 ? (
        <div style={{ height: 650, width: '70%' }}>
          <DataGrid rows={gloveData} columns={columns} pageSize={30} />
        </div>
      ) : (
        <h1>Loading data, please wait...</h1>
      )}
    </div>
  );
};

export default Glove;
