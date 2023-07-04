import { EpicFreeGames } from "epic-free-games";
import { IGame } from "../../../Typescript/Interfaces/game_interface";
import Card from "../../components/Card";
import { getEgsRessources, getSteamResources, buildGameObject } from "../../../utils/gameFunctions";

export default async function Games(props: any) {
    const ressources: any = await getEgsRessources();
    const allGames = [...ressources?.currentGames, ...ressources?.nextGames];

    const data = getSteamResources();
    // console.log(data);

    return (
        <div className="container mx-auto display: flex">
            {allGames?.map((el: IGame) => {
                return <Card key={el.title} game={buildGameObject(el)} />;
            })}
        </div>
    );
}
