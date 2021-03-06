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
//import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import EmojiPeopleIcon from "@material-ui/icons/AccessibilityNew";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

export async function getStaticProps() {
  const dataCols = [
    { field: "id", headerName: "ID" },
    { field: "url", headerName: "URL" }
  ];
  /*   const res = await fetch("https://api.podcastindex.org/api/1.0/recent/feeds?max=20&cat=102,health&lang=de,ja&pretty",
  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'User-Agent': 'api',
        'X-Auth-Date': Date.now(),
        'X-Auth-Key': '',
        'Authorization': ''
      },
      body: '' //JSON.stringify(user)
    });
    
  );
  const json = await res.json(); */

  return {
    props: {
      dataCols: dataCols,
      dataRows: []
    }
  };
}

export default function About({ dataRows, dataCols }) {
  return (
    <Container maxWidth="lg">
      <Grid container spacing="3">
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h1">Header 1</Typography>
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
        <Grid item xs={9}>
          <DataGrid
            rows={dataRows}
            columns={dataCols}
            pageSize={5}
            checkboxSelection
          />
        </Grid>
      </Grid>

      {/* <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5-alpha example
        </Typography>
        <Button variant="contained" component={Link} naked href="/">
          Go to the main page
        </Button>
        <ProTip />
        <Copyright />
      </Box> */}
    </Container>
  );
}
