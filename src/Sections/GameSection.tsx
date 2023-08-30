"use client";

import * as React from "react";
import { IGame } from "../../Typescript/Interfaces/game_interface";
import GameCard from "../components/GameCard";
import { getEgsRessources, getSteamResources } from "../../utils/gameFunctions";

import animations from "../../utils/animations";
import styles from "./GameSection.module.css";
import "animate.css";

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
                    gamesData?.push(g);
                });
            });
            // await getSteamResources(list).then((data) => {
            //     data?.forEach((g) => {
            //         gamesData?.push(g);
            //     });
            // });
            setAllGames(gamesData);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container mx-auto flex flex-col">
            <h2 className={`flex justify-center text-3xl mb-5 animate__bounce`}>Game that might interest you</h2>
            <div className={`${styles.grid} container mx-auto flex justify-center`} style={{ flexFlow: "row wrap" }}>
                {allGames?.map((el: IGame, index: number) => {
                    return (
                        // @ts-ignore
                        <div key={Math.random()} className={` ${animations.fadeIn} ${animations[`delay${index + 1}`]}`}>
                            <GameCard gameData={el} />{" "}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
