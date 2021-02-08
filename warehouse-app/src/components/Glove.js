import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

const Glove = (props) => {
    const columns=[
        { Header:'Product Name',
         accessor:'product'
        },
        { Header:'Availability',
            accessor:'available'
        }
    ];

    const data = [{
        "product": "Myproduct",
        "available": "In stock"
      },
    {
        "product": "Other product",
        "available": "Out of stock"
    }]

    const filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        const content = row[id];
        if (typeof content !== 'undefined') {
            // filter by text in the table or if it's a object, filter by key
            if (typeof content === 'object' && content !== null && content.key) {
                return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
            } else {
                return String(content).toLowerCase().includes(filter.value.toLowerCase());
            }
        }
        return true;
    }

    return (
        <div>
           <ReactTable 
                data={data} 
                columns={columns}
                filterable={true}
                defaultPageSize={10}
                defaultFilterMethod={filterCaseInsensitive}/>
        </div>
    );
}

export default Glove;