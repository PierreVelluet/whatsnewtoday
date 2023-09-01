"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import { IGame } from "../../../../Typescript/Interfaces/game_interface";
import GamesCardsSection from "../Cards/GamesCardsSection";

import "animate.css";

export default function SteamSection(props: any) {
    const {
        steamGames,
        preferences,
        fetchSteamData,
    }: {
        steamGames: IGame[];
        preferences: string[];
        fetchSteamData: Function;
    } = props;

    const preferenceStringBuilder = (preferences: string[]): string => {
        return preferences.join(", ") + ".";
    };

    return (
        <>
            <div className="container mx-auto flex flex-row justify-center">
                <div className=" flex flex-col  mb-5 mt-5">
                    <h2 className={`flex justify-center text-3xl `}>Search games according to your preferences</h2>{" "}
                    {preferences?.length > 0 ? (
                        <p className={`flex justify-center text-1xl `}>
                            Actual preferences:
                            <span className={`italic ml-1 `}>{preferenceStringBuilder(preferences)} </span>{" "}
                        </p>
                    ) : null}
                </div>

                <Button
                    onClick={() => fetchSteamData()}
                    className={`ml-3 h-50px align-middle`}
                    color="secondary"
                    variant="outlined">
                    Search <SearchIcon color="secondary" />
                </Button>
            </div>
            <GamesCardsSection games={steamGames} />
        </>
    );
}
