import Supplier from "./Supplier"
import { useState } from "react"
//import {AgGridReact} from 'ag-grid-react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

/*
AG GRID REACT DATA PULLING HELPER FUNCTION
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
*/


const Suppliers = ({suppliers}) => {
    /*
    AG GRID REACT 
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

    
        <div className="ag-theme-alpine" style={{height: 400, width: 1200}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    */
    /*
    """To be included if the Ag Grid React situation doesnt fit the use case later on"""
        suppliers.map((supplier, i) => 
            <Supplier key={"Supplier" + supplier.description} supplier={supplier} />
        )
    */
    //TODO: Form for new Supplier
    //TODO: Supplier details page that has all of the POs (open, closed) for the supplier
    
    return (
        
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Supplier Catalog</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Supplier</Th>
                        <Th>Supplier ID</Th>
                        <Th>Location</Th>
                        <Th>Deposit</Th>
                        <Th>Balance</Th>
                        <Th>Payment Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {suppliers.map((supplier, i) => 
                    <Tr key={supplier.description + "TableEntry"}>
                        <Td>{supplier.description}</Td>
                        <Td>{supplier.supplierID}</Td>
                        <Td>{supplier.description}</Td>
                        <Td>{supplier.paymentTerms.deposit}</Td>
                        <Td>{supplier.paymentTerms.balance}</Td>
                        <Td>{supplier.paymentTerms.daysAfterPickup}</Td>
                    </Tr>
                    )}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>Supplier</Th>
                        <Th>Supplier ID</Th>
                        <Th>Location</Th>
                        <Th>Deposit</Th>
                        <Th>Balance</Th>
                        <Th>Payment Date</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>

    )
}

export default Suppliers