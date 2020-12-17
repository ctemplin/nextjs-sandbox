import React, {useState} from "react";
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
import Navigation from "../src/Navigation";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
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
    return <a href={params.getValue("url")} target="_blank">{params.value}</a>;
}

function formatDay(date) {
    return dayjs().to(dayjs(date))
}

function renderUpdateCell(params) {
    return <span>{formatDay(new Date(params.value * 1000).toLocaleString())}</span>
}

function renderCategorieCell(params) {
    if (params.value == null)
        return ''
    return Object.values(params.value).reduce((r, v) => r = r + ', ' + v)
}

function ResGrid(fff) {

    console.log(fff)
    const dataCols = [
        { field: "title",
          headerName: "Title",
          width: 300,
          renderCell: renderLinkCell
        },
        { field: "lastUpdateTime",
          headerName: "Last updated",
          //      width: 200,
          renderCell: renderUpdateCell
        },
        { field: "categories",
          headerName: "Catefories",
          width: 300,
          renderCell: renderCategorieCell
        }
    ];

    const [queryParams, setQueryParams] = useState("");

    var apiUrl = "";
    if (queryParams.length > 2) {
        var queryParamsEncode = encodeURIComponent(queryParams) 
        apiUrl =  `/.netlify/functions/podcastindex-search?q=${queryParamsEncode}`
    }
    var { data, error } = useSWR(
        apiUrl,
        (...args) => fetch(...args).then(res => res.json(),
                                         {dedupingInterval: 15000, revalidateOnFocus: false}
        )
    )
    if (error) return <div>failed to load</div>
    if (!data) data = []

    return (
        <div>
            <Typography variant="h5">Search</Typography>
            <form name="contact" onSubmit={updateGrid} data-netlify="true">
                <input type="text" id="q" name="q"
                       placeholder="enter search term(s)"
                       value={queryParams}
                       onChange={handleChange}/>
            </form>
            <DataGrid
                rows={data}
                columns={dataCols}
                pageSize={10}
                autoHeight="true"
                checkboxSelection
            />
        </div>
    )

    function handleChange(event) {
        setQueryParams(event.target.value);
    };

    function updateGrid(event) {
        event.preventDefault();
    }
}



export default function About({ }) {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} direction="row-reverse" alignContent="stretch">
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
                <Grid item xs={9}>
                    <ResGrid />
                </Grid>
            </Grid>
        </Container>
    );
}
