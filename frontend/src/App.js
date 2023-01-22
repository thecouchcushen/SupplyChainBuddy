import './App.css';
import {useState} from 'react'
import {useMount} from 'react-use'
import poService from './services/pos'
import skuService from './services/skus'
import supplierService from  './services/suppliers'
import Pos from './components/Pos';
import SkuCatalog from './components/SKUs';
import Suppliers from './components/Suppliers'

function App() {
  const [pos, setPos] = useState([])
  const [skus, setSkus] = useState([])
  const [suppliers, setSuppliers] = useState([])

  useMount(() => supplierService.getAll().then(response => setSuppliers(response)))
  useMount(() => skuService.getAll().then(response => setSkus(response)))
  useMount(() => poService.getAll().then(response => setPos(response)))
  //console.log(pos)
  //console.log(skus)
  return (
    <div>
        <Suppliers key="SupplierCatalog" suppliers={suppliers} />
        
        <SkuCatalog key={"SkuCatalog"}  skus={skus}/>
        <Pos key={"PurchaseOrders"} pos={pos} />
    </div>
  );
}

export default App;
