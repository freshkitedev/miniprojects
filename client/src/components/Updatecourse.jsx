import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import {Loading} from "./Loading";
import axiosInstance from "../utils/axiosconfig.js";

function Updatecourse() {
    let { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    const getCourseById = async (id) => {
      try {
        const res = await axiosInstance.get(`/admin/getcourse/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });
        console.log("Getcourseby id:", res.data.course);
        setCourse(res.data.course);
      } catch (err) {
        setError(error);
      }
    };
    
    useEffect(() => {
        getCourseById(courseId);
    }, [courseId]);

    if (!course) {
        return <Loading />
    }

    return <div>
        <GrayTopper title={course.title}/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard course={course} />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper({title}) {
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard({course, setCourse}) {
    const [title, setTitle] = useState(course.Title);
    const [description, setDescription] = useState(course.Description);
    const [image, setImage] = useState(course.ImageLink);
    const [price, setPrice] = useState(course.Price);
    const [error, setError] = useState(null);  

    const updateCourse = async (id,val) => {

        console.log(val.target.variant);
        
        const data = {
            Title: title,
            Description: description,
            Price:price,
            ImageLink: image,
            Published: true
        }
        try {
          await axiosInstance.put(`/admin/updatecourse/` + id, data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          alert("Updated Course Successfully")
        } catch (err) {
            setError(err);
        }
        setCourse(data);
    }

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />

            <Button
                variant="contained"
                onClick={(e)=>updateCourse(course._id,e)}
            > Update course</Button>
            {error && <div style={{color:'red'}}> {error.message} </div>}
        </div>
    </Card>
</div>
}

function CourseCard(props) {
    const course = props.course;
    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={course.ImageLink} style={{width: 350}} alt="course not found" ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{course.title}</Typography>
            <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <Typography variant="subtitle1">
                <b>Rs {course.price} </b>
            </Typography>
        </div>
    </Card>
    </div>
}

export default Updatecourse;