import MuiAppBar from "@material-ui/core/AppBar";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import HeightIcon from "@material-ui/icons/Height";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ScheduleIcon from "@material-ui/icons/Schedule";
import React from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useMeasure } from "react-use";
import {
  HorizontalGridLines,
  LineSeriesCanvas,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import "../App.css";
import callAPI from "../utils/call-api";

const useStyles = makeStyles((theme) => ({
  classPage: {
    padding: theme.spacing(6),
  },
  classSection: {
    marginTop: theme.spacing(3),
  },
  classSectionItem: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  shine: {
    background: "#f6f7f8",
    backgroundImage:
      "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "800px 104px",
    WebkitAnimationDuration: "0.5s",
    WebkitAnimationFillMode: "forwards",
    WebkitAnimationIterationCount: "infinite",
    WebkitAnimationName: "placeholderShimmer",
    WebkitAnimationTimingFunction: "linear",
    animationDuration: "0.5s",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
    animationName: "placeholderShimmer",
    animationTimingFunction: "linear",
  },
}));

function Quake(props) {
  let history = useHistory();
  let { quakeID } = useParams();
  const [quake, setQuake] = React.useState(props.quakes[quakeID]);
  const [ref, measurements] = useMeasure();

  console.log("render quake");

  React.useEffect(() => {
    async function getQuake() {
      const { success, json } = await callAPI("quakes/" + quakeID, "GET");
      if (success) {
        setQuake(json);
      }
    }

    if (!(quake && quake.data)) {
      getQuake();
    }
    return;
  }, [quake, quakeID]);

  return (
    <Fade in>
      <div style={{ padding: 20 }}>
        <MuiAppBar>
          <Toolbar>
            <IconButton onClick={() => history.goBack()}>
              <Icon
                fontSize="large"
                style={{ color: "#FFFFFF", marginLeft: -5 }}
              >
                arrow_back
              </Icon>
            </IconButton>
            <Typography style={{ marginLeft: 10 }} variant="h6">
              Earthquake #{quakeID}
            </Typography>
          </Toolbar>
        </MuiAppBar>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Details:</Typography>
            {quake && (
              <div style={{ paddingLeft: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <EventIcon />
                  <Typography variant="body1" style={{ marginLeft: "10px" }}>
                    {new Date(quake.timeStart).toDateString()}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <ScheduleIcon />
                  <Typography variant="body1" style={{ marginLeft: "10px" }}>
                    {new Date(quake.timeStart).toLocaleTimeString()} -{" "}
                    {new Date(quake.timeEnd).toLocaleTimeString()}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <HourglassEmptyIcon />
                  <Typography variant="body1" style={{ marginLeft: "10px" }}>
                    {Math.round((quake.timeEnd - quake.timeStart) / 100) / 10}{" "}
                    seconds
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <HeightIcon />
                  <Typography variant="body1" style={{ marginLeft: "10px" }}>
                    {Math.round(quake.strength / 100000) / 10} million EHZ
                    counts per second
                  </Typography>
                </div>
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Raw data:</Typography>
            <Typography style={{ marginTop: "10px" }} variant="body1">
              All y-axis represent strength in thousand counts per 10
              milliseconds
            </Typography>
          </Grid>

          {["EHZ", "ENE", "ENN", "ENZ"].map((channel) => (
            <Grid item xs={12} md={6}>
              <Paper style={{ height: "202px" }}>
                <Typography variant="h6" style={{ marginLeft: "40%" }}>
                  Channel {channel}
                </Typography>
                {quake && quake.data ? (
                  <XYPlot width={measurements.width - 20} height={170}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Time (seconds)" />
                    <YAxis />
                    <LineSeriesCanvas
                      strokeWidth={1}
                      data={quake.data[channel].map((y, time) => ({
                        x: time / 100,
                        y: y / 1000,
                      }))}
                    />
                  </XYPlot>
                ) : (
                  <div width={measurements.width - 20} height={170} />
                )}
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            <div ref={ref} />
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}

function useElementOnScreen(options) {
  const containerRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  function callbackFunction(entries) {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const observedRef = containerRef.current;
    if (observedRef) observer.observe(observedRef);
    return () => {
      if (observedRef) observer.unobserve(observedRef);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
}

function QuakeGroup(props) {
  const classes = useStyles();
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  React.useEffect(() => {
    console.log("sdg");
    if (isVisible) {
      props.fetchQuakes();
    }
  }, [isVisible]);

  console.log("visibility", isVisible);

  return (
    <React.Fragment>
      <ListItem ref={containerRef} divider button>
        <ListItemIcon>
          <svg height="40" width="10" className={classes.shine}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              style={{
                strokeWidth: 10,
              }}
            />
          </svg>
        </ListItemIcon>
        <ListItemText primary={"‎"} secondary={"‎"} className={classes.shine} />
      </ListItem>
      {[...Array(9).keys()].map((product) => (
        <ListItem divider button>
          <ListItemIcon>
            <svg height="40" width="10" className={classes.shine}>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                style={{
                  strokeWidth: 10,
                }}
              />
            </svg>
          </ListItemIcon>
          <ListItemText
            primary={"‎"}
            secondary={"‎"}
            className={classes.shine}
          />
        </ListItem>
      ))}
    </React.Fragment>
  );
}

function QuakesList(props) {
  const [totalRows, setTotalRows] = React.useState(1000);
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageSize = 40;

  const { setQuakes, quakes } = props;

  const history = useHistory();

  console.log("render quakes list");

  async function fetchQuakes() {
    setCurrentPage((prev) => prev + 1);
    const { success, json } = await callAPI("quakes", "GET", {
      page: currentPage,
      per_page: pageSize,
    });
    if (success) {
      setQuakes((prev) => {
        var previousQuakes = JSON.parse(JSON.stringify(prev));
        var quake;
        for (quake of json.list) {
          previousQuakes[quake.id] = quake;
        }
        console.log("quakes set");
        return previousQuakes;
      });
      setTotalRows(json.total);
    }
  }

  console.log(quakes);

  React.useEffect(() => {
    window.currentPage = 1;
    fetchQuakes();
  }, []);

  function msToString(ms) {
    const seconds = ms / 1000;
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = Math.ceil((((seconds % 31536000) % 86400) % 3600) % 60);

    if (numyears >= 1) {
      return numyears + " year" + (numyears === 1 ? "" : "s");
    } else if (numdays >= 1) {
      return numdays + " day" + (numdays === 1 ? "" : "s");
    } else if (numhours >= 1) {
      return numhours + " hour" + (numhours === 1 ? "" : "s");
    } else if (numminutes >= 1) {
      return numminutes + " minute" + (numminutes === 1 ? "" : "s");
    } else {
      return numseconds + " second" + (numseconds === 1 ? "" : "s");
    }
  }

  return (
    <Fade in>
      <Paper style={{ width: "100%" }}>
        <List>
          {Object.keys(quakes)
            .sort(function (a, b) {
              return b - a;
            })
            .map((id) => {
              const quake = quakes[id];
              return (
                <ListItem
                  divider
                  button
                  onClick={() => history.push("/quakes/" + id)}
                >
                  <ListItemIcon>
                    <svg height="40" width="10">
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="40"
                        stroke={
                          "rgb(217, 72, 1, " +
                          Math.min(quake.strength / 100000000, 1) +
                          ")"
                        }
                        style={{
                          strokeWidth: 10,
                        }}
                      />
                    </svg>
                  </ListItemIcon>
                  <ListItemText
                    primary={msToString(Date.now() - quake.timeStart) + " ago"}
                    secondary={
                      "#" +
                      id +
                      " • " +
                      Math.ceil(quake.strength / 1000000) +
                      " million EHZ counts per second"
                    }
                  />
                </ListItem>
              );
            })}

          {Object.keys(quakes).length <= totalRows && (
            <QuakeGroup fetchQuakes={fetchQuakes} />
          )}
        </List>
      </Paper>
    </Fade>
  );
}

export default function Quakes(props) {
  const [quakes, setQuakes] = React.useState({});
  let match = useRouteMatch();
  const path = match.path;

  console.log("render quakes");

  React.useEffect(() => {
    props.setTab(1);
  }, []);

  return (
    <div style={{ height: "90%" }}>
      <Switch>
        <Route path={path + "/:quakeID"}>
          <Quake quakes={quakes} />
        </Route>
        <Route path={path}>
          <QuakesList setQuakes={setQuakes} quakes={quakes} />
        </Route>
      </Switch>
    </div>
  );
}
