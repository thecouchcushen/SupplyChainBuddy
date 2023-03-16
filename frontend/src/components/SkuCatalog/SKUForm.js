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
import { useCallback, useState } from 'react'
import { useMount } from 'react-use'
import { Select } from "chakra-react-select"
import skuService from '../../services/skus'

//TODO: Add units to form in a creatable react select element
const SKUForm = ({setPageToDisplay, formAction, skuToDisplay, skuCatalog}) => {
    
    // Establishes state variables
    
    //const [numberOfBOMItems, setNumberOfBOMItems] = useState(1)
    const [targetSku, setTargetSku] = useState('')
    const [targetDescription, setTargetDescription] = useState('')
    const [targetBom, setTargetBom] = useState([{"SKU": '', "quantity": 0}])

    // State variables to track the validation status of each input field
    // TODO: Conditional formatting/rendering to display errors if any of these are TRUE
    const [targetSkuError, setTargetSkuError] = useState(false);
    const [targetDescriptionError, setTargetDescriptionError] = useState(false);
    const [targetBomError, setTargetBomError] = useState(false);
    
    // Mounts state variables on first render if being accessed by Update instead of creating an entire new SKU. This will pass the existing information from the SKU
    useMount(() => {
        if (formAction === "updateSku") {
            setTargetSku(skuToDisplay.SKU)
            setTargetDescription(skuToDisplay.description)
            let tempBom = []
            skuToDisplay.BOM.map((bomLine, index) => tempBom.splice(index, 0, {SKU: bomLine.SKU, quantity: bomLine.quantity}))
            setTargetBom([...tempBom, {"SKU": '', "quantity": 0}])
        }
        
    })

    //Style for react-select component that ensures dropdown menu is on top of every element and is not bounded by the parent container
    const reactSelectStyles = {
        menuPortal: base => ({
          ...base,
          zIndex: 9999,
        }),
    }

    // Handle cancel button to return to previous page
    function handleCancelButton(formAction) {
        if (formAction === "createNewSku") {
            setPageToDisplay("skuCatalog")
        } else if (formAction === "updateSku") {
            setPageToDisplay("skuDetails")
        }
        
    }

    //TODO: Implement submit for create/update to the server
    function handleSubmitButton() {
        let hasError = false
        
        /*  TargetSKU error handling:
            If update: validate that the targetSKU is equal to the original SKU to display
            If create: validate that the targetSKU does not already exist in the SKUcatalog
            For both, validate that the length of the targetSKu is not 0
        */
        if (targetSku === '' || (targetSku !== skuToDisplay.SKU && formAction === "updateSku") || (skuCatalog.filter(skuObject => skuObject.SKU === targetSku).length > 0 && formAction === "createNewSku")) {
            setTargetSkuError(true)
            hasError = true
        } else {
            setTargetSkuError(false)
        }
        /*  TargetDescription error handling
            If update: validate that the target description is EITHER the same one that you are starting with or if it is different, it cannot be the same as any other description in the catalog
            If create: validate that the descipriton is not the same as any other description in the catalog
            for both, validate that the length of the description is not 0
        */
        if (targetDescription === '' || (targetDescription !== skuToDisplay.description && skuCatalog.filter(skuObject => skuObject.description === targetDescription).length > 0 && formAction === "updateSku") || (skuCatalog.filter(skuObject => skuObject.description === targetDescription).length > 0 && formAction === "createNewSku")) {
            setTargetDescriptionError(true)
            hasError = true
        } else {
            setTargetDescriptionError(false)
        }
        /*BOM error handling
        Implement BOM error handling - BOM either has to be NULL OR every item in BOM has a quantity is greater than 0. 
        */
        let targetBomToSubmit = [...targetBom]
        targetBomToSubmit.splice(targetBom.length - 1, 1)
        //console.log(targetBomToSubmit)
        
        const arrayOfQuantities = targetBomToSubmit.map(bomLine => bomLine.quantity)
        const arrayOfSkus = targetBomToSubmit.map(bomLine => bomLine.SKU)
        //console.log('arrayOfQuantities', arrayOfQuantities)
        //console.log('arrayOfSkus', arrayOfSkus)

        if (targetBomToSubmit.length === 0 || (arrayOfQuantities.every(el => el > 0) && !arrayOfSkus.includes(targetSku)) ) {
            setTargetBomError(false)
        } else {
            setTargetBomError(true)
            hasError = true
        }

        if (!hasError) {
            console.log("submitting form...");
            console.log(targetBomToSubmit)

        } else {
            console.log("hasError: ", hasError)
            console.log("Sku Error: ", targetSkuError )            
            console.log("Desc. Error: ", targetDescriptionError);
            console.log("BOM Error: ", targetBomError)
        }
    }

    // BOMline delete button handler to remove line from BOM
    function handleBomLineDeleteButton(index) {
        //Make sure you aren't deleting the blank line at the end (shouldn't be able to delete it so you can always add the line back)
        if (index < targetBom.length - 1) {
            const newTargetBom = [...targetBom]
            newTargetBom.splice(index, 1)
            //console.log(newTargetBom)
            setTargetBom(newTargetBom)
        }
    }

    /* Old input handler
    // Handles changes to the inputs in the BOM table. Adds new lines if last line is filled out
    function handleInputChange(event, index, column) {
        const newTargetBom = [...targetBom]
        newTargetBom[index][column] = event.target.value
        if (column === "SKU" && index === newTargetBom.length - 1) {
            newTargetBom.push({"SKU": "", "quantity": 0})
        }
        setTargetBom(newTargetBom)
    }
    */
    
    function handleNumberInputChange(bomLineSku, value) {
        let newBom = [...targetBom]
        let indexOfQuantityChangingSKU = newBom.findIndex(bomLine => bomLine.SKU === bomLineSku)
        newBom[indexOfQuantityChangingSKU].quantity = Number(value)
        setTargetBom(newBom)
        //console.log(targetBom)
    }
    
    function handleSelectChange(option, index, column) {
        //console.log(option)
        const newTargetBom = [...targetBom]
        newTargetBom[index][column] = option.value
        if (column === "SKU" && index === newTargetBom.length - 1) {
            newTargetBom.push({"SKU": "", "quantity": 0})
        }
        //const arrayOfSkus = targetBom.map(bomLine => bomLine.SKU)
        
        setTargetBom(newTargetBom)
    }

    function getSkuCatalogArray(skuCatalog, targetBom) {
        let tempTargetBom = targetBom.map(sku => sku.SKU)
        //BOM Cant have one SKU multiple times. Cant have targetSku as a bomItem
        let tempSkuCatalog = skuCatalog.filter(sku => !tempTargetBom.includes(sku.SKU)).filter(sku => targetSku !== sku.SKU)
        const selectOptionsArray = tempSkuCatalog.map(sku => ({label: sku.SKU, value: sku.SKU}))
        return selectOptionsArray
    }
    //console.log(getSkuCatalogArray(skuCatalog))

    //Finds the description of a SKU from the SKucatalog and the SKU
    function handleDescriptionFind(bomLineSku, allSkus) {
        if (allSkus.filter(sku => sku.SKU === bomLineSku).length > 0) {
            return allSkus.filter(sku => sku.SKU === bomLineSku)[0].description
        }
    }

    function handleUnitFind(bomLineSku, allSkus) {
        if (allSkus.filter(sku => sku.SKU === bomLineSku).length > 0) {
            return allSkus.filter(sku => sku.SKU === bomLineSku)[0].units
        }
    }

        return (
            <div>
                {/* Renders SKU and Description at top of page*/}
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

                <TableContainer>
                    {/* Renders BOM table in form to add or remove items from BOM  */}
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>SKU</Th>
                                <Th>Description</Th>
                                <Th>Quantity</Th>
                                <Th>Units</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {targetBom.map((bomLine, index) => (
                                <Tr key={"BomLine" + index}>
                                    {/*console.log(bomLine)*/}
                                    <Td>
                                        {/* The styles, menuPortalTarget, and menuPosition props ensure that the dropdown menu isnt cut off by the parent container (an issue I was running into)*/}
                                        <Select 
                                            placeholder='SKU'
                                            value={{"label": bomLine.SKU, "value": bomLine.SKU}}
                                            onChange={(option) => handleSelectChange(option, index, "SKU")}
                                            options={getSkuCatalogArray(skuCatalog,targetBom)}
                                            styles={reactSelectStyles}
                                            menuPortalTarget={document.body}
                                            menuPosition={'fixed'}
                                        />
                                    </Td>
                                    <Td>{handleDescriptionFind(bomLine.SKU, skuCatalog)}</Td>
                                    <Td>
                                        <NumberInput 
                                            value={bomLine.quantity}
                                            onChange={value => handleNumberInputChange(bomLine.SKU, value)}
                                            precision={2} 
                                            step={1} 
                                            min={0} >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Td>
                                    <Td>{handleUnitFind(bomLine.SKU, skuCatalog)}</Td>
                                    <Td>
                                        <Button 
                                            colorScheme='red' 
                                            m={2}
                                            onClick={() => handleBomLineDeleteButton(index)}
                                        >Delete</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                
            </div>
        )
}

export default SKUForm