import { useState } from "react";
import PurchaseOrder from "./Po";
import "./Pos.css"

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
  Button
} from '@chakra-ui/react'

const Pos = ({ pos, suppliers }) => {
        
  const [displayPOdetails, setDisplayPOdetails] = useState(false)
  const [poToDisplay, setPoToDisplay] = useState(pos[0])

  function getPOvalue(po) {
    let poValueArray = []
    po.lines.map((lineitem, i) => 
      poValueArray.push(lineitem.price * lineitem.quantity)
    )
    let poValue = poValueArray.reduce((partialSum, a) => partialSum + a, 0)
    return poValue
  }

  function displayPo(po) {
    setDisplayPOdetails(true)
    setPoToDisplay(po)
  }

  if (displayPOdetails === false) {
    return (
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>PO Catalog</TableCaption>
          <Thead>
            <Tr>
              <Th>Date Opened</Th>
              <Th>PO Number</Th>
              <Th>Supplier ID</Th>
              <Th>Supplier Name</Th>
              <Th>Description</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pos.map((po, i) => 
            <Tr key={"PO" + po.POnumber}>
              <Td>{po.dateOpened}</Td>
              <Td><Button colorScheme='blue' onClick={() => displayPo(po)}>{po.POnumber}</Button></Td>
              <Td>{po.supplierID}</Td>
              <Td>{suppliers.filter(supplier => supplier.supplierID === po.supplierID)[0].description}</Td>
              <Td>{po.POtitle}</Td>
              <Td>{getPOvalue(po).toFixed(2)}</Td>
            </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
                <Th>Date Opened</Th>
                <Th>PO Number</Th>
                <Th>Supplier ID</Th>
                <Th>Supplier Name</Th>
                <Th>Description</Th>
                <Th>Value</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      
    )
  } else if (displayPOdetails === true) {
    return (
      <div>
        <Button colorScheme='blue' onClick={() => setDisplayPOdetails(false)}>Back to PO Catalog</Button>
        <PurchaseOrder po={poToDisplay} />
      </div>
    )
  }
    
}

export default Pos