import { Nav } from "../components/Nav";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Rocket from "../components/Logo/Rocket.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Nav />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              height: "350px",
              textAlign: "center",
              alignItems: "center",
              justifyItems: "center",
              display: "grid",
              backgroundColor: "#039BE8",
            }}
          >
            <h1>Project Carrier Pigeon</h1>
            {/* <Paper className={classes.paper}>xs=12</Paper> */}
          </Grid>
          <Grid item xs={12} sm={2}>
            {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper
              className={classes.paper}
              style={{ backgroundColor: "#F4F5F5" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                  <img
                    src={Rocket}
                    alt="Rocket Logo"
                    width="150"
                    height="150"
                  />
                </Grid>
                <Grid item xs={6} sm={8}>
                  <h3>Pathstream Internal Scripts</h3>
                  <p>
                    Engineers and Designers at Pathstream have built internal
                    tools to automate workflows, cut down on manual workloads,
                    and help Pathstream scale to meet demand.
                  </p>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={2}>
            {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          </Grid>
          
          {/* TODO: We can refactor these script descriptions into one component */}
          <Grid item xs={6} sm={2}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper className={classes.paper} style={{backgroundColor: "#F4F5F5"}}>
              <h3 style={{color: "#FDC352", fontSize: "20px"}}>
                Cohort Creation Script
              </h3>
              <p>
                <strong>Author: </strong>Shane White
              </p>
              <p>
                <strong>Functionality: </strong>Automate the process of Pathstream cohort creation.
              </p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper className={classes.paper} style={{backgroundColor: "#F4F5F5"}}>
              <h3 style={{color: "#FDC352", fontSize: "20px"}}>Set Due Dates</h3>
              <p>
                <strong>Author: </strong>Dan Murphy
              </p>
              <p>
                <strong>Functionality: </strong>Automated the process of setting project due dates.
              </p>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={2}>
            {/* <Paper className={classes.paper}>xs=6 sm=3</Paper> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;
