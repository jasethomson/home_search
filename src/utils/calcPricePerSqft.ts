import { parsePrice, parseSqft } from '.';

export const calcPricePerSqft = (price: number, square_feet: number): number => {
    const floatResult = price / square_feet;
    return Math.round(floatResult * 100) / 100;
}