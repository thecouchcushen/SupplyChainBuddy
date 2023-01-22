import Warehouse from "./Warehouse"

const Inventory = ({inventory}) => {
    return (
        inventory.map((warehouse, i) => <Warehouse key={"Warehouse" + warehouse.warehouseID} warehouse={warehouse} />
        )
    )
}

export default Inventory