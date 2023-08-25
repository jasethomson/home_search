import { createPool } from "..";

export const createData = async <ReturnType>(query: string): Promise<ReturnType[]> => {
    const pool = createPool();
    const queryResult = await pool.query(query);
    return queryResult.rows;
}