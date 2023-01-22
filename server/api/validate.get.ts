import { getQuery, defineEventHandler } from "h3";
import { collection, getDocs, query, where, writeBatch, serverTimestamp } from "firebase/firestore";

import { firestore } from "../lib/firebase";

//expects a query event id and ticket code
export default defineEventHandler(async (event) => {
	try {
		const queryStrings = getQuery(event);

		const batch = writeBatch(firestore);

		const colRef = collection(firestore, `events/${queryStrings.event as string}/tickets`);

		const docsRef = query(colRef, where("ticketCode", "==", queryStrings.ticketCode as string));

		let docsSnap = await getDocs(docsRef);

		batch.update(docsSnap.docs[0].ref, { valid: false, validatedOn: serverTimestamp(), updatedOn: serverTimestamp() });

		await batch.commit();

		docsSnap = await getDocs(docsRef);

		return { ticket: docsSnap.docs[0].data() };
	} catch (error: any) {
		return { ticket: null, error: error.message };
	}
});
