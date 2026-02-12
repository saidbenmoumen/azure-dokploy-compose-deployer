// Auto-generated. Do not edit.
// RouterOutputs["stripe"]["getInvoices"]

export type StripeGetInvoices = Array<{
    id: string;
    number: null | string;
    status: null | "void" | "draft" | "open" | "paid" | "uncollectible";
    amountDue: number;
    amountPaid: number;
    currency: string;
    created: number;
    dueDate: null | number;
    hostedInvoiceUrl: undefined | null | string;
    invoicePdf: undefined | null | string;
  }>;
