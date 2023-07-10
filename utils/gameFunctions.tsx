"use server";

import { EpicFreeGames } from "epic-free-games";
import { IGame } from "../Typescript/Interfaces/game_interface";
const parse = require("html-react-parser");
import { currency_symbols, platformLinks } from "./staticDatas";
import { format, isEqual, isBefore, isAfter } from "date-fns";

// GENERAL FUNCTIONS //

export const buildIGameObject = (obj: any): IGame => {
    console.log("OBJ ID CHECK", obj);
    const game: IGame = {
        id: obj?.id ?? obj?.steam_appid,
        platform: obj?.id ? "Egs" : "Steam",
        title: obj?.title ?? obj?.name,
        description: obj?.description ?? obj?.short_description,
        keyImageUrl: obj?.keyImages?.[0].url ?? obj?.header_image,
        startDate:
            obj?.promotions?.promotionalOffers[0]?.promotionalOffers[0]?.startDate ??
            obj?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.startDate,
        endDate:
            obj?.promotions?.promotionalOffers[0]?.promotionalOffers[0]?.endDate ??
            obj?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.endDate,
        status: obj?.status,
        originalPrice: obj?.price?.totalPrice?.originalPrice ?? obj?.price_overview?.initial,
        discountPrice: obj?.price?.totalPrice?.discountPrice ?? obj?.price_overview?.final,
        currencyCode: obj?.price?.totalPrice?.currencyCode ?? obj?.price_overview?.currency,
    };

    return game;
};

const DateFormat = (data: string): string => {
    if (!data) return "";
    const dateFinale = format(new Date(data), "dd-MM-yyyy");

    return dateFinale;
};

export const BuildDateString = (startDate: string, endDate: string): string => {
    return `Du <strong>${DateFormat(startDate)}</strong> au <strong>${DateFormat(endDate)}</strong>`;
};

export const BuildPriceString = (originalPrice: number, discountPrice: number, currencyCode: string): string => {
    return `Base price: <strong>{${originalPrice} ${currency_symbols[currencyCode]}}</strong> Now:{" "}
    <strong>{${discountPrice} ${currency_symbols[currencyCode]}}</strong>`;
};

export const BuildClickableLink = (platform: string, gameId: string): string => {
    return `${platformLinks[platform]}${gameId}`;
};

export const TrimString = (text: string, nbCaracters: number): string => {
    return text?.substring(0, nbCaracters) + "...";
};

// END GENERAL FUNCTIONS //

// EGS FUNCTIONS //

export async function getEgsRessources() {
    const epicFreeGames = new EpicFreeGames({ country: "FR", locale: "fr", includeAll: true });
    const games = await epicFreeGames
        .getGames()
        .then((res: any) => {
            return res;
        })
        .catch((err: any) => {
            console.log("err: ", err);
        });

    const result: object[] = [...games.currentGames, ...games.nextGames];
    return result;
}

// END EGS FUNCTIONS

// STEAM FUNCTIONS 

export async function fetchGamesByAppid(appid: string) {
    "use server";
    const game = await fetch(`http://store.steampowered.com/api/appdetails?appids=${appid}`, { cache: "no-store" });
}

export async function filterSteamRessources(data: any, acceptedValues: string[]) {
    const result: any[] = [];
    data?.applist?.apps?.map((el: any) => {
        if (acceptedValues.some((o) => el?.name?.toLowerCase().includes(o.toLowerCase())))
            result?.push(`http://store.steampowered.com/api/appdetails?appids=${el?.appid}`);
    });

    return result;
}

export async function getSteamResources(gamesNamesList: string[]) {
    // Fetch all galmes
    const allGames = await fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    // Filter games
    const allpromises = await filterSteamRessources(allGames, gamesNamesList);

    let requests = allpromises.map((url) =>
        fetch(url).then((response) => {
            return response.json();
        })
    );

    const allPromisesResults = await Promise.all(requests).then((values) => {
        return values;
    });

    const finalResult: object[] = [];
    // if (allPromisesResults?.every((p) => p == null)) return;

    allPromisesResults?.map((pr) => {
        const game: any = pr[Object?.keys(pr)[0]];
        if (game.success) finalResult.push(game.data);
    });

    return finalResult.filter((g: any) => g.type == "game");
}

// END STEAM FONCTIONS
