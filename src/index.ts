import { readData } from "./db";
import { Home } from "./types";
import { requestHtml, getHomeLinks, processHome, getFilters } from "./utils";
require('dotenv').config();  

(async () => {
    try {
        const filters = getFilters({ price: { min: '450k', max: '800k' }});
        const htmlRequestUrl = process.env.MOUNT_TABOR_REDFIN_URL + filters;
        const htmlStr = await requestHtml(htmlRequestUrl);
        const homeLinks = getHomeLinks(htmlStr);
        const homePromises: Promise<Home | null>[] = [];
        homeLinks.forEach((link, i) => {
            const homeLink = `${process.env.ROOT_REDFIN_URL}${link}`;
            homePromises.push(processHome(homeLink));
        });
        const homes = await Promise.all(homePromises);
        console.log(homes);
    } catch (err) {
        console.error(`Error thrown while running app: ${err}`);
    }
})();
