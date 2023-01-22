import { Timestamp, serverTimestamp } from "firebase/firestore";
import { getQuery, defineEventHandler } from "h3";
import { createMultipleTickets } from "../lib/firestore";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz', 6)

interface Ticket {
  ticketCode: string;
  valid: boolean;
  createdOn: Timestamp;
  validatedOn?: Timestamp;
  buyer: {
    firstname: string;
    lastname: string;
    email: string;
  },
  updatedOn: Timestamp;
}

// expects event id as event and amount in query string and firstname, lastname and email in body
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const body = await readBody(event)

    if(!query.event) return { result: null, error: "No event id provided" };
    if(!query.amount) return { result: null, error: "No amount provided" };

    const amount = parseInt(query.amount as string);

    const tickets:Ticket[] = new Array(amount).fill({
      ticketCode: nanoid() as string,
      valid: true,
      createdOn: serverTimestamp(),
      buyer: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email
      },
      updatedOn: serverTimestamp()
    } as Ticket);
    
    const docs = await createMultipleTickets(query.event as string, tickets);

    return { result: docs };
  } catch (error: any) {
    return { result: null, error: error.message };
  } 
});