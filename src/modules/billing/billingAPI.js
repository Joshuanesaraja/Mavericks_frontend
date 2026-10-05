import axiosClient from "../../services/axiosClient";

export function getInvoices() {
    return axiosClient.get("/billing/invoices");
}

export function getInvoice(invoiceId) {
    return axiosClient.get(`/billing/invoices/${invoiceId}`);
}

export function createInvoice(invoiceData) {
    return axiosClient.post(
        "/billing/invoices",
        invoiceData
    );
}

export function updateInvoiceStatus(invoiceId, status) {
    return axiosClient.put(
        `/billing/invoices/${invoiceId}/status`,
        { status }
    );
}

export function createPayment(paymentData) {
    return axiosClient.post(
        "/billing/payments",
        paymentData
    );
}

export function getPayments(invoiceId) {
    return axiosClient.get(
        `/billing/invoices/${invoiceId}/payments`
    );
}

export function getBillingSummary() {
    return axiosClient.get("/billing/summary");
}