import Supplier from "./Supplier"

const Suppliers = ({suppliers}) => {
    return (
        suppliers.map((supplier, i) => 
            <Supplier key={"Supplier" + supplier.description} supplier={supplier} />
        )
    )
}

export default Suppliers