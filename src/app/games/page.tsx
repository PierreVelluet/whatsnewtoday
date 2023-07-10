import { getEgsRessources, getSteamResources, buildIGameObject } from "../../../utils/gameFunctions";
import EgsSection from "@/Sections/GameSection";
import { IGame } from "../../../Typescript/Interfaces/game_interface";

export default async function Games() {
    const list: string[] = ["gggg", "faster than light"];
    const allGames: IGame[] = [];

    const ressourcesEgs: any[] = await getEgsRessources();
    ressourcesEgs?.map((el: object) => {
        allGames?.push(buildIGameObject(el));
    });
    const ressourcesSteam: any = await getSteamResources(list);
    ressourcesSteam?.map((el: object) => {
        allGames?.push(buildIGameObject(el));
    });

    return (
        <div className="container mx-auto flex flex-col justify-center">
            <EgsSection allEgsGames={allGames} />
        </div>
    );
}
