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
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text
  } from '@chakra-ui/react'
import { useState } from 'react'

const SKUForm = () => {

    const [numberOfBOMItems, setNumberOfBOMItems] = useState(1)
    console.log(numberOfBOMItems)

    function createBOMLines(numberOfLines) {
        const numberOfBOMItemsArray = Array.from(Array(parseInt(numberOfLines)).keys())
        console.log(numberOfBOMItemsArray)
        return (numberOfBOMItemsArray.map(bomNumber => 
            <Tr key={"SKU" + bomNumber}>
                    <Td><Input placeholder='SKU' /></Td>
                    <Td></Td>
                    <Td>
                        <NumberInput defaultValue={0} precision={2} step={1} >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Td>
                    <Td></Td>
                </Tr>
        )
        )
            
    }

        return (
            <div>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>SKU</Th>
                                <Th>Description</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td><Input placeholder='SKU'/></Td>
                                <Td><Input placeholder='Item Description'/></Td>
                                <Td>
                                    <Button colorScheme='red' m={2}>Cancel</Button>
                                    <Button colorScheme='green' m={2}>Submit</Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                <Text>Number of Components:</Text>
                <NumberInput value={numberOfBOMItems} step={1} min={0} maxW={125} onChange={value => setNumberOfBOMItems(value)}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>SKU</Th>
                                <Th>Description</Th>
                                <Th>Quantity</Th>
                                <Th>Units</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {createBOMLines(numberOfBOMItems)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        )
    
    

}

export default SKUForm