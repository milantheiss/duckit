import { collection, getDocs, getDoc, addDoc, deleteDoc, doc, query, where, setDoc, collectionGroup, Timestamp, WhereFilterOp, QuerySnapshot, DocumentData, writeBatch } from "firebase/firestore";
import { firestore } from "./firebase";

export const queryByCollection = async (ticketCode: string) => {
	// @ts-ignore
	const docRef = doc(firestore, `events/c0i5itBYyWVfohFxhdfy/tickets?ticketCode=${ticketCode}`);

	const snapshot = await getDoc(docRef);

	return {
    ...snapshot.data(),
    id: snapshot.id,
  };
};

interface QueryRequest {
  field: string;
  operator: WhereFilterOp;
  value: any;
}

export const getTicket = async (eventId: String, queryReq: QueryRequest): Promise<Object | Object[] | null> => {
  const colRef = collection(firestore, `events/${eventId}/tickets`);
  
  let docSnap = null;
  let docsSnap = null;

  if(queryReq.field === "id") {
    const docRef = doc(colRef, queryReq.value);
    docSnap = await getDoc(docRef);
  } else {
    const docsRef = query(colRef, where(queryReq.field, queryReq.operator, queryReq.value));
    docsSnap = await getDocs(docsRef);
  }

  if (docSnap) {
    return { ...docSnap.data(), id: docSnap.id };
  } else if (docsSnap) {
    return docsSnap.docs.map((doc: DocumentData) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } else {
    return null;
  }
}

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

export const createMultipleTickets = async (eventId: String, tickets: Ticket[]) => {
  const batch = writeBatch(firestore);

  const colRef = collection(firestore, `events/${eventId}/tickets`);

  tickets.map((t: Ticket) => {
    addDoc(colRef, t);
  });

  return batch.commit();
}

export const set = async (col: string, document: Object) => {
	await setDoc(doc(collection(firestore, col)), document, { merge: true });
};

export const add = async (col: string, document: Object) => {
	// @ts-ignore
	const colRef = collection(firestore, col);

	const docRef = await addDoc(colRef, document);

	return docRef;
};

export const del = async (col: any, id: any) => {
	const docRef = doc(firestore, col, id);
	return await deleteDoc(docRef);
};
