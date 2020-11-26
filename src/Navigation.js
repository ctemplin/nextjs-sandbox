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
import EmojiPeopleIcon from "@material-ui/icons/AccessibilityNew";
import FingerprintIcon from "@material-ui/icons/Fingerprint";


export default function Navigation() {
    return (
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
    );
}

