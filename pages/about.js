import React from "react";
import Typography from "@material-ui/core/Typography";
import material, {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Paper,
  Icon,
  SvgIcon
} from "@material-ui/core";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import EmojiPeopleIcon from "@material-ui/icons/AccessibilityNew";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

export async function getStaticProps() {
  return {
    props: {
    }
  }
}

export default function About({ }) {
    return (

    <Container maxWidth="lg">
      <Grid container spacing="3">
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h1">About</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Ways to Be" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText primary="Items of Interest" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <div>About...</div>
      </Grid>

    </Container>
  );
}
