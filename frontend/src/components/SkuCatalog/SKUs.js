import { useState } from "react";
import SKUTable from "./SKUTable";
import BOMTable from "./BOMTable";
import IncludedInPO from "./IncludedInPO";
import IncludedInBom from "./IncludedInBOM";
import IncludedInWarehouse from "./IncludedInWarehouse";
import SKUForm from "./SKUForm";
import { Button } from '@chakra-ui/react' 

const SkuCatalog = ({ skus, setSkus, pos, warehouses }) => {
  const [pageToDisplay, setPageToDisplay] = useState("skuCatalog")
  const [skuToDisplay, setSkuToDisplay] = useState("none")
  const [formAction, setFormAction] = useState("createNewSku")

  function detailButtonPressed(sku) {
    setPageToDisplay("skuDetails")
    setSkuToDisplay(sku)
  }

  function formDisplayHandler() {
    setPageToDisplay("SkuForm")
    if (pageToDisplay === "skuCatalog") {
      setFormAction("createNewSku")
    } else if (pageToDisplay === "skuDetails") {
      setFormAction("updateSku")
    }
  }

    //Nothing Selected
    
    if (pageToDisplay === "skuCatalog") {
      return (
        <div>
          <Button colorScheme='blue' m={2} onClick={() => formDisplayHandler()}>New SKU</Button>
          <SKUTable skusInTable={skus} setSkuCatalog={setSkus} detailButtonPressed={detailButtonPressed} pageToDisplay={pageToDisplay} setPageToDisplay={setPageToDisplay} warehouses={warehouses} pos={pos} skuCatalog={skus}></SKUTable>
        </div>
      )
    } 
    //Sku is selected
    else if (pageToDisplay === "skuDetails") {
      //console.log(skuToDisplay.BOM)
      //console.log("skUToDisplay", skuToDisplay)
      return (
        <div>
        <Button colorScheme='blue' m={2} onClick={() => setPageToDisplay("skuCatalog")}>Return to Full Catalog</Button>
        <SKUTable skusInTable={[skuToDisplay]} setSkuCatalog={setSkus} detailButtonPressed={detailButtonPressed} pageToDisplay={pageToDisplay} setPageToDisplay={setPageToDisplay} formDisplayHandler={formDisplayHandler} warehouses={warehouses} pos={pos} skuCatalog={skus}></SKUTable>
        <BOMTable billOfMaterials={skuToDisplay.BOM} skuCatalog={skus}></BOMTable>
        <IncludedInBom skuToDisplay={skuToDisplay} skuCatalog={skus}></IncludedInBom>
        <IncludedInPO pos={pos} skuToDisplay={skuToDisplay}></IncludedInPO>
        <IncludedInWarehouse warehouses={warehouses} skuToDisplay={skuToDisplay} ></IncludedInWarehouse>
        
        </div>
      )
    } else if (pageToDisplay === "SkuForm") {
      return (
        <div>
        <SKUForm setPageToDisplay={setPageToDisplay} formAction={formAction} skuToDisplay={skuToDisplay} setSkuToDisplay={setSkuToDisplay} skuCatalog={skus} setSkuCatalog={setSkus}></SKUForm>
        </div>
      )
    }

}

export default SkuCatalog