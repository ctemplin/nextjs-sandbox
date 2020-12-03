import React from "react";
import material, {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Button,
    Icon,
    SvgIcon
} from "@material-ui/core";
import Link from "next/link"
import UpdatedIcon from "@material-ui/icons/Update";
import NewIcon from "@material-ui/icons/ChildCare";


export default function Navigation() {
    return (
            <List>
            <Link passHref href="/recent">
            <ListItem button>
            <ListItemIcon>
            <UpdatedIcon />
            </ListItemIcon>
            <ListItemText primary="Updated Feeds" />
            </ListItem>
            </Link>
            <Link psssHref href="/new">
            <ListItem button>
            <ListItemIcon>
            <NewIcon />
            </ListItemIcon>
            <ListItemText primary="New Feeds" />
            </ListItem>
            </Link>
            </List>
    );
}

