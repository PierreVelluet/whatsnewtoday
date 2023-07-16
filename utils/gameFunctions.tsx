"use server";

import { EpicFreeGames } from "epic-free-games";
import { IGame } from "../Typescript/Interfaces/game_interface";
import { currency_symbols, platformLinks } from "./staticDatas";
import { format } from "date-fns";

// GENERAL FUNCTIONS //

export const BuildIGameObject = (obj: any): IGame => {
    const platform = obj?.id ? "Egs" : "Steam";
    const game: IGame = {
        platform: platform,
        title: obj?.title ?? obj?.name,
        description: TrimString(obj?.description ?? obj?.short_description, 150),
        keyImageUrl: obj?.keyImages?.[0].url ?? obj?.header_image,
        dateString: BuildDateString(
            obj?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.startDate,
            obj?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.endDate
        ),
        priceString: BuildPriceString(
            platform == "Egs"
                ? setEgsCorrectPrice(obj?.price?.totalPrice?.originalPrice, obj?.price?.totalPrice?.currencyInfo?.decimals)
                : obj?.price_overview?.initial,
            platform == "Egs"
                ? setEgsCorrectPrice(obj?.price?.totalPrice?.discountPrice, obj?.price?.totalPrice?.currencyInfo?.decimals)
                : obj?.price_overview?.final,
            obj?.price?.totalPrice?.currencyCode ?? obj?.price_overview?.currency
        ),
        linkString: BuildClickableLink(platform, obj?.title ?? obj?.steam_appid),
    };

    return game;
};

const setEgsCorrectPrice = (price: string, nbDecimal: number): number => {
    return nbDecimal == 2 ? parseInt(price) / 100 : parseInt(price);
};

const DateFormat = (data: string): string => {
    if (!data) return "";
    const dateFinale = format(new Date(data), "dd-MM");

    return dateFinale;
};

export const BuildDateString = (startDate: string | undefined, endDate: string | undefined): string => {
    if (startDate == undefined || endDate == undefined) return "";

    return `<strong>Free</strong> from <strong>${DateFormat(startDate)}</strong> to <strong>${DateFormat(endDate)}</strong>`;
};

const CalculPercentage = (originalPrice: number, discountPrice: number): number => {
    return ((originalPrice - discountPrice) / originalPrice) * 100;
};

export const BuildPriceString = (originalPrice: number, discountPrice: number, currencyCode: string): string => {
    if (originalPrice == discountPrice) return `Price: <strong>${originalPrice}${currency_symbols[currencyCode]}</strong>`;

    return `Base price: <strong>${originalPrice} ${currency_symbols[currencyCode]}</strong> <br> Now:
    <strong className={styles.lol}>${discountPrice == 0 ? "Free" : discountPrice} ${
        discountPrice == 0 ? "" : currency_symbols[currencyCode] + ` (-${CalculPercentage(originalPrice, discountPrice)}%)`
    }</strong>`;
};

export const BuildClickableLink = (platform: string, gameId: string): string => {
    switch (platform) {
        case "Egs":
            return `${platformLinks[platform]}${gameId.toLowerCase()}`;
        case "Steam":
            return `${platformLinks[platform]}${gameId}`;
        default:
            return "";
    }
};

export const TrimString = (text: string, nbCaracters: number): string => {
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
            console.log("err: ", err);
        });

    const result: object[] = [];
    games?.currentGames?.map((el: any) => {
        result.push(el);
    });
    games?.nextGames?.map((el: any) => {
        result.push(el);
    });

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
