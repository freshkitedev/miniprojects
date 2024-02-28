import { Button } from "@mui/material";
import { useNavigate} from "react-router-dom";
import "./Appbar.css";
import { useRecoilState } from "recoil";
import {useLoggedInState} from "../state/atoms/isLoggedin"
const Coursera = () => {
  const navigate = useNavigate();
  return (
    <div
      className="coursera"
      onClick={() => {
        navigate("/");
      }}
    >
      <img src="/freshkite_logo.jpg" alt="Logo not found" width={150} height={60}/>
    </div>
  );
};

export const Signinup = () => {
 
  const navigate = useNavigate();
  return (
    <div className="sbtn">
      <div>
        <Button
          style={{ backgroundColor: "#4CAF50" }}
          variant="contained"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </Button>
      </div>
      <div className="signin">
        <Button variant="contained" onClick={() => {
            navigate("/signin");
          }}>Signin</Button>
      </div>
    </div>
  );
};



const Addcourse = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
      navigate("/")
    }
    const [isLoggedIn,setisLoggedin] = useLoggedInState();
    return (
      <div>
        <Button onClick={() => {navigate("/addcourse")}}>Add course</Button>
        <Button onClick={() => {navigate("/getcourses")}}>Courses</Button>
        <Button variant="contained" onClick={() => {setisLoggedin(false); navigateToHome()}}>Logout</Button>
      </div>
    )
}

export const Appbar = () => {
  const [isLoggedIn,setisLoggedin] = useLoggedInState();


  return (
    <div className="appbar">
      <Coursera />
      {isLoggedIn ? <Addcourse /> : <Signinup />}
    </div>
  );
};
