import { useState } from "react";
import PurchaseOrder from "./Po";
import "./Pos.css"

const Pos = ({ pos, suppliers }) => {
        
  const [displayPOdetails, setDisplayPOdetails] = useState(false)
  console.log(displayPOdetails)
  const poToDisplay = useState([])

  function getPOvalue(po) {
    let poValueArray = []
    po.lines.map((lineitem, i) => 
      poValueArray.push(lineitem.price * lineitem.quantity)
    )
    let poValue = poValueArray.reduce((partialSum, a) => partialSum + a, 0)
    return poValue
  }

  if (displayPOdetails === false) {
    return (
      <div className="rTable" key="poList">
        <div className="rTableRow" key="poListHeader">
          <div className="rTableHead" key="poListDateOpened">Date Opened</div>
          <div className="rTableHead" key="poListPONumber">PO Number</div>
          <div className="rTableHead" key="poListSupplierNumber">Supplier Number</div>
          <div className="rTableHead" key="poListSupplierName">Supplier Name</div>
          <div className="rTableHead" key="poListDescription">Description</div>
          <div className="rTableHead" key="poListValue">Value</div>
        </div>

        {pos.map((po, i) => 
        <div className="rTableRow" key={po.POnumber + "row"}>
          <div className="rTableCell" key={po.POnumber + "date"}>{po.dateOpened}</div>
          <div className="rTableCell" key={po.POnumber + "poNumber"}>{po.POnumber}</div>
          <div className="rTableCell" key={po.POnumber + "supplierID"}>{po.supplierID}</div>
          <div className="rTableCell" key={po.POnumber + "supplierName"}>{suppliers.filter(supplier => supplier.supplierID === po.supplierID)[0].description}</div>
          <div className="rTableCell" key={po.POnumber + "description"}>{po.POtitle}</div>
          <div className="rTableCell" key={po.POnumber + "value"}>{getPOvalue(po).toFixed(2)}</div>
        </div>
        )}
      </div>
    )
  }
    
}

export default Pos