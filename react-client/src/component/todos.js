import { useEffect, useState } from "react";
import axios from "axios"

export const Gettodo = (props) => {
    const [data, setData] = useState([]);

    const getData = () => {
        axios.get("http://localhost:5000/todos").then(
            (res) => {
                setData(res.data);
                console.log("Getdata:", data);
            }
        )
    }

    useEffect(() => {
        console.log("useEffect:", props.Rdata);
        getData();        
    }, [props])

    const updateTodo = (item) => {
        props.eTodo(item);
    }

    const deleteTodo = (item) => {
        axios.delete(`http://localhost:5000/todos/${item._id}`).then((res) => {
            console.log("Response to delete:", res.data);
            getData();
            }) 
    }

    return (
        <div className="listitem">
            <ul >
                {data.map((item, index) => (

                    <li key={item._id}>{item.title} : {item.description}
                        <button id="btne" onClick={() => { updateTodo(item) }}>Edit</button>
                        <button id="btnd" onClick={() => { deleteTodo(item) }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}