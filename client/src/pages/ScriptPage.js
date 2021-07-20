import ScriptConf from "./ScriptConf";
import { Nav } from "../components/Nav";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InfoIcon from '@material-ui/icons/Info';
import Run from "../components/Buttons/Run";

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

const Script = ({ match, location }) => {
  const classes = useStyles();
  const scriptId = match.params.id;

  const getScriptFromConfFile = (scriptId) => {
    return ScriptConf[scriptId];
  };

  const scriptDataInJson = getScriptFromConfFile(scriptId);
  const scriptTitle = scriptDataInJson.title;
  const scriptSubtext = scriptDataInJson.subtext;
  const scriptInputs = scriptDataInJson.inputs;

  const buildInputUIFrom = (scriptInputs) => {
    const inputData = [];
    for (let i = 0; i < scriptInputs.length; i++) {
      inputData.push(
        <Grid container spacing={3}>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="standard-basic"
              label={scriptInputs[i]}
              style={{ width: "100%" }}
              key={i}
            />
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
      );
    }

    return inputData;
  };

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
            <div style={{ textAlign: "left" }}>
              <h1>{scriptTitle}</h1>
              <p>{scriptSubtext}</p>
            </div>
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
                  <InfoIcon fontSize="large" style={{paddingTop: "10%"}}/>
                </Grid>
                <Grid item xs={6} sm={8}>
                  <h3>Script Inputs</h3>
                  <p>
                    To run this script, provide the following inputs and press
                    the <strong>Run Script</strong> button.
                  </p>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={2}>
            {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          </Grid>
          <Grid item xs={12} sm={2}>
            {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyItems: "center",
              display: "grid",
            }}
          >
            <Paper
              className={classes.paper}
              style={{ backgroundColor: "#F4F5F5", width: "70%" }}
            >
              <form className={classes.root} noValidate autoComplete="off">
                {buildInputUIFrom(scriptInputs)}
              </form>
              <Run styles={{ backgroundColor: "#FDC558" }} endpoint="/test" />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={2}>
            {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Script;
