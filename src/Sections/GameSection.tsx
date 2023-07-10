import { IGame } from "../../Typescript/Interfaces/game_interface";
import GameCard from "../components/GameCard";

export default async function GameSection(props: any) {
    const {
        allEgsGames,
    }: {
        allEgsGames: IGame[];
    } = props;

    return (
        <div className="container mx-auto flex flex-col">
            <h2 className="flex justify-center mb-5">Jeux qui pourrait vous intéresser</h2>
            <div className="container mx-auto flex justify-center" style={{ flexFlow: "row wrap" }}>
                {allEgsGames?.map((el: IGame) => {
                    return <GameCard key={el?.id} game={el} />;
                })}
            </div>
        </div>
    );
}
