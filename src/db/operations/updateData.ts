import { createPool } from "..";

export const updateData = async <ReturnType>(query: string): Promise<ReturnType[]> => {
    const pool = createPool();
    const queryResult = await pool.query(query);
    return queryResult.rows;
}