const InventoryItem = ({inventoryLine}) => {
    return (
        <div>
            <p>{inventoryLine.SKU}</p>
            <p>Quantity: {inventoryLine.quantity}</p>
        </div>
    )
}

export default InventoryItem