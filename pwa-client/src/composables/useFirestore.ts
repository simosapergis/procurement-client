import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

import { firebaseApp } from '@/services/firebase';
import type { Invoice } from '@/modules/invoices/InvoiceMapper';
import type { Supplier } from '@/modules/suppliers/Supplier';

const db = getFirestore(firebaseApp);

export function useFirestore() {
  const invoicesRef = collection(db, 'invoices');
  const suppliersRef = collection(db, 'suppliers');

  const saveInvoiceRecord = async (invoice: Invoice) => {
    const invoiceDoc = doc(invoicesRef, invoice.id);
    await setDoc(invoiceDoc, invoice, { merge: true });
    return invoice;
  };

  const fetchInvoices = async (): Promise<Invoice[]> => {
    const snapshot = await getDocs(query(invoicesRef, orderBy('uploadedAt', 'desc')));
    const invoices = snapshot.docs.map((docSnapshot) => docSnapshot.data() as Invoice);
    console.info('[Firestore] fetched invoices', invoices.length);
    return invoices;
  };

  const fetchSuppliers = async (): Promise<Supplier[]> => {
    const collectionPath = 'suppliers';
    console.info('[Firestore] querying collection', collectionPath);
    const snapshot = await getDocs(query(suppliersRef, orderBy('name', 'asc')));
    const suppliers = snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...(docSnapshot.data() as Supplier) }));
    console.info(snapshot);
    return suppliers;
  };

  const fetchSupplierInvoices = async (supplierId: string): Promise<Invoice[]> => {
    const collectionPath = `suppliers/${supplierId}/invoices`;
    console.info('[Firestore] querying collection', collectionPath);
    const invoicesCollection = collection(db, collectionPath);
    const snapshot = await getDocs(invoicesCollection);
    const invoices = snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...(docSnapshot.data() as Invoice) }));
    console.info('[Firestore] fetched supplier invoices', supplierId, invoices.length);
    return invoices;
  };

  const subscribeToInvoice = (id: string, callback: (invoice: Invoice) => void) => {
    const invoiceDoc = doc(invoicesRef, id);
    return onSnapshot(invoiceDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data() as Invoice);
      }
    });
  };

  return { saveInvoiceRecord, fetchInvoices, fetchSuppliers, fetchSupplierInvoices, subscribeToInvoice };
}
