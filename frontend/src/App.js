import './App.css';
import {useState} from 'react'
import {useMount} from 'react-use'
import poService from './services/pos'
import skuService from './services/skus'
import Pos from './components/Pos';
import SkuCatalog from './components/SKUs';

function App() {
  const [pos, setPos] = useState([])
  const [skus, setSkus] = useState([])

  useMount(() => poService.getAll().then(response => setPos(response)))
  //poService.getAll().then(response => setPos(response))
  useMount(() => skuService.getAll().then(response => setSkus(response)))
  //console.log(pos)
  //console.log(skus)
  return (
    <div>
        <SkuCatalog key={"SkuCatalog"}  skus={skus}/>
        <Pos key={"PurchaseOrders"} pos={pos} />
    </div>
  );
}

export default App;
