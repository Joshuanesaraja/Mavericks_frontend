import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invoices: [],
    selectedInvoice: null,
    payments: [],
    summary: null,
    loading: false,
    error: null
};

const billingSlice = createSlice({
    name: "billing",
    initialState,
    reducers: {
        getInvoicesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getInvoicesSuccess: (state, action) => {
            state.loading = false;
            state.invoices = action.payload;
        },

        getInvoiceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getInvoiceSuccess: (state, action) => {
            state.loading = false;
            state.selectedInvoice = action.payload;
        },

        createInvoiceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        createInvoiceSuccess: (state, action) => {
            state.loading = false;
            state.invoices.push(action.payload);
        },

        updateInvoiceStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateInvoiceStatusSuccess: (state, action) => {
            state.loading = false;
            state.selectedInvoice = action.payload;

            const index = state.invoices.findIndex(
                (invoice) => invoice.id === action.payload.id
            );

            if (index !== -1) {
                state.invoices[index] = action.payload;
            }
        },

        createPaymentRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        createPaymentSuccess: (state) => {
            state.loading = false;
        },

        getPaymentsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getPaymentsSuccess: (state, action) => {
            state.loading = false;
            state.payments = action.payload;
        },

        getBillingSummaryRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getBillingSummarySuccess: (state, action) => {
            state.loading = false;
            state.summary = action.payload;
        },

        billingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearBillingError: (state) => {
            state.error = null;
        }
    }
});

export const {
    getInvoicesRequest,
    getInvoicesSuccess,
    getInvoiceRequest,
    getInvoiceSuccess,
    createInvoiceRequest,
    createInvoiceSuccess,
    updateInvoiceStatusRequest,
    updateInvoiceStatusSuccess,
    createPaymentRequest,
    createPaymentSuccess,
    getPaymentsRequest,
    getPaymentsSuccess,
    getBillingSummaryRequest,
    getBillingSummarySuccess,
    billingFailure,
    clearBillingError
} = billingSlice.actions;

export default billingSlice.reducer;