import PoLine from './PoLine'
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
    Heading
  } from '@chakra-ui/react'

const PurchaseOrder = ({ po }) => {
    return (
        <div>
            <Heading as='h1' size='xl'>{ po.POtitle }</Heading>
            <Heading as='h2' size='lg'>PO{ po.POnumber }</Heading>
            <Heading as='h3' size='md'>Supplier: { po.supplierID }</Heading>
            <TableContainer>
                <Table>
                    <TableCaption>PO{po.POnumber}</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>SKU</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Due Date</Th>
                            <Th>Status</Th>
                            <Th>Destination</Th>
                            <Th>Shipping Time (est)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {po.lines.map((line, i) => 
                        <Tr key={"PO" + po.POnumber + "SKU" + line.SKU + "to" + line.destination}>
                            <Td>{line.SKU}</Td>
                            <Td>{line.price}</Td>
                            <Td>{line.quantity}</Td>
                            <Td>{line.dueDate}</Td>
                            <Td>{line.status}</Td>
                            <Td>{line.destination} by way of {line.shipMethod}</Td>
                            <Td>{line.shipTime} days</Td>
                        </Tr>
                        )}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>SKU</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Due Date</Th>
                            <Th>Status</Th>
                            <Th>Destination</Th>
                            <Th>Shipping Time (est)</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            
        </div>
    )
}

export default PurchaseOrder