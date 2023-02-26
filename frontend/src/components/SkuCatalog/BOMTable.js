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

const BOMTable = ({billOfMaterials}) => {
    //console.log(billOfMaterials)
    
    function bomZeroLength(billOfMaterials) {
        return (billOfMaterials.length === 0)
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
                    </Tr>
                    </Thead>
                    <Tbody>
                    {billOfMaterials.map(bomLine => 
                        <Tr key={"BOMitem" + bomLine.SKU}>
                        <Td>{bomLine.SKU}</Td>
                        <Td>{bomLine.quantity}</Td>
                        </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        )
    }

}

export default BOMTable