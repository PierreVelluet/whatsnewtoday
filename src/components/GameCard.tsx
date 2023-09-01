"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { IGame } from "../../Typescript/Interfaces/game_interface";
import { BuildIGameObject } from "../../utils/gameFunctions";

import styles from "./GameCard.module.css";

export default function GameCard(props: any) {
    const {
        gameData,
    }: {
        gameData: IGame;
    } = props;

    const [game, setGame] = React.useState<IGame>();
    const parse = require("html-react-parser");

    const IsTypeString = (str: any): boolean => {
        return typeof str === "string";
    };

    React.useEffect(() => {
        const fetchData = async () => {
            setGame(await BuildIGameObject(gameData));
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Card onClick={() => window?.open(game?.linkString)} className={styles.card}>
            <div className={game?.priceString == "Free" ? styles.freeRibon : styles.soonRibon}>
                <span>{IsTypeString(game?.priceString) ? parse(game?.priceString) : ""}</span>
            </div>
            <CardMedia className={styles.cardImage} component="img" image={game?.keyImageUrl} alt="image video game" />
            <div className={styles.cardBody}>
                <p className={styles.cardTitle}>{game?.title}</p>
                <p className={styles.cardParagraph}>{IsTypeString(game?.description) ? parse(game?.description) : ""}</p>
            </div>
        </Card>
    );
}
