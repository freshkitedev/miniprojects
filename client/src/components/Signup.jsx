import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosconfig";

export const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sign = props.signin ? "Signin" : "Signup";
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    //e.preventDefault();
    const data = { username: email, password: password };
    const login_str = props.signin ? "login" : "signup";
    try {
      //const response = await axios.post(`${BASE_URL}/admin/${login_str}`, data);
      const response = await axiosInstance.post(`/admin/${login_str}`, data);
      localStorage.setItem("token", response.data.token);
      console.log(("Token:", response.data.token));
      login();
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <center style={{ marginTop: 150 }}>
        <Typography variant="h6">Welcome to Freshkite. </Typography>
        <Card style={{ width: 300, padding: 20, marginTop: 10 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
          />
          <br />
          <br />
          <Button variant="contained" size="large" onClick={handleSignup}>
            {sign}
          </Button>

          {error && <div style={{ color: 'red' }}>{error.message}</div>}

        </Card>
      </center>
    </div>
  );
};
