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
import { useMount } from 'react-use'

const SKUForm = ({setPageToDisplay, formAction, skuToDisplay}) => {
    const [numberOfBOMItems, setNumberOfBOMItems] = useState(1)
    
    const [targetSku, setTargetSku] = useState('')
    const [targetDescription, setTargetDescription] = useState('')
    const [targetBom, setTargetBom] = useState([])
    
    function handleCancelButton(formAction) {
        if (formAction === "createNewSku") {
            setPageToDisplay("skuCatalog")
        } else if (formAction === "updateSku") {
            setPageToDisplay("skuDetails")
        }
    }

    function handleSubmitButton() {

    }

    useMount(() => {
        if (formAction === "updateSku") {
            setTargetSku(skuToDisplay.SKU)
            setTargetDescription(skuToDisplay.description)
            setTargetBom(skuToDisplay.BOM)
        }
    })

    function createBOMLines(numberOfLines) {
        const numberOfBOMItemsArray = Array.from(Array(parseInt(numberOfLines)).keys())
        return (numberOfBOMItemsArray.map(bomNumber => 
            <Tr key={"SKU" + bomNumber}>
                    <Td>
                        <Input placeholder='SKU' />
                    </Td>
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
    
    /*
    console.log("Target Sku: ", targetSku)
    console.log("TargetDescription: ", targetDescription)
    console.log("Target BOM: ", targetBom)
    */

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
                                <Td>
                                    <Input 
                                        placeholder='SKU' 
                                        value={targetSku}
                                        onChange={(event) => setTargetSku(event.target.value)}
                                    />
                                </Td>
                                <Td>
                                    <Input 
                                        placeholder='Item Description'
                                        value={targetDescription}
                                        onChange={(event) => setTargetDescription(event.target.value)}
                                    />
                                </Td>
                                <Td>
                                    <Button colorScheme='red' m={2} onClick={() => handleCancelButton(formAction)}>Cancel</Button>
                                    <Button colorScheme='green' m={2} onClick={() => handleSubmitButton()}>Submit</Button>
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