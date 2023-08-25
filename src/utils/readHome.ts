import { load } from 'cheerio';
import { DBContactInfo, DBHome, Home } from '../types';
import { parsePrice, parseSqft } from '.';

export const readHome = (htmlStr: string, homeLink: string): Home => {
    const $ = load(htmlStr);
    
    const priceHtml = $('[data-rf-test-id="abp-price"]').find('.statsValue').html();
    const bedsHtml = $('[data-rf-test-id="abp-beds"]').find('.statsValue').html();
    const bathsHtml = $('[data-rf-test-id="abp-baths"]').find('.statsValue').html();
    const squareFeetHtml = $('[data-rf-test-id="abp-sqFt"]').find('.statsValue').html();

    const home: DBHome = {
        id: null,
        price: priceHtml ? parsePrice(priceHtml) : null,
        est_monthly_payment: null,
        beds: bedsHtml ? Number(bedsHtml) : null,
        baths: bathsHtml ? Number(bathsHtml) : null,
        stories: null,
        square_feet: squareFeetHtml ? parseSqft(squareFeetHtml) : null,
        finished_square_feet: null,
        lot_square_feet: null,
        property_type: null,
        year_built: null,
        description: $('.remarks').find('span').html(),
        miles_to_tabor_park: null,
        minutes_to_tabor_park: null,
        days_listed: null,
    };

    const contactInfo: DBContactInfo = {
        id: null,
        home_id: null,
        web_link: homeLink,
        street: $('.full-address').find('[data-rf-test-id="abp-streetLine"]').attr('title') || null,
        city: null,
        state: null,
        zip_code: null,
        county: null,
    }

    const cityStateZip = $('.full-address').find('[data-rf-test-id="abp-cityStateZip"]').html();
    if (cityStateZip) {
        contactInfo.city = cityStateZip.split('<!-- -->, <!-- -->')[0];
        contactInfo.state = cityStateZip.split('<!-- --> <!-- -->')[0].split('<!-- -->, <!-- -->')[1];
        contactInfo.zip_code = cityStateZip.split('<!-- --> <!-- -->').pop() || null;
    }

    $('.keyDetailsList').find('.table-row').each((i, elem) => {
        const html = $(elem).html();
        if (html) {
            const value = $(elem).find('.table-value').html();
            if (html.indexOf('Property Type') > -1) {
                home.property_type = value;
            }
            if (html.indexOf('Est. Mo. Payment') > -1) {
                if (value) home.est_monthly_payment = parsePrice(value);
            }
            if (html.indexOf('Time on Redfin') > -1) {
                if (value) home.days_listed = Number(value.replace(/ days/g, ''));
            }
        }
    });

    $('.facts-table').find('.table-row').each((i, elem) => {
        const html = $(elem).html();
        if (html) {
            const value = $(elem).find('.table-value').html();
            if (html.indexOf('Finished Sq. Ft.') > -1) {
                if (value) home.finished_square_feet = parseSqft(value);
            }
            if (html.indexOf('Stories') > -1) {
                if (value) home.stories = Number(value);
            }
            if (html.indexOf('Lot Size') > -1) {
                if (value) home.lot_square_feet = parseSqft(value);
            }
            if (html.indexOf('Year Built') > -1) {
                if (value) home.year_built = Number(value);
            }
            if (html.indexOf('County') > -1) {
                if (value) contactInfo.county = value;
            }
        }
    });

    return { home, contactInfo };
}