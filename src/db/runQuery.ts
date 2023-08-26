import { createPool } from ".";

export const runQuery = async <ReturnType>(query: string): Promise<ReturnType[]> => {
    try {
        const pool = createPool();
        const queryResult = await pool.query(query);
        return queryResult.rows;
    } catch (err) {
        throw new Error(`Error: ${err}, while running query: ${query}`);
    }
}