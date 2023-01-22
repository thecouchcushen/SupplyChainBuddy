import './App.css';
import {useState} from 'react'
import {useMount} from 'react-use'
import poService from './services/pos'
import Pos from './components/Pos';

function App() {
  const [pos, setPos] = useState([])

  useMount(() => poService.getAll().then(response => setPos(response)))
  //console.log(pos)
  return (
    <div >
      <p>Hello World!</p>
        <Pos key={"PurchaseOrders"} pos={pos} />
    </div>
  );
}

export default App;
