import { getQuery, defineEventHandler } from "h3";
import { queryByCollection } from "../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    
    const doc = await queryByCollection(query.ticketCode as string);
    return { result: doc };
  } catch (error: any) {
    return { result: [], error: error.message };
  } 
});