"use client";

import * as React from "react";
import { IGame } from "../../../Typescript/Interfaces/game_interface";
import { getEgsRessources, getSteamResources } from "../../../utils/gameFunctions";
import EgsSection from "./Egs/EgsSection";
import SteamSection from "./Steam/SteamSection";

import "animate.css";

export default function GameSection() {
    const [egsGames, setEgsGames] = React.useState<IGame[]>([]);
    const [steamGames, setSteamGames] = React.useState<IGame[]>([]);
    const [preferences, setPreferences] = React.useState<string[]>(["Faster than light", "Borderland"]);

    const fetchEgsData = async () => {
        const egsData: any[] = [];
        await getEgsRessources().then((data) => {
            data?.forEach((g) => {
                egsData?.push(g);
            });

            setEgsGames(egsData);
        });
    };

    const fetchSteamData = async () => {
        const steamData: any[] = [];
        await getSteamResources(preferences).then((data) => {
            data?.forEach((g) => {
                steamData?.push(g);
            });

            setSteamGames(steamData);
        });
    };

    React.useEffect(() => {
        fetchEgsData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container mx-auto flex flex-col">
            <EgsSection egsGames={egsGames} />
            <SteamSection steamGames={steamGames} preferences={preferences} fetchSteamData={fetchSteamData} />
        </div>
    );
}
