import { IGame } from "../../Typescript/Interfaces/game_interface";
import GameCard from "../components/GameCard";
import { getEgsRessources, buildEgsGameObject } from "../../utils/gameFunctions";

export default async function EgsSection(props: any) {
    const ressources: any = await getEgsRessources();
    const allGames = [...ressources?.currentGames, ...ressources?.nextGames];

    return (
        <div className="container mx-auto flex flex-col">
            <h2 className="flex justify-center mb-5">Jeux gratuits sur l’Epic Game Store</h2>
            <div className="container mx-auto flex flex-row justify-center">
                {allGames?.map((el: IGame) => {
                    return <GameCard key={el.title} game={buildEgsGameObject(el)} />;
                })}
            </div>
        </div>
    );
}
