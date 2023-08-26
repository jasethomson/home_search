import format from "pg-format";
import { DBContactInfo, InsertResult } from "../types";
import { runQuery } from "./runQuery";

export const createContactInfo = async (contactInfo: DBContactInfo) => {
    const query = format(`
            INSERT INTO %I (
                home_id,
                web_link,
                street,
                city,
                state,
                zip_code,
                county
            )
            VALUES(
                ${contactInfo.home_id},
                %L,
                %L,
                %L,
                %L,
                %L,
                %L
            )
            RETURNING id;
        `,
        'contact_info',
        contactInfo.web_link,
        contactInfo.street,
        contactInfo.city,
        contactInfo.state,
        contactInfo.zip_code,
        contactInfo.county
    );
    const result = await runQuery<InsertResult>(query);
    return result[0].id;
}