import Supplier from "./Supplier"
import { useState } from "react"
import {AgGridReact} from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

function getData(suppliers) {
    let data = []
    data = suppliers.map((supplier) => {
            return  ({
                supplier: supplier.description,
                id: supplier.supplierID,
                location: supplier.location,
                deposit: supplier.paymentTerms.deposit,
                balance: supplier.paymentTerms.balance,
                paymentDate: supplier.paymentTerms.daysAfterPickup
            })
        
    })
    return data

}



const Suppliers = ({suppliers}) => {

    const rowData = getData(suppliers)
    //console.log(rowData);

    const [columnDefs] = useState([
    { field: "supplier" },
    { field: "id" },
    { field: "location" },
    { field: "deposit" },
    { field: "balance" },
    { field: "paymentDate" }
    ])
    /*
    """To be included if the Ag Grid React situation doesnt fit the use case later on"""
        suppliers.map((supplier, i) => 
            <Supplier key={"Supplier" + supplier.description} supplier={supplier} />
        )
    */
    return (
        
        <div className="ag-theme-alpine" style={{height: 400, width: 1200}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>

    )
}

export default Suppliers