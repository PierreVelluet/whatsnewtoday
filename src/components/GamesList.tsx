"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import GameChip from "./GameChip";

export default function GamesList() {
    const [games, setGames] = React.useState<string[]>(["Donjon de Naheulbeuk", "heroes 3"]);
    const [secondary, setSecondary] = React.useState(false);

    const deleteGame = (title: string): any => {
        const newGames: string[] = games.filter((item) => item !== title);
        setGames(newGames);
    };

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <TextField color="primary" id="outlined-basic" label="Chercher des jeux" variant="outlined" />
            {games?.map((title) => {
                return <GameChip key={title} title={title} deleteGame={deleteGame} />;
            })}
        </Box>
    );
}
