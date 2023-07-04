"use client";

import * as React from "react";
import Chip from "@mui/material/Chip";

export default function GameChip(props: any) {
    const {
        title,
        deleteGame,
    }: {
        title: string;
        deleteGame: Function;
    } = props;

    return <Chip label={title} variant="outlined" onDelete={() => deleteGame(title)} color="primary" />;
}
