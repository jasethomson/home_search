import { DBHome, InsertResult } from '../types';
import { runQuery } from './runQuery';
import format from 'pg-format';

export const createHome = async (home: DBHome) => {
    const query = format(`
        INSERT INTO %I (
            price,
            beds,
            baths,
            stories,
            square_feet,
            lot_square_feet,
            finished_square_feet,
            property_type,
            est_monthly_payment,
            year_built,
            description,
            miles_to_tabor_park,
            minutes_to_tabor_park,
            days_listed,
            source_id
        )
        VALUES(
            ${home.price},
            ${home.beds},
            ${home.baths},
            ${home.stories},
            ${home.square_feet},
            ${home.lot_square_feet},
            ${home.finished_square_feet},
            %L,
            ${home.est_monthly_payment},
            ${home.year_built},
            %L,
            ${home.miles_to_tabor_park},
            ${home.minutes_to_tabor_park},
            ${home.days_listed},
            ${home.source_id}
        )
        RETURNING id;
        `,
        'homes',
        home.property_type,
        home.description
    );
    const result = await runQuery<InsertResult>(query);
    return result[0].id;
}