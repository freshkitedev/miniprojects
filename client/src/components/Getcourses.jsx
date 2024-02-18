import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axiosconfig.js";

function Getcourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    // const init1 = async () => {
    //     const response = await axios.get(`${BASE_URL}/admin/getallcourses/`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //     console.log("All courses:",response.data.courses);
    //     setCourses(response.data.courses)
    // }
    const init = async () => {
        try {
            const res = await axiosInstance.get("/admin/getallcourses/", {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log("All courses:",res.data.Courses);
            setCourses(res.data.Courses)
        } catch(err) {
            setError(err);
        }
    }


    useEffect(() => {
        init();
    }, []);

    return <>{error ? <div style={{color:'red'}}>{error.message}</div>:
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>}</>
}

export function Course({course}) {
    const navigate = useNavigate();
    console.log("Display course:", course);

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.Title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.Description}</Typography>
        <img src={course.ImageLink} style={{width: 300}} alt="Course not found"  ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/updatecourse/" + course._id);
            }}>Edit</Button>
        </div>
        
    </Card>
}

export default Getcourses;