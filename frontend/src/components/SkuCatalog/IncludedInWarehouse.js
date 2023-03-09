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

const IncludedInWarehouse = ({warehouses, skuToDisplay}) => {

    function presentInWarehouse(warehouse, skuOfInterest) {
        if (warehouse.inventoryLevels.filter(skuInInventory => skuInInventory.SKU === skuOfInterest.SKU).length > 0) {
            return true
        } else {
            return false
        }
    }

    function includedInWarehouse(warehouses, skuOfInterest) {
        return warehouses.filter(warehouseBeingChecked => presentInWarehouse(warehouseBeingChecked, skuOfInterest))
    }

    function includedInWarehouseZeroLength(warehouses, skuOfInterest) {
        return includedInWarehouse(warehouses, skuOfInterest).length === 0
    }

    if (!includedInWarehouseZeroLength(warehouses, skuToDisplay)) {
        return (
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Warehouse</Th>
                            <Th>Quantity</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                        includedInWarehouse(warehouses, skuToDisplay).map(warehouse => 
                        <Tr key={warehouse.description + skuToDisplay.SKU + "Quantity"}>
                            <Td><Button colorScheme='blue'>{warehouse.description}</Button></Td>
                            <Td>{warehouse.inventoryLevels.filter(inventoryLine => inventoryLine.SKU === skuToDisplay.SKU)[0].quantity}</Td>
                        </Tr>    
                        )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        )
    }

}

export default IncludedInWarehouse