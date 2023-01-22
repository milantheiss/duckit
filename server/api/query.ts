import { getQuery, defineEventHandler } from "h3";
import { queryByCollection } from "../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    console.log(query.col);
    
    const docs = await queryByCollection(query.col as string);
    return { result: docs };
  } catch (error: any) {
    return { result: [], error: error.message };
  } 
});