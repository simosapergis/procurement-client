import {
  getFirestore,
  collection,
  collectionGroup,
  doc,
  setDoc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  where,
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
    const snapshot = await getDocs(query(suppliersRef, orderBy('name', 'asc')));
    const suppliers = snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...(docSnapshot.data() as Supplier) }));
    console.info(snapshot);
    return suppliers;
  };

  const fetchSupplierInvoices = async (supplierId: string): Promise<Invoice[]> => {
    const collectionPath = `suppliers/${supplierId}/invoices`;
    const invoicesCollection = collection(db, collectionPath);
    const snapshot = await getDocs(invoicesCollection);
    const invoices = snapshot.docs.map((docSnapshot) => ({ ...(docSnapshot.data() as Invoice), id: docSnapshot.id }));
    return invoices;
  };

  const fetchSupplierInvoice = async (supplierId: string, invoiceId: string): Promise<Invoice | null> => {
    const docPath = `suppliers/${supplierId}/invoices/${invoiceId}`;
    console.info('[Firestore] fetching document', docPath);
    const invoiceDoc = doc(db, docPath);
    const snapshot = await getDoc(invoiceDoc);
    if (!snapshot.exists()) {
      console.info('[Firestore] document not found', docPath);
      return null;
    }
    const invoice = { ...(snapshot.data() as Invoice), id: snapshot.id };
    console.info('[Firestore] fetched supplier invoice', invoice.id);
    return invoice;
  };

  const subscribeToInvoice = (id: string, callback: (invoice: Invoice) => void) => {
    const invoiceDoc = doc(invoicesRef, id);
    return onSnapshot(invoiceDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data() as Invoice);
      }
    });
  };

  const fetchUnpaidInvoices = async (): Promise<Invoice[]> => {
    const q = query(
      collectionGroup(db, 'invoices'),
      where('paymentStatus', 'in', ['unpaid', 'partially_paid'])
    );
    const snapshot = await getDocs(q);
    const invoices = snapshot.docs.map((docSnapshot) => ({
      ...(docSnapshot.data() as Invoice),
      id: docSnapshot.id,
    }));
    return invoices;
  };

  return {
    saveInvoiceRecord,
    fetchInvoices,
    fetchSuppliers,
    fetchSupplierInvoices,
    fetchSupplierInvoice,
    fetchUnpaidInvoices,
    subscribeToInvoice,
  };
}
