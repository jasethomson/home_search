interface GetFilters {
    price?: {
        min: string;
        max: string;
    } 
}
export const getFilters = ({ price }: GetFilters): string => {
    let filter = '/filter';
    if (price) {
        filter += `/min-price=${price.min},max-price=${price.max}`;
    }
    return filter !== '/filter' ? filter : '';
};