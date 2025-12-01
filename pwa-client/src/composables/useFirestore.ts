import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

import { firebaseApp } from '@/services/firebase';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';

const db = getFirestore(firebaseApp);

export function useFirestore() {
  const invoicesRef = collection(db, 'invoices');

  const saveInvoiceRecord = async (invoice: Invoice) => {
    const invoiceDoc = doc(invoicesRef, invoice.id);
    await setDoc(invoiceDoc, invoice, { merge: true });
    return invoice;
  };

  const fetchInvoices = async (): Promise<Invoice[]> => {
    const snapshot = await getDocs(query(invoicesRef, orderBy('uploadedAt', 'desc')));
    return snapshot.docs.map((docSnapshot) => docSnapshot.data() as Invoice);
  };

  const subscribeToInvoice = (id: string, callback: (invoice: Invoice) => void) => {
    const invoiceDoc = doc(invoicesRef, id);
    return onSnapshot(invoiceDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data() as Invoice);
      }
    });
  };

  return { saveInvoiceRecord, fetchInvoices, subscribeToInvoice };
}
