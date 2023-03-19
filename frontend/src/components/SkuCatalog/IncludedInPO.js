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

const IncludedInPO = ({pos, skuToDisplay}) => {

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

    function includedInPoZeroLength(poCatalog, skuOfInterest) {
        return (includedInPO(poCatalog, skuOfInterest).length === 0)
    }

    if (!includedInPoZeroLength(pos, skuToDisplay)) {
        //TODO: PONumber should be clickable and take you to the PO in the POtable
        return (
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
        )
    }
}

export default IncludedInPO