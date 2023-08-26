export const parseSqft = (sqft: string): number => {
    const parsedSqft = sqft.replace(/,| |Sq|Ft|\./g, '');
    return Number(parsedSqft);
}
