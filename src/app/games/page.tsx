import { IGame } from "../../../Typescript/Interfaces/game_interface";
import Card from "../../components/GameCard";
import { getEgsRessources, getSteamResources, buildEgsGameObject } from "../../../utils/gameFunctions";
import EgsSection from "@/Sections/EgsSection";
import SteamSection from "@/Sections/SteamSection";

export default async function Games(props: any) {
    const ressources: any = await getEgsRessources();
    const allGames = [...ressources?.currentGames, ...ressources?.nextGames];

    // console.log(data);

    return (
        <div className="container mx-auto flex flex-col">
            <EgsSection />
            <SteamSection />
        </div>
    );
}
