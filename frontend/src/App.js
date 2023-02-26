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
import Header from './components/Header';
import FillPlan from './components/FillPlan/FillPlan';

function App() {
  const [pos, setPos] = useState([])
  const [skus, setSkus] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [inventory, setInventory] = useState([])
  const [currentView, setCurrentView] = useState("skus")

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
      <Header setCurrentView={setCurrentView} />
      <Pos key="PurchaseOrders" pos={pos} suppliers={suppliers} /> 
    </div>
    )
  } else if (currentView === "fillplan") {
    return (
    <div>
      <Header setCurrentView={setCurrentView} />
      <FillPlan supplierEntry="" pos={pos} inventory={inventory} supplierID={20300180} warehouseID={290}/>
    </div>
    )
  }else if (currentView === "inventory") {
    return (
    <div>
      <Header setCurrentView={setCurrentView} />
      <Inventory key="InventoryLevels" inventory={inventory} /> 
    </div>
    )
  } else if (currentView === "suppliers") {
    return (
    <div>
      <Header setCurrentView={setCurrentView} />
      <Suppliers key="SupplierCatalog" suppliers={suppliers} /> 
    </div>
    )
  } else if (currentView === "skus") {
    return (
    <div>
      <Header setCurrentView={setCurrentView} />
      <SkuCatalog key="SkuCatalog"  skus={skus} pos={pos} /> 
    </div>
    )
  }
  
}

export default App;
