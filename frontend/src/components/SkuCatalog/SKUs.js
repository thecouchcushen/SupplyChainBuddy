import { useState } from "react";
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
  Button,
} from '@chakra-ui/react'
import SKUTable from "./SKUTable";
import BOMTable from "./BOMTable";
import IncludedInPO from "./IncludedInPO";
import IncludedInBom from "./IncludedInBOM";

const SkuCatalog = ({ skus, pos }) => {

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
        </div>
      )
    } 

}

export default SkuCatalog