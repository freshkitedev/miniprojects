import { useState } from 'react';
import './App.css';
import Todoform from './component/form';
import { Gettodo} from './component/todos';

function App() {
  const [rdata, setRetriveData] = useState(false);
  const [stodo, setSingleTodo] =  useState(null);

  const editTodo = (item) => {
    console.log("editTodo:", item);
    setSingleTodo(item);
  }

  const getTodo = () => {
    console.log("getData"); 
    setRetriveData(rdata?false:true);
    setSingleTodo(null);
  }

  return (
    <>
      <Todoform getData={getTodo} sTodoData={stodo} />
      <Gettodo Rdata={rdata} eTodo={editTodo}/>
    </>
  );
}

export default App;
