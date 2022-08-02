import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router-dom";

export default function After(props) {
  const history = useHistory();

  return (
    <Fade in>
      <div style={{ padding: 20, marginBottom: 50 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "15px 25px" }}>
              <Typography variant="h6">Be alert</Typography>
              <Typography variant="subtitle1">
                Aftershocks are common
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "15px 25px" }}>
              <Typography variant="h6">
                Stay safer after an earthquake
              </Typography>
              <List style={{ marginInline: "-10px" }}>
                <ListItem>
                  <ListItemIcon>
                    <Icon>do_not_step</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="‎Get shoes"
                    secondary="‎Before going anywhere, even to the next room"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon>local_fire_department</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Check gas"
                    secondary="If you smell gas, turn off the gas main to the building. If you can't, evacuate."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon>domain_disabled</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Avoid damaged buildings"
                    secondary="‎Check for cracks and damage. Evacuate if it looks like the building may collapse."
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {window.quake && window.quake.id ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/quakes/" + window.quake.id)}
              >
                View quake details
              </Button>
            ) : (
              <Typography variant="body1">
                Check the Quakes tab to see details about this earthquake
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "15px 25px" }}>
              <Typography variant="h6">More safety tips</Typography>
              <List style={{ marginInline: "-10px" }}>
                <ListItem>
                  <ListItemIcon>
                    <Icon>water_drop</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="‎Get your emergency supplies"
                    secondary="If water is shut off, use emergency supplies like a water heater or melted ice cubes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon>house</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Use caution when cleaning up"
                    secondary={
                      <React.Fragment>
                        • Put out small fires. If you can't, evacuate.
                        <br />
                        • Check electric, water pipes and appliances for damage.
                        If you see broken pipe, shut off the main valve.
                        <br />• Clean up spilled medicines, drugs, or other
                        harmful materials
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon>water</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Move to higher ground"
                    secondary="‎If you live in a coastal area, relocate as soon as the shaking stops to avoid tsunamis"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon>report_problem</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Avoid fallen objects"
                    secondary={
                      <React.Fragment>
                        • Don't touch fallen or damaged utility lines
                        <br />• Don't use a damaged chimney. Approach fallen or
                        damaged chimneys with caution
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon>refresh</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Expect aftershocks"
                    secondary="‎You may recieve an alert if an after shock is expected or happens."
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}
