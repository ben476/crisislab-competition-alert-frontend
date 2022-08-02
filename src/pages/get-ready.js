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

export default function GetReady(props) {
  React.useEffect(() => {
    props.setTab(2);
  }, []);

  function openInNewTab(url) {
    window.open(url, "_blank").focus();
  }

  return (
    <Fade in>
      <div style={{ padding: 20, marginBottom: 50 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "15px 25px" }}>
              <Typography variant="body1">Remember to:</Typography>
              <Typography variant="h5" style={{ fontWeight: 600 }}>
                Drop, cover, and hold!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: "15px 25px" }}>
              <Typography variant="h6">
                Get ready before an earthquake
              </Typography>
              <List style={{ marginInline: "-10px" }}>
                <ListItem
                  button
                  divider
                  onClick={() =>
                    openInNewTab(
                      "https://getready.govt.nz/prepared/household/plan/"
                    )
                  }
                >
                  <ListItemIcon>
                    <Icon>assignment_turned_in</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="‎Make a emergency plan online"
                    secondary="Make a plan online with your family/flatmates/friends to get through an emergency. Think about the things you need every day and work out what you would do if you didn’t have them."
                  />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={() =>
                    openInNewTab("https://www.eqc.govt.nz/be-prepared")
                  }
                >
                  <ListItemIcon>
                    <Icon>house</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Be Prepared (eqc.govt.nz)"
                    secondary="Visit the Earthquake Commission's website for more information on making your home safer."
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() =>
                    openInNewTab(
                      "https://getready.govt.nz/prepared/household/supplies/"
                    )
                  }
                >
                  <ListItemIcon>
                    <Icon>water_drop</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Work out what supplies you need"
                    secondary="‎In an emergency, you may be stuck at home for three days or more. Figure out what supplies you need and make a plan to work out what you need to get your family through."
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
