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
import skuService from '../../services/skus'

//TODO: Only display 10 skus at a time, implement navigation between pages
//TODO: Implement filtering
const SKUTable = ({skusInTable, detailButtonPressed, formDisplayHandler, pageToDisplay, setPageToDisplay, warehouses, pos, skuCatalog, setSkuCatalog}) => {
    
  function skuInWarehouse(sku, warehouse) {
    return (warehouse.inventoryLevels.filter(skuInInventory => skuInInventory.SKU === sku).length > 0)
  }

  function includedInWarehouse(sku, warehouses) {
    let warehousesContainingSku = warehouses.filter(warehouse => skuInWarehouse(sku, warehouse))
    if (warehousesContainingSku.length > 0) {
      return [true, warehousesContainingSku]
    } else {
      return [false, []]
    }
  }

  function skuInPO(sku, po) {
    return (po.lines.filter(poLine => poLine.SKU === sku).length > 0)
  }

  function includedInPos(sku, pos) {
    let posContainingSku = pos.filter(po => skuInPO(sku, po))
    if (posContainingSku.length > 0) {
      return [true, posContainingSku]
    } else {
      return [false, []]
    }
  }

  function skuInBOM(sku, BOM) {
    return (BOM.filter(bomLine => bomLine.SKU === sku).length > 0)
  }

  function includedInBoms(sku, skuCatalog) {
    let bomsContainingSku = skuCatalog.filter(catalogSku => skuInBOM(sku, catalogSku.BOM))
    if (bomsContainingSku.length > 0) {
      return [true, bomsContainingSku]
    } else {
      return [false, []]
    }
  }
  //TODO: Alert user as to what PO/Warehouse/BOM this sku is contained in if it cannot be deleted. Variables are already produced in checkDeletability
  function checkDeletability(sku, warehouses, pos, skuCatalog) {
    let [inWarehouses, warehousesContaining] = includedInWarehouse(sku, warehouses)
    let [inPos, posContaining] = includedInPos(sku, pos)
    let [inBoms, bomsContaining] = includedInBoms(sku, skuCatalog)

    if (inWarehouses || inPos || inBoms) {
      return false
    } else {
      return true
    }
  }

  function deleteSku(sku, skuCatalog, setSkuCatalog) {
    skuService.del(sku.id).then(response => response.data).catch(error => console.log(error))
    setSkuCatalog(skuCatalog.filter(catalogSku => catalogSku.id !== sku.id))
    alert("Sku Successfully Deleted")
    setPageToDisplay("skuCatalog")
  }

    function handleButtonDisp(sku) {
        if (pageToDisplay === "skuCatalog") {
            return (
                <Button colorScheme='blue' onClick={() => detailButtonPressed(sku)}>Details</Button>
            )
        } else if (pageToDisplay === "skuDetails") {
          

            return (
              <div>
                <Button colorScheme='blue' m={2} onClick={() => formDisplayHandler()}>Edit</Button>
                {/*
                Only delete if not included in BOM of other goods, no outstanding POs, and not included in any warehouses
                */}
                <Button 
                  colorScheme='red' 
                  m={2}
                  onClick={() => checkDeletability(skusInTable[0].SKU,warehouses, pos, skuCatalog) ? deleteSku(skusInTable[0], skuCatalog, setSkuCatalog) : alert("Error cannot delete: This SKU is either included in the BOM of another good, contained in an outstanding PO, or included in a warehouse's inventory")}
                  >
                    Delete
                  </Button>
                </div>
            )
        }
    }

    return (
        <TableContainer>
          <Table>
            <TableCaption>SKU Catalog</TableCaption>
            <Thead>
              <Tr>
                <Th>SKU</Th>
                <Th>Description</Th>
                <Th>Unit</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skusInTable.filter(sku => sku.SKU !== '').map((sku, i) => 
              <Tr key={sku.description + "CatalogEntry"}>
                <Td>{sku.SKU}</Td>
                <Td>{sku.description}</Td>
                <Td>{sku.units}</Td>
                <Td>{handleButtonDisp(sku)}</Td>
              </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>SKU</Th>
                <Th>Description</Th>
                <Th>Details</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
    )

}

export default SKUTable