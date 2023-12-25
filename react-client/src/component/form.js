import axios from "axios";
import { useEffect, useState } from "react";
import { Gettodo } from "./todos";

const Todoform = (props) => {
    const [tit, setTitle] = useState('');
    const [desc, setDescription] = useState('');


    const handleSave = () => {
        const data = {title:tit, description:desc};
        console.log("handleSave:", data);
        if (props.sTodoData) {
            axios.put(`http://localhost:5000/todos/${props.sTodoData._id}`, data).then((res) => {
            console.log("Response to put:", res.data);
            props.getData();
            setTitle("");
            setDescription("");
            }) 
        } else {
        axios.post("http://localhost:5000/todos", data).then((res) => {
            console.log("Response to post:", res.data);
            props.getData();
            setTitle("");
            setDescription("");
            })
       }
    }

    useEffect(() => {
        if (props.sTodoData) {
            setTitle(props.sTodoData.title);
            setDescription(props.sTodoData.description)
            console.log("Form useeffect", props.sTodoData.title);
        }
    },[props])

    const titleChange = (e) => {
        setTitle(e.target.value);
    }

    const descChange = (e) => {
        setDescription(e.target.value);
    }
    return (
        <div className="form">
            <h1>Todo Application</h1>
            <label>Title:</label>
            <br/>
            <input id="title" onChange={titleChange} type='text' value={tit}></input>
            <br></br>
            <label>Description:</label>
            <br/>
            <textarea id="description" onChange={descChange} type='text' value={desc}></textarea>
            <br></br>
            <button id="btn" onClick={handleSave}>{props.sTodoData?'Update':'Save'}</button>
        </div>
    );
}

export default Todoform;