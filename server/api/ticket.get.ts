import { getQuery, defineEventHandler } from "h3";
import { getTicket } from "../lib/firestore";
import { WhereFilterOp } from "firebase/firestore";

//expects a query string eith
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    
    const docs = await getTicket(query.event as string, {field: "ticketCode", operator: "==" as WhereFilterOp, value: query.ticketCode as string}) as Object[];
    
    if(!docs) return { result: null, error: "No ticket found" };

    if(docs.length === 0) return { result: null, error: "No ticket found" };

    return { ticket: docs[0] };
  } catch (error: any) {
    return { ticket: null, error: error.message };
  } 
});