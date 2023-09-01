"use client";

import * as React from "react";

import { IGame } from "../../../../Typescript/Interfaces/game_interface";
import GamesCardsSection from "../Cards/GamesCardsSection";

import "animate.css";

export default function EgsSection(props: any) {
    const {
        egsGames,
    }: {
        egsGames: IGame[];
    } = props;

    return (
        <>
            <h2 className={`flex justify-center text-3xl mb-5 animate__bounce`}>Free Epic Games Store that might interest you</h2>
            <GamesCardsSection games={egsGames} />
        </>
    );
}
