import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Appbar.css";
const Coursera = () => {
  const navigate = useNavigate();
  return (
    <div
      className="coursera"
      onClick={() => {
        navigate("/");
      }}
    >
      <Typography variant="h5">Coursera</Typography>
    </div>
  );
};

const Signinup = () => {
    return (
        <div className="sbtn">
        <Button style={{ backgroundColor: "#4CAF50" }} variant="contained">
          Signup
        </Button>
        <div className="signin">
          <Button variant="contained">Signin</Button>
        </div>
      </div>

    )
}
export const Appbar = () => {
  return (
    <div className="appbar">
      <Coursera />
      <Signinup />
      
    </div>
  );
};
