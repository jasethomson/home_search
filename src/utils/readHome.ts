import { load } from 'cheerio';
import { calcPricePerSqft } from '.';
import { Home } from '../types';

export const readHome = (htmlStr: string, homeLink: string): Home => {
    const $ = load(htmlStr);
    const home: Home = {
        homeLink,
        price: $('[data-rf-test-id="abp-price"]').find('.statsValue').html(),
        beds: $('[data-rf-test-id="abp-beds"]').find('.statsValue').html(),
        baths: $('[data-rf-test-id="abp-baths"]').find('.statsValue').html(),
        sqft: $('[data-rf-test-id="abp-sqFt"]').find('.statsValue').html(),
        streetAddress: $('.full-address').find('[data-rf-test-id="abp-streetLine"]').attr('title') || null,
        city: null,
        state: null,
        zip: null,
        pricePerSqft: null,
        propertyType: null,
        estMonthlyPayment: null,
        timeListed: null,
        finishedSqft: null,
        stories: null,
        lotSize: null,
        yearBuilt: null,
        county: null,
        description: $('.remarks').find('span').html(),
        distanceToTabor: null
    };
    if (home.price && home.sqft) {
        home.pricePerSqft = calcPricePerSqft(home.price, home.sqft);
    }      

    const cityStateZip = $('.full-address').find('[data-rf-test-id="abp-cityStateZip"]').html();
    if (cityStateZip) {
        home.city = cityStateZip.split('<!-- -->, <!-- -->')[0];
        home.state = cityStateZip.split('<!-- --> <!-- -->')[0].split('<!-- -->, <!-- -->')[1];
        home.zip = cityStateZip.split('<!-- --> <!-- -->').pop() || null;
    }

    $('.keyDetailsList').find('.table-row').each((i, elem) => {
        const html = $(elem).html();
        if (html) {
            if (html.indexOf('Property Type') > -1) {
                home.propertyType = $(elem).find('.table-value').html();
            }
            if (html.indexOf('Est. Mo. Payment') > -1) {
                home.estMonthlyPayment = $(elem).find('.table-value').html();
            }
            if (html.indexOf('Time on Redfin') > -1) {
                home.timeListed = $(elem).find('.table-value').html();
            }
        }
    });

    $('.facts-table').find('.table-row').each((i, elem) => {
        const html = $(elem).html();
        if (html) {
            if (html.indexOf('Finished Sq. Ft.') > -1) {
                home.finishedSqft = $(elem).find('.table-value').html();
            }
            if (html.indexOf('Stories') > -1) {
                home.stories = $(elem).find('.table-value').html();
            }
            if (html.indexOf('Lot Size') > -1) {
                home.lotSize = $(elem).find('.table-value').html();
            }
            if (html.indexOf('Year Built') > -1) {
                home.yearBuilt = $(elem).find('.table-value').html();
            }
            if (html.indexOf('County') > -1) {
                home.county = $(elem).find('.table-value').html();
            }
        }
    });

    // const agentName = $('.agent-name').html(); // loaded after dom is loaded need puppeteer
    // sale history needs puppeteer

    return home;
}