import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Card} from "@mui/material";
import {useState} from "react";
import axiosInstance from "../utils/axiosconfig.js";
import { CourseState } from "../state/atoms/Courses.js";
import { useRecoilState } from "recoil";
function AddCourse() {
  
    const [courseData , setCourseData] = useRecoilState(CourseState);

    const { title, description, image, price, error } = courseData;

    const handleInputChange = (property, value) => {
        setCourseData((prevAppData) => ({ ...prevAppData, [property]: value }));
      };

    const addCourse = async () => {
        const data = {
            Title: title,
            Description: description,
            Price:price,
            ImageLink: image,
            Published: true
        }
        try {
          await axiosInstance.post(`/admin/addcourse`, data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          alert("Added course!");
        } catch (err) {
            handleInputChange('error',err)
        }
    }

    return <div style={{display: "flex", justifyContent: "center", minHeight: "80vh",  flexDirection: "column"}}>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{width: 400, padding: 20, marginTop: 30, height: "100%"}}>
                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        handleInputChange('title',e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        handleInputChange('description',e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        handleInputChange('image',e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        handleInputChange('price',e.target.value)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={addCourse}
                > Add course</Button>
                {error && <div style={{ color:'red' }}>{error.message}</div>}
                
            </Card>
        </div>
    </div>
}

export default AddCourse;