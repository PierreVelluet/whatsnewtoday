import { IGame } from "../../Typescript/Interfaces/game_interface";
import Card from "../components/GameCard";
import {getSteamResources, buildEgsGameObject } from "../../utils/gameFunctions";
import GamesList from "@/components/GamesList";

export default async function SteamSection (props: any) {
    const ressources: any = await getSteamResources();
    // const allGames = [...ressources?.currentGames, ...ressources?.nextGames];

    return (
        <div className="container mx-auto flex flex-col">
            <h2 className="flex justify-center mb-5">Jeux gratuits sur STEAM</h2>
            <div className="container mx-auto flex flex-row justify-center">
                <GamesList></GamesList>
                {/* {allGames?.map((el: IGame) => {
                    return <Card key={el.title} game={buildEgsGameObject(el)} />;
                })} */}
            </div>
        </div>
    );
}
