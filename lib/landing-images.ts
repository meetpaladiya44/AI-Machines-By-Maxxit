export const FEATURE_SCREENSHOTS = {
  bulkUploadReview: {
    src: "/images/features/bulk-upload-review.png",
    alt: "Maxxit Tally Bulk Upload review workspace showing invoice PDF beside extracted GST fields with Confirm and Post",
    width: 1920,
    height: 1080,
  },
  purchaseInvoice: {
    src: "/images/features/purchase-invoice.png",
    alt: "Maxxit Tally review workspace for an UltraTech Cement purchase invoice with supplier GSTIN, ledger mapping, and Confirm and Post",
    width: 2554,
    height: 1513,
  },
  bankStatementReview: {
    src: "/images/features/bank-statement-review.png",
    alt: "Bank statement PDF preview alongside parsed transaction rows, sync status, and Post to Tally in Maxxit Tally",
    width: 1920,
    height: 1080,
  },
  bankStatementTable: {
    src: "/images/features/bank-statement-table.png",
    alt: "Bank statement transactions classified as Payment, Receipt, and Contra with ledger matching in Maxxit Tally",
    width: 1920,
    height: 1080,
  },
  tallyPurchaseVoucher: {
    src: "/images/features/tally-purchase-voucher.png",
    alt: "TallyPrime Purchase voucher posted from Maxxit with narration tag and GST splits",
    width: 1920,
    height: 1080,
  },
  tallyLedgerVouchers: {
    src: "/images/features/tally-ledger-vouchers.png",
    alt: "TallyPrime Ledger Vouchers report showing bank lines posted from Maxxit Tally",
    width: 1920,
    height: 1080,
  },
  clientAgent: {
    src: "/images/features/client-agent.png",
    alt: "Maxxit Tally Client Agent with WhatsApp connected, client allowlist, and invoice intake queue",
    width: 1920,
    height: 1080,
  },
} as const;

export const CLIENT_AGENT_VISUALS = {
  intake: {
    src: "/images/features/client-agent/intake.jpg",
    alt: "WhatsApp Client Agent receiving purchase invoice PDFs from a client with auto-acknowledgement",
    width: 1263,
    height: 942,
    label: "Client sends PDFs",
    step: "1",
  },
  invoiceFlow: {
    src: "/images/features/client-agent/invoice-flow.jpg",
    alt: "WhatsApp conversation generating a GST invoice from party name, items, quantities and rates",
    width: 1263,
    height: 942,
    label: "/invoice generation",
    step: "2",
  },
  generatedInvoice: {
    src: "/images/features/client-agent/generated-invoice.jpg",
    alt: "Generated tax invoice PDF from Tally data returned to the client via WhatsApp Agent",
    width: 1910,
    height: 940,
    label: "GST invoice returned",
    step: "3",
  },
} as const;

export type SupportedInputFormat = "pdf" | "img" | "excel" | "xlsx";

export const FILE_FORMAT_ICONS = {
  pdf: {
    src: "/images/icons/file-pdf.png",
    alt: "PDF file format supported for AI extraction",
    label: "PDF",
    width: 96,
    height: 96,
  },
  img: {
    src: "/images/icons/file-img.png",
    alt: "Image file format supported for AI extraction",
    label: "IMG",
    width: 96,
    height: 96,
  },
  excel: {
    src: "/images/icons/file-excel.png",
    alt: "Excel spreadsheet supported for AI extraction",
    label: "Excel",
    width: 96,
    height: 96,
  },
  xlsx: {
    src: "/images/icons/file-xlsx.png",
    alt: "XLSX spreadsheet supported for AI extraction",
    label: "XLSX",
    width: 96,
    height: 96,
  },
  json: {
    src: "/images/icons/file-json.jpg",
    alt: "Structured JSON output from AI document extraction",
    label: "JSON",
    width: 96,
    height: 96,
  },
} as const;

export const SUPPORTED_INPUT_FORMATS: SupportedInputFormat[] = [
  "pdf",
  "img",
  "excel",
  "xlsx",
];