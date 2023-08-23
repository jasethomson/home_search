import { Distance } from "../types";

export const calcDistance = async (destination: string, origin: string): Promise<Distance> => {
    const queryParams = new URLSearchParams({
        destination,
        origin,
        key: process.env.GCLOUD_MAPS_API_KEY
    });
    const requestUrl = `${process.env.GLOUD_MAPS_BASE_URL}?${queryParams}`;
    try {
        const directionsRes = await fetch(requestUrl);
        if (directionsRes && directionsRes.status === 200) {
            const directionJson = await directionsRes.json();
            if (directionJson?.routes?.[0]?.legs?.[0]) {
                const routeLeg = directionJson.routes[0].legs[0];
                return {
                    distance: routeLeg.distance.text,
                    duration: routeLeg.duration.text
                }
    
            } else {
                throw new Error(`Error while attempting to access route log ${requestUrl}`);
            }
        } else {
            throw new Error(`Error while requestiong ${requestUrl}`);
        }
    } catch (err) {
        console.error(`calcDistance Error: ${err}`);
        throw new Error('calcDistance error thrown');
    }
}