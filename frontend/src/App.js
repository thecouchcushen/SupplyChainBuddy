import './App.css';
import {useState} from 'react'
import {useMount} from 'react-use'
import poService from './services/pos'
import skuService from './services/skus'
import supplierService from  './services/suppliers'
import inventoryService from './services/inventory'
import Pos from './components/PurchaseOrders/Pos';
import SkuCatalog from './components/SkuCatalog/SKUs';
import Suppliers from './components/Suppliers/Suppliers';
import Inventory from './components/Inventory/Inventory';

function App() {
  const [pos, setPos] = useState([])
  const [skus, setSkus] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [inventory, setInventory] = useState([])
  const [currentView, setCurrentView] = useState("pos")

  useMount(() => inventoryService.getAll().then(response => setInventory(response)))
  useMount(() => supplierService.getAll().then(response => setSuppliers(response)))
  useMount(() => skuService.getAll().then(response => setSkus(response)))
  useMount(() => poService.getAll().then(response => setPos(response)))

  //console.log(inventory)
  //console.log(pos)
  //console.log(skus)
  //console.log(suppliers);
  
  if (currentView === "pos") {
    return (
    <div>
      <button onClick={() => setCurrentView("pos")}>Purchase Orders</button>
      <button onClick={() => setCurrentView("inventory")}>Inventory Levels</button>
      <button onClick={() => setCurrentView("suppliers")}>Supplier Catalog</button>
      <button onClick={() => setCurrentView("skus")}>SKU Catalog</button>
      <Pos key="PurchaseOrders" pos={pos} /> 
    </div>
    )
  } else if (currentView === "inventory") {
    return (
    <div>
      <button onClick={() => setCurrentView("pos")}>Purchase Orders</button>
      <button onClick={() => setCurrentView("inventory")}>Inventory Levels</button>
      <button onClick={() => setCurrentView("suppliers")}>Supplier Catalog</button>
      <button onClick={() => setCurrentView("skus")}>SKU Catalog</button>
      <Inventory key="InventoryLevels" inventory={inventory} /> 
    </div>
    )
  } else if (currentView === "suppliers") {
    return (
    <div>
      <button onClick={() => setCurrentView("pos")}>Purchase Orders</button>
      <button onClick={() => setCurrentView("inventory")}>Inventory Levels</button>
      <button onClick={() => setCurrentView("suppliers")}>Supplier Catalog</button>
      <button onClick={() => setCurrentView("skus")}>SKU Catalog</button>
      <Suppliers key="SupplierCatalog" suppliers={suppliers} /> 
    </div>
    )
  } else if (currentView === "skus") {
    return (
    <div>
      <button onClick={() => setCurrentView("pos")}>Purchase Orders</button>
      <button onClick={() => setCurrentView("inventory")}>Inventory Levels</button>
      <button onClick={() => setCurrentView("suppliers")}>Supplier Catalog</button>
      <button onClick={() => setCurrentView("skus")}>SKU Catalog</button>
      <SkuCatalog key="SkuCatalog"  skus={skus}/> 
    </div>
    )
  }
  
}

export default App;
