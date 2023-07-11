"use client";

import * as React from "react";
import { IGame } from "../../Typescript/Interfaces/game_interface";
import GameCard from "../components/GameCard";
import { getEgsRessources, getSteamResources } from "../../utils/gameFunctions";

export default function GameSection(props: any) {
    const {
        list,
    }: {
        list: string[];
    } = props;

    const [allGames, setAllGames] = React.useState<IGame[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const gamesData: any[] = [];
            await getEgsRessources().then((data) => {
                data?.forEach((g) => {
                    console.log(g)
                    gamesData?.push(g);
                });
            });
            await getSteamResources(list).then((data) => {
                data?.forEach((g) => {
                    gamesData?.push(g);
                });
            });
            setAllGames(gamesData);
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto flex flex-col">
            <h2 className="flex justify-center text-3xl mb-5">Game that might interest you</h2>
            <div className="container mx-auto flex justify-center" style={{ flexFlow: "row wrap" }}>
                {allGames?.map((el: IGame, index: number) => {
                    return <GameCard key={Math.random()} gameData={el} />;
                })}
            </div>
        </div>
    );
}
