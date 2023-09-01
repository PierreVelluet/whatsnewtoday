"use server";

import { EpicFreeGames } from "epic-free-games";
import { IGame } from "../Typescript/Interfaces/game_interface";
import { currency_symbols, platformLinks } from "./staticDatas";
import { format } from "date-fns";

// GENERAL FUNCTIONS //

export const BuildIGameObject = (obj: any): IGame => {
    const platform = obj?.steam_appid != undefined ? "Steam" : "Egs";

    const game: IGame = {
        platform: platform,
        title: obj?.title ?? obj?.name,
        description: TrimString(obj?.description ?? obj?.short_description, 250),
        keyImageUrl: obj?.keyImages?.[0].url ?? obj?.header_image,
        priceString: buildEgsRibbonText(obj),
        linkString: `${platformLinks[platform]}${obj?.catalogNs?.mappings?.[0]?.pageSlug ?? obj?.steam_appid}`,
    };

    return game;
};

const buildEgsRibbonText = (obj: any): string => {
    if (obj?.price?.totalPrice?.discountPrice == 0) return "Free";

    return BuildDateString(obj?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.startDate);
};

const DateFormat = (data: string): string => {
    if (!data) return "";
    const dateFinale = format(new Date(data), "dd-MM-yyyy");

    return dateFinale;
};

export const BuildDateString = (startDate: string): string => {
    if (startDate == undefined) return "";

    return `${DateFormat(startDate)}`;
};

const CalculPercentage = (originalPrice: number, discountPrice: number): number => {
    return ((originalPrice - discountPrice) / originalPrice) * 100;
};

export const BuildPriceString = (originalPrice: number, discountPrice: number, currencyCode: string): string => {
    if (originalPrice == discountPrice) return `<strong>${originalPrice}${currency_symbols[currencyCode] ?? "?"}</strong>`;

    return "Free";
};

export const TrimString = (text: string, nbCaracters: number): string => {
    if (text?.length <= nbCaracters) return text;

    return text?.substring(0, nbCaracters) + "...";
};

// END GENERAL FUNCTIONS //

// EGS FUNCTIONS //

export async function getEgsRessources() {
    const epicFreeGames = new EpicFreeGames({ country: "US", locale: "en-US", includeAll: true });
    const games = await epicFreeGames
        .getGames()
        .then((res: any) => {
            return res;
        })
        .catch((err: any) => {
            console.log("EGS error: ", err);
        });

    const result: object[] = [];
    games?.currentGames?.map((el: object) => {
        result?.push(el);
    });
    games?.nextGames?.map((el: object) => {
        result?.push(el);
    });

    return result;
}

// END EGS FUNCTIONS

// STEAM FUNCTIONS

export async function fetchGamesByAppid(appid: string) {
    "use server";
    const game = await fetch(`http://store.steampowered.com/api/appdetails?appids=${appid}`, { cache: "no-store" }).catch(
        (err: any) => {
            console.log("fetchGamesByAppid error: ", err);
        }
    );
}

export async function filterSteamRessources(data: any, acceptedValues: string[]) {
    const result: any[] = [];
    data?.applist?.apps?.map((el: any) => {
        if (acceptedValues.some((o) => el?.name?.toLowerCase().includes(o.toLowerCase())))
            result?.push(`http://store.steampowered.com/api/appdetails?appids=${el?.appid}&format=json`);
    });

    return result;
}

export async function getSteamResources(gamesNamesList: string[]) {
    // Fetch all galmes
    const allGames = await fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err: any) => {
            console.log("getSteamResources error: ", err);
        });

    // Filter games
    const allpromises = await filterSteamRessources(allGames, gamesNamesList);

    const fetchAllRequest = async () => {
        let requests = allpromises.map((url) =>
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .catch((err: any) => {
                    console.log("fetchAllRequest error: ", err);
                })
        );

        return requests;
    };

    let requests = await fetchAllRequest();

    const allPromisesResults = await Promise.all(requests)
        .then((values) => {
            return values;
        })
        .catch((err) => console.log("err", err));

    const finalResult: object[] = [];

    allPromisesResults?.map((pr) => {
        const game: any = pr[Object?.keys(pr)[0]];
        if (game.success) finalResult.push(game.data);
    });

    return finalResult.filter((g: any) => g.type == "game");
}

// END STEAM FONCTIONS
