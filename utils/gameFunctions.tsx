import { EpicFreeGames } from "epic-free-games";
import { IGame } from "../Typescript/Interfaces/game_interface";

// GENERAL FUNCTIONS //

export const buildGameObject = (obj: any): IGame => {
    const game: IGame = {
        title: obj?.title,
        description: obj?.description,
        keyImageUrl: obj?.keyImages?.[0].url,
        startDate:
            obj?.promotions?.promotionalOffers[0]?.promotionalOffers[0]?.startDate ??
            obj?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0].startDate,
        endDate:
            obj?.promotions?.promotionalOffers[0]?.promotionalOffers[0]?.endDate ??
            obj?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0].endDate,
        status: obj?.status,
        originalPrice: obj?.originalPrice,
        discountPrice: obj?.discountPrice,
        currencyCode: obj?.currencyCode,
    };

    return game;
};

// EGS FUNCTIONS //

export async function getEgsRessources() {
    const epicFreeGames = new EpicFreeGames({ country: "FR", locale: "fr", includeAll: true });
    const games = epicFreeGames
        .getGames()
        .then((res: any) => {
            return res;
        })
        .catch((err: any) => {
            console.log("err: ", err);
        });
    return games;
}

// STEAM FUNCTIONS //

async function filterSteamRessources(data: any) {
    const acceptedValues = ["ZendoVR"];
    console.log(data);
    const result = data?.apps?.map((el: any) => {
        if (el?.name == "ZendoVR") console.log(el?.name);
    });
}

export async function getSteamResources() {
    const games = fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.applist)
            filterSteamRessources(data.applist);
            return data;
        });
    return games;
}
