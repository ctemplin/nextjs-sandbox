import React from "react";
import Typography from "@material-ui/core/Typography";
import Material, {
    Container,
    Grid,
    Paper,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Navigation from "../src/Navigation";
import useSWR from "swr"
import dayjs  from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export async function getStaticProps() {
    return {
        props: {}
    }
}

function renderLinkCell(params) {
    return <a href={params.getValue("url")} target="_blank" rel="noreferrer">{params.value}</a>;
}

function formatDay(date) {
    return dayjs().to(dayjs(date))
}

function renderUpdateCell(params) {
    return <span>{formatDay(new Date(params.value * 1000).toLocaleString())}</span>
}

export default function About() {
    const { data, error } = useSWR(
        "/.netlify/functions/podcastindex-newfeeds",
        (...args) => fetch(...args).then(res => res.json(),
                                         {dedupingInterval: 15000, revalidateOnFocus: false}
        )
    )
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const dataCols = [
    { field: "url",
      headerName: "Title",
      width: 400,
      renderCell: renderLinkCell
    },
    { field: "timeAdded",
      headerName: "Time Added",
      width: 200,
      renderCell: renderUpdateCell
    },
    ];

    return ( 
    <Container maxWidth="lg">
        <Grid container spacing="3" direction="row-reverse">
            <Grid item xs={12}>
                <Paper elevation={3}>
                    <Typography variant="h4">Podcast Index Explorer</Typography>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper elevation={3}>
                    <Navigation></Navigation>
                </Paper>
            </Grid>
            <Grid item xs={9} height="200">
                <Typography variant="h5">Newly Added Feeds</Typography>
                <DataGrid
                    rows={data}
                    columns={dataCols}
                    pageSize={10}
                    autoHeight="false"
                    disableExtendRowFullWidth="true"
                    checkboxSelection
                />
            </Grid>
        </Grid>
    </Container>
    );
}
