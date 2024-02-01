import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sign = props.signin ? "Signin" : "Signup";
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    //e.preventDefault();
    const data = {username: email, password:password};
    const login_str = props.signin ? "login" : "signup";
    const response = await axios.post(`${BASE_URL}/admin/${login_str}`, data);
    localStorage.setItem("token", response.data.token);
    console.log(("Token:", response.data.token));
    login();
    navigate("/");
  }

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
          <br /><br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
          />
          <br/><br/>
          <Button variant="contained" size="large" onClick={handleSignup}>{sign}</Button>
        </Card>
      </center>
    </div>
  );
};
