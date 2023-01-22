import InventoryItem from "./InventoryItem"

const Warehouse = ( {warehouse} ) => {
    return (
        <div>
            <h1>{warehouse.description}</h1>
            <h2>Warehouse ID: {warehouse.warehouseID}</h2>
            <h3>Current Inventory Levels:</h3>
            {warehouse.inventoryLevels.map((inventoryItem, i) => 
            <InventoryItem key={warehouse.description + inventoryItem.SKU + "levels"} inventoryLine={inventoryItem} />
            )}
        </div>
    )
}

export default Warehouse