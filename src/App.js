import { IconButton } from "@material-ui/core";
import MuiAppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fade from "@material-ui/core/Fade";
import Icon from "@material-ui/core/Icon";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import After from "./pages/after";
import GetReady from "./pages/get-ready";
import Quakes from "./pages/quakes";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

function Alerts(props) {
  const history = useHistory();
  const [shaking, setShaking] = React.useState(false);
  const [oscillator, setOscillator] = React.useState(() => {
    var context = new AudioContext();
    var o = context.createOscillator();
    var g = context.createGain();
    o.connect(g);
    o.type = "square";
    g.connect(context.destination);
    return o;
  });
  const socket = props.socket;

  function resetOscillator() {
    oscillator.stop();
    var context = new AudioContext();
    var o = context.createOscillator();
    var g = context.createGain();
    o.connect(g);
    o.type = "square";
    g.connect(context.destination);
    setOscillator(o);
  }

  React.useEffect(() => {
    socket.on("shaking start", () => {
      setShaking(true);
      oscillator.start(0);
      if (window.navigator.vibrate) window.navigator.vibrate(1000);
    });

    socket.on("shaking stop", (msg) => {
      setShaking(false);
      window.quake = msg;
      resetOscillator();
      history.push("/after");
    });

    return () => {
      socket.off("shaking start");
      socket.off("shaking stop");
    };
  }, [oscillator]);

  React.useEffect(() => {
    const vibrator = setInterval(() => {
      if (shaking && window.navigator.vibrate) window.navigator.vibrate(500);
    }, 100);

    return () => clearInterval(vibrator);
  }, [shaking]);

  return (
    <Fade in={shaking}>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 99999999,
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(200, 30, 30)",
            width: "100%",
            paddingTop: "min(60px, 5vh)",
            paddingBottom: "min(60px, 30vh)",
            textAlign: "center",
            color: "white",
            height: "15vh",
          }}
        >
          <Icon fontSize="large" style={{ margin: "auto" }}>
            warning
          </Icon>
          <Typography variant="h3" style={{ margin: "auto", marginTop: 10 }}>
            Earthquake
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: "black",
            width: "100%",
            height: "100%",
            textAlign: "center",
            color: "white",
            // padding: 20,
          }}
        >
          <div style={{ paddingTop: 10 }}>
            <div
              style={{ marginTop: 10, position: "relative", height: "15vh" }}
            >
              <Typography
                variant="h4"
                style={{
                  fontWeight: 600,
                  position: "absolute",
                  width: "50%",
                  top: "min(8vw, 7vh)",
                  float: "left",
                  left: 0,
                }}
              >
                Drop
              </Typography>
              <img
                style={{
                  width: "min(45%, 30vh)",
                  position: "absolute",
                  right: 40,
                }}
                src="/drop.png"
              />
            </div>
            <div
              style={{ marginTop: 10, position: "relative", height: "15vh" }}
            >
              <Typography
                variant="h4"
                style={{
                  fontWeight: 600,
                  position: "absolute",
                  width: "50%",
                  top: "min(8vw, 7vh)",
                  float: "left",
                  left: 0,
                }}
              >
                Cover
              </Typography>
              <img
                style={{
                  width: "min(45%, 30vh)",
                  position: "absolute",
                  right: 40,
                }}
                src="/cover.png"
              />
            </div>
            <div
              style={{ marginTop: 10, position: "relative", height: "15vh" }}
            >
              <Typography
                variant="h4"
                style={{
                  fontWeight: 600,
                  position: "absolute",
                  width: "50%",
                  top: "min(8vw, 7vh)",
                  float: "left",
                  left: 0,
                }}
              >
                Hold
              </Typography>
              <img
                style={{
                  width: "min(45%, 30vh)",
                  position: "absolute",
                  right: 40,
                }}
                src="/hold.png"
              />
            </div>
            <div
              style={{
                marginTop: "2vh",
                height: "10vh",
              }}
            >
              <IconButton
                onClick={() => (
                  history.push("/after"), setShaking(false), resetOscillator()
                )}
              >
                <Icon
                  fontSize="large"
                  style={{ margin: "auto", color: "white" }}
                >
                  clear
                </Icon>
              </IconButton>
              <Typography
                variant="subtitle1"
                style={{
                  margin: "auto",
                }}
              >
                Dismiss
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

function Home(props) {
  return (
    <Fade in>
      <div>
        {props.isNative ? (
          <div style={{ height: 76 }} />
        ) : (
          <MuiAppBar
            style={{
              padding: 10,
              backgroundColor: props.connected ? "green" : "orange",
            }}
            position="static"
          >
            <Toolbar>
              <Typography variant="h5">
                Status: {props.connected ? "Connected" : "Connecting..."}
              </Typography>
            </Toolbar>
          </MuiAppBar>
        )}
        <div style={{ padding: 20 }}>
          <Typography variant="h5" style={{ marginBlock: 10 }}>
            Thanks for using Quake Alert!
          </Typography>
          <Typography variant="body1" style={{ marginBlock: 10 }}>
            In a natural disaster or emergency, every second counts. That's why
            this app was made, to give you, and others, the few critical seconds
            needed to get to safety.
            <br />
            <br />
            For now, have a look around the app, and when the time comes,
            remember to <b>drop, cover, and hold</b>.
          </Typography>
        </div>
      </div>
    </Fade>
  );
}

function App() {
  const [error, setError] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const isNative = window.location.search.includes("native=true");
  const [connected, setConnected] = React.useState(isNative ? true : false);
  const [socket, setSocket] = React.useState(() => !isNative && io());
  const history = useHistory();

  var userAgent = navigator.userAgent.toLowerCase();
  var android = userAgent.indexOf("android") > -1;

  // const [appDialogOpen, setAppDialogOpen] = React.useState(
  //   android && !isNative
  // );

  const [appDialogOpen, setAppDialogOpen] = React.useState(false);

  const [interactionDialogOpen, setInteractionDialogOpen] = React.useState(
    !appDialogOpen
  );

  console.log("is native", isNative);
  console.log("is android", android);

  const [tab, setTab] = React.useState(0);

  function makeAlert(error, severity) {
    setError(error);
    setSeverity(severity);
    setOpen(true);
  }

  window.makeAlert = makeAlert;

  const urls = ["/", "/quakes", "/get-ready"];

  React.useEffect(() => {
    if (!isNative) {
      socket.on("connect", function () {
        setConnected(true);
      });
      socket.on("disconnect", function () {
        setConnected(false);
      });
      return () => {
        socket.off("connect");
        socket.off("disconnect");
      };
    }
  }, []);

  return (
    <Fade in>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Alert
            severity={severity}
            onClose={() => {
              setOpen(false);
            }}
          >
            {error}
          </Alert>
        </Snackbar>
        {!isNative && <Alerts socket={socket} />}
        <Switch>
          <Route path="/quakes">
            <Quakes setTab={setTab} />
          </Route>
          <Route path="/get-ready">
            <GetReady setTab={setTab} />
          </Route>
          <Route path="/after">
            <After setTab={setTab} />
          </Route>
          <Route path="/">
            <Home setTab={setTab} connected={connected} isNative={isNative} />
          </Route>
        </Switch>
        <BottomNavigation
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
            history.push(urls[newValue]);
          }}
          showLabels
          style={{ width: "100%", bottom: 0, position: "fixed" }}
        >
          <BottomNavigationAction
            label="Alerts"
            icon={<Icon>notifications</Icon>}
          />
          <BottomNavigationAction label="Quakes" icon={<Icon>public</Icon>} />
          <BottomNavigationAction
            label="Get Ready"
            icon={<Icon>backpack</Icon>}
          />
        </BottomNavigation>
        <Dialog
          open={appDialogOpen}
          onClose={() => setAppDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Get the app!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Getting the app allows you to get alerts even when the app is
              closed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAppDialogOpen(false)} color="primary">
              Stay on web
            </Button>
            <Button
              onClick={() => (
                window.open("/quake-alert.apk", "_blank").focus(),
                setAppDialogOpen(false)
              )}
              color="primary"
              variant="contained"
              autoFocus
            >
              Download
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={interactionDialogOpen}
          onClose={() => setInteractionDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            This app is in development!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This app is currently in development, and as of now is unsuitable
              for production use.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setInteractionDialogOpen(false)}
              color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fade>
  );
}

export default App;
