export interface IGame {
    id: string,
    title: string;
    description: string;
    keyImageUrl: string;
    status: string;
    startDate: string;
    endDate: string;
    originalPrice: number;
    discountPrice: number;
    currencyCode: string;
    platform: string;
}
