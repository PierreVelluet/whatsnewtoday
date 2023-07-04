"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { IGame } from "../../Typescript/Interfaces/game_interface";
import { format, isEqual, isBefore, isAfter } from "date-fns";

export default function MultiActionAreaCard(props: any) {
    const {
        game,
    }: {
        game: IGame;
    } = props;

   
    const egsLink:string = "https://store.epicgames.com/en-US/free-games";

    const ButtonClickHandler = (statusAvailable: boolean) => {
        if (!statusAvailable) return;
        window.open(egsLink);
    };

    const DateFormat = (data: string): string => {
        if (!data) return "";
        const dateFinale = format(new Date(data), "dd-MM-yyyy");

        console.log(dateFinale);
        return dateFinale;
    };

    const isBetween = (date:Date, from:Date, to:Date, inclusivity = '()') => {
        if (!['()', '[]', '(]', '[)'].includes(inclusivity)) {
            throw new Error('Inclusivity parameter must be one of (), [], (], [)');
        }
    
        const isBeforeEqual = inclusivity[0] === '[',
            isAfterEqual = inclusivity[1] === ']';
    
        return (isBeforeEqual ? (isEqual(from, date) || isBefore(from, date)) : isBefore(from, date)) &&
            (isAfterEqual ? (isEqual(to, date) || isAfter(to, date)) : isAfter(to, date));
    };

    const statusAvailable: boolean =  isBetween(new Date(), new Date(game.startDate), new Date(game.endDate) )

    return (
        <Card sx={{ maxWidth: 345, marginRight: "20px" }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={game?.keyImageUrl} alt="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {game.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {game.description}
                    </Typography>
                    <Typography mt={2} variant="body2" color="text.secondary">
                        Du <strong>{DateFormat(game.startDate)}</strong> au <strong>{DateFormat(game.endDate)}</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    onClick={() => ButtonClickHandler(statusAvailable)}
                    variant="outlined"
                    disabled={!statusAvailable}
                    size="small"
                    color={statusAvailable ? "success" : "error"}>
                    { statusAvailable? "Disponible" : "A venir"}
                </Button>
            </CardActions>
        </Card>
    );
}
