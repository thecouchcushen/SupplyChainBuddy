import {
    Button
  } from '@chakra-ui/react'

const Header = ({setCurrentView}) => {
    //TODO: Pressing header should always return you to homepage of that section
    return (
        <div>
            <Button colorScheme='green' m='2' onClick={() => setCurrentView("pos")}>Purchase Orders</Button>
            <Button colorScheme='green' m='2' onClick={() => setCurrentView("inventory")}>Inventory Levels</Button>
            <Button colorScheme='green' m='2' onClick={() => setCurrentView("suppliers")}>Supplier Catalog</Button>
            <Button colorScheme='green' m='2' onClick={() => setCurrentView("skus")}>SKU Catalog</Button>
            <Button colorScheme='green' m='2' onClick={() => setCurrentView("fillplan")}>Fill Plan</Button>
        </div>
    )
}

export default Header