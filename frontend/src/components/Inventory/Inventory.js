import Warehouse from "./Warehouse"
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
  } from '@chakra-ui/react'
import { useState } from "react"

/*
inventory.map((warehouse, i) => <Warehouse key={"Warehouse" + warehouse.warehouseID} warehouse={warehouse} /> )
*/

const Inventory = ({inventory}) => {

    const [displayWarehouseDetails, setDisplayWarehouseDetails] = useState(false)
    const [currentWarehouse, setCurrentWarehouse] = useState(inventory[0])

    function buttonPressed (warehouse) {
        setDisplayWarehouseDetails(true)
        setCurrentWarehouse(warehouse)
    }

    if (displayWarehouseDetails === false) {
        return (
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Warehouses</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Warehouse Description</Th>
                            <Th>Warehouse ID</Th>
                            <Th>Location</Th>
                            <Th>Inventory Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {inventory.map((warehouse, i) => 
                        <Tr key={warehouse.description + "inventory"}>
                            <Td>{warehouse.description}</Td>
                            <Td>{warehouse.warehouseID}</Td>
                            <Td>Location</Td>
                            <Td><Button colorScheme='blue' onClick={() => buttonPressed(warehouse)}>Inventory Levels</Button></Td>
                        </Tr>
                        )}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Warehouse Description</Th>
                            <Th>Warehouse ID</Th>
                            <Th>Location</Th>
                            <Th>Inventory Details</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            
            )
    } else if (displayWarehouseDetails === true) {
        return (
            <div>
                <Button colorScheme='blue' onClick={() => setDisplayWarehouseDetails(false)}>Back to warehouse catalog</Button>
                <TableContainer>
                    <Table>
                        <TableCaption>{currentWarehouse.description} Inventory Levels</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>SKU</Th>
                                <Th>Quantity</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentWarehouse.inventoryLevels.map((inventoryItem, i) => 
                            <Tr key={currentWarehouse.description + inventoryItem.SKU + "inventory"}>
                                <Td>{inventoryItem.SKU}</Td>
                                <Td>{inventoryItem.quantity}</Td>
                            </Tr>
                            )}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>SKU</Th>
                                <Th>Quantity</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </div>
        )
    }
    
    
}

export default Inventory