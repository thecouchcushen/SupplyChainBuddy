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
import { Select, CreatableSelect } from "chakra-react-select"
import skuService from '../../services/skus'

const SKUForm = ({setPageToDisplay, formAction, skuToDisplay, setSkuToDisplay, skuCatalog, setSkuCatalog}) => {
    
    // Establishes state variables
    
    //const [numberOfBOMItems, setNumberOfBOMItems] = useState(1)
    const [skuId, setSkuId] = useState(null)
    const [targetSku, setTargetSku] = useState('')
    const [targetDescription, setTargetDescription] = useState('')
    const [targetUnit, setTargetUnit] = useState('')
    const [targetBom, setTargetBom] = useState([{"SKU": '', "quantity": 0}])

    // State variables to track the validation status of each input field
    const [targetSkuError, setTargetSkuError] = useState(false);
    const [targetDescriptionError, setTargetDescriptionError] = useState(false);
    const [targetBomError, setTargetBomError] = useState(false);
    const [targetUnitError, setTargetUnitError] = useState(false);
    
    // Mounts state variables on first render if being accessed by Update instead of creating an entire new SKU. This will pass the existing information from the SKU
    useMount(() => {
        if (formAction === "updateSku") {
            setTargetSku(skuToDisplay.SKU)
            setTargetDescription(skuToDisplay.description)
            setTargetUnit(skuToDisplay.units)
            let tempBom = []
            skuToDisplay.BOM.map((bomLine, index) => tempBom.splice(index, 0, {SKU: bomLine.SKU, quantity: bomLine.quantity}))
            setTargetBom([...tempBom, {"SKU": '', "quantity": 0}])
            setSkuId(skuToDisplay.id)
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

    //The following 4 functions check the validity of the inputs to submit the form. They are taken out so that the validation/error message handling can be processed properly (although there may be a more efficient way to handle it). The errors only display if the targetXXXerror is TRUE and the checkXXXvalidity function is TRUE. this is because the targetXXXerror is only true if the FORM HAS BEEN SUBMITTED - and the checkXXXvalidity function will continuosly check if the error is still valid (i.e. if the user has updated the input after submission and fixed the error, then the error should disappear - but targetXXXerror will still be true because they havent submitted the form yet so the function needs to continuously check)
    function checkSkuValidity() {
        if (targetSku === '' || (targetSku !== skuToDisplay.SKU && formAction === "updateSku") || (skuCatalog.filter(skuObject => skuObject.SKU === targetSku).length > 0 && formAction === "createNewSku")) {
            return true
        } else {
            return false
        }
    }

    function checkDescriptionValidity() {
        if (targetDescription === '' || (targetDescription !== skuToDisplay.description && skuCatalog.filter(skuObject => skuObject.description === targetDescription).length > 0 && formAction === "updateSku") || (skuCatalog.filter(skuObject => skuObject.description === targetDescription).length > 0 && formAction === "createNewSku")) {
            return true
        } else {
            return false
        }
    }
    
    function checkUnitValidity() {
        if (targetUnit === '') {
            return true
        } else {
            return false
        }
    }

    function checkBomValidity() {
        let targetBomToSubmit = [...targetBom]
        targetBomToSubmit.splice(targetBom.length - 1, 1)
        //console.log(targetBomToSubmit)

        const arrayOfQuantities = targetBomToSubmit.map(bomLine => bomLine.quantity)
        const arrayOfSkus = targetBomToSubmit.map(bomLine => bomLine.SKU)
        //console.log('arrayOfQuantities', arrayOfQuantities)
        //console.log('arrayOfSkus', arrayOfSkus)

        if (targetBomToSubmit.length === 0 || (arrayOfQuantities.every(el => el > 0) && !arrayOfSkus.includes(targetSku)) ) {
            return false
        } else {
            return true
        }
    }

    function handleSubmitButton() {
        let hasError = false
        
        /*  TargetSKU error handling:
            If update: validate that the targetSKU is equal to the original SKU to display
            If create: validate that the targetSKU does not already exist in the SKUcatalog
            For both, validate that the length of the targetSKu is not 0
        */
        if (checkSkuValidity()) {
            setTargetSkuError(true)
            hasError = true
        } else {
            setTargetSkuError(false)
        }
        /*  TargetDescription error handling
            If update: validate that the target description is EITHER the same one that you are starting with or if it is different, it cannot be the same as any other description in the catalog
            If create: validate that the descipriton is not the same as any other description in the catalog for both, validate that the length of the description is not 0
        */
        if (checkDescriptionValidity()) {
            setTargetDescriptionError(true)
            hasError = true
        } else {
            setTargetDescriptionError(false)
        }

        //TargetUnit error handling - unit cannot be blank
        if (checkUnitValidity()) {
            setTargetUnitError(true)
            hasError = true
        } else {
            setTargetUnitError(false)
        }

        /*BOM error handling
        Implement BOM error handling - BOM either has to be NULL OR every item in BOM has a quantity is greater than 0. 
        */
        if (checkBomValidity()) {
            setTargetBomError(true)
            hasError = true
        } else {
            setTargetBomError(false)
        }

        let targetBomToSubmit = [...targetBom]
        targetBomToSubmit.splice(targetBom.length - 1, 1)

        if (!hasError) {
            console.log("submitting form...")
            let submissionObject = {
                SKU: targetSku,
                description: targetDescription,
                units: targetUnit,
                BOM: targetBomToSubmit
            }
            //console.log(submissionObject)
            if (formAction === "createNewSku") {
                skuService.create(submissionObject).then(newSku => setSkuCatalog(skuCatalog.concat(newSku))).catch(error => console.log(error))
                setPageToDisplay("skuCatalog")
            } else if (formAction === "updateSku") {
                skuService.update(skuId, submissionObject).then(updatedSku => setSkuToDisplay(updatedSku)).catch(error => console.log(error))
                setSkuCatalog(skuCatalog.map(sku => sku.id !== skuId ? sku : submissionObject))
                setPageToDisplay("skuDetails")
            }

        } else {
            console.log("hasError: ", hasError)
            console.log("Sku Error: ", targetSkuError )            
            console.log("Desc. Error: ", targetDescriptionError);
            console.log("BOM Error: ", targetBomError)
            console.log("Unit error: ", targetUnitError)

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

    function getUnitArray(skuCatalog) {
        let unitArray = []
        skuCatalog.map(sku => unitArray.push(sku.units))
        let uniqueUnitArray = [...new Set(unitArray)]
        let uniqueUnitArrayOfObjects = uniqueUnitArray.map(uniqueUnit => ({label: uniqueUnit, value: uniqueUnit}))
        return uniqueUnitArrayOfObjects
    }

    function getSkuCatalogArray(skuCatalog, targetBom) {
        let tempTargetBom = targetBom.map(sku => sku.SKU)
        //BOM Cant have one SKU multiple times. Cant have targetSku as a bomItem
        let tempSkuCatalog = skuCatalog.filter(sku => !tempTargetBom.includes(sku.SKU)).filter(sku => targetSku !== sku.SKU)
        const selectOptionsArray = tempSkuCatalog.map(sku => ({label: sku.SKU, value: sku.SKU}))
        return selectOptionsArray
    }

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
                                <Th>Units</Th>
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
                                        isInvalid={targetSkuError && checkSkuValidity()}
                                        errorBorderColor={"Red"}
                                    />
                                    {targetSkuError && checkSkuValidity() &&<Text align={"center"} m={2}>SKU can't be blank</Text>}
                                </Td>
                                <Td>
                                    <Input 
                                        placeholder='Item Description'
                                        value={targetDescription}
                                        onChange={(event) => setTargetDescription(event.target.value)}
                                        isInvalid={targetDescriptionError && checkDescriptionValidity()}
                                        errorBorderColor={"Red"}
                                    />
                                    {targetDescriptionError && checkDescriptionValidity() && <Text align={"center"} m={2}>Item description can't be blank</Text>}
                                </Td>
                                <Td>
                                    <CreatableSelect
                                        placeholder='units'
                                        value={{"label": targetUnit, "value": targetUnit}}
                                        onChange={(option) => setTargetUnit(option.value)}
                                        onCreateOption={(option) => setTargetUnit(option)}
                                        options={getUnitArray(skuCatalog)}
                                        styles={reactSelectStyles}
                                        menuPortalTarget={document.body}
                                        menuPosition={'fixed'}
                                        isInvalid={targetUnitError && checkUnitValidity()}
                                        errorBorderColor={"Red"}
                                    />
                                    {targetUnitError && checkUnitValidity() && <Text align={"center"} m={2}>Unit can't be blank</Text>}
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
                                            min={0} 
                                            isInvalid={targetBomError && bomLine.quantity === 0 && index !== targetBom.length - 1}
                                            errorBorderColor={"Red"}
                                            >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        {targetBomError && bomLine.quantity === 0 && index !== targetBom.length -1 && <Text m={2} align={"center"}>Quantity cannot be 0</Text>}
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