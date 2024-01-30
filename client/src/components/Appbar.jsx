import { Button} from "@mui/material";
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
      <img src="/freshkite_logo.jpg" alt="Logo not found" width={150} />
    </div>
  );
};

export const Signinup = () => {
  return (
    <div className="sbtn">
      <div>
        <Button style={{ backgroundColor: "#4CAF50" }} variant="contained">
          Signup
        </Button>
      </div>
      <div className="signin">
        <Button variant="contained">Signin</Button>
      </div>
    </div>
  );
};
export const Appbar = () => {
  return (
    <div className="appbar">
      <Coursera />
      <Signinup />
    </div>
  );
};
