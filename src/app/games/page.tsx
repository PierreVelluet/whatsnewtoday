import GameSection from "@/sections/GameSection";

export default async function Games() {
    const list: string[] = ["gggg", "faster than light"];

    return (
        <div className="container mx-auto flex flex-col justify-center">
            <GameSection list={list} />
        </div>
    );
}
