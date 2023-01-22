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

  useMount(() => inventoryService.getAll().then(response => setInventory(response)))
  useMount(() => supplierService.getAll().then(response => setSuppliers(response)))
  useMount(() => skuService.getAll().then(response => setSkus(response)))
  useMount(() => poService.getAll().then(response => setPos(response)))
  //console.log(inventory)
  //console.log(pos)
  //console.log(skus)
  return (
    <div>
        <Inventory key="InventoryLevels" inventory={inventory} />
        <Suppliers key="SupplierCatalog" suppliers={suppliers} />
        <SkuCatalog key="SkuCatalog"  skus={skus}/>
        <Pos key="PurchaseOrders" pos={pos} />
    </div>
  );
}

export default App;
