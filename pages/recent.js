import React from "react";
import Typography from "@material-ui/core/Typography";
import material, {
    Container,
    Grid,
    Checkbox,
    FormControl, FormLabel, FormGroup, FormControlLabel,
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
    return Object.values(params.value).reduce((r, v) => r = r + ', ' + v)
}

export default function About({ }) {

    const [state, setState] = React.useState({
        all: true,
        en: false,
        de: false,
        langQueryStr: "",
    });

    var langQueryStr = ""
    if (!state.all) {
        langQueryStr += state.en ? "en," : ""
        langQueryStr += state.de ? "de," : ""
    } else {
        langQueryStr = ""
    }
    var langParamsEncode = encodeURI(langQueryStr)
//    setState({...state, langQueryStr: langQueryStr})
    const { data, error } = useSWR(
        `/.netlify/functions/podcastindex-recent?q=${langParamsEncode}`,
        (...args) => fetch(...args).then(res => res.json(),
                                         {dedupingInterval: 15000, revalidateOnFocus: false}
        )
    )
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    const foo = []
    console.log(data)

    const dataCols = [
    { field: "title",
      headerName: "Title",
      //      width: 300,
      renderCell: renderLinkCell
    },
    { field: "newestItemPublishTime",
      headerName: "Last updated",
      //      width: 200,
      renderCell: renderUpdateCell
    },
    { field: "categories",
      headerName: "Catefories",
      renderCell: renderCategorieCell
    }
    ];

    const {all, en, de} = state
    return ( 
    <Container maxWidth="lg">
        <Grid container spacing={3} direction="row-reverse" alignItems="stretch">
            <Grid item xs={12}>
                <Paper elevation={3}>
                    <Typography variant="h4">Podcast Index Explorer</Typography>
                </Paper>
                <FormControl>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox
                                         value="all"
                                         checked={all}
                                         onChange={handleLangs} />}
                            label="All"
                        />

                        <FormControlLabel
                            control={<Checkbox value="en"
                                               checked={en}
                                               onChange={handleLangs}/>}
                            label="English"
                        />
                        <FormControlLabel
                            control={<Checkbox value="de"
                                               checked={de}
                                               onChange={handleLangs}/>}
                            label="German"
                        />
                    </FormGroup>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <Paper elevation={3}>
                    <Navigation></Navigation>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h5">Recently Updated Feeds</Typography>
                <DataGrid
                    rows={data}
                    columns={dataCols}
                    pageSize={10}
                    autoHeight="true"
                    checkboxSelection
                />
            </Grid>
            <Grid item xs={3}>
                <Paper elevation={3}>
                    <p>this thing</p>
                    </Paper>    
            </Grid>
        </Grid>
    </Container>
    );

    function handleLangs(ev){
        setState({...state,  [ev.target.value]: ev.target.checked})
    }
}
