import { useState } from "react";
import SKUTable from "./SKUTable";
import BOMTable from "./BOMTable";
import IncludedInPO from "./IncludedInPO";
import IncludedInBom from "./IncludedInBOM";
import IncludedInWarehouse from "./IncludedInWarehouse";

const SkuCatalog = ({ skus, pos, warehouses }) => {

  const [dispSkuDetails, setDispSkuDetails] = useState(false)
  const [skuToDisplay, setSkuToDisplay] = useState("none")

  function buttonPressed(sku) {
    setDispSkuDetails(true)
    setSkuToDisplay(sku)
  }

    //Nothing Selected
    if (dispSkuDetails === false) {
      return (
        <SKUTable skusInTable={skus} buttonPressed={buttonPressed} dispSkuDetails={dispSkuDetails} setDispSkuDetails={setDispSkuDetails}></SKUTable>
      )
    } 
    //Sku is selected
    else if (dispSkuDetails === true) {
      //console.log(skuToDisplay.BOM)
      return (
        <div>
        <SKUTable skusInTable={[skuToDisplay]} buttonPressed={buttonPressed} dispSkuDetails={dispSkuDetails} setDispSkuDetails={setDispSkuDetails}></SKUTable>
        <BOMTable billOfMaterials={skuToDisplay.BOM}></BOMTable>
        <IncludedInBom skuToDisplay={skuToDisplay} skuCatalog={skus}></IncludedInBom>
        <IncludedInPO pos={pos} skuToDisplay={skuToDisplay}></IncludedInPO>
        <IncludedInWarehouse warehouses={warehouses} skuToDisplay={skuToDisplay} ></IncludedInWarehouse>
        </div>
      )
    } 

}

export default SkuCatalog