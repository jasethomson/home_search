export const parsePrice = (price: string): number => {
    const parsedPrice = price.replace(/(\$|,)/g, '');
    return parseFloat(parsedPrice);
}