"use client";

import * as React from "react";

import { IGame } from "../../../../Typescript/Interfaces/game_interface";
import GameCard from "../../../components/GameCard";
import SkeletonSection from "./SkeletonSection";

import animations from "../../../../utils/animations";
import styles from "../GameSection.module.css";
import "animate.css";

export default function GamesCardsSection(props: any) {
    const {
        games,
    }: {
        games: IGame[];
    } = props;

    return (
        <div className={`${styles.grid} container mx-auto flex justify-center`} style={{ flexFlow: "row wrap" }}>
            {games?.length > 0 ? (
                games?.map((el: IGame, index: number) => {
                    return (
                        // @ts-ignore
                        <div key={Math.random()} className={` ${animations.fadeIn} ${animations[`delay${index + 1}`]}`}>
                            <GameCard gameData={el} />{" "}
                        </div>
                    );
                })
            ) : (
                <SkeletonSection />
            )}
        </div>
    );
}
