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


const SKUTable = ({skusInTable, buttonPressed, dispSkuDetails, setDispSkuDetails}) => {
    //console.log(skusInTable)
    function handleButtonDisp(sku) {
        if (dispSkuDetails === false) {
            return (
                <Button colorScheme='blue' onClick={() => buttonPressed(sku)}>Details</Button>
            )
        } else if (dispSkuDetails === true) {
            return (
                <Button colorScheme='blue' onClick={() => setDispSkuDetails(false)}>Return to Full List</Button>
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
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skusInTable.map((sku, i) => 
              <Tr key={sku.description + "CatalogEntry"}>
                <Td>{sku.SKU}</Td>
                <Td>{sku.description}</Td>
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