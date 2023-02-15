const Header = ({setCurrentView}) => {
    return (
        <div>
            <button onClick={() => setCurrentView("pos")}>Purchase Orders</button>
            <button onClick={() => setCurrentView("inventory")}>Inventory Levels</button>
            <button onClick={() => setCurrentView("suppliers")}>Supplier Catalog</button>
            <button onClick={() => setCurrentView("skus")}>SKU Catalog</button>
            <button onClick={() => setCurrentView("fillplan")}>Fill Plan</button>
        </div>
    )
}

export default Header