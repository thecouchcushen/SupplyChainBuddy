import {AgGridReact} from 'ag-grid-react'
import { useState } from 'react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const FillPlan = ({supplierEntry, pos, inventory, supplierID, warehouseID}) => {

    const supplierPOs = pos.filter(po => po.supplierID === supplierID)
    console.log("Supplier POs", supplierPOs);

    const supplierInventory = inventory.filter(warehouse => warehouse.warehouseID === warehouseID)
    console.log("Inventory", supplierInventory);

    let poLines = [];
    pos.map(po => po.lines.map(line => poLines.push(line)))
    console.log("PO Lines", poLines);
    const supplierInboundPOs = poLines.filter(line => line.destination === warehouseID)

    console.log("Supplier Inbound POs", supplierInboundPOs);

    let supplierInbounds = []
    supplierInboundPOs.map(inboundPOline => supplierInbounds.push({
        quantity: inboundPOline.quantity,
        sku: inboundPOline.SKU,
        dueDate: new Date(inboundPOline.dueDate),
        shipTime: inboundPOline.shipTime,
    }))

    console.log("SupplierInbounds", supplierInbounds);

    const [rowData] = useState([
        {
            SKU: "323-21130A",
            'Inventory Action': "Fills", 
            July: 25000,
        },
        {
            SKU: "323-21130",
            'Inventory Action': "Fills", 
            July: 10000
        },
        {
            'Inventory Action': 'BOM'
        },
        {
            SKU: "323-10030B",
            "Inventory Action": "Qty. in Inventory",
            January: 3930,
            March: 3930+32004,
            July: 3930+32004-25000
        },
        {
            SKU: "323-10030B",
            "Inventory Action": "Inbounds",
            March: 32004
        },
        {
            SKU: "323-10030C",
            "Inventory Action": "Qty. in Inventory",
            January: 1232,
            March: 1232+32076,
            July: 1232+32076-25000
        },
        {
            SKU: "323-10030C",
            "Inventory Action": "Inbounds",
            March: 32076
        },
        {
            SKU: "323-10030PB",
            "Inventory Action": "Qty. in Inventory",
            January: 37282,
            July: 37282-25000
        },
        {
            SKU: "323-10030PB",
            "Inventory Action": "Inbounds"
        },
        {
            SKU: "323-10030PT",
            "Inventory Action": "Qty. in Inventory",
            January: 37282,
            July: 37282-25000
        },
        {
            SKU: "323-10030PT",
            "Inventory Action": "Inbounds"
        },
        {
            SKU: "323-21130B",
            "Inventory Action": "Qty. in Inventory",
            January: 285,
            March: 285+39200,
            July: 285+39200-25000-10000
        },
        {
            SKU: "323-21130B",
            "Inventory Action": "Inbounds",
            March: 39200
        },
        {
            SKU: "323-21130C",
            "Inventory Action": "Qty. in Inventory",
            January: 3976,
            April: 3976+10000,
            July: 3976+10000-10000
        },
        {
            SKU: "323-21130C",
            "Inventory Action": "Inbounds",
            April: 10000
        },
        {
            SKU: "323-21130P",
            "Inventory Action": "Qty. in Inventory",
            January: 11487,
            April: 11487+8000,
            July: 11487+8000-10000
        },
        {
            SKU: "323-21130P",
            "Inventory Action": "Inbounds",
            February: 8000
        },
        {
            SKU: "323-21130AP",
            "Inventory Action": "Qty. in Inventory",
            January: 34298,
            July: 34298-25000
        },
        {
            SKU: "323-21130AP",
            "Inventory Action": "Inbounds"
        }
          
    ])

    const [columnDefs] = useState([
        { field: 'Inventory Action' },
        { field: 'SKU'},
        { field: 'January' },
        { field: 'February' },
        { field: 'March' },
        { field: 'April' },
        { field: 'May' },
        { field: 'June' },
        { field: 'July' },
        { field: 'August' },
        { field: 'September' },
        { field: 'October'},
        { field: 'November'},
        { field: 'December'}
    ])

    return (
        <div className="ag-theme-alpine" style={{height: 800, width: 1800}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );

}

export default FillPlan