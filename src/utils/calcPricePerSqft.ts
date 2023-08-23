import { parsePrice, parseSqft } from '.';

export const calcPricePerSqft = (price: string, sqft: string): number => {
    const parsedPrice = parsePrice(price);
    const parsedSqft = parseSqft(sqft);
    const floatResult = parseFloat(parsedPrice) / parseFloat(parsedSqft)
    return Math.round(floatResult * 100) / 100;
}