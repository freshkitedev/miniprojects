import { Grid, Typography } from "@mui/material";
import { Signinup } from "./Appbar";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../state/atoms/isLoggedin";


export const Landing = () => {
    const [isLoggedIn,setisLoggedIn] = useRecoilState(isLoggedInState)
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"} >Freshkite</Typography>
            <Typography variant={"h5"}> &nbsp; Earn When U Learn</Typography>
          <br />
          {!isLoggedIn ? <Signinup/> : ""}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img src={"/CourseDetails.png"} alt="File not found" width={"100%"} />
        </Grid>
      </Grid>
    </div>
  );
};
