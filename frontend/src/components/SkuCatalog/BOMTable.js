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

const BOMTable = ({billOfMaterials, skuCatalog}) => {
    //console.log(billOfMaterials)
    
    function bomZeroLength(billOfMaterials) {
        return (billOfMaterials.length === 0)
    }

    function handleUnitFind(bomLineSku, skuCatalog) {
        return skuCatalog.filter(sku => sku.SKU === bomLineSku)[0].units
    }

    if (!bomZeroLength(billOfMaterials)) {
        return (
            <TableContainer>
                <Table>
                    <TableCaption>Bill of Materials</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>SKU</Th>
                        <Th>Quantity</Th>
                        <Th>Unit</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {billOfMaterials.map(bomLine => 
                        <Tr key={"BOMitem" + bomLine.SKU}>
                        <Td>{bomLine.SKU}</Td>
                        <Td>{bomLine.quantity}</Td>
                        <Td>{handleUnitFind(bomLine.SKU, skuCatalog)}</Td>
                        </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        )
    }

}

export default BOMTable