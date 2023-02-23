import { useState } from "react";
import SkuEntry from "./SKU";
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
  ButtonGroup,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,

} from '@chakra-ui/react'

const SkuCatalog = ({ skus, pos }) => {

  const [dispSkuDetails, setDispSkuDetails] = useState(false)
  const [skuToDisplay, setSkuToDisplay] = useState("none")

  function presentInBom(skuOfInterest, skuWithBomToCheck) {
    if (skuWithBomToCheck.BOM.filter(bomLine => bomLine.SKU === skuOfInterest.SKU).length > 0) {
      return true
    } else {
      return false
    }
  }

  function includedInBom(skuCatalog, skuOfInterest) {
    return skuCatalog.filter(skuBeingChecked => presentInBom(skuOfInterest, skuBeingChecked))
  }

  function presentInPO(skuOfInterest, poToCheck) {
    if (poToCheck.lines.filter(poLine => poLine.SKU === skuOfInterest.SKU).length > 0) {
      return true
    } else {
      return false
    }
  }

  function includedInPO (poCatalog, skuOfInterest) {
    return poCatalog.filter(poBeingChecked => presentInPO(skuOfInterest, poBeingChecked))
  }

  function bomZeroLength(sku) {
    return (sku.BOM.length === 0)
  }

  function includedInBomZeroLength(skuCatalog, skuOfInterest) {
    return (includedInBom(skuCatalog, skuOfInterest).length === 0)
  }

  function buttonPressed(sku) {
    setDispSkuDetails(true)
    setSkuToDisplay(sku)
  }

    //Nothing Selected
    if (dispSkuDetails === false) {
      return (
        <TableContainer>
          <Table>
            <TableCaption>SKU Catalog</TableCaption>
            <Thead>
              <Tr>
                <Th>SKU</Th>
                <Th>Description</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skus.map((sku, i) => 
              <Tr key={sku.description + "CatalogEntry"}>
                <Td>{sku.SKU}</Td>
                <Td>{sku.description}</Td>
                <Td><Button colorScheme='blue' onClick={() => buttonPressed(sku)}>Details</Button></Td>
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
    //Sku is selected with a BOM of its own but is not in any other SKu's BOM (like a refill or full size finished good)
    else if (dispSkuDetails === true && !bomZeroLength(skuToDisplay) && includedInBomZeroLength(skus, skuToDisplay)) {
      return (
        <div>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>SKU</Th>
                <Th>Description</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{skuToDisplay.SKU}</Td>
                <Td>{skuToDisplay.description}</Td>
                <Td><Button colorScheme='blue'  onClick={() => setDispSkuDetails(false)} >Return to Full List</Button></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <TableCaption>Bill of Materials</TableCaption>
            <Thead>
              <Tr>
                <Th>SKU</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skuToDisplay.BOM.map(bomLine => 
                <Tr key={skuToDisplay.SKU + "BOMitem" + bomLine.SKU}>
                  <Td>{bomLine.SKU}</Td>
                  <Td>{bomLine.quantity}</Td>
                </Tr>
                )}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Date Opened</Th>
                <Th>PO Number</Th>
                <Th>Supplier ID</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                includedInPO(pos, skuToDisplay).map(po => 
                  <Tr key={skuToDisplay.SKU + "includedIn" + po.POnumber}>
                    <Td>{po.dateOpened}</Td>
                    <Td><Button colorScheme='blue'>{po.POnumber}</Button></Td>
                    <Td>{po.supplierID}</Td>
                    <Td>{po.POtitle}</Td>
                  </Tr>
                  )
              }
            </Tbody>
          </Table>
        </TableContainer>
        </div>
      )
    } 
    //Sku is selected with no BOM of its own and is in another Sku's BOM (like a bottle base)
    else if (dispSkuDetails === true && bomZeroLength(skuToDisplay) && !includedInBomZeroLength(skus, skuToDisplay)) {
      return (
      <div>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>SKU</Th>
                <Th>Description</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{skuToDisplay.SKU}</Td>
                <Td>{skuToDisplay.description}</Td>
                <Td><Button colorScheme='blue'  onClick={() => setDispSkuDetails(false)} >Return to Full List</Button></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <TableCaption>Bills of Material that include {skuToDisplay.SKU}</TableCaption>
            <Thead>
              <Tr>
                <Th>SKU</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {includedInBom(skus,skuToDisplay).map(sku => 
                <Tr key={sku.SKU + "includes" + skuToDisplay.SKU}>
                  <Td>{sku.SKU}</Td>
                  <Td>{sku.description}</Td>
                </Tr>
                )}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Date Opened</Th>
                <Th>PO Number</Th>
                <Th>Supplier ID</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                includedInPO(pos, skuToDisplay).map(po => 
                  <Tr key={skuToDisplay.SKU + "includedIn" + po.POnumber}>
                    <Td>{po.dateOpened}</Td>
                    <Td><Button colorScheme='blue'>{po.POnumber}</Button></Td>
                    <Td>{po.supplierID}</Td>
                    <Td>{po.POtitle}</Td>
                  </Tr>
                  )
              }
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      )
    } 
    // Sku is selected with a BOM of its own and is included in other BOMs
    //NOT FINISHED (this would be like an assembled Cap + Liner)
    else if (dispSkuDetails === true && !bomZeroLength(skuToDisplay) && !includedInBomZeroLength(skus, skuToDisplay)) {

    }
    //Sku is selected with no BOM of its own and is not included in other boms (this would be like an E27, or any turnkey good)
    //NOT FINISHED
    else if (dispSkuDetails === true && bomZeroLength(skuToDisplay) && includedInBomZeroLength(skus, skuToDisplay)) {

    }
}

export default SkuCatalog