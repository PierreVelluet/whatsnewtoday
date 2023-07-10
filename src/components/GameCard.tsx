"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { IGame } from "../../Typescript/Interfaces/game_interface";
import { BuildDateString, BuildPriceString, BuildClickableLink, TrimString } from "../../utils/gameFunctions";

import styles from "./GameCard.module.css";

export default function GameCard(props: any) {
    const {
        game,
    }: {
        game: IGame;
    } = props;

    return (
        <Card onClick={() => window?.open(BuildClickableLink(game?.platform, game?.id))} className={styles.card}>
            <CardActionArea className={styles.cardActionArea}>
                <CardMedia className={styles.cardImage} component="img" image={game?.keyImageUrl} alt="image vidéo game" />
                <CardContent className={styles.cardBody}>
                    <Typography gutterBottom variant="h5" component="div">
                        {game?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {TrimString(game?.description, 150)}
                    </Typography>
                    {game?.startDate && game?.endDate ? (
                        <Typography className={styles?.dateSquare} mt={2} variant="body2" color="text.secondary">
                            {BuildDateString(game?.startDate, game?.endDate)}
                        </Typography>
                    ) : null}
                    <Typography className={styles?.dateSquare} mt={2} variant="body2" color="text.secondary">
                        {BuildPriceString(game?.originalPrice, game?.discountPrice, game?.currencyCode)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
