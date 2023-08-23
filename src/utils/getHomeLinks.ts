import { load } from "cheerio";

export const getHomeLinks = (htmlStr: string): string[] => {
    const $ = load(htmlStr);
    const homeLinks: string[] = [];
    $('.HomeCardsContainer').first().find('.HomeCardContainer').each((i, elem) => {
        const link = $(elem).find('[data-rf-test-name="basic-card-photo"]').attr('href');
        if (link) {
            homeLinks.push(link);
        }
    });
    return homeLinks;
}