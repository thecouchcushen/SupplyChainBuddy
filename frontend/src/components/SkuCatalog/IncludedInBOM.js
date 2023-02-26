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

const IncludedInBom = ({skuToDisplay, skuCatalog}) => {

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

    function includedInBomZeroLength(skuCatalog, skuOfInterest) {
        return (includedInBom(skuCatalog, skuOfInterest).length === 0)
    }

    if (!includedInBomZeroLength(skuCatalog, skuToDisplay)) {
        return (
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
                    {includedInBom(skuCatalog,skuToDisplay).map(sku => 
                        <Tr key={sku.SKU + "includes" + skuToDisplay.SKU}>
                        <Td>{sku.SKU}</Td>
                        <Td>{sku.description}</Td>
                        </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        )
    }
    
}

export default IncludedInBom