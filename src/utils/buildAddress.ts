interface AddressDetails {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
};

export const buildAddress = ({ streetAddress, city, state, zip }: AddressDetails): string => {
    return `${streetAddress}, ${city}, ${state} ${zip}`;
}