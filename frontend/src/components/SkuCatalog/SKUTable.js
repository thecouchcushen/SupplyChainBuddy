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
    Input
  } from '@chakra-ui/react'
import { useState } from 'react'
import skuService from '../../services/skus'

//TODO: Only display 10 skus at a time, implement navigation between pages
const SKUTable = ({skusInTable, detailButtonPressed, formDisplayHandler, pageToDisplay, setPageToDisplay, warehouses, pos, skuCatalog, setSkuCatalog}) => {
    
  const [skuFilter, setSkuFilter] = useState('')
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [unitFilter, setUnitFilter] = useState('')



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
  //TODO: Finish implementing deletability checking and error handling? did I finish this already?
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
                <Button 
                  colorScheme='red' 
                  m={2}
                  onClick={() => checkDeletability(skusInTable[0].SKU,warehouses, pos, skuCatalog) ? deleteSku(skusInTable[0], skuCatalog, setSkuCatalog) : alert("Cannot delete this SKU if it is included in the BOM of another good, contained in an outstanding PO, or currently included in a warehouse's inventory")}
                  >
                    Delete
                  </Button>
                </div>
            )
        }
    }

    function handleFilterDisp() {
      if (pageToDisplay === "skuCatalog") {
        return (
          <Tr>
                <Th>
                  <Input
                    placeholder='Filter SKUs'
                    value={skuFilter}
                    onChange={(event) => setSkuFilter(event.target.value)}
                  />
                </Th>
                <Th>
                  <Input
                    placeholder='Filter Descriptions'
                    value={descriptionFilter}
                    onChange={(event) => setDescriptionFilter(event.target.value)}
                  />
                </Th>
                <Th>
                  <Input
                    placeholder='Filter by unit'
                    value={unitFilter}
                    onChange={(event) => setUnitFilter(event.target.value)}
                  />
                </Th>
              </Tr>
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
              {handleFilterDisp()}
            </Thead>
            <Tbody>
              {skusInTable.filter(sku => sku.SKU.toLowerCase().includes(skuFilter.toLowerCase())).filter(sku => sku.description.toLowerCase().includes(descriptionFilter.toLowerCase())).filter(sku => sku.units.toLowerCase().includes(unitFilter.toLowerCase())).map((sku, i) => 
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