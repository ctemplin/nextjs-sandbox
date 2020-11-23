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
import { DataGrid } from "@material-ui/data-grid";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import EmojiPeopleIcon from "@material-ui/icons/AccessibilityNew";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import useSWR from "swr"
import dayjs  from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

var pdiHeaders


export async function getStaticProps() {

    return {
        props: {
        }
    }
}

function renderLinkCell(params) {
    return <a href={params.getValue("url")} target="_blank">{params.value}</a>;
}

function formatDay(date) {
    return dayjs().to(dayjs(date))
}

function renderUpdateCell(params) {
    return <span>{formatDay(new Date(params.value * 1000).toLocaleString())}</span>
}

export default function About({ }) {
    const { data, error } = useSWR(
        "/api/podcastindex/recent/",
        (...args) => fetch(...args).then(res => res.json(),
        {dedupingInterval: 15000, revalidateOnFocus: false}
        )
    )
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    const foo = []
    console.log(data)

    const dataCols = [
    { field: "id", headerName: "ID" },
    { field: "title",
      headerName: "Title",
      width: 300,
      renderCell: renderLinkCell
    },
    { field: "newestItemPublishTime",
      headerName: "Last updated",
      width: 200,
      renderCell: renderUpdateCell
    }
    ];


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
                    rows={data.feeds}
                    columns={dataCols}
                    pageSize={10}
                    autoHeight="true"
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
