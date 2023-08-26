import format from "pg-format";
import { runQuery } from ".";
import { DBHome } from "../types";

export const checkIfHomeExists = async (sourceId: number): Promise<boolean> => {
    const query = format(`
        SELECT
            id
        from %I
            where source_id = ${sourceId};
        `,
        'homes'
    );
    const result = await runQuery<DBHome['id']>(query);
    return !!result.length;
}