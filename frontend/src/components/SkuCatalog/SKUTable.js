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

//TODO: Only display 10 skus at a time, implement navigation between pages
//TODO: Implement filtering
//TODO: Display units
const SKUTable = ({skusInTable, detailButtonPressed, formDisplayHandler, pageToDisplay}) => {
    //console.log(skusInTable)
    function handleButtonDisp(sku) {
        if (pageToDisplay === "skuCatalog") {
            return (
                <Button colorScheme='blue' onClick={() => detailButtonPressed(sku)}>Details</Button>
            )
        } else if (pageToDisplay === "skuDetails") {
            return (
              <div>
                <Button colorScheme='blue' m={2} onClick={() => formDisplayHandler()}>Edit</Button>
                {/* TODO: Implement delete function*/}
                <Button colorScheme='red' m={2}>Delete</Button>
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
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skusInTable.filter(sku => sku.SKU !== '').map((sku, i) => 
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