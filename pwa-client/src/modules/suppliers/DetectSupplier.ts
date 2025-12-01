export interface SupplierDetectionResult {
  name: string;
  amountHint?: number;
  currency?: string;
  confidence: number;
}

const supplierHints: Record<string, SupplierDetectionResult> = {
  acme: { name: 'ACME Supplies', amountHint: 1250, currency: 'USD', confidence: 0.64 },
  globex: { name: 'Globex Corporation', amountHint: 980.5, currency: 'USD', confidence: 0.57 },
  initech: { name: 'Initech', amountHint: 735.2, currency: 'USD', confidence: 0.52 },
};

export const detectSupplier = async (file: File): Promise<SupplierDetectionResult | null> => {
  const normalizedName = file.name.toLowerCase();
  const match = Object.keys(supplierHints).find((key) => normalizedName.includes(key));
  return match ? supplierHints[match] : null;
};
