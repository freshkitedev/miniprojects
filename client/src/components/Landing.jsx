import { Grid, Typography } from "@mui/material";
import { Signinup } from "./Appbar";
import { useAuth } from "./Authcontext";

export const Landing = () => {
  const {isLoggedIn} = useAuth();
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Freshkite</Typography>
            <Typography variant={"h5"}>Earn When U Learn</Typography>
            {!isLoggedIn && <Signinup />}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img src={"/CourseDetails.png"} alt="File not found" width={"100%"} />
        </Grid>
      </Grid>
    </div>
  );
};
